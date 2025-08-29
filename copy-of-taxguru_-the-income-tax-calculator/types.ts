
import React from 'react';

export enum FinancialYear {
  FY_2024_25 = '2024-25',
  FY_2025_26 = '2025-26',
}

export enum AgeGroup {
  BELOW_60 = 'below60',
  SENIOR = 'senior', // 60-80
  SUPER_SENIOR = 'superSenior' // 80+
}

export enum DeductionKey {
  SEC_80C = '80C',
  SEC_80CCD_1B = '80CCD(1B)',
  SEC_80CCD_2 = '80CCD(2)',
  SEC_80D = '80D',
  SEC_80DD = '80DD',
  SEC_80DDB = '80DDB',
  SEC_80E = '80E',
  SEC_80EEA = '80EEA',
  SEC_80G = '80G',
  SEC_80GG = '80GG',
  SEC_80TTA = '80TTA',
  SEC_80TTB = '80TTB',
  SEC_80U = '80U',
  HRA_10_13A = 'HRA_10_13A',
}

export interface Deduction {
  id: DeductionKey;
  label: string;
  description: string;
  limit: number;
  detailedDescription: React.ReactNode;
}

export interface IncomeData {
  salary: number;
  exemptAllowances: number;
  interest: number;
  selfOccupiedInterest: number;
  rental: number;
  letOutInterest: number;
  digitalAssets: number;
  other: number;
}

export interface FormData {
  financialYear: FinancialYear;
  ageGroup: AgeGroup;
  income: IncomeData;
  selectedDeductions: { [key in DeductionKey]?: number };
}

export interface TaxCalculationResult {
  taxableIncome: number;
  baseTax: number; // Tax from slabs, before surcharge and cess
  surcharge: number;
  cess: number;
  totalTax: number;
  isRebateApplicable: boolean;
}

export interface TaxResults {
  oldRegime: TaxCalculationResult;
  newRegime: TaxCalculationResult;
}

export interface ChatMessage {
    sender: 'user' | 'ai';
    text: string;
    timestamp: string;
}
