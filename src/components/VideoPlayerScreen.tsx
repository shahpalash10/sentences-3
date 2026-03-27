import { useState } from "react";
import YouTube, { type YouTubeProps } from "react-youtube";
import type { VideoPrompt } from "../data/videos";

interface VideoPlayerScreenProps {
  video: VideoPrompt;
  onComplete: () => void;
  currentNumber: number;
  totalNumber: number;
}

export const VideoPlayerScreen = ({ video, onComplete, currentNumber, totalNumber }: VideoPlayerScreenProps) => {
  const [hasEnded, setHasEnded] = useState(false);

  // When the video ends naturally
  const onEnd: YouTubeProps["onEnd"] = () => {
    setHasEnded(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-4xl flex flex-col items-center">
        
        <div className="w-full flex justify-between items-center mb-6 text-slate-400">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-500">
            Video {currentNumber} of {totalNumber}
          </span>
          <span className="text-xs font-medium bg-slate-800 px-2.5 py-1 rounded text-slate-300">
            Watch completely to continue
          </span>
        </div>

        <div className="w-full aspect-video bg-black rounded-xl overflow-hidden shadow-2xl ring-1 ring-white/10 relative flex justify-center items-center">
          <YouTube
            videoId={video.videoId}
            opts={{
              width: "100%",
              height: "100%",
              playerVars: {
                // Auto-play the video on load
                autoplay: 1,
                // Hide related videos at the end
                rel: 0,
                // Hide modest branding
                modestbranding: 1,
                // Minimal controls
                controls: 1,
              },
            }}
            onEnd={onEnd}
            className="absolute inset-0 w-full h-full"
            iframeClassName="w-full h-full"
          />
        </div>

        <div className="mt-8 h-14 flex items-center gap-4">
          {hasEnded ? (
            <button
              onClick={onComplete}
              className="inline-flex items-center justify-center rounded-xl bg-white text-slate-950 px-10 py-3.5 text-sm font-semibold shadow-lg hover:scale-105 transition-transform"
            >
              Continue to Reaction →
            </button>
          ) : (
             <>
               <p className="text-sm text-slate-500 animate-pulse">Playing video...</p>
               {/* Built-in developer/short bypass in case iframe API fails to fire ended event for shorts randomly */}
               <button 
                onClick={() => setHasEnded(true)} 
                className="ml-4 text-xs text-slate-700 underline hover:text-white"
               >
                 I finished watching
               </button>
             </>
          )}
        </div>
      </div>
    </div>
  );
};
