import { Outlet, Link } from "react-router-dom";
import { FileText } from "lucide-react";

export default function Layout() {
  return (
    <div className="min-h-screen bg-cloud text-ink">
      <header className="border-b border-slate-200 bg-white/90 backdrop-blur">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-2 font-semibold tracking-tight">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-ink text-white">
              <FileText size={20} aria-hidden="true" />
            </span>
            ResumeBoost Lite
          </Link>
          <Link
            to="/upload"
            className="focus-ring rounded-lg bg-ink px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
          >
            Upload Resume
          </Link>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

