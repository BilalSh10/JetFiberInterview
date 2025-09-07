"use client";

import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import Header from "@/components/qa/Header";

export default function AIAnalystPage() {
  const [analystData, setAnalystData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    const fetchAIAnalyst = async () => {
      try {
        const res = await axios.get(
          "https://jetfiberfeedback.onrender.com/ai_analysis"
        );
        setAnalystData(res.data);
        setErrMsg("");
        // console.log("Fetched AI analyst:", res.data);
      } catch (err) {
        console.error("Error fetching AI analyst:", err);
        setErrMsg("تعذر تحميل تحليل الذكاء الاصطناعي. حاول مرة أخرى لاحقاً.");
      } finally {
        setLoading(false);
      }
    };
    fetchAIAnalyst();
  }, []);

  const formattedDate = useMemo(() => {
    if (!analystData?.analyzed_at) return null;
    try {
      const d = new Date(analystData.analyzed_at);
      return d.toLocaleString("ar-EG", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return analystData.analyzed_at;
    }
  }, [analystData]);

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100"
    >
      <Header />

      <main className="mx-auto max-w-7xl px-4 py-6 lg:px-6">
        {/* Title / Loading / Error */}
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">
            محلل الذكاء الاصطناعي
          </h1>
          {formattedDate && (
            <span className="text-xs text-slate-500">
              آخر تحليل: {formattedDate}
            </span>
          )}
        </div>

        {loading && (
          <div className="grid gap-4 sm:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-28 animate-pulse rounded-2xl border border-slate-200/70 bg-white/70 dark:border-slate-800/60 dark:bg-slate-900/70"
              />
            ))}
          </div>
        )}

        {!loading && errMsg && (
          <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-rose-800 dark:border-rose-900/50 dark:bg-rose-950/40 dark:text-rose-200">
            {errMsg}
          </div>
        )}

        {!loading && !errMsg && analystData && (
          <div className="space-y-8">
            {/* Top Stats */}
            <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <StatCard
                label="إجمالي التقييمات"
                value={analystData.total_feedback_count ?? 0}
                hint="كل النماذج المحللة"
              />
              <StatCard
                label="عدد الفرق المُحللة"
                value={analystData.teams_analyzed ?? 0}
                hint="فرق ميدانية نشطة"
              />
              <StatCard
                label="أفضل تقييم"
                value={(
                  analystData.analysis?.team_rankings?.best_teams?.[0]?.score ??
                  0
                ).toFixed(1)}
                hint="أعلى درجة ضمن أفضل الفرق"
              />
              <StatCard
                label="عدد التوصيات"
                value={analystData.recommendations?.length ?? 0}
                hint="خطوات مقترحة للتحسين"
              />
            </section>

            {/* Overall Summary */}
            {analystData.analysis?.overall_summary && (
              <section className="rounded-2xl border border-slate-200/70 bg-white/70 p-5 shadow-sm backdrop-blur dark:border-slate-800/60 dark:bg-slate-900/70">
                <h2 className="mb-2 text-lg font-semibold">الملخص العام</h2>
                <p className="leading-7 text-slate-700 dark:text-slate-300">
                  {analystData.analysis.overall_summary}
                </p>
              </section>
            )}

            {/* Rankings */}
            <section className="grid gap-6 lg:grid-cols-2">
              {/* Best Teams */}
              <div className="rounded-2xl border border-emerald-200/60 bg-white/70 p-5 shadow-sm backdrop-blur dark:border-emerald-900/40 dark:bg-slate-900/70">
                <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold">
                  <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
                  أفضل الفرق
                </h3>
                <div className="space-y-4">
                  {(analystData.analysis?.team_rankings?.best_teams ?? []).map(
                    (t) => (
                      <div
                        key={t.team_id}
                        className="rounded-xl border border-slate-200/60 bg-white/70 p-4 dark:border-slate-800/60 dark:bg-slate-900/60"
                      >
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-slate-600 dark:text-slate-300">
                            فريق رقم{" "}
                            <span className="font-semibold">{t.team_id}</span>
                          </div>
                          <ScoreBadge score={t.score} />
                        </div>
                        {Array.isArray(t.strengths) &&
                          t.strengths.length > 0 && (
                            <ul className="mt-3 list-disc space-y-1 pe-4 text-sm text-slate-700 marker:text-emerald-500 dark:text-slate-300">
                              {t.strengths.map((s, i) => (
                                <li key={i}>{s}</li>
                              ))}
                            </ul>
                          )}
                      </div>
                    )
                  )}
                  {(!analystData.analysis?.team_rankings?.best_teams ||
                    analystData.analysis.team_rankings.best_teams.length ===
                      0) && (
                    <EmptyHint text="لا توجد بيانات لأفضل الفرق حالياً." />
                  )}
                </div>
              </div>

              {/* Teams Needing Improvement */}
              <div className="rounded-2xl border border-amber-200/60 bg-white/70 p-5 shadow-sm backdrop-blur dark:border-amber-900/40 dark:bg-slate-900/70">
                <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold">
                  <span className="inline-block h-2 w-2 rounded-full bg-amber-500" />
                  فرق بحاجة إلى تحسين
                </h3>
                <div className="space-y-4">
                  {(
                    analystData.analysis?.team_rankings
                      ?.teams_needing_improvement ?? []
                  ).map((t) => (
                    <div
                      key={t.team_id}
                      className="rounded-xl border border-slate-200/60 bg-white/70 p-4 dark:border-slate-800/60 dark:bg-slate-900/60"
                    >
                      <div className="text-sm text-slate-600 dark:text-slate-300">
                        فريق رقم{" "}
                        <span className="font-semibold">{t.team_id}</span>
                      </div>

                      {Array.isArray(t.issues) && t.issues.length > 0 && (
                        <div className="mt-3">
                          <div className="mb-1 text-xs font-medium text-rose-600 dark:text-rose-300">
                            أبرز المشاكل:
                          </div>
                          <ul className="list-disc space-y-1 pe-4 text-sm text-slate-700 marker:text-rose-500 dark:text-slate-300">
                            {t.issues.map((s, i) => (
                              <li key={i}>{s}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {Array.isArray(t.improvement_suggestions) &&
                        t.improvement_suggestions.length > 0 && (
                          <div className="mt-3">
                            <div className="mb-1 text-xs font-medium text-emerald-600 dark:text-emerald-300">
                              مقترحات التحسين:
                            </div>
                            <ul className="list-disc space-y-1 pe-4 text-sm text-slate-700 marker:text-emerald-500 dark:text-slate-300">
                              {t.improvement_suggestions.map((s, i) => (
                                <li key={i}>{s}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                    </div>
                  ))}
                  {(!analystData.analysis?.team_rankings
                    ?.teams_needing_improvement ||
                    analystData.analysis.team_rankings.teams_needing_improvement
                      .length === 0) && (
                    <EmptyHint text="لا توجد فرق بحاجة لتحسين حالياً." />
                  )}
                </div>
              </div>
            </section>

            {/* Key Insights & Recommendations */}
            <section className="grid gap-6 lg:grid-cols-2">
              <CardList
                title="أهم الاستنتاجات"
                items={analystData.key_insights ?? []}
                bullet="✅"
                emptyText="لا توجد استنتاجات متاحة."
              />
              <CardList
                title="التوصيات"
                items={analystData.recommendations ?? []}
                bullet="🧭"
                emptyText="لا توجد توصيات حالياً."
              />
            </section>
          </div>
        )}

        {/* Welcome fallback if truly no data */}
        {!loading && !errMsg && !analystData && (
          <div className="mt-10 flex h-[40vh] items-center justify-center">
            <h2 className="text-xl font-semibold">
              لا توجد بيانات لعرضها حالياً.
            </h2>
          </div>
        )}
      </main>
    </div>
  );
}

/* ----------------------------- UI Subcomponents ----------------------------- */

function StatCard({ label, value, hint }) {
  return (
    <div className="rounded-2xl border border-slate-200/70 bg-white/70 p-5 shadow-sm backdrop-blur dark:border-slate-800/60 dark:bg-slate-900/70">
      <div className="text-sm text-slate-600 dark:text-slate-300">{label}</div>
      <div className="mt-1 text-3xl font-semibold">{value}</div>
      {hint && (
        <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          {hint}
        </div>
      )}
    </div>
  );
}

function ScoreBadge({ score }) {
  const s = Number(score) || 0;
  return (
    <span className="inline-flex items-center rounded-lg border border-emerald-300/50 bg-emerald-50/70 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-900/30 dark:text-emerald-300">
      {s.toFixed(1)} / 5
    </span>
  );
}

function CardList({ title, items, bullet = "•", emptyText }) {
  return (
    <div className="rounded-2xl border border-slate-200/70 bg-white/70 p-5 shadow-sm backdrop-blur dark:border-slate-800/60 dark:bg-slate-900/70">
      <h3 className="mb-3 text-lg font-semibold">{title}</h3>
      {Array.isArray(items) && items.length > 0 ? (
        <ul className="space-y-2 text-slate-700 dark:text-slate-300">
          {items.map((t, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="mt-1 inline-block select-none">{bullet}</span>
              <span className="leading-7">{t}</span>
            </li>
          ))}
        </ul>
      ) : (
        <EmptyHint text={emptyText} />
      )}
    </div>
  );
}

function EmptyHint({ text }) {
  return (
    <div className="rounded-xl border border-slate-200/60 bg-slate-50/80 p-4 text-sm text-slate-600 dark:border-slate-800/60 dark:bg-slate-900/40 dark:text-slate-300">
      {text}
    </div>
  );
}
