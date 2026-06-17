export default function ProgressBar({ value }) {
  return (
    <div className="h-4 overflow-hidden rounded-full bg-slate-200" aria-label={`ATS score ${value}%`}>
      <div
        className="h-full rounded-full bg-mint transition-all duration-700"
        style={{ width: `${Math.min(Math.max(value, 0), 100)}%` }}
      />
    </div>
  );
}

