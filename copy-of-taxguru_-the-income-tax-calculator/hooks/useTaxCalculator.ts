
import { useCallback } from 'react';
import { FormData, TaxResults, TaxCalculationResult, DeductionKey } from '../types';
import {
  OLD_REGIME_SLABS,
  NEW_REGIME_SLABS,
  STANDARD_DEDUCTION_OLD,
  STANDARD_DEDUCTION_NEW,
  CESS_RATE,
  REBATE_LIMIT_OLD,
  REBATE_AMOUNT_OLD,
  REBATE_LIMIT_NEW
} from '../constants';

// Helper function to round a number to the nearest 10, as per Section 288A
const roundToNearestTen = (num: number) => Math.round(num / 10) * 10;

const calculateTaxFromSlabs = (income: number, slabs: { limit: number; rate: number }[]): number => {
  let tax = 0;
  let remainingIncome = income;
  let previousLimit = 0;

  for (const slab of slabs) {
    if (remainingIncome > 0) {
      const taxableInSlab = Math.min(remainingIncome, slab.limit - previousLimit);
      tax += taxableInSlab * slab.rate;
      remainingIncome -= taxableInSlab;
      previousLimit = slab.limit;
    } else {
      break;
    }
  }

  return tax;
};

const getSurcharge = (taxableIncome: number, taxOnIncome: number, regime: 'old' | 'new'): number => {
  if (taxOnIncome === 0) return 0;

  if (taxableIncome <= 5000000) return 0; // up to 50 lakhs
  if (taxableIncome <= 10000000) return taxOnIncome * 0.10; // 50L to 1Cr
  if (taxableIncome <= 20000000) return taxOnIncome * 0.15; // 1Cr to 2Cr
  if (taxableIncome <= 50000000) return taxOnIncome * 0.25; // 2Cr to 5Cr
  
  // Above 5 Crore
  if (regime === 'old') {
    return taxOnIncome * 0.37;
  }
  
  return taxOnIncome * 0.25; // New regime max surcharge is 25%
};


export const useTaxCalculator = () => {
  const calculateTaxes = useCallback((formData: FormData): TaxResults => {
    const { ageGroup, income, selectedDeductions } = formData;

    const { [DeductionKey.HRA_10_13A]: hraExemptionValue, ...chapterViADeductions } = selectedDeductions;
    const selfOccupiedInterestLoss = Math.min(income.selfOccupiedInterest || 0, 200000);
    const totalExemptions = (income.exemptAllowances || 0) + (hraExemptionValue || 0);

    const calculatedTotalIncome = 
        (income.salary || 0) +
        (income.interest || 0) +
        (income.rental || 0) +
        (income.digitalAssets || 0) +
        (income.other || 0) -
        totalExemptions -
        selfOccupiedInterestLoss -
        (income.letOutInterest || 0);

    const totalIncome = Math.max(0, calculatedTotalIncome);

    // --- Old Regime Calculation ---
    const totalDeductions = Object.values(chapterViADeductions).reduce((acc, val) => acc + (val || 0), 0);
    const grossTaxableIncomeOld = totalIncome - STANDARD_DEDUCTION_OLD;
    const preRoundTaxableIncomeOld = Math.max(0, grossTaxableIncomeOld - totalDeductions);
    const taxableIncomeOld = roundToNearestTen(preRoundTaxableIncomeOld);
    
    const slabsOld = OLD_REGIME_SLABS[ageGroup];
    let baseTaxOld = calculateTaxFromSlabs(taxableIncomeOld, slabsOld);
    
    let isRebateApplicableOld = false;
    // Rebate is checked on income before rounding for tax calculation
    if (preRoundTaxableIncomeOld <= REBATE_LIMIT_OLD) {
      baseTaxOld = 0;
      isRebateApplicableOld = true;
    }
    
    const surchargeOld = getSurcharge(taxableIncomeOld, baseTaxOld, 'old');
    const finalBaseTaxOld = Math.round(baseTaxOld);
    const finalSurchargeOld = Math.round(surchargeOld);
    const taxWithSurchargeOld = finalBaseTaxOld + finalSurchargeOld;
    const finalCessOld = Math.round(taxWithSurchargeOld * CESS_RATE);
    const finalTotalTaxOld = taxWithSurchargeOld + finalCessOld;

    const oldRegimeResult: TaxCalculationResult = {
      taxableIncome: taxableIncomeOld,
      baseTax: finalBaseTaxOld,
      surcharge: finalSurchargeOld,
      cess: finalCessOld,
      totalTax: finalTotalTaxOld,
      isRebateApplicable: isRebateApplicableOld,
    };

    // --- New Regime Calculation ---
    const employerNpsDeduction = selectedDeductions[DeductionKey.SEC_80CCD_2] || 0;
    const grossTaxableIncomeNew = totalIncome - STANDARD_DEDUCTION_NEW;
    const preRoundTaxableIncomeNew = Math.max(0, grossTaxableIncomeNew - employerNpsDeduction);
    const taxableIncomeNew = roundToNearestTen(preRoundTaxableIncomeNew);
    
    let baseTaxNew = calculateTaxFromSlabs(taxableIncomeNew, NEW_REGIME_SLABS);

    let isRebateApplicableNew = false;
    // Rebate is checked on income before rounding for tax calculation
    if (preRoundTaxableIncomeNew <= REBATE_LIMIT_NEW) {
      baseTaxNew = 0;
      isRebateApplicableNew = true;
    }

    const surchargeNew = getSurcharge(taxableIncomeNew, baseTaxNew, 'new');
    const finalBaseTaxNew = Math.round(baseTaxNew);
    const finalSurchargeNew = Math.round(surchargeNew);
    const taxWithSurchargeNew = finalBaseTaxNew + finalSurchargeNew;
    const finalCessNew = Math.round(taxWithSurchargeNew * CESS_RATE);
    const finalTotalTaxNew = taxWithSurchargeNew + finalCessNew;

    const newRegimeResult: TaxCalculationResult = {
      taxableIncome: taxableIncomeNew,
      baseTax: finalBaseTaxNew,
      surcharge: finalSurchargeNew,
      cess: finalCessNew,
      totalTax: finalTotalTaxNew,
      isRebateApplicable: isRebateApplicableNew,
    };

    return {
      oldRegime: oldRegimeResult,
      newRegime: newRegimeResult,
    };
  }, []);

  return { calculateTaxes };
};