interface WelcomeScreenProps {
  onStart: (participantName: string) => void;
}

import { useState } from "react";

export const WelcomeScreen = ({ onStart }: WelcomeScreenProps) => {
  const [name, setName] = useState("");

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="mx-auto mb-6 h-16 w-16 rounded-3xl bg-white border border-slate-200 shadow-sm flex items-center justify-center">
            <span className="text-2xl">📹</span>
          </div>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Video Reaction Study</p>
          <h1 className="mt-3 text-3xl md:text-4xl font-semibold text-slate-900 leading-tight">
            Unscripted Emotion Study
          </h1>
        </div>

        {/* Instructions Card */}
        <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-4">What to Expect</p>
          <div className="space-y-4">
            <div className="flex items-start gap-4 rounded-xl border border-slate-100 bg-slate-50 p-4">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white border border-slate-200 text-xs font-bold text-slate-500 shadow-sm">
                1
              </span>
              <div>
                <p className="text-sm font-semibold text-slate-700">Watch</p>
                <p className="mt-1 text-sm text-slate-500 leading-relaxed">
                  You will be shown a series of short video clips. Please watch the entire clip before continuing.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 rounded-xl border border-slate-100 bg-slate-50 p-4">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white border border-slate-200 text-xs font-bold text-slate-500 shadow-sm">
                2
              </span>
              <div>
                <p className="text-sm font-semibold text-slate-700">React & Speak</p>
                <p className="mt-1 text-sm text-slate-500 leading-relaxed">
                  Immediately after the video, you will be directed to a recording screen. Speak freely and openly about how the video made you feel, what you thought about it, or any reactions you had.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Start Section */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <label className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
            Participant Name
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="mt-3 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 focus:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-100 placeholder:text-slate-400"
          />
          <button
            onClick={() => onStart(name.trim())}
            disabled={!name.trim()}
            className="mt-6 w-full inline-flex items-center justify-center rounded-xl bg-slate-900 px-10 py-4 text-base font-semibold text-white shadow-md hover:bg-slate-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Begin Session →
          </button>
        </div>
      </div>
    </div>
  );
};
