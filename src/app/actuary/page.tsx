"use client";

import React from "react";
import { useInsurance } from "@/context/InsuranceContext";
import { formatIDR, formatPercentage } from "@/lib/utils";
import { TrendingUp, AlertTriangle, Zap, Activity, Shield, DollarSign } from "lucide-react";

export default function ActuaryIBNRPage() {
  const { runOffTriangle, solvencyMetrics, catastropheShock, setCatastropheShock } = useInsurance();

  const rbcStatus =
    solvencyMetrics.riskBasedCapitalRBCPercent >= 120
      ? "HEALTHY"
      : solvencyMetrics.riskBasedCapitalRBCPercent >= 100
      ? "CAUTION"
      : "UNDERCAPITALIZED";

  const rbcColorClass =
    rbcStatus === "HEALTHY"
      ? "text-emerald-400"
      : rbcStatus === "CAUTION"
      ? "text-amber-400"
      : "text-rose-400";

  return (
    <div className="py-8 px-4 sm:px-6 max-w-7xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-br from-[#090f26] via-[#0a1128] to-[#050a1d] border border-slate-800 shadow-2xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded bg-purple-500/10 border border-purple-500/30 text-purple-400 font-mono text-xs font-bold">
              ACTUARIAL ENGINE
            </span>
            <span className="text-xs text-slate-400">Loss Development & IBNR Reserve Projection</span>
          </div>
          <h1 className="text-xl font-black text-white">Aktuaria Claims Run-Off & Modal Solvabilitas RBC</h1>
          <p className="text-xs text-slate-400 mt-1">
            Chain Ladder Method — Proyeksi Incurred But Not Reported (IBNR) Reserve sesuai Standar OJK
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 rounded-xl bg-slate-950/80 border border-slate-700">
            <span className="text-[10px] text-slate-400 block mb-0.5">Total IBNR Reserve:</span>
            <span className="text-base font-black text-teal-400 font-mono">
              {formatIDR(solvencyMetrics.totalIBNRReserveIDR)}
            </span>
          </div>
        </div>
      </div>

      {/* Catastrophe Shock Multiplier Toolbar */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-rose-950/40 via-orange-950/30 to-amber-950/20 border border-rose-900/40">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-rose-500 to-orange-500 flex items-center justify-center text-white shadow-lg">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white mb-0.5">Simulasi Stress Testing Risiko Katastropik</h3>
              <p className="text-xs text-slate-400">
                Multiplier {catastropheShock}x — Meningkatkan proyeksi IBNR untuk kondisi worst-case scenario (gempa bumi, badai, pandemi).
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {[1.0, 1.5, 2.0, 3.0].map((mult) => (
              <button
                key={mult}
                onClick={() => setCatastropheShock(mult)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  catastropheShock === mult
                    ? "bg-rose-500 text-white shadow-md"
                    : "bg-slate-800/80 text-slate-300 hover:bg-slate-700 border border-slate-700"
                }`}
              >
                {mult}x
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Claims Development Triangle Table */}
      <div className="p-5 rounded-2xl bg-[#090f26] border border-slate-800 shadow-xl">
        <div className="flex items-center gap-2 mb-4">
          <Activity className="w-5 h-5 text-purple-400" />
          <h2 className="text-base font-bold text-white">
            Tabel Segitiga Perkembangan Klaim (Claims Development Triangle)
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-slate-700 rounded-lg overflow-hidden">
            <thead className="bg-slate-950/80 text-slate-400 font-mono">
              <tr>
                <th className="py-2 px-3 border-r border-slate-700">Tahun Kejadian</th>
                <th className="py-2 px-3 border-r border-slate-700 text-right">Earned Premium</th>
                <th className="py-2 px-3 border-r border-slate-700 text-right">Dev 12m</th>
                <th className="py-2 px-3 border-r border-slate-700 text-right">Dev 24m</th>
                <th className="py-2 px-3 border-r border-slate-700 text-right">Dev 36m</th>
                <th className="py-2 px-3 border-r border-slate-700 text-right">Dev 48m</th>
                <th className="py-2 px-3 border-r border-slate-700 text-right">Ultimate Loss (Proj)</th>
                <th className="py-2 px-3 text-right">IBNR Reserve</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {runOffTriangle.map((row) => {
                const ibnrAdjusted = row.ibnrReserveIDR * catastropheShock;
                return (
                  <tr key={row.accidentYear} className="hover:bg-slate-900/50 transition-colors">
                    <td className="py-2 px-3 border-r border-slate-700 font-bold text-white font-mono">
                      {row.accidentYear}
                    </td>
                    <td className="py-2 px-3 border-r border-slate-700 text-right text-slate-300 font-mono">
                      {formatIDR(row.earnedPremiumIDR)}
                    </td>
                    <td className="py-2 px-3 border-r border-slate-700 text-right text-slate-300 font-mono">
                      {row.dev12m > 0 ? formatIDR(row.dev12m) : "—"}
                    </td>
                    <td className="py-2 px-3 border-r border-slate-700 text-right text-slate-300 font-mono">
                      {row.dev24m > 0 ? formatIDR(row.dev24m) : "—"}
                    </td>
                    <td className="py-2 px-3 border-r border-slate-700 text-right text-slate-300 font-mono">
                      {row.dev36m > 0 ? formatIDR(row.dev36m) : "—"}
                    </td>
                    <td className="py-2 px-3 border-r border-slate-700 text-right text-slate-300 font-mono">
                      {row.dev48m > 0 ? formatIDR(row.dev48m) : "—"}
                    </td>
                    <td className="py-2 px-3 border-r border-slate-700 text-right font-bold text-purple-400 font-mono">
                      {formatIDR(row.projectedUltimateLossIDR)}
                    </td>
                    <td className="py-2 px-3 text-right font-bold text-teal-400 font-mono">
                      {ibnrAdjusted > 0 ? formatIDR(ibnrAdjusted) : "Fully Paid"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot className="bg-slate-950 font-bold border-t-2 border-purple-500">
              <tr>
                <td colSpan={7} className="py-2 px-3 text-white uppercase text-sm">
                  Total IBNR Reserve (Adjusted w/ {catastropheShock}x Shock):
                </td>
                <td className="py-2 px-3 text-right text-teal-400 font-mono text-base">
                  {formatIDR(solvencyMetrics.totalIBNRReserveIDR)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        <div className="mt-3 p-3 rounded-lg bg-slate-950/60 border border-slate-800">
          <p className="text-xs text-slate-400 leading-relaxed">
            <strong className="text-slate-200">Metodologi Chain Ladder:</strong> IBNR dihitung dari proyeksi perkembangan klaim berdasarkan pola historis loss run-off
            48 bulan. Development factor = (Dev t+12 / Dev t) × Ultimate Loss. Reserve = Ultimate Loss − Paid to Date.
          </p>
        </div>
      </div>

      {/* Risk-Based Capital (RBC) Solvency Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: RBC Score Card */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-[#090f26] to-[#050a1a] border border-slate-800 shadow-xl">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="w-5 h-5 text-emerald-400" />
            <h3 className="text-base font-bold text-white">Modal Solvabilitas Berbasis Risiko (RBC %)</h3>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-700">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-slate-400">Current RBC Ratio:</span>
                <span
                  className={`text-2xl font-black font-mono ${rbcColorClass}`}
                >
                  {formatPercentage(solvencyMetrics.riskBasedCapitalRBCPercent)}
                </span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden">
                <div
                  className={`h-full transition-all duration-700 ${
                    rbcStatus === "HEALTHY"
                      ? "bg-gradient-to-r from-emerald-500 to-teal-500"
                      : rbcStatus === "CAUTION"
                      ? "bg-gradient-to-r from-amber-500 to-orange-500"
                      : "bg-gradient-to-r from-rose-500 to-red-600"
                  }`}
                  style={{ width: `${Math.min(solvencyMetrics.riskBasedCapitalRBCPercent, 200)}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
                <span>0%</span>
                <span className="text-amber-400">Min OJK 120%</span>
                <span>200%</span>
              </div>
            </div>

            <div className={`p-3 rounded-lg border ${
              rbcStatus === "HEALTHY"
                ? "bg-emerald-950/30 border-emerald-700/40"
                : rbcStatus === "CAUTION"
                ? "bg-amber-950/30 border-amber-700/40"
                : "bg-rose-950/30 border-rose-700/40"
            }`}>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-0.5 rounded font-bold text-xs ${
                  rbcStatus === "HEALTHY"
                    ? "bg-emerald-500 text-slate-950"
                    : rbcStatus === "CAUTION"
                    ? "bg-amber-500 text-slate-950"
                    : "bg-rose-500 text-white"
                }`}>
                  {rbcStatus}
                </span>
                <p className="text-xs text-slate-300">
                  {rbcStatus === "HEALTHY" && "Modal aman melampaui batas minimum OJK 120%. Kapasitas underwriting optimal."}
                  {rbcStatus === "CAUTION" && "Modal mendekati batas minimum. Rekomendasikan injeksi modal tambahan atau kurangi eksposur risiko."}
                  {rbcStatus === "UNDERCAPITALIZED" && "RBC di bawah batas minimum OJK. Segera lakukan peningkatan modal atau moratorium underwriting baru."}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Capital Breakdown */}
        <div className="p-5 rounded-2xl bg-[#090f26] border border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-teal-400" />
            <h3 className="text-base font-bold text-white">Rincian Modal & Cadangan Solvabilitas</h3>
          </div>

          <div className="space-y-3">
            <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-700">
              <span className="text-xs text-slate-400 block mb-1">Total Premi Earned (Cumulative):</span>
              <span className="text-lg font-bold text-white font-mono">
                {formatIDR(solvencyMetrics.totalEarnedPremiumsIDR)}
              </span>
            </div>

            <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-700">
              <span className="text-xs text-slate-400 block mb-1">Kumulatif Klaim Dibayar (Paid to Date):</span>
              <span className="text-lg font-bold text-slate-300 font-mono">
                {formatIDR(solvencyMetrics.cumulativePaidClaimsIDR)}
              </span>
            </div>

            <div className="p-3 rounded-lg bg-teal-950/40 border border-teal-700/40">
              <span className="text-xs text-teal-300 block mb-1">Total IBNR Reserve (Adjusted):</span>
              <span className="text-lg font-bold text-teal-400 font-mono">
                {formatIDR(solvencyMetrics.totalIBNRReserveIDR)}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-700">
                <span className="text-xs text-slate-400 block mb-1">Modal Tersedia:</span>
                <span className="text-sm font-bold text-emerald-400 font-mono">
                  {formatIDR(solvencyMetrics.availableSolvencyCapitalIDR)}
                </span>
              </div>
              <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-700">
                <span className="text-xs text-slate-400 block mb-1">Modal Minimum (OJK):</span>
                <span className="text-sm font-bold text-rose-400 font-mono">
                  {formatIDR(solvencyMetrics.minimumRequiredCapitalIDR)}
                </span>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-purple-950/30 border border-purple-700/40">
              <div className="flex items-center justify-between">
                <span className="text-xs text-purple-300">Catastrophe Shock Multiplier:</span>
                <span className="text-lg font-black text-purple-400 font-mono">
                  {catastropheShock.toFixed(1)}x
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Actuarial Footer Notes */}
      <div className="p-4 rounded-xl bg-slate-950/40 border border-slate-800">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
          <div className="text-xs text-slate-400 leading-relaxed space-y-1">
            <p>
              <strong className="text-slate-200">Peringatan Aktuaris:</strong> Proyeksi IBNR menggunakan metode Chain Ladder stokastik dengan asumsi
              pola run-off historis 48 bulan tetap stabil. Untuk portofolio dengan volatile loss ratio, rekomendasikan Bornhuetter-Ferguson Method atau
              Bootstrap Simulation untuk confidence interval 95%.
            </p>
            <p className="font-mono text-slate-500 text-[10px]">
              Compliance: OJK POJK No. 71/POJK.05/2016 tentang Kesehatan Keuangan Perusahaan Asuransi & Reasuransi.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
