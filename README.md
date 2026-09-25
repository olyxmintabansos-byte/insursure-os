# 🛡️ **INSURSURE OS** — Titan #15  
**Actuarial Loss Ratio & Underwriting Claims ERP**  
*Sistem Underwriting Polis, Adjudikasi Klaim, Sertifikat A4 OJK, dan Aktuaria IBNR Reserve*

---

## 🎯 **Deskripsi Project**

**InsurSure OS** adalah platform ERP asuransi komersial berbasis Next.js 15 + TypeScript yang mencakup 4 modul operasional penuh:

1. **Portofolio Polis & Underwriting** — Dashboard GWP (Gross Written Premium), risk scoring, actuarial combined ratio, loss ratio radar interaktif per klasifikasi produk asuransi.
2. **Adjudikasi Klaim Otomatis** — Triage klaim dengan fraud detection scoring (0-100), deductible calculator, approval engine, dan status tracking penuh.
3. **Sertifikat Polis A4 (Print-Ready)** — Generator PDF sertifikat pertanggungan asuransi format resmi OJK/AAUI, lengkap dengan schedule items, endorsements, dan breakdown premi sesuai standar legal Indonesia.
4. **Aktuaria & IBNR Reserve Engine** — Claims Development Triangle (Chain Ladder Method), proyeksi Incurred But Not Reported (IBNR) reserve, stress testing multiplier katastropik, dan Risk-Based Capital (RBC) solvency metrics sesuai regulasi OJK.

