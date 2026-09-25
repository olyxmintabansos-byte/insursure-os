import type { Metadata } from "next";
import "./globals.css";
import { InsuranceProvider } from "@/context/InsuranceContext";
import { Navbar } from "@/components/Navbar";

export const metadata: Metadata = {
  title: "InsurSure OS | Actuarial Loss Ratio & Claims Adjudication ERP",
  description: "Enterprise InsurTech platform for corporate underwriting, automated fraud scoring, claims adjudication, and actuarial loss ratio analytics.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="min-h-screen bg-[#060b1c] text-slate-100 antialiased flex flex-col font-sans">
        <InsuranceProvider>
          <Navbar />
          <div className="flex-1">{children}</div>
          <footer className="border-t border-slate-800/80 bg-[#030612] py-6 text-center text-xs text-slate-500">
            <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                © 2026 <span className="text-slate-300 font-bold">InsurSure OS</span> • Titan #15 Sovereign InsurTech Fleet
              </div>
              <div className="flex items-center gap-3 text-slate-400">
                <span>Organization: olyxmintabansos-byte</span>
                <span>•</span>
                <span>Client-Side Local-First</span>
                <span>•</span>
                <span>Static Export Zero-Defect</span>
              </div>
            </div>
          </footer>
        </InsuranceProvider>
      </body>
    </html>
  );
}
