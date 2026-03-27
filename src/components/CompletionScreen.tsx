import JSZip from "jszip";
import type { SessionLog } from "../App";

interface CompletionScreenProps {
  logs: SessionLog[];
  participantName: string;
}

export const CompletionScreen = ({ logs, participantName }: CompletionScreenProps) => {
  const handleExport = async () => {
    const zip = new JSZip();

    // Add JSON Log
    const metadataStr = JSON.stringify(
      logs.map((L) => ({
        videoId: L.videoId,
        category: L.category,
        durationMs: L.durationMs,
        fileName: L.fileName,
      })),
      null,
      2
    );
    zip.file("session_metadata.json", metadataStr);

    // Add audio files
    logs.forEach((log) => {
      zip.file(log.fileName, log.blob);
    });

    const content = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(content);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${participantName.replace(/\s+/g, "_")}_video_study_data.zip`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-emerald-50/50 flex flex-col items-center justify-center p-6 text-center shadow-inner">
      <div className="max-w-md w-full rounded-3xl bg-white border border-emerald-100 p-8 shadow-sm">
        <span className="text-5xl mb-6 block">✅</span>
        <h1 className="text-2xl font-bold text-slate-800 mb-2">Session Complete</h1>
        <p className="text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-lg py-3 px-4 mb-8 text-sm font-medium">
          Thank you for participating, {participantName}!
        </p>

        <p className="text-slate-500 text-sm mb-6 leading-relaxed">
          Your unscripted reactions have been recorded locally. Please download the session package below to archive your data safely.
        </p>

        <button
          onClick={handleExport}
          className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-4 text-sm font-semibold text-white shadow hover:bg-slate-800 transition hover:-translate-y-0.5"
        >
          <span>📦</span>
          Export Session Package (.zip)
        </button>
      </div>
    </div>
  );
};
