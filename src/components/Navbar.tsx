"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ShieldAlert,
  FileCheck2,
  ClipboardCheck,
  FileText,
  TrendingUp,
} from "lucide-react";
import { useInsurance } from "@/context/InsuranceContext";

export function Navbar() {
  const pathname = usePathname();
  const { claims, policies } = useInsurance();

  const pendingClaimsCount = claims.filter(
    (c) => c.status === "SUBMITTED" || c.status === "UNDER_ASSESSMENT"
  ).length;

  const navLinks = [
    { name: "Portofolio Polis", href: "/", icon: FileCheck2 },
    {
      name: "Klaim & Adjudikasi",
      href: "/claims/",
      icon: ClipboardCheck,
      badge: pendingClaimsCount > 0 ? pendingClaimsCount : undefined,
    },
    { name: "Sertifikat Polis A4", href: "/policy/", icon: FileText },
    { name: "Aktuaria & IBNR", href: "/actuary/", icon: TrendingUp },
  ];

  return (
    <header className="border-b border-slate-800 bg-[#05091a]/90 backdrop-blur-md sticky top-0 z-40 print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-teal-500 via-emerald-500 to-cyan-600 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-teal-500/20">
              <ShieldAlert className="w-6 h-6 text-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-white text-base tracking-wider">INSURSURE</span>
                <span className="px-2 py-0.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 text-[10px] font-bold">
                  TITAN 15
                </span>
              </div>
              <p className="text-[10px] text-slate-400">Actuarial Loss Ratio &amp; Underwriting Claims ERP</p>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#080d22] border border-slate-800 text-xs">
            <span className="text-[10px] text-slate-400 uppercase">Aktif:</span>
            <span className="font-black text-teal-400 font-mono">{policies.length} Kontrak</span>
          </div>

          <nav className="flex items-center gap-1 sm:gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname?.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                    isActive
                      ? "bg-teal-500 text-slate-950 shadow-md shadow-teal-500/20"
                      : "text-slate-300 hover:text-white hover:bg-slate-800/80 border border-transparent hover:border-slate-700"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{link.name}</span>
                  {link.badge !== undefined && (
                    <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-rose-500 text-white font-mono leading-none">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
