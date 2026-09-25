"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  InsurancePolicy,
  InsuranceClaim,
  ActuarialClassSummary,
  InsuranceCertificateData,
  ClaimsRunOffRow,
  ActuarialSolvencyMetrics,
} from "@/types/insurance";

const INITIAL_POLICIES: InsurancePolicy[] = [
  {
    id: "pol-101",
    policyNumber: "POL/COMM/2026/0892",
    policyHolderName: "PT Krakatau Mega Baja Tbk",
    policyClass: "Commercial Property & Fire",
    sumInsuredIDR: 250000000000,
    annualGrossPremiumIDR: 1250000000,
    deductibleIDR: 50000000,
    underwritingRiskScore: 28,
    effectiveDate: "2026-01-01",
    expiryDate: "2026-12-31",
    status: "ACTIVE",
    claimsIncurredCount: 1,
  },
  {
    id: "pol-102",
    policyNumber: "POL/FLEET/2026/0411",
    policyHolderName: "PT Samudera Logistik Nusantara",
    policyClass: "Heavy Industrial Fleet & Logistics",
    sumInsuredIDR: 85000000000,
    annualGrossPremiumIDR: 850000000,
    deductibleIDR: 20000000,
    underwritingRiskScore: 42,
    effectiveDate: "2026-02-15",
    expiryDate: "2027-02-14",
    status: "ACTIVE",
    claimsIncurredCount: 2,
  },
  {
    id: "pol-103",
    policyNumber: "POL/CARGO/2026/1129",
    policyHolderName: "Sinarmas Agro Resources Ltd",
    policyClass: "Marine Cargo & Inland Transit",
    sumInsuredIDR: 120000000000,
    annualGrossPremiumIDR: 960000000,
    deductibleIDR: 35000000,
    underwritingRiskScore: 35,
    effectiveDate: "2026-03-01",
    expiryDate: "2027-02-28",
    status: "ACTIVE",
    claimsIncurredCount: 0,
  },
  {
    id: "pol-104",
    policyNumber: "POL/HEALTH/2026/0199",
    policyHolderName: "PT Bank Nusantara Raya Tbk",
    policyClass: "Corporate Health & Critical Illness",
    sumInsuredIDR: 45000000000,
    annualGrossPremiumIDR: 1800000000,
    deductibleIDR: 0,
    underwritingRiskScore: 19,
    effectiveDate: "2026-01-01",
    expiryDate: "2026-12-31",
    status: "ACTIVE",
    claimsIncurredCount: 4,
  },
  {
    id: "pol-105",
    policyNumber: "POL/DO/2026/0074",
    policyHolderName: "GoTo Ekosistem Digital Holding",
    policyClass: "Directors & Officers (D&O) Liability",
    sumInsuredIDR: 150000000000,
    annualGrossPremiumIDR: 2250000000,
    deductibleIDR: 100000000,
    underwritingRiskScore: 31,
    effectiveDate: "2026-04-01",
    expiryDate: "2027-03-31",
    status: "ACTIVE",
    claimsIncurredCount: 0,
  },
];

const INITIAL_CLAIMS: InsuranceClaim[] = [
  {
    id: "clm-001",
    claimNumber: "CLM/2026/09/0042",
    policyId: "pol-101",
    policyNumber: "POL/COMM/2026/0892",
    claimantName: "PT Krakatau Mega Baja Tbk",
    incidentDate: "2026-08-14",
    filingDate: "2026-08-16",
    incidentType: "Kerusakan Transformer Gardu Induk Akibat Sambaran Petir",
    claimedGrossAmountIDR: 420000000,
    approvedPayoutAmountIDR: 370000000,
    deductibleAppliedIDR: 50000000,
    fraudRiskScore: 12,
    status: "ADJUDICATED_APPROVED",
    lossAdjusterNotes: "Surveyor PT Cunningham Lindsey telah verifikasi kerusakan teknis. Polis mencakup klausul Machinery Breakdown.",
  },
  {
    id: "clm-002",
    claimNumber: "CLM/2026/09/0043",
    policyId: "pol-102",
    policyNumber: "POL/FLEET/2026/0411",
    claimantName: "PT Samudera Logistik Nusantara",
    incidentDate: "2026-09-02",
    filingDate: "2026-09-03",
    incidentType: "Tabrakan Beruntun Truk Kontainer di Tol Cipali KM 98",
    claimedGrossAmountIDR: 185000000,
    approvedPayoutAmountIDR: 0,
    deductibleAppliedIDR: 20000000,
    fraudRiskScore: 78,
    status: "UNDER_ASSESSMENT",
    lossAdjusterNotes: "Indikasi kelalaian sopir melebihi jam batas operasional. Memerlukan audit rekaman blackbox telemetri GPS.",
  },
];

