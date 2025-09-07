// "use client";
// import React, { useMemo, useState } from "react";
// import { DUMMY_FEEDBACK } from "@/lib/qa-data";
// import Header from "@/components/qa/Header";
// import Controls from "@/components/qa/Controls";
// import FeedbackTable from "@/components/qa/FeedbackTable";
// import DetailPanel from "@/components/qa/DetailPanel";

// export default function QADashboardPage() {
//   const [query, setQuery] = useState("");
//   const [open, setOpen] = useState(null);

//   const filtered = useMemo(() => {
//     const q = query.trim().toLowerCase();
//     return DUMMY_FEEDBACK.filter(
//       (f) =>

//         (!q ||
//           f.id.toLowerCase().includes(q) ||
//           f.customerName.toLowerCase().includes(q) ||
//           f.items.some(
//             (it) =>
//               it.question.toLowerCase().includes(q) ||
//               it.answer.toLowerCase().includes(q)
//           ))
//     ).sort(
//       (a, b) =>
//         new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
//     );
//   }, [query]);

//   return (
//     <div>
//       <div className="min-h-svh bg-white dark:bg-slate-950">
//         <Header />
//         <main className="py-4">
//           <Controls
//             query={query}
//             setQuery={setQuery}
//             total={filtered.length}
//           />
//           <FeedbackTable data={filtered} onOpen={setOpen} />
//           <DetailPanel feedback={open} onClose={() => setOpen(null)} />
//         </main>
//         <footer className="mx-auto max-w-7xl px-4 py-10 text-center text-xs text-slate-400 dark:text-slate-500">
//           مبني باستخدام بلال شويكي
//         </footer>
//       </div>
//     </div>
//   );
// }

"use client";
import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";

import Header from "@/components/qa/Header";
import Controls from "@/components/qa/Controls";
import FeedbackTable from "@/components/qa/FeedbackTable";
import DetailPanel from "@/components/qa/DetailPanel";

export default function QADashboardPage() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(null);
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);

  // fetch data from /feedback
  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const res = await axios.get("/feedback");
        setFeedback(res.data);
        console.log("Fetched feedback:", res.data);
      } catch (err) {
        console.error("Error fetching feedback:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFeedback();
  }, []);

  // filter based on search query
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return feedback
      .filter(
        (f) =>
          !q ||
          f.id?.toLowerCase().includes(q) ||
          f.customerName?.toLowerCase().includes(q) ||
          f.items?.some(
            (it) =>
              it.question?.toLowerCase().includes(q) ||
              it.answer?.toLowerCase().includes(q)
          )
      )
      .sort(
        (a, b) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );
  }, [query, feedback]);

  return (
    <div>
      <div className="min-h-svh bg-white dark:bg-slate-950">
        <Header />
        <main className="py-4">
          {loading ? (
            <p className="text-center text-slate-500">جارٍ تحميل البيانات...</p>
          ) : (
            <>
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
          مبني باستخدام بلال شويكي
        </footer>
      </div>
    </div>
  );
}
