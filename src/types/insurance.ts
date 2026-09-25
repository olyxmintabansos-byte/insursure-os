export type PolicyClass =
  | "Commercial Property & Fire"
  | "Heavy Industrial Fleet & Logistics"
  | "Marine Cargo & Inland Transit"
  | "Corporate Health & Critical Illness"
  | "Directors & Officers (D&O) Liability";

export type ClaimStatus =
  | "SUBMITTED"
  | "UNDER_ASSESSMENT"
  | "ADJUDICATED_APPROVED"
  | "SETTLED_PAID"
  | "REJECTED_EXCLUSION";

export interface InsurancePolicy {
  id: string;
  policyNumber: string;
  policyHolderName: string;
  policyClass: PolicyClass;
  sumInsuredIDR: number;
  annualGrossPremiumIDR: number;
  deductibleIDR: number;
  underwritingRiskScore: number; // 1 - 100
  effectiveDate: string;
  expiryDate: string;
  status: "ACTIVE" | "PENDING_RENEWAL" | "LAPSED";
  claimsIncurredCount: number;
}

export interface InsuranceClaim {
  id: string;
  claimNumber: string;
  policyId: string;
  policyNumber: string;
  claimantName: string;
  incidentDate: string;
  filingDate: string;
  incidentType: string;
  claimedGrossAmountIDR: number;
  approvedPayoutAmountIDR: number;
  deductibleAppliedIDR: number;
  fraudRiskScore: number; // 0 - 100 (high = fraud alert)
  status: ClaimStatus;
  lossAdjusterNotes: string;
}

export interface ActuarialClassSummary {
  policyClass: PolicyClass;
  earnedPremiumIDR: number;
  incurredClaimsIDR: number;
  lossRatioPercent: number; // Incurred / Earned
  combinedRatioPercent: number; // Loss Ratio + Expense Ratio (~22%)
  status: "PROFITABLE" | "BREAK_EVEN" | "UNFAVORABLE";
}
