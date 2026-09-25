"use client";

import React, { useState } from "react";
import { useInsurance } from "@/context/InsuranceContext";
import { LossRatioRadar } from "@/components/LossRatioRadar";
import { PolicyClass } from "@/types/insurance";
import { formatIDR, formatPercentage } from "@/lib/utils";
import {
  ShieldCheck,
  TrendingUp,
  DollarSign,
  Plus,
  Sparkles,
  Layers,
} from "lucide-react";

export default function PoliciesDashboardPage() {
  const {
    policies,
    actuarialSummaries,
    overallLossRatio,
    totalPremiumsIDR,
    createPolicy,
  } = useInsurance();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newHolder, setNewHolder] = useState("");
  const [newClass, setNewClass] = useState<PolicyClass>("Commercial Property & Fire");
  const [newSum, setNewSum] = useState<number>(50000000000);
  const [newPremium, setNewPremium] = useState<number>(450000000);
  const [newDeductible, setNewDeductible] = useState<number>(25000000);
  const [newRiskScore, setNewRiskScore] = useState<number>(30);

  const totalSumInsuredIDR = policies.reduce((acc, p) => acc + p.sumInsuredIDR, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHolder) return;

    createPolicy({
      policyNumber: `POL/${newClass.slice(0, 4).toUpperCase()}/2026/${Math.floor(1000 + Math.random() * 9000)}`,
      policyHolderName: newHolder,
      policyClass: newClass,
      sumInsuredIDR: Number(newSum),
      annualGrossPremiumIDR: Number(newPremium),
      deductibleIDR: Number(newDeductible),
      underwritingRiskScore: Number(newRiskScore),
      effectiveDate: new Date().toISOString().split("T")[0],
      expiryDate: new Date(Date.now() + 365 * 24 * 3600 * 1000).toISOString().split("T")[0],
    });

    setIsModalOpen(false);
    setNewHolder("");
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Top InsurTech KPI Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="p-5 rounded-2xl bg-[#090f26] border border-slate-800">
          <div className="text-[10px] text-slate-400 font-bold uppercase mb-1">Gross Written Premium (GWP)</div>
          <div className="text-2xl font-black text-teal-400 flex items-center justify-between">
            <span>Rp {(totalPremiumsIDR / 1000000000).toFixed(2)} Miliar</span>
            <DollarSign className="w-5 h-5 text-teal-400" />
          </div>
          <div className="text-[10px] text-slate-400 mt-1">Premi Bruto Tahunan</div>
        </div>

        <div className="p-5 rounded-2xl bg-[#090f26] border border-slate-800">
          <div className="text-[10px] text-slate-400 font-bold uppercase mb-1">Total Nilai Pertanggungan</div>
          <div className="text-2xl font-black text-white flex items-center justify-between">
            <span>Rp {(totalSumInsuredIDR / 1000000000).toFixed(0)} Miliar</span>
            <Layers className="w-5 h-5 text-cyan-400" />
          </div>
          <div className="text-[10px] text-cyan-400 mt-1 font-bold">Total Sum Insured Exposure</div>
        </div>

        <div className="p-5 rounded-2xl bg-[#090f26] border border-slate-800">
          <div className="text-[10px] text-slate-400 font-bold uppercase mb-1">Portfolio Loss Ratio</div>
          <div className="text-2xl font-black text-emerald-400 flex items-center justify-between">
            <span>{formatPercentage(overallLossRatio)}</span>
            <TrendingUp className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="text-[10px] text-emerald-400 mt-1 font-bold">Target di Bawah 65% Terpenuhi</div>
        </div>

        <div className="p-5 rounded-2xl bg-[#090f26] border border-slate-800">
          <div className="text-[10px] text-slate-400 font-bold uppercase mb-1">Solvency Margin (RBC)</div>
          <div className="text-2xl font-black text-purple-400 flex items-center justify-between">
            <span>342%</span>
            <ShieldCheck className="w-5 h-5 text-purple-400" />
          </div>
          <div className="text-[10px] text-slate-400 mt-1">Risk-Based Capital (OJK &gt; 120%)</div>
        </div>
      </div>

      {/* Action Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
            <span>Corporate Underwriting &amp; Policy Portfolio</span>
            <span className="text-xs px-2 py-0.5 rounded-md bg-teal-500/20 text-teal-300 border border-teal-500/30">
              SOLVENCY GRADE
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Buku besar polis korporasi, profil risiko underwriting actuarial score, dan kalkulator deductible.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-lg shadow-teal-500/20 transition-all active:scale-95"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Terbitkan Polis Baru</span>
        </button>
      </div>

      {/* Actuarial Loss Ratio Radar */}
      <div className="mb-8">
        <LossRatioRadar
          summaries={actuarialSummaries}
          overallLossRatio={overallLossRatio}
        />
      </div>

      {/* Active Policies Table */}
      <div className="rounded-2xl border border-slate-800 bg-[#090f26] overflow-hidden shadow-xl text-xs">
        <div className="px-6 py-4 border-b border-slate-800 bg-[#060b1c] flex items-center justify-between">
          <h3 className="font-bold text-white uppercase tracking-wider">
            Portofolio Polis Aktif ({policies.length} Kontrak)
          </h3>
          <span className="text-[10px] text-slate-400">Underwriting Risk Evaluated</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="border-b border-slate-800 text-slate-400 font-bold uppercase text-[10px] bg-[#070d20]">
              <tr>
                <th className="py-3 px-6">Nomor Polis</th>
                <th className="py-3 px-4">Tertanggung (Policyholder)</th>
                <th className="py-3 px-4">Lini Bisnis</th>
                <th className="py-3 px-4 text-right">Sum Insured</th>
                <th className="py-3 px-4 text-right">Premi Tahunan</th>
                <th className="py-3 px-4 text-center">Risk Score</th>
                <th className="py-3 px-6 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-200">
              {policies.map((p) => (
                <tr key={p.id} className="hover:bg-slate-900/40 transition-colors">
                  <td className="py-4 px-6 font-mono font-bold text-teal-400">{p.policyNumber}</td>
                  <td className="py-4 px-4 font-bold text-white">{p.policyHolderName}</td>
                  <td className="py-4 px-4 text-slate-300">{p.policyClass}</td>
                  <td className="py-4 px-4 text-right font-mono font-bold text-white">
                    {formatIDR(p.sumInsuredIDR)}
                  </td>
                  <td className="py-4 px-4 text-right font-mono text-emerald-400">
                    {formatIDR(p.annualGrossPremiumIDR)}
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className="px-2 py-0.5 rounded font-mono font-bold text-[10px] bg-slate-800 border border-slate-700 text-amber-400">
                      {p.underwritingRiskScore} / 100
                    </span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                      {p.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Policy Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0b1330] border border-slate-800 rounded-3xl p-6 max-w-lg w-full shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-teal-400" />
                <h3 className="text-base font-black text-white">Penerbitan Polis Asuransi Baru</h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white text-xs font-bold p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="text-slate-300 font-bold block mb-1">Nama Perusahaan Tertanggung</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: PT Semen Nusantara Perkasa Tbk"
                  value={newHolder}
                  onChange={(e) => setNewHolder(e.target.value)}
                  className="w-full bg-[#070b1c] border border-slate-800 rounded-xl px-3 py-2 text-white focus:border-teal-500 outline-none"
                />
              </div>

              <div>
                <label className="text-slate-300 font-bold block mb-1">Lini Bisnis Asuransi</label>
                <select
                  value={newClass}
                  onChange={(e) => setNewClass(e.target.value as any)}
                  className="w-full bg-[#070b1c] border border-slate-800 rounded-xl px-3 py-2 text-white focus:border-teal-500 outline-none"
                >
                  <option value="Commercial Property & Fire">Commercial Property &amp; Fire</option>
                  <option value="Heavy Industrial Fleet & Logistics">Heavy Industrial Fleet &amp; Logistics</option>
                  <option value="Marine Cargo & Inland Transit">Marine Cargo &amp; Inland Transit</option>
                  <option value="Corporate Health & Critical Illness">Corporate Health &amp; Critical Illness</option>
                  <option value="Directors & Officers (D&O) Liability">Directors &amp; Officers (D&amp;O) Liability</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-bold block mb-1">Nilai Pertanggungan (Sum Insured)</label>
                  <input
                    type="number"
                    step={1000000000}
                    required
                    value={newSum}
                    onChange={(e) => setNewSum(Number(e.target.value))}
                    className="w-full bg-[#070b1c] border border-slate-800 rounded-xl px-3 py-2 text-white font-mono focus:border-teal-500 outline-none"
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-bold block mb-1">Premi Bruto Tahunan (IDR)</label>
                  <input
                    type="number"
                    step={10000000}
                    required
                    value={newPremium}
                    onChange={(e) => setNewPremium(Number(e.target.value))}
                    className="w-full bg-[#070b1c] border border-slate-800 rounded-xl px-3 py-2 text-white font-mono focus:border-teal-500 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-bold block mb-1">Risiko Sendiri (Deductible)</label>
                  <input
                    type="number"
                    step={5000000}
                    required
                    value={newDeductible}
                    onChange={(e) => setNewDeductible(Number(e.target.value))}
                    className="w-full bg-[#070b1c] border border-slate-800 rounded-xl px-3 py-2 text-white font-mono focus:border-teal-500 outline-none"
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-bold block mb-1">Underwriting Risk Score (1-100)</label>
                  <input
                    type="number"
                    min={1}
                    max={100}
                    required
                    value={newRiskScore}
                    onChange={(e) => setNewRiskScore(Number(e.target.value))}
                    className="w-full bg-[#070b1c] border border-slate-800 rounded-xl px-3 py-2 text-white font-mono focus:border-teal-500 outline-none"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-black shadow-lg shadow-teal-500/20"
                >
                  Underwrite &amp; Terbitkan Polis
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
