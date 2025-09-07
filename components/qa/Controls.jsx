"use client";
import React from "react";

export default function Controls({ query, setQuery, total }) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-4">
      <div className="rounded-2xl border border-slate-200/60 bg-white/80 p-4 shadow-sm backdrop-blur dark:border-slate-800/60 dark:bg-slate-900/70">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="col-span-4">
            <label className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-300">
              بحث (المعرّف، الزبون، السؤال، الإجابة)
            </label>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="مثال: 0008، مايا، نعم"
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm shadow-sm outline-none transition focus:ring-2 focus:ring-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
            />
          </div>
        </div>
        <div className="mt-2 text-xs text-slate-500 dark:text-slate-400">
          يتم عرض <span className="font-medium">{total}</span> نتيجة.
        </div>
      </div>
    </div>
  );
}
