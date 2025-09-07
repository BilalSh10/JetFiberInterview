// "use client";
// import React from "react";
// import { formatDate } from "@/lib/qa-data";

// export default function DetailPanel({ feedback, onClose }) {
//   const open = Boolean(feedback);

//   // عرض النجوم 1–5
//   const renderStars = (n) => {
//     const val = Math.min(5, Math.max(1, Number(n) || 3));
//     return (
//       <div className="inline-flex select-none">
//         {Array.from({ length: 5 }).map((_, i) => (
//           <span
//             key={i}
//             className={`text-sm ${
//               i < val ? "opacity-100" : "opacity-30"
//             } text-amber-500`}
//           >
//             ★
//           </span>
//         ))}
//       </div>
//     );
//   };

//   // عرض الإجابة
//   const renderAnswer = (answer, question) => {
//     const t = String(answer ?? "").trim();
//     const q = String(question ?? "");
//     const isRatingQ = /قيّم|نجوم|1–5|1-5/.test(q);

//     const isYes = t === "نعم";
//     const isNo = t === "لا";

//     if (isRatingQ) {
//       const numMatch = t.match(/\d+/);
//       let n = numMatch ? parseInt(numMatch[0], 10) : NaN;
//       if (isNaN(n)) {
//         if (isYes) n = 5;
//         else if (isNo) n = 1;
//       }
//       return renderStars(n);
//     }

//     if (isYes) {
//       return (
//         <span className="inline-flex items-center rounded-lg border border-emerald-300/50 bg-emerald-50/60 px-2.5 py-1 text-xs font-medium text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-300">
//           نعم
//         </span>
//       );
//     }
//     if (isNo) {
//       return (
//         <span className="inline-flex items-center rounded-lg border border-rose-300/50 bg-rose-50/60 px-2.5 py-1 text-xs font-medium text-rose-700 dark:border-rose-500/20 dark:bg-rose-500/10 dark:text-rose-300">
//           لا
//         </span>
//       );
//     }

//     // نص حر
//     return (
//       <p className="whitespace-pre-line text-sm text-slate-700 dark:text-slate-300">
//         {t}
//       </p>
//     );
//   };

//   return (
//     <div
//       className={`fixed inset-0 z-30 transition ${
//         open ? "pointer-events-auto" : "pointer-events-none"
//       }`}
//       aria-hidden={!open}
//     >
//       {/* خلفية */}
//       <div
//         onClick={onClose}
//         className={`absolute inset-0 bg-black/10 backdrop-blur-sm transition ${
//           open ? "opacity-100" : "opacity-0"
//         }`}
//       />

//       {/* اللوحة */}
//       <aside
//         className={`absolute left-0 top-0 h-full w-[560px] max-w-[92vw] transform rounded-r-2xl bg-white/90 shadow-2xl ring-1 ring-slate-200/60 backdrop-blur transition-all duration-300 dark:bg-slate-900/80 dark:ring-slate-800/60 ${
//           open ? "-translate-x-0" : "-translate-x-full"
//         }`}
//         role="dialog"
//         aria-modal={open}
//       >
//         <div className="flex items-center justify-between border-b border-slate-200/60 bg-white/70 px-6 py-4 dark:border-slate-800/60 dark:bg-slate-900/60">
//           <div className="text-right">
//             <div className="flex items-center gap-2">
//               <div className="font-mono text-sm">#{feedback?.id}</div>
//             </div>
//           </div>
//           <button
//             onClick={onClose}
//             className="rounded-xl border border-slate-200 px-3 py-1.5 text-sm shadow-sm transition hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
//           >
//             إغلاق
//           </button>
//         </div>

//         <div className="flex-1 overflow-y-auto p-6 text-right h:[calc(100%-64px)]">
//           <section className="grid gap-1">
//             <div className="text-xs tracking-wide text-slate-500 dark:text-slate-400">
//               الفريق
//             </div>
//             <div className="text-lg font-medium text-slate-900 dark:text-slate-100">
//               #{feedback?.team_id}
//             </div>
//             <div
//               className="text-sm text-slate-500 dark:text-slate-400"
//               suppressHydrationWarning
//             >
//               {feedback?.timestamp ? formatDate(feedback.timestamp) : "—"}
//             </div>
//           </section>

//           <section className="mt-6 grid gap-3">
//             <div className="flex items-center justify-between">
//               <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">
//                 الأسئلة والإجابات
//               </div>
//               <span className="rounded-full border border-slate-200/60 bg-white/60 px-2 py-0.5 text-xs text-slate-600 dark:border-slate-800/60 dark:bg-slate-900/50 dark:text-slate-400">
//                 {feedback?.items?.length ?? 0} سؤال
//               </span>
//             </div>

//             <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
//               {feedback?.items?.map((qa, idx) => (
//                 <li
//                   key={idx}
//                   className="rounded-xl border border-slate-200/60 bg-white/80 shadow-sm ring-1 ring-transparent transition hover:ring-slate-200/80 dark:border-slate-800/60 dark:bg-slate-900/60 dark:hover:ring-slate-800/80"
//                 >
//                   <div className="border-b border-slate-200/60 bg-slate-50/60 px-3 py-2 text-sm font-medium text-slate-900 dark:border-slate-800/60 dark:bg-slate-800/40 dark:text-slate-100">
//                     {qa.question}
//                   </div>
//                   <div className="px-3 py-2">
//                     {renderAnswer(qa.answer, qa.question)}
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           </section>
//         </div>
//       </aside>
//     </div>
//   );
// }

