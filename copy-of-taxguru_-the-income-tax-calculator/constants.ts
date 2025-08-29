
import { AgeGroup } from './types';

export const STANDARD_DEDUCTION_OLD = 50000;
export const STANDARD_DEDUCTION_NEW = 75000;
export const CESS_RATE = 0.04;

// Rebate under Section 87A
export const REBATE_LIMIT_OLD = 500000;
export const REBATE_AMOUNT_OLD = 12500;
export const REBATE_LIMIT_NEW = 700000;

export const OLD_REGIME_SLABS = {
  [AgeGroup.BELOW_60]: [
    { limit: 250000, rate: 0 },
    { limit: 500000, rate: 0.05 },
    { limit: 1000000, rate: 0.20 },
    { limit: Infinity, rate: 0.30 },
  ],
  [AgeGroup.SENIOR]: [
    { limit: 300000, rate: 0 },
    { limit: 500000, rate: 0.05 },
    { limit: 1000000, rate: 0.20 },
    { limit: Infinity, rate: 0.30 },
  ],
  [AgeGroup.SUPER_SENIOR]: [
    { limit: 500000, rate: 0 },
    { limit: 1000000, rate: 0.20 },
    { limit: Infinity, rate: 0.30 },
  ],
};

export const NEW_REGIME_SLABS = [
    { limit: 400000, rate: 0 },
    { limit: 800000, rate: 0.05 },
    { limit: 1200000, rate: 0.10 },
    { limit: 1600000, rate: 0.15 },
    { limit: 2000000, rate: 0.20 },
    { limit: 2400000, rate: 0.25 },
    { limit: Infinity, rate: 0.30 },
];