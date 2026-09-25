"use client";

import React from "react";
import { ActuarialClassSummary } from "@/types/insurance";
import { formatIDR, formatPercentage } from "@/lib/utils";

interface LossRatioRadarProps {
  summaries: ActuarialClassSummary[];
  overallLossRatio: number;
}

export function LossRatioRadar({ summaries, overallLossRatio }: LossRatioRadarProps) {
  const getStatusColor = (status: ActuarialClassSummary["status"]) => {
    switch (status) {
      case "PROFITABLE":
        return "text-emerald-400 bg-emerald-500/10 border-emerald-500/30";
      case "BREAK_EVEN":
        return "text-amber-400 bg-amber-500/10 border-amber-500/30";
      default:
        return "text-rose-400 bg-rose-500/10 border-rose-500/30";
    }
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-[#090f26] p-6 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-xs font-bold text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded border border-teal-500/30">
              ACTUARIAL LOSS RATIO HUD
            </span>
            <span className="text-xs text-slate-400">Rasio Klaim per Lini Bisnis</span>
          </div>
          <h2 className="text-lg font-black text-white">Underwriting Performance &amp; Combined Ratio</h2>
        </div>

        <div className="text-right">
          <div className="text-[10px] text-slate-400 uppercase">Portfolio Overall Loss Ratio</div>
          <div className="text-2xl font-black text-emerald-400 font-mono">
            {formatPercentage(overallLossRatio)}
            <span className="text-xs text-slate-400 font-normal"> (Target &lt; 65%)</span>
          </div>
        </div>
      </div>

      {/* Actuarial Ratio Bars by Class */}
      <div className="space-y-4">
        {summaries.map((item, idx) => {
          return (
            <div key={idx} className="p-4 rounded-xl bg-[#060a1a] border border-slate-800/80 text-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white text-sm">{item.policyClass}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${getStatusColor(item.status)}`}>
                    {item.status}
                  </span>
                </div>

                <div className="flex items-center gap-4 text-slate-400 text-[11px] font-mono">
                  <span>Premi: <strong className="text-white">{formatIDR(item.earnedPremiumIDR)}</strong></span>
                  <span>•</span>
                  <span>Klaim: <strong className="text-amber-400">{formatIDR(item.incurredClaimsIDR)}</strong></span>
                  <span>•</span>
                  <span className="font-black text-emerald-400">
                    Loss: {formatPercentage(item.lossRatioPercent)}
                  </span>
                </div>
              </div>

              {/* Loss Ratio Visual Bar */}
              <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden flex items-center">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    item.lossRatioPercent > 80
                      ? "bg-rose-500"
                      : item.lossRatioPercent > 60
                      ? "bg-amber-500"
                      : "bg-emerald-500"
                  }`}
                  style={{ width: `${Math.min(100, item.lossRatioPercent)}%` }}
                />
              </div>

              <div className="flex justify-between text-[10px] text-slate-500 mt-1.5 font-mono">
                <span>0%</span>
                <span className="text-slate-400">Ambang Batas Target Aktuaria (65%)</span>
                <span>Combined Ratio: {formatPercentage(item.combinedRatioPercent)}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