"use client";
import React from "react";
import { formatDate } from "@/lib/qa-data";

export default function DetailPanel({ feedback, onClose }) {
  const open = Boolean(feedback);

  const renderStars = (n) => {
    const val = Math.min(5, Math.max(1, Number(n) || 0));
    if (!val) return null;
    return (
      <div className="inline-flex select-none">
        {Array.from({ length: 5 }).map((_, i) => (
          <span
            key={i}
            className={`text-sm ${
              i < val ? "opacity-100" : "opacity-30"
            } text-amber-500`}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  const renderAnswer = (answer, question) => {
    const a = answer;
    const q = String(question || "");

    // If it looks like a 1–5 rating (question mentions تقييم/نجوم or value is number)
    if (typeof a === "number" || /قيّم|نجوم|rating|stars/i.test(q)) {
      const n = Number(a);
      if (!Number.isNaN(n) && n >= 1 && n <= 5) {
        return (
          <div className="flex items-center gap-2">
            {renderStars(n)}
            <span className="text-xs text-slate-500 dark:text-slate-400">
              ({n}/5)
            </span>
          </div>
        );
      }
    }

    // Yes/No badges (Arabic already mapped upstream)
    if (String(a) === "نعم" || String(a).toLowerCase() === "yes") {
      return (
        <span className="inline-flex items-center gap-1 rounded-lg border border-emerald-300/50 bg-emerald-50/60 px-2.5 py-1 text-xs font-medium text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-300">
          نعم
        </span>
      );
    }
    if (String(a) === "لا" || String(a).toLowerCase() === "no") {
      return (
        <span className="inline-flex items-center gap-1 rounded-lg border border-rose-300/50 bg-rose-50/60 px-2.5 py-1 text-xs font-medium text-rose-700 dark:border-rose-500/20 dark:bg-rose-500/10 dark:text-rose-300">
          لا
        </span>
      );
    }

    // Default: plain text
    return (
      <span className="text-sm text-slate-700 dark:text-slate-200">
        {String(a)}
      </span>
    );
  };

  return (
    <div
      className={`fixed inset-0 z-30 transition ${
        open ? "pointer-events-auto" : "pointer-events-none"
      }`}
      aria-hidden={!open}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/10 backdrop-blur-sm transition ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Panel */}
      <aside
        className={`absolute left-0 top-0 h-full w-[560px] max-w-[92vw] transform rounded-r-2xl bg-white/90 shadow-2xl ring-1 ring-slate-200/60 backdrop-blur transition-all duration-300 dark:bg-slate-900/80 dark:ring-slate-800/60 ${
          open ? "-translate-x-0" : "-translate-x-full"
        }`}
        role="dialog"
        aria-modal={open}
      >
        <div className="flex items-center justify-between border-b border-slate-200/60 bg-white/70 px-6 py-4 dark:border-slate-800/60 dark:bg-slate-900/60">
          <div className="text-right">
            <div className="flex items-center gap-2">
              <div className="font-mono text-sm">#{feedback?.id}</div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-xl border border-slate-200 px-3 py-1.5 text-sm shadow-sm transition hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
          >
            إغلاق
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 text-right h-[calc(100%-64px)]">
          <section className="grid gap-1">
            <div className="text-xs tracking-wide text-slate-500 dark:text-slate-400">
              الفريق
            </div>
            <div className="text-lg font-medium text-slate-900 dark:text-slate-100">
              فريق {feedback?.team_id}
            </div>
            <div
              className="text-sm text-slate-500 dark:text-slate-400"
              suppressHydrationWarning
            >
              {feedback?.timestamp ? formatDate(feedback.timestamp) : "—"}
            </div>
          </section>

          <section className="mt-6 grid gap-3">
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                الأسئلة والإجابات
              </div>
              <span className="rounded-full border border-slate-200/60 bg-white/60 px-2 py-0.5 text-xs text-slate-600 dark:border-slate-800/60 dark:bg-slate-900/50 dark:text-slate-400">
                {feedback?.items?.length ?? 0} سؤال
              </span>
            </div>

            <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {feedback?.items?.map((qa, idx) => (
                <li
                  key={idx}
                  className="rounded-xl border border-slate-200/60 bg-white/80 shadow-sm ring-1 ring-transparent transition hover:ring-slate-200/80 dark:border-slate-800/60 dark:bg-slate-900/60 dark:hover:ring-slate-800/80"
                >
                  <div className="border-b border-slate-200/60 bg-slate-50/60 px-3 py-2 text-sm font-medium text-slate-900 dark:border-slate-800/60 dark:bg-slate-800/40 dark:text-slate-100">
                    {qa.question}
                  </div>
                  <div className="px-3 py-2">
                    {renderAnswer(qa.answer, qa.question)}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </aside>
    </div>
  );
}
