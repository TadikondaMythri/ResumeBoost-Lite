export default function Badge({ children, tone = "green" }) {
  const styles =
    tone === "green"
      ? "border-emerald-200 bg-emerald-50 text-emerald-700"
      : "border-red-200 bg-red-50 text-red-700";

  return (
    <span className={`rounded-full border px-3 py-1 text-sm font-medium ${styles}`}>
      {children}
    </span>
  );
}

