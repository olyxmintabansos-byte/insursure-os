"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  InsurancePolicy,
  InsuranceClaim,
  ActuarialClassSummary,
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
    fraudRiskScore: 12, // Low
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
    fraudRiskScore: 78, // High alert
    status: "UNDER_ASSESSMENT",
    lossAdjusterNotes: "Indikasi kelalaian sopir melebihi jam batas operasional. Memerlukan audit rekaman blackbox telemetri GPS.",
  },
];

interface InsuranceContextType {
  policies: InsurancePolicy[];
  claims: InsuranceClaim[];
  actuarialSummaries: ActuarialClassSummary[];
  overallLossRatio: number;
  totalPremiumsIDR: number;
  totalClaimsIncurredIDR: number;
  approveClaim: (claimId: string, finalPayoutIDR: number) => void;
  createPolicy: (p: Omit<InsurancePolicy, "id" | "claimsIncurredCount" | "status">) => void;
  fileClaim: (c: Omit<InsuranceClaim, "id" | "approvedPayoutAmountIDR" | "status">) => void;
}

const InsuranceContext = createContext<InsuranceContextType | undefined>(undefined);

export function InsuranceProvider({ children }: { children: React.ReactNode }) {
  const [policies, setPolicies] = useState<InsurancePolicy[]>(INITIAL_POLICIES);
  const [claims, setClaims] = useState<InsuranceClaim[]>(INITIAL_CLAIMS);

  // LocalStorage Persistence
  useEffect(() => {
    const savedPol = localStorage.getItem("INSURSURE_POLICIES");
    if (savedPol) {
      try {
        setPolicies(JSON.parse(savedPol));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("INSURSURE_POLICIES", JSON.stringify(policies));
  }, [policies]);

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
  ];

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
