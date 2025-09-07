"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import ProfileMenu from "@/components/ProfileMenu";
import logo from "@/public/logo.jpg";

export default function Header() {
  const [open, setOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200/60 bg-white/80 backdrop-blur dark:border-slate-800/60 dark:bg-slate-900/70">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-6">
        {/* Left: Brand */}
        <div className="flex items-center gap-3">
          <Image
            src={logo}
            alt="Logo"
            width={42}
            height={42}
            className="rounded-xl"
            priority
          />
          <Link href="/" className="text-2xl font-semibold tracking-tight">
            جيت فايبر
          </Link>
          <span className="ml-2 rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300">
            مباشر
          </span>
        </div>

        {/* Right: Desktop actions */}
        <div className="hidden sm:flex items-center gap-2">
          <Link
            href="/lab-3d"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-1.5 text-sm shadow-sm transition hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800"
            aria-label="فتح المشهد ثلاثي الأبعاد"
          >
            نقاط الاتصال
          </Link>

          <Link
            href="/ai-analyst"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-1.5 text-sm shadow-sm transition hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800"
          >
            تحليل الذكاء الاصطناعي
          </Link>

          <ProfileMenu />
        </div>

        {/* Right: Mobile actions */}
        <div className="sm:hidden flex items-center gap-1">
          <ProfileMenu />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex items-center justify-center rounded-xl border border-slate-200 p-2 shadow-sm transition hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800"
            aria-label={open ? "إغلاق القائمة" : "فتح القائمة"}
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile panel */}
      <div
        id="mobile-nav"
        className={`sm:hidden overflow-hidden border-t border-slate-200/60 dark:border-slate-800/60 transition-[max-height,opacity] duration-300 ${
          open ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="mx-auto max-w-7xl px-4 py-3 lg:px-6">
          <ul className="grid gap-2">
            <li>
              <Link
                href="/"
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-2 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                الصفحة الرئيسية
              </Link>
            </li>
            <li>
              <Link
                href="/lab-3d"
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-2 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                نقاط الاتصال (3D)
              </Link>
            </li>
            <li>
              <Link
                href="/ai-analyst"
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-2 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                تحليل الذكاء الاصطناعي
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
