import { ArrowRight, CheckCircle2, Gauge, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  { title: "PDF resume upload", icon: ShieldCheck },
  { title: "Skill match analysis", icon: CheckCircle2 },
  { title: "Basic ATS score", icon: Gauge },
];

export default function HomePage() {
  return (
    <section className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-20">
      <div className="flex flex-col justify-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-mint">
          ResumeBoost Lite
        </p>
        <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
          Measure your resume against the skills hiring systems look for.
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
          Upload a PDF resume, extract its text, and get an ATS-style score with clear found and
          missing skill badges.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            to="/upload"
            className="focus-ring inline-flex items-center justify-center gap-2 rounded-lg bg-ink px-6 py-3 font-semibold text-white transition hover:bg-slate-700"
          >
            Upload Resume
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-soft">
        <div className="rounded-lg bg-ink p-5 text-white">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-300">ATS Score</span>
            <span className="rounded-full bg-mint px-3 py-1 text-sm font-semibold text-ink">Live</span>
          </div>
          <div className="mt-8 text-6xl font-bold">78%</div>
          <div className="mt-4 h-3 overflow-hidden rounded-full bg-white/15">
            <div className="h-full w-[78%] rounded-full bg-mint" />
          </div>
        </div>
        <div className="mt-5 grid gap-3">
          {features.map(({ title, icon: Icon }) => (
            <div key={title} className="flex items-center gap-3 rounded-lg border border-slate-200 p-4">
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-mint/10 text-mint">
                <Icon size={20} aria-hidden="true" />
              </span>
              <span className="font-semibold">{title}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

