"use client";
import Header from "@/components/qa/Header";
import dynamic from "next/dynamic";
import React, { Suspense } from "react";

// تحميل المشهد من ملفاتك مع تعطيل SSR
const FlatIsraelScene = dynamic(
  () => import("@/components/three/FlatIsraelScene"),
  { ssr: false }
);

const technicians = [
  // مثال: غيّر الحالات حسب حاجتك: available | busy | off
  { city: "Jerusalem", label: "Tech #1", status: "available" },
  { city: "Tel Aviv", label: "Tech #2", status: "busy" },
  { city: "Haifa", label: "Tech #3", status: "off" },
];

export default function Lab3DPage() {
  return (
    <>
      <Header />
      <div className="min-h-svh bg-white dark:bg-slate-950">
        <main className="mx-auto max-w-7xl p-4 lg:p-6">
          <div className="mb-4 flex items-center justify-between">
            <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
              مختبر ثلاثي الأبعاد
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              عرض تقريبي لتوزيع الفنيين وحالة الروابط
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200/60 bg-white/80 p-2 shadow-sm backdrop-blur dark:border-slate-800/60 dark:bg-slate-900/70">
            <div className="h-[70vh] w-full overflow-hidden rounded-xl">
              <Suspense
                fallback={
                  <div className="p-4 text-sm text-slate-500">
                    جارٍ التحميل…
                  </div>
                }
              >
                <FlatIsraelScene technicians={technicians} />
              </Suspense>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
