import { useState } from "react";
import { WelcomeScreen } from "./components/WelcomeScreen";
import { VideoPlayerScreen } from "./components/VideoPlayerScreen";
import { RecordingScreen } from "./components/RecordingScreen";
import { CompletionScreen } from "./components/CompletionScreen";
import { videoPrompts } from "./data/videos";
import type { EmotionCategory } from "./data/videos";

export interface SessionLog {
  videoId: string;
  category: EmotionCategory;
  blob: Blob;
  durationMs: number;
  fileName: string;
}

type Stage = "welcome" | "video" | "record" | "complete";

function App() {
  const [stage, setStage] = useState<Stage>("welcome");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [participantName, setParticipantName] = useState("");
  const [logs, setLogs] = useState<SessionLog[]>([]);

  const handleStart = (name: string) => {
    setParticipantName(name);
    setStage("video");
  };

  const handleVideoComplete = () => {
    setStage("record");
  };

  const handleRecordingComplete = (audioBlob: Blob, durationMs: number) => {
    const currentVideo = videoPrompts[currentIndex];
    
    // Save the log
    setLogs((prev) => [
      ...prev,
      {
        videoId: currentVideo.id,
        category: currentVideo.category,
        blob: audioBlob,
        durationMs,
        fileName: `${participantName.replace(/\s+/g, "_")}_${currentVideo.category}_rxn.webm`,
      },
    ]);

    // Move next or complete
    if (currentIndex < videoPrompts.length - 1) {
      setCurrentIndex((p) => p + 1);
      setStage("video");
    } else {
      setStage("complete");
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 selection:bg-indigo-100 selection:text-indigo-900">
      {stage === "welcome" && <WelcomeScreen onStart={handleStart} />}
      
      {stage === "video" && (
        <VideoPlayerScreen 
          video={videoPrompts[currentIndex]} 
          onComplete={handleVideoComplete}
          currentNumber={currentIndex + 1}
          totalNumber={videoPrompts.length}
        />
      )}
      
      {stage === "record" && (
        <RecordingScreen 
          video={videoPrompts[currentIndex]}
          onComplete={handleRecordingComplete}
          currentNumber={currentIndex + 1}
          totalNumber={videoPrompts.length}
        />
      )}
      
      {stage === "complete" && (
        <CompletionScreen logs={logs} participantName={participantName} />
      )}
    </main>
  );
}

export default App;