Seluruh data disimpan dalam **LocalStorage** (zero backend), dengan fitur CRUD penuh untuk policies dan claims. UI dibangun dengan **Tailwind CSS** custom dark theme (#060b1c base), **Lucide Icons**, dan komponen actuarial interaktif.

---

## 🏗️ **Teknologi Stack**

| Layer              | Tech                                  |
|--------------------|---------------------------------------|
| **Framework**      | Next.js 15 (App Router)               |
| **Language**       | TypeScript 5                          |
| **Styling**        | Tailwind CSS 4 + Custom Dark Theme    |
| **State Mgmt**     | React Context API + LocalStorage      |
| **Icons**          | Lucide React                          |
| **Deployment**     | GitHub Pages (Static Export)          |

---

## 📦 **Instalasi & Setup Lokal**

### 1. Clone Repository
```bash
git clone https://github.com/olyxmintabansos-byte/insursure-os.git
cd insursure-os
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Jalankan Development Server
```bash
npm run dev
```
Akses aplikasi di: `http://localhost:3000`

### 4. Build untuk Production
```bash
npm run build
```
Output static files akan tersedia di folder `out/`.

---

## 🚀 **Deployment GitHub Pages**

Project ini dikonfigurasi untuk static export dan auto-deploy ke GitHub Pages:

```bash
# Build production
npm run build

# Deploy ke gh-pages branch
npx gh-pages -d out -b gh-pages --dotfiles
```

**Live Production URL:**  
🌐 [https://olyxmintabansos-byte.github.io/insursure-os/](https://olyxmintabansos-byte.github.io/insursure-os/)

---

## 🎨 **Fitur & Modul Utama**

### 📊 **1. Portofolio Polis & Underwriting Dashboard**
- **GWP Tracking** — Total Gross Written Premiums dari seluruh kontrak aktif
- **Loss Ratio Monitoring** — Rasio klaim terhadap premi (%), segmentasi per policy class
- **Actuarial Combined Ratio** — Loss Ratio + Expense Ratio (~22% industri standard)
- **Risk Scoring** — Skor risiko underwriting 1-100 per polis
- **Interactive Loss Ratio Radar** — Visualisasi 5 kelas produk asuransi:
  - Commercial Property & Fire
  - Heavy Industrial Fleet & Logistics
  - Marine Cargo & Inland Transit
  - Corporate Health & Critical Illness
  - Directors & Officers (D&O) Liability

### 🔍 **2. Claims Adjudication Engine**
- **Real-time Claims Triage** — Status: SUBMITTED → UNDER_ASSESSMENT → ADJUDICATED_APPROVED → SETTLED_PAID / REJECTED_EXCLUSION
- **Fraud Detection Scoring** — Algoritma fraud risk 0-100 (threshold rekomendasi 60+)
- **Deductible Calculator** — Automatic deduction sesuai klausul polis
- **Loss Adjuster Notes** — Field catatan surveyor dan verifikasi lapangan
- **Approval Workflow** — Interface approval dengan final payout adjudication

### 📄 **3. Sertifikat Polis A4 (OJK/AAUI Format)**
- **Official Certificate Layout** — Format standar Asosiasi Asuransi Umum Indonesia (AAUI)
- **OJK Registration Number** — Nomor izin usaha OJK tercantum di header
- **KYC Policyholder** — Nama tertanggung, NPWP, bidang usaha, lokasi objek pertanggungan
- **Schedule of Sum Insured** — Breakdown itemized: bangunan, mesin, business interruption
- **Deductible Terms** — Ketentuan risiko sendiri (retention) per occurrence
- **Premium Breakdown** — Premi pokok + biaya admin + bea meterai lunas
- **Endorsements & Klausul** — Waiver of Subrogation, RSMDCC, Auto Reinstatement, dll
- **Digital Signatures** — TTD digital + stempel underwriter dengan role/title lengkap
- **Print-Ready PDF** — CSS `@media print` untuk output A4 landscape-ready

### 🧮 **4. Aktuaria & IBNR Reserve Engine**
- **Claims Development Triangle** — Tabel segitiga perkembangan klaim (run-off 12m, 24m, 36m, 48m)
- **Chain Ladder Projection** — Proyeksi Ultimate Loss per accident year
- **IBNR Reserve Calculation** — Cadangan Incurred But Not Reported sesuai OJK POJK 71/2016
- **Catastrophe Stress Testing** — Multiplier 1.0x / 1.5x / 2.0x / 3.0x untuk worst-case scenario (gempa, badai, pandemi)
- **Risk-Based Capital (RBC) Metrics** — Solvency ratio %, modal tersedia vs modal minimum (threshold OJK 120%)
- **RBC Status Indicators:**
  - **HEALTHY** (≥120%) — Hijau, kapasitas underwriting optimal
  - **CAUTION** (100-120%) — Kuning, rekomendasikan injeksi modal
  - **UNDERCAPITALIZED** (<100%) — Merah, moratorium underwriting baru

---

## 📂 **Struktur Direktori**

```
insursure-os/
├── src/
│   ├── app/
│   │   ├── page.tsx                   # Route 1: Portofolio Polis & Underwriting
│   │   ├── claims/page.tsx            # Route 2: Claims Adjudication
│   │   ├── policy/page.tsx            # Route 3: Sertifikat Polis A4
│   │   ├── actuary/page.tsx           # Route 4: Aktuaria & IBNR
│   │   ├── layout.tsx                 # Root layout + InsuranceProvider
│   │   └── globals.css                # Tailwind + Custom Dark Theme
│   ├── components/
│   │   ├── Navbar.tsx                 # Navigation header dengan badge
│   │   └── LossRatioRadar.tsx         # Interactive radar chart 5 kelas
│   ├── context/
│   │   └── InsuranceContext.tsx       # Global state: policies, claims, actuarial data
│   ├── types/
│   │   └── insurance.ts               # TypeScript types & interfaces
│   └── lib/
│       └── utils.ts                   # Helper functions (formatIDR, cn)
├── public/
│   └── .nojekyll                      # Bypass Jekyll for GitHub Pages
├── next.config.ts                     # Static export config (basePath /insursure-os)
├── tailwind.config.ts                 # Tailwind theme customization
├── package.json
└── README.md
```

---

## 🧪 **Data Model & Types**

### **InsurancePolicy**
```typescript
{
  id: string;
  policyNumber: string;              // e.g., "POL/COMM/2026/0892"
  policyHolderName: string;
  policyClass: PolicyClass;          // 5 enum classes
  sumInsuredIDR: number;
  annualGrossPremiumIDR: number;
  deductibleIDR: number;
  underwritingRiskScore: number;     // 1-100
  effectiveDate: string;
  expiryDate: string;
  status: "ACTIVE" | "PENDING_RENEWAL" | "LAPSED";
  claimsIncurredCount: number;
}
```

### **InsuranceClaim**
```typescript
{
  id: string;
  claimNumber: string;               // e.g., "CLM/2026/09/0042"
  policyId: string;
  claimantName: string;
  incidentDate: string;
  claimedGrossAmountIDR: number;
  approvedPayoutAmountIDR: number;
  deductibleAppliedIDR: number;
  fraudRiskScore: number;            // 0-100
  status: ClaimStatus;
  lossAdjusterNotes: string;
}
```

### **ClaimsRunOffRow** (Actuarial Triangle)
```typescript
{
  accidentYear: number;
  earnedPremiumIDR: number;
  dev12m: number;                    // Cumulative paid claims @ 12 months
  dev24m: number;
  dev36m: number;
  dev48m: number;
  projectedUltimateLossIDR: number;
  ibnrReserveIDR: number;
}
```

---

## 🎨 **Design System**

### **Color Palette (Dark Theme)**
```css
/* Base Background */
body: #060b1c

/* Gradient Accents */
Teal Primary: from-teal-500 to-emerald-500
Purple Secondary: from-purple-500 to-violet-500
Rose Alert: from-rose-500 to-red-600

/* Status Colors */
Profitable/Healthy: text-emerald-400
Caution/Warning: text-amber-400
Unfavorable/Critical: text-rose-400
```

### **Typography**
- **Headers:** font-black tracking-wide
- **Numeric Data:** font-mono (monospace untuk IDR, %, scores)
- **Body Text:** text-slate-300 / slate-400

---

## 🔑 **Key Formulas & Calculations**

### **Loss Ratio**
```
Loss Ratio % = (Incurred Claims IDR / Earned Premiums IDR) × 100
```

### **Combined Ratio**
```
Combined Ratio % = Loss Ratio % + Expense Ratio %
(Expense Ratio diasumsikan 22% untuk industri asuransi Indonesia)
```

### **IBNR Reserve (Chain Ladder)**
```
IBNR = Projected Ultimate Loss - Cumulative Paid to Date
Ultimate Loss = Dev(t) × Development Factor(avg historical)
```

### **Risk-Based Capital (RBC) %**
```
RBC % = (Available Solvency Capital / Minimum Required Capital) × 100
OJK Minimum Threshold: 120%
```

---

## 📜 **Compliance & Standards**

| Standard                          | Reference                                                      |
|-----------------------------------|----------------------------------------------------------------|
| **OJK Solvency Regulation**       | POJK No. 71/POJK.05/2016                                       |
| **AAUI Policy Format**            | Asosiasi Asuransi Umum Indonesia (AAUI) Standard Polis        |
| **Actuarial Methodology**         | Chain Ladder Method (stochastic run-off projection)            |
| **Fraud Detection Threshold**     | Industry benchmark 60+ (high risk), 30-60 (moderate)           |

---

## 🛠️ **Development Notes**

### **LocalStorage Schema**
- Key `INSURSURE_POLICIES`: JSON array of `InsurancePolicy[]`
- Key `INSURSURE_CLAIMS`: JSON array of `InsuranceClaim[]`
- Data persists lintas session, zero backend required

### **Routing Convention**
| Route                | File Path                  | Fitur                                    |
|----------------------|----------------------------|------------------------------------------|
| `/`                  | `app/page.tsx`             | Portofolio Polis & Underwriting          |
| `/claims/`           | `app/claims/page.tsx`      | Claims Adjudication                      |
| `/policy/`           | `app/policy/page.tsx`      | Sertifikat Polis A4 Generator            |
| `/actuary/`          | `app/actuary/page.tsx`     | Aktuaria IBNR & RBC Dashboard            |

### **Next.js Config (Static Export)**
```typescript
const nextConfig: NextConfig = {
  output: "export",
  basePath: "/insursure-os",
  trailingSlash: true,
  images: { unoptimized: true },
};
```

---

## 🧩 **Extensibility & Future Enhancements**

1. **Backend Integration** — Migrate LocalStorage → PostgreSQL / Supabase untuk multi-user setup
2. **Real Fraud ML Model** — Replace hardcoded fraud scores dengan TensorFlow.js fraud detection model
3. **Reinsurance Treaty Module** — Quota share, excess of loss treaty calculator
4. **Bornhuetter-Ferguson Method** — Alternative IBNR projection dengan prior loss ratio assumption
5. **Geospatial Risk Mapping** — Integrate Google Maps API untuk visual risk exposure per lokasi
6. **OJK API Sync** — Auto-report solvency metrics ke dashboard regulator OJK

---

## 👨‍💼 **Author & Credits**

**Project Lead:** Olyx Mintabansos (Architect)  
**Organization:** [@olyxmintabansos-byte](https://github.com/olyxmintabansos-byte)  
**Titan Series:** #15 — InsurSure OS (Sprint 1-4 Complete)

---

## 📄 **License**

MIT License — Open source untuk keperluan edukasi dan riset aktuaria.

---

## 🌐 **Links**

- **Live Demo:** [https://olyxmintabansos-byte.github.io/insursure-os/](https://olyxmintabansos-byte.github.io/insursure-os/)
- **GitHub Repo:** [https://github.com/olyxmintabansos-byte/insursure-os](https://github.com/olyxmintabansos-byte/insursure-os)
- **Titan Series:** Complete ERP/SaaS Portfolio on GitHub

---

**Last Updated:** September 2026  
**Version:** 1.0.0 (Sprint 1-4 Complete)
