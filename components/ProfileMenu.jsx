import { useEffect, useRef, useState } from "react";

export default function ProfileMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // إغلاق عند النقر بالخارج أو ضغط Esc
  useEffect(() => {
    function onDoc(e) {
      if (e.type === "keydown" && e.key === "Escape") setOpen(false);
      if (
        e.type === "mousedown" &&
        ref.current &&
        !ref.current.contains(e.target)
      )
        setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onDoc);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onDoc);
    };
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-2 py-1.5 text-sm hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <span className="inline-flex h-7 w-7 items-center justify-center overflow-hidden rounded-full ring-1 ring-slate-200 dark:ring-slate-700">
          {/* صورة رمزية افتراضية */}
          <svg viewBox="0 0 24 24" className="h-7 w-7">
            <circle
              cx="12"
              cy="8"
              r="4"
              className="fill-slate-300 dark:fill-slate-600"
            />
            <path
              d="M4 20c0-3.3 3.6-6 8-6s8 2.7 8 6"
              className="fill-slate-300 dark:fill-slate-600"
            />
          </svg>
        </span>
        <span className="hidden sm:block">بلال</span>
        <svg
          className="h-4 w-4 opacity-70"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 mt-2 w-56 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg dark:border-slate-800 dark:bg-slate-900"
        >
          <div className="px-4 py-3">
            <p className="text-sm font-medium">بلال شويكي</p>
            <p className="truncate text-xs text-slate-500 dark:text-slate-400">
              bilal@example.com
            </p>
          </div>
          <div className="h-px bg-slate-200 dark:bg-slate-800" />
          <ul className="py-1 text-sm">
            <li>
              <a
                className="block px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-800"
                href="#"
              >
                الملف الشخصي
              </a>
            </li>
            <li>
              <a
                className="block px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-800"
                href="#"
              >
                الإعدادات
              </a>
            </li>
          </ul>
          <div className="h-px bg-slate-200 dark:bg-slate-800" />
          <button
            className="block w-full px-4 py-2 text-right text-rose-600 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-500/10"
            onClick={() => alert("تم تسجيل الخروج")}
          >
            تسجيل الخروج
          </button>
        </div>
      )}
    </div>
  );
}
