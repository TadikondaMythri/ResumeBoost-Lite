import { UploadCloud } from "lucide-react";

export default function UploadDropzone({ file, onFileChange, disabled }) {
  return (
    <label className="focus-within:ring-mint/25 block cursor-pointer rounded-lg border-2 border-dashed border-slate-300 bg-white p-8 text-center shadow-soft transition hover:border-mint focus-within:ring-4">
      <input
        type="file"
        accept="application/pdf,.pdf"
        disabled={disabled}
        onChange={(event) => onFileChange(event.target.files?.[0] || null)}
        className="sr-only"
      />
      <UploadCloud className="mx-auto mb-4 text-mint" size={44} aria-hidden="true" />
      <p className="text-lg font-semibold">{file ? file.name : "Choose a PDF resume"}</p>
      <p className="mt-2 text-sm text-slate-500">PDF only, up to the backend configured size limit.</p>
    </label>
  );
}