const INITIAL_RUNOFF_TRIANGLE: ClaimsRunOffRow[] = [
  {
    accidentYear: 2023,
    earnedPremiumIDR: 4800000000,
    dev12m: 1450000000,
    dev24m: 2180000000,
    dev36m: 2540000000,
    dev48m: 2620000000,
    projectedUltimateLossIDR: 2620000000,
    ibnrReserveIDR: 0,
  },
  {
    accidentYear: 2024,
    earnedPremiumIDR: 5600000000,
    dev12m: 1720000000,
    dev24m: 2580000000,
    dev36m: 2980000000,
    dev48m: 0,
    projectedUltimateLossIDR: 3080000000,
    ibnrReserveIDR: 100000000,
  },
  {
    accidentYear: 2025,
    earnedPremiumIDR: 6400000000,
    dev12m: 1980000000,
    dev24m: 2950000000,
    dev36m: 0,
    dev48m: 0,
    projectedUltimateLossIDR: 3520000000,
    ibnrReserveIDR: 570000000,
  },
  {
    accidentYear: 2026,
    earnedPremiumIDR: 7110000000,
    dev12m: 2210000000,
    dev24m: 0,
    dev36m: 0,
    dev48m: 0,
    projectedUltimateLossIDR: 3950000000,
    ibnrReserveIDR: 1740000000,
  },
];

interface InsuranceContextType {
  policies: InsurancePolicy[];
  claims: InsuranceClaim[];
  actuarialSummaries: ActuarialClassSummary[];
  overallLossRatio: number;
  totalPremiumsIDR: number;
  totalClaimsIncurredIDR: number;
  selectedCertificatePolicyId: string;
  setSelectedCertificatePolicyId: (id: string) => void;
  getCertificateData: (policyId: string) => InsuranceCertificateData | null;
  runOffTriangle: ClaimsRunOffRow[];
  catastropheShock: number;
  setCatastropheShock: (multiplier: number) => void;
  solvencyMetrics: ActuarialSolvencyMetrics;
  approveClaim: (claimId: string, finalPayoutIDR: number) => void;
  createPolicy: (p: Omit<InsurancePolicy, "id" | "claimsIncurredCount" | "status">) => void;
  fileClaim: (c: Omit<InsuranceClaim, "id" | "approvedPayoutAmountIDR" | "status">) => void;
}

const InsuranceContext = createContext<InsuranceContextType | undefined>(undefined);

