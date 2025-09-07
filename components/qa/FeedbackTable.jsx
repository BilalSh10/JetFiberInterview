"use client";
import React from "react";
import { formatDate } from "@/lib/qa-data";

export default function FeedbackTable({ data, onOpen }) {
  if (!data.length) {
    return (
      <div className="mx-auto max-w-7xl px-4">
        <div className="rounded-2xl border border-dashed p-10 text-center text-sm text-slate-500 dark:text-slate-400">
          لا توجد ملاحظات. جرّب تغيير الفلاتر.
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4">
      {/* جدول سطح المكتب */}
      <div className="hidden overflow-hidden rounded-2xl border border-slate-200/60 bg-white/80 shadow-sm backdrop-blur dark:border-slate-800/60 dark:bg-slate-900/70 md:block">
        <table className="w-full table-fixed">
          <thead className="bg-slate-50/60 text-right text-sm dark:bg-slate-800/40">
            <tr className="text-slate-600 dark:text-slate-300">
              <th className="w-28 px-4 py-3">المعرّف</th>
              {/* <th className="w-64 px-4 py-3">الفريق</th> */}
              <th className="w-64 px-4 py-3">اسم الزبون</th>
              <th className="px-4 py-3">ملخّص الأسئلة والإجابات</th>
              <th className="w-48 px-4 py-3">التاريخ</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200/60 text-right dark:divide-slate-800/60">
            {data.map((f) => (
              <tr
                key={f.id}
                onClick={() => onOpen(f)}
                className="cursor-pointer transition hover:bg-slate-50/70 dark:hover:bg-slate-800/50"
              >
                <td className="px-4 py-3 font-mono text-xs">#{f.id}</td>
                {/* <td className="px-4 py-3">{f.teamName}</td> */}
                <td className="px-4 py-3">{f.customerName}</td>
                <td className="truncate px-4 py-3 text-sm text-slate-600 dark:text-slate-300">
                  {f.items
                    .slice(0, 2)
                    .map(
                      (qa) =>
                        `${qa.question.split(" ").slice(0, 4).join(" ")}: ${
                          qa.answer
                        }`
                    )
                    .join(" • ")}
                  {f.items.length > 2 ? " • …" : ""}
                </td>
                <td
                  className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300"
                  suppressHydrationWarning
                >
                  {formatDate(f.timestamp)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* بطاقات الهاتف */}
      <div className="grid gap-3 md:hidden">
        {data.map((f) => (
          <button
            key={f.id}
            onClick={() => onOpen(f)}
            className="rounded-2xl border border-slate-200/60 bg-white/80 p-4 text-right shadow-sm backdrop-blur transition hover:bg-slate-50/70 dark:border-slate-800/60 dark:bg-slate-900/70 dark:hover:bg-slate-800/50"
          >
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span className="font-mono">#{f.id}</span>
              <span suppressHydrationWarning>{formatDate(f.timestamp)}</span>
            </div>
            <div className="mt-1 text-sm font-medium text-slate-900 dark:text-slate-100">
              {f.customerName}
            </div>
            {/* <div className="text-sm text-slate-600 dark:text-slate-300">
              {f.teamName}
            </div> */}
            <div className="mt-2 line-clamp-2 text-sm text-slate-600 dark:text-slate-300">
              {f.items.map((qa) => `${qa.question} — ${qa.answer}`).join(" • ")}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
