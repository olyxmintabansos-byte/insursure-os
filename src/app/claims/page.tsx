"use client";

import React, { useState } from "react";
import { useInsurance } from "@/context/InsuranceContext";
import { InsuranceClaim } from "@/types/insurance";
import { formatIDR } from "@/lib/utils";
import {
  CheckCircle2,
  Check,
} from "lucide-react";

export default function ClaimsAdjudicationPage() {
  const { claims, approveClaim } = useInsurance();
  const [selectedClaim, setSelectedClaim] = useState<InsuranceClaim>(claims[0]);
  const [payoutInput, setPayoutInput] = useState<number>(
    selectedClaim.claimedGrossAmountIDR - selectedClaim.deductibleAppliedIDR
  );
  const [actionDone, setActionDone] = useState(false);

  const handleApprove = () => {
    approveClaim(selectedClaim.id, Number(payoutInput));
    setSelectedClaim((prev) => ({
      ...prev,
      approvedPayoutAmountIDR: Number(payoutInput),
      status: "ADJUDICATED_APPROVED",
    }));
    setActionDone(true);
    setTimeout(() => setActionDone(false), 3000);
  };

  const getFraudBadge = (score: number) => {
    if (score > 60) return "bg-rose-500/20 text-rose-300 border-rose-500/40";
    if (score > 30) return "bg-amber-500/20 text-amber-300 border-amber-500/40";
    return "bg-emerald-500/20 text-emerald-300 border-emerald-500/40";
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
          <span>Automated Claims Adjudication &amp; Fraud Triage</span>
          <span className="text-xs px-2 py-0.5 rounded-md bg-teal-500/20 text-teal-300 border border-teal-500/30">
            DEDUCTIBLE &amp; FRAUD DETECTOR
          </span>
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Alur klaim asuransi korporasi: deteksi anomali penipuan (fraud scoring), kalkulasi pemotongan risiko sendiri (deductible), dan persetujuan pencairan santunan.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Claims Queue List */}
        <div className="space-y-3">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            Antrean Klaim Terdaftar ({claims.length})
          </h2>
          {claims.map((c) => {
            const isSelected = c.id === selectedClaim.id;
            return (
              <div
                key={c.id}
                onClick={() => {
                  setSelectedClaim(c);
                  setPayoutInput(c.claimedGrossAmountIDR - c.deductibleAppliedIDR);
                }}
                className={`p-4 rounded-2xl border cursor-pointer transition-all text-xs ${
                  isSelected
                    ? "bg-[#0f1938] border-teal-500/60 shadow-lg shadow-teal-500/10"
                    : "bg-[#090f26] border-slate-800 hover:border-slate-700"
                }`}
              >
                <div className="flex items-start justify-between mb-1.5">
                  <span className="font-mono font-bold text-teal-400">{c.claimNumber}</span>
                  <span
                    className={`px-1.5 py-0.2 rounded text-[10px] font-bold border ${
                      c.status === "ADJUDICATED_APPROVED"
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                        : "bg-amber-500/10 text-amber-400 border-amber-500/30"
                    }`}
                  >
                    {c.status.replace("_", " ")}
                  </span>
                </div>

                <div className="text-white font-bold truncate">{c.claimantName}</div>
                <div className="text-[10px] text-slate-400 mt-1 line-clamp-1">{c.incidentType}</div>

                <div className="flex items-center justify-between text-[10px] text-slate-400 pt-2 border-t border-slate-800/80 mt-2">
                  <span>Klaim: <strong className="text-white font-mono">{formatIDR(c.claimedGrossAmountIDR)}</strong></span>
                  <span className={`px-1 rounded border font-mono font-bold ${getFraudBadge(c.fraudRiskScore)}`}>
                    Fraud: {c.fraudRiskScore}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Claim Inspector & Payout Engine */}
        <div className="lg:col-span-2 space-y-6">
          <div className="p-6 rounded-2xl bg-[#090f26] border border-slate-800 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-xs text-slate-400">Polis Ref: {selectedClaim.policyNumber}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${getFraudBadge(selectedClaim.fraudRiskScore)}`}>
                    Indeks Risiko Fraud: {selectedClaim.fraudRiskScore} / 100
                  </span>
                </div>
                <h2 className="text-lg font-black text-white">{selectedClaim.incidentType}</h2>
                <div className="text-xs text-slate-400 mt-0.5">
                  Tertanggung: <strong className="text-white">{selectedClaim.claimantName}</strong> • Tanggal: {selectedClaim.incidentDate}
                </div>
              </div>

              <div className="text-right">
                <div className="text-[10px] text-slate-400 uppercase">Gross Claim Filed</div>
                <div className="text-xl font-black text-amber-400 font-mono">
                  {formatIDR(selectedClaim.claimedGrossAmountIDR)}
                </div>
              </div>
            </div>

            {/* Deductible Breakdown */}
            <div className="py-4 border-b border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Nilai Kerugian yang Diklaim:</span>
                <span className="text-white font-mono">{formatIDR(selectedClaim.claimedGrossAmountIDR)}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Pemotongan Risiko Sendiri (Deductible Polis):</span>
                <span className="text-rose-400 font-mono font-bold">
                  - {formatIDR(selectedClaim.deductibleAppliedIDR)}
                </span>
              </div>
              <div className="flex justify-between text-sm font-black text-teal-400 pt-2 border-t border-slate-800/80">
                <span>Santunan Bersih yang Disarankan (Net Adjusted Payout):</span>
                <span className="font-mono">
                  {formatIDR(selectedClaim.claimedGrossAmountIDR - selectedClaim.deductibleAppliedIDR)}
                </span>
              </div>
            </div>

            {/* Surveyor Notes */}
            <div className="py-4 border-b border-slate-800 text-xs">
              <div className="text-[10px] text-slate-400 uppercase font-bold mb-1">Laporan Surveyor / Loss Adjuster:</div>
              <p className="p-3 rounded-xl bg-[#060a18] border border-slate-800 text-slate-300">
                {selectedClaim.lossAdjusterNotes}
              </p>
            </div>

            {/* Approval Controls */}
            <div className="pt-4 space-y-4 text-xs">
              {actionDone && (
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 font-bold flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  <span>Klaim berhasil disetujui (Adjudicated Approved)! Dokumen persetujuan dicatat.</span>
                </div>
              )}

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex-1">
                  <label className="text-slate-400 block mb-1">Koreksi Santunan Final (IDR):</label>
                  <input
                    type="number"
                    step={1000000}
                    value={payoutInput}
                    onChange={(e) => setPayoutInput(Number(e.target.value))}
                    className="w-full bg-[#060a18] border border-slate-800 rounded-xl px-4 py-2 text-white font-mono focus:border-teal-500 outline-none"
                  />
                </div>

                <div className="flex items-end gap-2 pt-2 sm:pt-0">
                  {selectedClaim.status !== "ADJUDICATED_APPROVED" && (
                    <button
                      onClick={handleApprove}
                      className="px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-black shadow-lg shadow-teal-500/20 transition-all flex items-center gap-1.5 active:scale-95"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Setujui Pembayaran Klaim</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