export function InsuranceProvider({ children }: { children: React.ReactNode }) {
  const [policies, setPolicies] = useState<InsurancePolicy[]>(INITIAL_POLICIES);
  const [claims, setClaims] = useState<InsuranceClaim[]>(INITIAL_CLAIMS);
  const [selectedCertificatePolicyId, setSelectedCertificatePolicyId] = useState<string>("pol-101");
  const [catastropheShock, setCatastropheShock] = useState<number>(1.0);

  // LocalStorage Persistence
  useEffect(() => {
    const savedPol = localStorage.getItem("INSURSURE_POLICIES");
    const savedClm = localStorage.getItem("INSURSURE_CLAIMS");
    if (savedPol) {
      try {
        setPolicies(JSON.parse(savedPol));
      } catch (e) {
        console.error(e);
      }
    }
    if (savedClm) {
      try {
        setClaims(JSON.parse(savedClm));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("INSURSURE_POLICIES", JSON.stringify(policies));
  }, [policies]);

  useEffect(() => {
    localStorage.setItem("INSURSURE_CLAIMS", JSON.stringify(claims));
  }, [claims]);

  const totalPremiumsIDR = policies.reduce((acc, p) => acc + p.annualGrossPremiumIDR, 0);
  const totalClaimsIncurredIDR = claims.reduce((acc, c) => acc + c.claimedGrossAmountIDR, 0);
  const overallLossRatio = totalPremiumsIDR > 0 ? (totalClaimsIncurredIDR / totalPremiumsIDR) * 100 : 0;

  const actuarialSummaries: ActuarialClassSummary[] = [
    {
      policyClass: "Commercial Property & Fire",
      earnedPremiumIDR: 1250000000,
      incurredClaimsIDR: 420000000,
      lossRatioPercent: 33.6,
      combinedRatioPercent: 55.6,
      status: "PROFITABLE",
    },
    {
      policyClass: "Heavy Industrial Fleet & Logistics",
      earnedPremiumIDR: 850000000,
      incurredClaimsIDR: 185000000,
      lossRatioPercent: 21.7,
      combinedRatioPercent: 43.7,
      status: "PROFITABLE",
    },
    {
      policyClass: "Marine Cargo & Inland Transit",
      earnedPremiumIDR: 960000000,
      incurredClaimsIDR: 0,
      lossRatioPercent: 0.0,
      combinedRatioPercent: 22.0,
      status: "PROFITABLE",
    },
    {
      policyClass: "Corporate Health & Critical Illness",
      earnedPremiumIDR: 1800000000,
      incurredClaimsIDR: 840000000,
      lossRatioPercent: 46.7,
      combinedRatioPercent: 68.7,
      status: "PROFITABLE",
    },
    {
      policyClass: "Directors & Officers (D&O) Liability",
      earnedPremiumIDR: 2250000000,
      incurredClaimsIDR: 0,
      lossRatioPercent: 0.0,
      combinedRatioPercent: 22.0,
      status: "PROFITABLE",
    },
  ];

  // Certificate Generator
  const getCertificateData = (policyId: string): InsuranceCertificateData | null => {
    const policy = policies.find((p) => p.id === policyId);
    if (!policy) return null;

    const stampDuty = 10000;
    const adminFee = 50000;
    const totalDue = policy.annualGrossPremiumIDR + adminFee + stampDuty;

    return {
      certificateNumber: `CERT-OJK-${policy.policyNumber.replace(/\//g, "-")}`,
      policyId: policy.id,
      policyNumber: policy.policyNumber,
      ojkRegistrationNo: "KEP-OJK/IKNB/INS-884/2026",
      policyHolder: policy.policyHolderName,
      insuredEntityTaxId: "01.345.892.4-042.000 (NPWP)",
      businessNature: "Operasional Industri & Logistik Terintegrasi",
      riskAddress: "Kawasan Industri Terpadu Cilegon & Tanjung Priok Logistics Corridor",
      periodCoverage: {
        from: `${policy.effectiveDate} 12:00:00 WIB`,
        to: `${policy.expiryDate} 12:00:00 WIB`,
        standardTime: "Waktu Indonesia Barat (WIB)",
      },
      policyClass: policy.policyClass,
      scheduleItems: [
        {
          description: "Struktur Bangunan Pabrik Utama & Fasilitas Produksi Heavy Steel",
          location: "Plot A1-A4 Kawasan Industri",
          sumInsuredIDR: policy.sumInsuredIDR * 0.6,
        },
        {
          description: "Mesin Industri, Gardu Induk & Peralatan Mekanikal Elektrikal",
          location: "Unit Workshop & Power Substation",
          sumInsuredIDR: policy.sumInsuredIDR * 0.3,
        },
        {
          description: "Jaminan Business Interruption / Kehilangan Keuntungan Usaha (12 Bulan)",
          location: "Kantor Operasional & Data Hub",
          sumInsuredIDR: policy.sumInsuredIDR * 0.1,
        },
      ],
      sumInsuredTotalIDR: policy.sumInsuredIDR,
      deductibleTerms: `IDR ${policy.deductibleIDR.toLocaleString("id-ID")} setiap klaim kejadian (any one occurrence), kecuali klausul Act of God 10% dari klaim terbukti.`,
      premiumCalculation: {
        grossPremiumIDR: policy.annualGrossPremiumIDR,
        administrativeFeeIDR: adminFee,
        stampDutyMeteraiIDR: stampDuty,
        totalDueIDR: totalDue,
      },
      endorsements: [
        {
          code: "WAV-01",
          title: "Waiver of Subrogation Clause",
          description: "Penanggung melepaskan hak tuntut subrogasi terhadap entitas terafiliasi dan pemegang saham Tertanggung.",
        },
        {
          code: "RSMDCC-42",
          title: "Riot, Strike, Malicious Damage & Civil Commotion",
          description: "Jaminan perluasan kerusuhan, pemogokan, perbuatan jahat, dan huru-hara sesuai Polis Standar AAUI.",
        },
        {
          code: "OJK-COMP-09",
          title: "Automatic Reinstatement of Sum Insured Clause",
          description: "Uang pertanggungan otomatis dipulihkan kembali setelah pelunasan klaim dengan penyesuaian prorata premi.",
        },
      ],
      chiefUnderwriterName: "Raden Arya Sena, FSAI, AAIK",
      authorizedOfficerTitle: "Chief Underwriting Officer & Vice President of Actuary",
      issuedAt: "Jakarta Pusat, Indonesia",
    };
  };

  // Actuarial Calculations with Shock Multiplier
  const baseIBNR = INITIAL_RUNOFF_TRIANGLE.reduce((sum, row) => sum + row.ibnrReserveIDR, 0);
  const totalIBNRReserveIDR = baseIBNR * catastropheShock;
  const availableSolvencyCapitalIDR = 14500000000; // Modal sendiri yang dialokasikan
  const minimumRequiredCapitalIDR = 4200000000 + (totalIBNRReserveIDR * 0.45);
  const riskBasedCapitalRBCPercent = (availableSolvencyCapitalIDR / minimumRequiredCapitalIDR) * 100;

  const solvencyMetrics: ActuarialSolvencyMetrics = {
    totalEarnedPremiumsIDR: INITIAL_RUNOFF_TRIANGLE.reduce((sum, row) => sum + row.earnedPremiumIDR, 0),
    cumulativePaidClaimsIDR: INITIAL_RUNOFF_TRIANGLE.reduce((sum, row) => sum + (row.dev48m || row.dev36m || row.dev24m || row.dev12m), 0),
    totalIBNRReserveIDR,
    availableSolvencyCapitalIDR,
    minimumRequiredCapitalIDR,
    riskBasedCapitalRBCPercent,
    catastropheShockMultiplier: catastropheShock,
  };

  const approveClaim = (claimId: string, finalPayoutIDR: number) => {
    setClaims((prev) =>
      prev.map((c) =>
        c.id === claimId
          ? {
              ...c,
              approvedPayoutAmountIDR: finalPayoutIDR,
              status: "ADJUDICATED_APPROVED",
            }
          : c
      )
    );
  };

  const createPolicy = (p: Omit<InsurancePolicy, "id" | "claimsIncurredCount" | "status">) => {
    const newPol: InsurancePolicy = {
      ...p,
      id: `pol-${Date.now()}`,
      status: "ACTIVE",
      claimsIncurredCount: 0,
    };
    setPolicies((prev) => [newPol, ...prev]);
  };

  const fileClaim = (c: Omit<InsuranceClaim, "id" | "approvedPayoutAmountIDR" | "status">) => {
    const newClaim: InsuranceClaim = {
      ...c,
      id: `clm-${Date.now()}`,
      approvedPayoutAmountIDR: 0,
      status: "SUBMITTED",
    };
    setClaims((prev) => [newClaim, ...prev]);
  };

  return (
    <InsuranceContext.Provider
      value={{
        policies,
        claims,
        actuarialSummaries,
        overallLossRatio,
        totalPremiumsIDR,
        totalClaimsIncurredIDR,
        selectedCertificatePolicyId,
        setSelectedCertificatePolicyId,
        getCertificateData,
        runOffTriangle: INITIAL_RUNOFF_TRIANGLE,
        catastropheShock,
        setCatastropheShock,
        solvencyMetrics,
        approveClaim,
        createPolicy,
        fileClaim,
      }}
    >
      {children}
    </InsuranceContext.Provider>
  );
}

export function useInsurance() {
  const ctx = useContext(InsuranceContext);
  if (!ctx) throw new Error("useInsurance must be used within an InsuranceProvider");
  return ctx;
}
