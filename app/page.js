"use client";

import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";

import Header from "@/components/qa/Header";
import Controls from "@/components/qa/Controls";
import FeedbackTable from "@/components/qa/FeedbackTable";
import DetailPanel from "@/components/qa/DetailPanel";

// Arabic labels for your API answer keys
const QUESTIONS = {
  on_time: "هل وصل الفريق في الوقت المحدد؟",
  polite_professional: "هل كان الفريق مهذباً ومحترفاً؟",
  explained_service: "هل شرحوا كيفية استخدام الخدمة؟",
  left_clean: "هل تركوا منزلك نظيفاً؟",
  internet_speed_ok: "هل تعكس سرعة الإنترنت الخطة والخدمة المختارة؟",
  installation_rating: "قيّم جودة التركيب (1–5 نجوم)",
  helpfulness_rating: "قيّم مدى تعاون الفريق (1–5 نجوم)",
  recommend: "هل توصي بخدمة JetFiber للآخرين؟ (نعم/لا)",
  like_most: "نص مفتوح: ما أكثر ما أعجبك؟",
  improve: "ما الذي يمكن تحسينه؟",
  additional_comments: "ملاحظات إضافية",
};

// Map raw API row → UI shape
function mapApiToUI(row) {
  const { id, team_id, created_at, answers = {} } = row || {};
  const items = Object.entries(answers).map(([key, val]) => {
    // Keep numbers as numbers for star rendering; booleans → نعم/لا
    let answer = val;
    if (typeof val === "boolean") answer = val ? "نعم" : "لا";
    return { question: QUESTIONS[key] || key, answer };
  });

  return {
    id, // string hash
    team_id, // number
    timestamp: created_at ?? null,
    customerName: "", // not in API; kept for compatibility with UI
    items,
  };
}

// Normalize text for search: lowercase, trim, Arabic digits → Latin
const normalize = (val) => {
  const s = String(val ?? "")
    .toLowerCase()
    .trim();
  // convert Arabic-Indic digits ٠١٢٣٤٥٦٧٨٩ → 0123456789
  return s.replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d));
};

export default function QADashboardPage() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(null);
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const res = await axios.get(
          "https://jetfiberfeedback.onrender.com/feedback"
        );
        const normalized = Array.isArray(res.data)
          ? res.data.map(mapApiToUI)
          : [];
        setFeedback(normalized);
      } catch (err) {
        console.error("Error fetching feedback:", err);
        setError("تعذر جلب البيانات. حاول لاحقاً.");
      } finally {
        setLoading(false);
      }
    };
    fetchFeedback();
  }, []);

  const filtered = useMemo(() => {
    const q = normalize(query);
    const byDateDesc = (a, b) =>
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();

    if (!q) return feedback.slice().sort(byDateDesc);

    return feedback
      .filter((f) => {
        const idText = normalize(f.id);
        const teamText = normalize(f.team_id);
        const teamLabel = normalize(`فريق ${f.team_id}`);
        const customerText = normalize(f.customerName);

        const itemsHit = (f.items || []).some((it) => {
          const qText = normalize(it.question);
          const aText = normalize(it.answer);
          return qText.includes(q) || aText.includes(q);
        });

        return (
          idText.includes(q) ||
          teamText.includes(q) ||
          teamLabel.includes(q) ||
          customerText.includes(q) ||
          itemsHit
        );
      })
      .sort(byDateDesc);
  }, [query, feedback]);

  return (
    <div dir="rtl" className="min-h-svh bg-white dark:bg-slate-950">
      <Header />
      <main className="py-4">
        {loading ? (
          <p className="text-center text-slate-500">جارٍ تحميل البيانات...</p>
        ) : (
          <>
            {error && (
              <p className="mb-3 text-center text-sm text-rose-600">{error}</p>
            )}
            <Controls
              query={query}
              setQuery={setQuery}
              total={filtered.length}
            />
            <FeedbackTable data={filtered} onOpen={setOpen} />
            <DetailPanel feedback={open} onClose={() => setOpen(null)} />
          </>
        )}
      </main>
      <footer className="mx-auto max-w-7xl px-4 py-10 text-center text-xs text-slate-400 dark:text-slate-500">
        مبني بواسطة بلال شويكي
      </footer>
    </div>
  );
}
