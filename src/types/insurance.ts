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
  fraudRiskScore: number; // 0 - 100
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

// SPRINT 3: A4 POLICY CERTIFICATE TYPES
export interface PolicyEndorsement {
  code: string;
  title: string;
  description: string;
}

export interface PolicyScheduleItem {
  description: string;
  location: string;
  sumInsuredIDR: number;
}

export interface InsuranceCertificateData {
  certificateNumber: string;
  policyId: string;
  policyNumber: string;
  ojkRegistrationNo: string;
  policyHolder: string;
  insuredEntityTaxId: string;
  businessNature: string;
  riskAddress: string;
  periodCoverage: {
    from: string;
    to: string;
    standardTime: string;
  };
  policyClass: PolicyClass;
  scheduleItems: PolicyScheduleItem[];
  sumInsuredTotalIDR: number;
  deductibleTerms: string;
  premiumCalculation: {
    grossPremiumIDR: number;
    administrativeFeeIDR: number;
    stampDutyMeteraiIDR: number;
    totalDueIDR: number;
  };
  endorsements: PolicyEndorsement[];
  chiefUnderwriterName: string;
  authorizedOfficerTitle: string;
  issuedAt: string;
}

// SPRINT 4: ACTUARIAL DEVELOPMENT TRIANGLE & IBNR
export interface ClaimsRunOffRow {
  accidentYear: number;
  earnedPremiumIDR: number;
  dev12m: number; // Cumulative paid claims after 12 months
  dev24m: number; // Cumulative paid claims after 24 months
  dev36m: number; // Cumulative paid claims after 36 months
  dev48m: number; // Cumulative paid claims after 48 months
  projectedUltimateLossIDR: number;
  ibnrReserveIDR: number;
}

export interface ActuarialSolvencyMetrics {
  totalEarnedPremiumsIDR: number;
  cumulativePaidClaimsIDR: number;
  totalIBNRReserveIDR: number;
  availableSolvencyCapitalIDR: number;
  minimumRequiredCapitalIDR: number;
  riskBasedCapitalRBCPercent: number; // OJK min threshold is 120%
  catastropheShockMultiplier: number; // 1.0 = normal, 1.5 = high stress
}
