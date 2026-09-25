"use client";

import React, { useRef } from "react";
import { useInsurance } from "@/context/InsuranceContext";
import { formatIDR } from "@/lib/utils";
import { Printer, ShieldCheck, CheckCircle2, Award, Landmark, Building2, Stamp } from "lucide-react";

export default function PolicyCertificatePage() {
  const {
    policies,
    selectedCertificatePolicyId,
    setSelectedCertificatePolicyId,
    getCertificateData,
  } = useInsurance();

  const cert = getCertificateData(selectedCertificatePolicyId);

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="py-8 px-4 sm:px-6 max-w-7xl mx-auto space-y-6">
      {/* Top Controls Toolbar (Hidden in Print) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-[#090f26] border border-slate-800 print:hidden shadow-lg">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded bg-teal-500/10 border border-teal-500/30 text-teal-400 font-mono text-xs font-bold">
              OFFICIAL OJK CERTIFICATE STUDIO
            </span>
            <span className="text-xs text-slate-400">AAUI &amp; OJK Format KEP-884</span>
          </div>
          <h1 className="text-xl font-black text-white">Sertifikat Polis Asuransi Industri (A4 Print Ready)</h1>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={selectedCertificatePolicyId}
            onChange={(e) => setSelectedCertificatePolicyId(e.target.value)}
            className="px-3 py-2 bg-[#060a1a] border border-slate-700 text-slate-200 text-xs rounded-xl focus:outline-none focus:border-teal-500 font-medium"
          >
            {policies.map((p) => (
              <option key={p.id} value={p.id}>
                {p.policyNumber} — {p.policyHolderName}
              </option>
            ))}
          </select>

          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-gradient-to-r from-teal-500 to-emerald-500 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-2 hover:opacity-90 shadow-md shadow-teal-500/20 cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            Cetak PDF / A4
          </button>
        </div>
      </div>

      {/* A4 CERTIFICATE PAPER CONTAINER */}
      <div className="flex justify-center">
        {cert ? (
          <div className="w-full max-w-[210mm] min-h-[297mm] p-8 sm:p-12 bg-white text-slate-900 shadow-2xl rounded-sm print:rounded-none print:shadow-none print:m-0 print:p-8 border border-slate-200 font-sans text-xs relative overflow-hidden">
            
            {/* Watermark OJK Background */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none">
              <span className="text-[120px] font-black uppercase tracking-widest text-slate-900 rotate-[-30deg]">
                INSURSURE
              </span>
            </div>

            {/* Official Header */}
            <div className="flex justify-between items-start border-b-2 border-slate-900 pb-4 mb-6">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl bg-slate-900 text-teal-400 flex items-center justify-center font-black">
                  <ShieldCheck className="w-8 h-8 text-teal-400" />
                </div>
                <div>
                  <h2 className="text-lg font-black tracking-wide text-slate-900 uppercase">
                    PT ASURANSI INSURSURE INDONESIA TBK
                  </h2>
                  <p className="text-[11px] text-slate-600 font-medium">
                    Kantor Pusat: Cyber Tower 2 Lt. 28, HR Rasuna Said, Jakarta Selatan 12950
                  </p>
                  <p className="text-[10px] text-slate-500 font-mono">
                    Izin Usaha Otoritas Jasa Keuangan (OJK) No: {cert.ojkRegistrationNo}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <span className="inline-block px-2.5 py-1 bg-slate-100 border border-slate-300 font-mono text-[10px] font-bold text-slate-800 rounded">
                  ASLI / ORIGINAL POLICY
                </span>
                <p className="text-[11px] font-bold font-mono text-slate-900 mt-2">{cert.certificateNumber}</p>
                <p className="text-[10px] text-slate-500">Tanggal Terbit: {cert.issuedAt}</p>
              </div>
            </div>

            {/* Certificate Title */}
            <div className="text-center my-6">
              <h3 className="text-base font-black tracking-wider uppercase underline underline-offset-4 text-slate-950">
                SERTIFIKAT IKHTISAR POLIS PERTANGGUNGAN ASURANSI
              </h3>
              <p className="text-[11px] text-slate-600 mt-1 font-semibold">
                Lini Bisnis: <span className="text-teal-900 font-black">{cert.policyClass}</span>
              </p>
            </div>

            {/* Schedule Section 1: Policyholder KYC */}
            <div className="border border-slate-300 rounded p-4 mb-4 bg-slate-50/50">
              <h4 className="text-[11px] font-bold text-slate-900 uppercase border-b border-slate-200 pb-1 mb-2 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-teal-700" /> IDENTITAS TERTANGGUNG (POLICYHOLDER PARTICULARS)
              </h4>
              <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-[11px]">
                <div>
                  <span className="text-slate-500 block text-[10px]">Nama Tertanggung:</span>
                  <strong className="text-slate-900 text-xs">{cert.policyHolder}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Nomor Pokok Wajib Pajak (NPWP):</span>
                  <span className="font-mono text-slate-800">{cert.insuredEntityTaxId}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Bidang Usaha / Klasifikasi Risiko:</span>
                  <span className="text-slate-800">{cert.businessNature}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Lokasi Objek Pertanggungan:</span>
                  <span className="text-slate-800">{cert.riskAddress}</span>
                </div>
                <div className="col-span-2 pt-1 border-t border-slate-200/80">
                  <span className="text-slate-500 block text-[10px]">Masa Pertanggungan (Period of Insurance):</span>
                  <span className="font-mono font-bold text-slate-900">
                    {cert.periodCoverage.from} sampai dengan {cert.periodCoverage.to} ({cert.periodCoverage.standardTime})
                  </span>
                </div>
              </div>
            </div>

            {/* Schedule Section 2: Itemized Sum Insured */}
            <div className="border border-slate-300 rounded p-4 mb-4">
              <h4 className="text-[11px] font-bold text-slate-900 uppercase border-b border-slate-200 pb-1 mb-2">
                RINCIAN OBJEK &amp; NILAI PERTANGGUNGAN (SCHEDULE OF SUM INSURED)
              </h4>
              <table className="w-full text-left text-[11px] mb-2">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 text-[10px]">
                    <th className="py-1">Deskripsi Item / Mesin / Bangunan</th>
                    <th className="py-1">Lokasi Unit</th>
                    <th className="py-1 text-right">Uang Pertanggungan (IDR)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {cert.scheduleItems.map((item, idx) => (
                    <tr key={idx}>
                      <td className="py-1.5 font-medium text-slate-800">{item.description}</td>
                      <td className="py-1.5 text-slate-600">{item.location}</td>
                      <td className="py-1.5 text-right font-mono font-bold text-slate-900">
                        {formatIDR(item.sumInsuredIDR)}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t-2 border-slate-900 font-bold">
                    <td colSpan={2} className="py-2 uppercase text-slate-900">
                      Total Uang Pertanggungan (Total Sum Insured):
                    </td>
                    <td className="py-2 text-right font-mono text-teal-800 text-xs font-black">
                      {formatIDR(cert.sumInsuredTotalIDR)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>

            {/* Deductibles & Premium Calculation */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="border border-slate-300 rounded p-3 bg-slate-50/50">
                <h5 className="font-bold text-slate-900 text-[10px] uppercase mb-1">
                  KETENTUAN RISIKO SENDIRI (DEDUCTIBLE / RETENTION)
                </h5>
                <p className="text-[10px] text-slate-700 leading-relaxed font-mono">
                  {cert.deductibleTerms}
                </p>
              </div>

              <div className="border border-slate-300 rounded p-3">
                <h5 className="font-bold text-slate-900 text-[10px] uppercase mb-1">
                  IKHTISAR PREMI &amp; BIAYA POLIS
                </h5>
                <div className="space-y-1 text-[10px]">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Premi Pokok Tahunan:</span>
                    <span className="font-mono font-medium text-slate-900">
                      {formatIDR(cert.premiumCalculation.grossPremiumIDR)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Biaya Administrasi Polis:</span>
                    <span className="font-mono text-slate-800">
                      {formatIDR(cert.premiumCalculation.administrativeFeeIDR)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Bea Meterai Lunas:</span>
                    <span className="font-mono text-slate-800">
                      {formatIDR(cert.premiumCalculation.stampDutyMeteraiIDR)}
                    </span>
                  </div>
                  <div className="flex justify-between border-t border-slate-200 pt-1 font-bold text-[11px] text-slate-950">
                    <span>Total Tagihan Premi:</span>
                    <span className="font-mono text-teal-900 font-black">
                      {formatIDR(cert.premiumCalculation.totalDueIDR)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Endorsements / Klausul Khusus */}
            <div className="border border-slate-300 rounded p-3 mb-6">
              <h5 className="font-bold text-slate-900 text-[10px] uppercase mb-1.5">
                KLAUSUL TAMBAHAN &amp; ENDORSEMEN STANDAR AAUI / OJK:
              </h5>
              <div className="space-y-1 text-[10px]">
                {cert.endorsements.map((end, idx) => (
                  <div key={idx} className="flex items-start gap-1.5">
                    <span className="font-mono font-bold text-teal-800 min-w-[70px]">[{end.code}]</span>
                    <p className="text-slate-700">
                      <strong className="text-slate-900">{end.title}:</strong> {end.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Signatures & Underwriter Seal */}
            <div className="pt-4 border-t border-slate-300 flex justify-between items-end">
              <div className="text-[10px] text-slate-500 max-w-xs">
                <p>Dokumen ini diterbitkan secara sah melalui sistem sentral underwriting InsurSure OS.</p>
                <p className="font-mono mt-1 text-slate-400">Verifikasi Hash: SHA256:{cert.policyId.toUpperCase()}F882C</p>
              </div>

              <div className="text-center min-w-[200px]">
                <p className="text-[10px] text-slate-600 mb-1">Jakarta, {cert.periodCoverage.from.split(" ")[0]}</p>
                <p className="text-[10px] font-bold text-slate-800">Untuk dan atas nama Penanggung</p>
                <div className="h-14 flex items-center justify-center my-1 relative">
                  <div className="w-20 h-10 border border-teal-600/40 rounded flex items-center justify-center text-teal-800 font-mono text-[9px] uppercase font-bold tracking-widest rotate-[-5deg]">
                    [ TTD DIGITAL ]
                  </div>
                </div>
                <p className="text-xs font-bold text-slate-900 underline underline-offset-2">
                  {cert.chiefUnderwriterName}
                </p>
                <p className="text-[9px] text-slate-500">{cert.authorizedOfficerTitle}</p>
              </div>
            </div>

          </div>
        ) : (
          <div className="text-center py-12 text-slate-400">Pilih polis terlebih dahulu untuk mencetak sertifikat.</div>
        )}
      </div>
    </div>
  );
}
