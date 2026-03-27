import { useState, useRef, useEffect } from "react";
import type { VideoPrompt } from "../data/videos";

interface RecordingScreenProps {
  video: VideoPrompt;
  onComplete: (audioBlob: Blob, durationMs: number) => void;
  currentNumber: number;
  totalNumber: number;
}

export const RecordingScreen = ({
  video,
  onComplete,
  currentNumber,
  totalNumber,
}: RecordingScreenProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSaved, setRecordingSaved] = useState(false);
  const [elapsedMs, setElapsedMs] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);
  const timerRef = useRef<number | null>(null);
  const blobRef = useRef<Blob | null>(null);

  useEffect(() => {
    return () => clearInterval(timerRef.current as number);
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(chunksRef.current, { type: "audio/webm" });
        blobRef.current = audioBlob;
        setRecordingSaved(true);
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setError(null);
      setElapsedMs(0);

      timerRef.current = window.setInterval(() => {
        setElapsedMs((prev) => prev + 100);
      }, 100);
    } catch (err) {
      setError("Microphone access denied or unavailable.");
      console.error(err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      clearInterval(timerRef.current as number);
    }
  };

  const handleContinue = () => {
    if (blobRef.current) {
      onComplete(blobRef.current, elapsedMs);
    }
  };

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white border border-slate-200 shadow-sm rounded-3xl p-10 flex flex-col items-center">
        <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">
          Reaction for Video {currentNumber} of {totalNumber}
        </p>
        <h2 className="text-2xl font-semibold text-slate-800 mb-8 capitalize">
          {video.title} ({video.category})
        </h2>

        {error ? (
           <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm border border-red-100">
             {error}
           </div>
        ) : !recordingSaved ? (
          <div className="flex flex-col items-center">
            <div className={`mb-8 h-32 w-32 rounded-full border-4 flex items-center justify-center transition-colors ${isRecording ? 'border-red-500 bg-red-50' : 'border-slate-200 bg-slate-50'}`}>
               <span className={`text-4xl ${isRecording ? 'animate-pulse text-red-500 font-bold' : 'text-slate-400 font-medium'}`}>
                 {formatTime(elapsedMs)}
               </span>
            </div>
            
            {!isRecording ? (
              <button
                onClick={startRecording}
                className="inline-flex items-center gap-2 bg-slate-900 text-white px-8 py-3.5 rounded-full font-semibold shadow hover:bg-slate-800 transition transform hover:-translate-y-0.5"
              >
                <div className="h-3 w-3 bg-red-500 rounded-full" />
                Start Recording
              </button>
            ) : (
              <button
                onClick={stopRecording}
                className="inline-flex items-center gap-2 bg-red-500 text-white px-8 py-3.5 rounded-full font-semibold shadow hover:bg-red-600 transition transform hover:-translate-y-0.5"
              >
                <div className="h-3 w-3 bg-white rounded-sm" />
                Stop Recording
              </button>
            )}
            <p className="mt-6 text-sm text-slate-500 text-center max-w-sm leading-relaxed">
              {isRecording ? "Speak freely about your reaction. Press stop when finished." : "Click Start to begin sharing your thoughts and reactions to the video."}
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center animate-in fade-in duration-500">
            <div className="h-20 w-20 rounded-full bg-green-50 text-green-500 flex items-center justify-center text-3xl mb-4 border border-green-100">
              ✓
            </div>
            <p className="text-slate-700 font-medium mb-8">Recording saved ({formatTime(elapsedMs)})</p>
            <button
              onClick={handleContinue}
              className="inline-flex items-center justify-center bg-indigo-600 text-white px-10 py-3.5 rounded-xl font-semibold shadow hover:bg-indigo-700 transition transform hover:-translate-y-0.5"
            >
              Move to Next Video →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
