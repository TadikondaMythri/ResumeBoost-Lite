import { ArrowLeft, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

import { fetchAnalysis } from "../api/client.js";
import Badge from "../components/Badge.jsx";
import ProgressBar from "../components/ProgressBar.jsx";

export default function ResultPage() {
  const { id } = useParams();
  const location = useLocation();
  const [analysis, setAnalysis] = useState(location.state?.analysis || null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(!analysis);

  useEffect(() => {
    if (analysis) return;

    async function loadAnalysis() {
      try {
        const data = await fetchAnalysis(id);
        setAnalysis(data);
      } catch (err) {
        setError(err.response?.data?.detail || "Analysis could not be loaded.");
      } finally {
        setIsLoading(false);
      }
    }

    loadAnalysis();
  }, [analysis, id]);

  if (isLoading) {
    return (
      <div className="grid min-h-[55vh] place-items-center px-4">
        <div className="flex items-center gap-3 rounded-lg bg-white px-5 py-4 shadow-soft">
          <Loader2 className="animate-spin text-mint" size={22} aria-hidden="true" />
          Loading analysis
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-lg border border-red-200 bg-red-50 p-5 text-red-700">{error}</div>
        <BackLink />
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <BackLink />
      <div className="mt-6 rounded-lg border border-slate-200 bg-white p-6 shadow-soft">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-mint">Analysis result</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight">{analysis.filename}</h1>
          </div>
          <div className="text-left md:text-right">
            <p className="text-sm text-slate-500">ATS Score</p>
            <p className="text-5xl font-bold text-ink">{Math.round(analysis.ats_score)}%</p>
          </div>
        </div>
        <div className="mt-8">
          <ProgressBar value={analysis.ats_score} />
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <SkillPanel title="Skills Found" skills={analysis.skills_found} tone="green" empty="No matching skills found." />
        <SkillPanel
          title="Missing Skills"
          skills={analysis.missing_skills}
          tone="red"
          empty="No missing skills. Strong match."
        />
      </div>
    </section>
  );
}

function BackLink() {
  return (
    <Link to="/upload" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-ink">
      <ArrowLeft size={16} aria-hidden="true" />
      Back to upload
    </Link>
  );
}

function SkillPanel({ title, skills, tone, empty }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-soft">
      <h2 className="text-xl font-bold">{title}</h2>
      <div className="mt-5 flex flex-wrap gap-2">
        {skills.length > 0 ? skills.map((skill) => <Badge key={skill} tone={tone}>{skill}</Badge>) : (
          <p className="text-slate-500">{empty}</p>
        )}
      </div>
    </div>
  );
}

