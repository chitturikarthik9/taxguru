import React from 'react';

// Financial Year constants
export const FinancialYear = {
  FY_2024_25: '2024-25',
  FY_2025_26: '2025-26',
};

// Age Group constants
export const AgeGroup = {
  BELOW_60: 'below60',
  SENIOR: 'senior', // 60-80
  SUPER_SENIOR: 'superSenior' // 80+
};

// Deduction Key constants
export const DeductionKey = {
  SEC_80C: '80C',
  SEC_80CCD_1B: '80CCD(1B)',
  SEC_80CCD_2: '80CCD(2)',
  SEC_80D: '80D',
  SEC_80DD: '80DD',
  SEC_80DDB: '80DDB',
  SEC_80E: '80E',
  SEC_80EEA: '80EEA',
  SEC_80G: '80G',
  SEC_80GG: '80GG',
  SEC_80TTA: '80TTA',
  SEC_80TTB: '80TTB',
  SEC_80U: '80U',
  HRA_10_13A: 'HRA_10_13A',
};

/**
 * @typedef {Object} Deduction
 * @property {string} id - The deduction key
 * @property {string} label - Display label for the deduction
 * @property {string} description - Short description
 * @property {number} limit - Maximum deduction limit
 * @property {React.ReactNode} detailedDescription - Detailed description with JSX
 */

/**
 * @typedef {Object} IncomeData
 * @property {number} salary - Salary income
 * @property {number} exemptAllowances - Exempt allowances
 * @property {number} interest - Interest income
 * @property {number} selfOccupiedInterest - Self-occupied property interest
 * @property {number} rental - Rental income
 * @property {number} letOutInterest - Let-out property interest
 * @property {number} digitalAssets - Digital assets income
 * @property {number} other - Other income
 */

/**
 * @typedef {Object} FormData
 * @property {string} financialYear - Selected financial year
 * @property {string} ageGroup - Selected age group
 * @property {IncomeData} income - Income data object
 * @property {Object} selectedDeductions - Selected deductions with amounts
 */

/**
 * @typedef {Object} TaxCalculationResult
 * @property {number} taxableIncome - Taxable income amount
 * @property {number} baseTax - Tax from slabs, before surcharge and cess
 * @property {number} surcharge - Surcharge amount
 * @property {number} cess - Cess amount
 * @property {number} totalTax - Total tax amount
 * @property {boolean} isRebateApplicable - Whether rebate is applicable
 */

/**
 * @typedef {Object} TaxResults
 * @property {TaxCalculationResult} oldRegime - Old regime calculation result
 * @property {TaxCalculationResult} newRegime - New regime calculation result
 */

/**
 * @typedef {Object} ChatMessage
 * @property {'user'|'ai'} sender - Message sender type
 * @property {string} text - Message text content
 * @property {string} timestamp - Message timestamp
 */