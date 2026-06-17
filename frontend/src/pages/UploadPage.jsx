import { AlertCircle, Loader2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import ProgressBar from "../components/ProgressBar.jsx";
import UploadDropzone from "../components/UploadDropzone.jsx";
import { uploadResume } from "../api/client.js";

export default function UploadPage() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  function handleFileChange(nextFile) {
    setError("");
    setProgress(0);

    if (!nextFile) {
      setFile(null);
      return;
    }

    if (nextFile.type !== "application/pdf" && !nextFile.name.toLowerCase().endsWith(".pdf")) {
      setFile(null);
      setError("Please upload a PDF file.");
      return;
    }

    setFile(nextFile);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (!file) {
      setError("Select a PDF resume before uploading.");
      return;
    }

    setIsUploading(true);
    setError("");

    try {
      const result = await uploadResume(file, setProgress);
      navigate(`/analysis/${result.id}`, { state: { analysis: result } });
    } catch (err) {
      const message =
        err.response?.data?.detail || "Something went wrong while analyzing your resume.";
      setError(message);
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Upload Resume</h1>
        <p className="mt-3 text-slate-600">Submit a PDF resume to calculate your ResumeBoost Lite ATS score.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <UploadDropzone file={file} onFileChange={handleFileChange} disabled={isUploading} />

        {isUploading && (
          <div className="rounded-lg border border-slate-200 bg-white p-5">
            <div className="mb-3 flex items-center justify-between text-sm font-semibold">
              <span>Uploading and analyzing</span>
              <span>{progress}%</span>
            </div>
            <ProgressBar value={progress} />
          </div>
        )}

        {error && (
          <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
            <AlertCircle size={20} className="mt-0.5 shrink-0" aria-hidden="true" />
            <p>{error}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={isUploading}
          className="focus-ring inline-flex w-full items-center justify-center gap-2 rounded-lg bg-ink px-6 py-3 font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
        >
          {isUploading && <Loader2 className="animate-spin" size={18} aria-hidden="true" />}
          Analyze Resume
        </button>
      </form>
    </section>
  );
}

