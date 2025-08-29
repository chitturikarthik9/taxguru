
import React from 'react';
import { Deduction, DeductionKey } from '../types';

export const DEDUCTION_OPTIONS: Deduction[] = [
  { 
    id: DeductionKey.SEC_80C, 
    label: 'Section 80C (Investments/Expenses)', 
    description: 'Investments like LIC, PPF, ELSS, etc.', 
    limit: 150000,
    detailedDescription: (
      <>
        <p className="mb-2"><strong>Limit:</strong> ₹1,50,000 per year (This is a combined limit that includes contributions to 80CCC and 80CCD(1)).</p>
        <p className="mb-2"><strong>Who Can Claim:</strong> Individuals and Hindu Undivided Families (HUF).</p>
        <h4 className="font-semibold text-primary dark:text-primary-light mt-4 mb-2">What’s Covered:</h4>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>Life Insurance Premium:</strong> Paid for self, spouse, or children.</li>
          <li><strong>PPF (Public Provident Fund):</strong> Government-backed long-term saving with a 15-year lock-in.</li>
          <li><strong>EPF (Employee Provident Fund):</strong> Auto-deducted from a salaried employee's salary.</li>
          <li><strong>NSC (National Savings Certificate):</strong> 5-year post office investment with fixed interest.</li>
          <li><strong>ELSS (Equity Linked Saving Scheme):</strong> Tax-saving mutual funds with a 3-year lock-in period.</li>
          <li><strong>5-Year Tax-Saving FD:</strong> Bank Fixed Deposits with a tax benefit and a 5-year lock-in.</li>
          <li><strong>Tuition Fees:</strong> For full-time education of up to 2 children in India.</li>
          <li><strong>Home Loan Principal Repayment:</strong> For a residential property.</li>
          <li><strong>Sukanya Samriddhi Yojana:</strong> For a girl child, where the account is in her name.</li>
        </ul>
      </>
    )
  },
  { 
    id: DeductionKey.SEC_80CCD_1B, 
    label: 'Section 80CCD(1B) (Additional NPS deduction)', 
    description: 'Additional employee\'s contribution to NPS.', 
    limit: 50000,
    detailedDescription: (
        <>
            <p className="mb-2"><strong>Limit:</strong> An additional ₹50,000, over and above the ₹1.5 lakh limit of Section 80C.</p>
            <p className="mb-2"><strong>Exclusive For:</strong> Contributions made to the National Pension System (NPS) Tier I account only.</p>
            <p className="mt-4 text-sm bg-green-100 dark:bg-green-900/30 p-2 rounded-md">
                This allows a total deduction of up to ₹2,00,000 when combined with Section 80C. (₹1,50,000 under 80C + ₹50,000 under 80CCD(1B)).
            </p>
        </>
    )
  },
  { 
    id: DeductionKey.SEC_80CCD_2, 
    label: 'Section 80CCD(2) (Employer NPS contribution)', 
    description: 'Employer\'s contribution to NPS.', 
    limit: Infinity,
    detailedDescription: (
        <>
            <p className="mb-2"><strong>Limit:</strong> Up to 10% of salary (Basic + Dearness Allowance) for private-sector employees, or 14% for government employees.</p>
            <p className="mb-2"><strong>Who Benefits:</strong> Salaried individuals whose employers contribute to their NPS account.</p>
            <p className="mt-4 text-sm text-neutral-dark/80 dark:text-neutral-light/80">
                This deduction is over and above the limits of Section 80C and 80CCD(1B), making it a valuable tool for retirement planning.
            </p>
        </>
    )
  },
  { 
    id: DeductionKey.SEC_80D, 
    label: 'Section 80D (Health insurance premiums)', 
    description: 'Medical insurance premium paid.', 
    limit: 100000,
    detailedDescription: (
        <>
            <h4 className="font-semibold text-primary dark:text-primary-light mb-2">Deduction Limits:</h4>
            <ul className="list-disc list-inside space-y-1">
                <li><strong>Self, Spouse & Children (all below 60):</strong> ₹25,000</li>
                <li><strong>Self, Spouse & Children (one person 60+):</strong> ₹50,000</li>
                <li><strong>Parents (below 60):</strong> Additional ₹25,000</li>
                <li><strong>Parents (60+):</strong> Additional ₹50,000</li>
            </ul>
             <p className="mt-3">The maximum possible deduction is <strong>₹1,00,000</strong> (e.g., taxpayer is 60+ and parents are 60+).</p>
             <p className="mt-3">A deduction for preventive health check-ups up to ₹5,000 is included within these overall limits.</p>
             <p className="mt-3 text-sm text-neutral-dark/80 dark:text-neutral-light/80">Payment must be made through non-cash modes (except for health check-ups).</p>
        </>
    )
  },
  { 
    id: DeductionKey.SEC_80DD, 
    label: 'Section 80DD (Dependent with disability)', 
    description: 'Maintenance of a disabled dependent.', 
    limit: 125000,
    detailedDescription: (
        <>
            <p className="mb-2">Provides a flat deduction for expenses related to the medical treatment, training, and rehabilitation of a dependent with a disability.</p>
            <h4 className="font-semibold text-primary dark:text-primary-light mt-4 mb-2">Deduction Amount:</h4>
            <ul className="list-disc list-inside space-y-1">
                <li><strong>₹75,000</strong> if the disability is 40% or more but less than 80%.</li>
                <li><strong>₹1,25,000</strong> if the disability is 80% or more (severe disability).</li>
            </ul>
            <p className="mt-3"><strong>Dependent:</strong> Can be a spouse, child, parent, or sibling wholly dependent on the taxpayer.</p>
            <p className="mt-3 text-sm text-neutral-dark/80 dark:text-neutral-light/80">A certificate of disability from a recognized medical authority is required.</p>
        </>
    )
  },
  { 
    id: DeductionKey.SEC_80DDB, 
    label: 'Section 80DDB (Medical for specified diseases)', 
    description: 'Medical treatment for specified diseases.', 
    limit: 100000,
    detailedDescription: (
        <>
            <p className="mb-2">For expenses incurred on the medical treatment of specified diseases for self or dependents.</p>
            <h4 className="font-semibold text-primary dark:text-primary-light mt-4 mb-2">Deduction Amount:</h4>
            <ul className="list-disc list-inside space-y-1">
                <li><strong>₹40,000</strong> for individuals below 60 years.</li>
                <li><strong>₹1,00,000</strong> for senior citizens (60 years or older).</li>
            </ul>
            <p className="mt-3"><strong>Diseases Covered:</strong> Includes neurological diseases (like Dementia, Parkinson's), Malignant Cancers, AIDS, Chronic Renal Failure, etc.</p>
            <p className="mt-3 text-sm text-neutral-dark/80 dark:text-neutral-light/80">A prescription from a specialist doctor is mandatory to claim this deduction.</p>
        </>
    )
  },
  { 
    id: DeductionKey.SEC_80E, 
    label: 'Section 80E (Education loan interest)', 
    description: 'Interest paid on higher education loan.', 
    limit: Infinity,
    detailedDescription: (
        <>
            <p className="mb-2"><strong>Deduction:</strong> 100% of the interest paid on an education loan. There is no upper limit on the amount.</p>
            <p className="mb-2"><strong>For:</strong> Higher education of self, spouse, children, or a student for whom the taxpayer is a legal guardian.</p>
            <p className="mb-2"><strong>Period:</strong> The deduction is available for a maximum of 8 years, starting from the year the interest payments begin.</p>
            <p className="mt-3 text-sm text-neutral-dark/80 dark:text-neutral-light/80">The deduction is only for the interest component of the EMI, not the principal.</p>
        </>
    )
  },
  { 
    id: DeductionKey.SEC_80EEA, 
    label: 'Section 80EEA (Affordable housing loan interest)', 
    description: 'Interest on housing loan for affordable housing.', 
    limit: 150000,
    detailedDescription: (
        <>
            <p className="mb-2"><strong>Limit:</strong> Additional deduction of up to ₹1,50,000 on home loan interest for affordable housing.</p>
            <p className="mb-2">This is over and above the ₹2 lakh limit under Section 24(b).</p>
            <h4 className="font-semibold text-primary dark:text-primary-light mt-4 mb-2">Conditions:</h4>
            <ul className="list-disc list-inside space-y-1">
                <li>The home loan must have been sanctioned between April 1, 2019, and March 31, 2022.</li>
                <li>The stamp duty value of the property should not exceed ₹45 lakh.</li>
                <li>The taxpayer should not own any other residential property at the time of loan sanction (must be a first-time home buyer).</li>
            </ul>
        </>
    )
  },
  { 
    id: DeductionKey.SEC_80G, 
    label: 'Section 80G (Donations)', 
    description: 'Donations to specified funds.', 
    limit: Infinity,
    detailedDescription: (
        <>
            <p className="mb-2">Deduction for donations made to specified charitable institutions and funds.</p>
            <p className="mb-2">The deduction can be 50% or 100% of the donated amount, sometimes with a qualifying limit.</p>
            <h4 className="font-semibold text-primary dark:text-primary-light mt-4 mb-2">Examples:</h4>
            <ul className="list-disc list-inside space-y-1">
                <li><strong>100% Deduction (No Limit):</strong> PM's National Relief Fund, National Defence Fund.</li>
                <li><strong>50% Deduction (No Limit):</strong> Jawaharlal Nehru Memorial Fund, PM's Drought Relief Fund.</li>
                <li><strong>100% Deduction (With Limit):</strong> Donations to government for promoting family planning.</li>
                <li><strong>50% Deduction (With Limit):</strong> Donations to most other registered NGOs, temples, etc.</li>
            </ul>
             <p className="mt-3 text-sm text-neutral-dark/80 dark:text-neutral-light/80">Cash donations above ₹2,000 are not eligible for deduction. A valid donation receipt is required.</p>
        </>
    )
  },
  { 
    id: DeductionKey.SEC_80GG, 
    label: 'Section 80GG (Rent (no HRA))', 
    description: 'Rent paid when HRA is not received.', 
    limit: 60000,
    detailedDescription: (
        <>
            <p className="mb-2"><strong>Who Can Claim:</strong> Salaried or self-employed individuals who do not receive House Rent Allowance (HRA) from their employer.</p>
            <h4 className="font-semibold text-primary dark:text-primary-light mt-4 mb-2">Deduction is the lowest of the following:</h4>
            <ul className="list-disc list-inside space-y-1">
                <li>₹5,000 per month (₹60,000 per year).</li>
                <li>25% of your adjusted total income.</li>
                <li>Actual rent paid minus 10% of your adjusted total income.</li>
            </ul>
            <p className="mt-3 text-sm text-neutral-dark/80 dark:text-neutral-light/80">You must file Form 10BA to declare that you meet the conditions for this deduction.</p>
        </>
    )
  },
  { 
    id: DeductionKey.SEC_80TTA, 
    label: 'Section 80TTA (Savings interest (non-senior))', 
    description: 'Interest from savings account.', 
    limit: 10000,
    detailedDescription: (
         <>
            <p className="mb-2"><strong>Limit:</strong> Maximum deduction of ₹10,000.</p>
            <p className="mb-2"><strong>Applies to:</strong> Interest earned from savings accounts held in a bank, co-operative society, or post office.</p>
            <p className="mb-2"><strong>For:</strong> Individuals (below 60 years) and HUF.</p>
            <p className="mt-3 text-sm text-neutral-dark/80 dark:text-neutral-light/80">Interest from fixed deposits (FDs), recurring deposits (RDs), or corporate bonds is not eligible under this section.</p>
        </>
    )
  },
  { 
    id: DeductionKey.SEC_80TTB, 
    label: 'Section 80TTB (Interest (senior citizens))', 
    description: 'Interest income from deposits.', 
    limit: 50000,
    detailedDescription: (
        <>
            <p className="mb-2"><strong>Limit:</strong> Maximum deduction of ₹50,000.</p>
            <p className="mb-2"><strong>For:</strong> Senior citizens only (aged 60 years and above).</p>
            <p className="mb-2"><strong>Covers Interest From:</strong> Savings accounts, Fixed Deposits (FDs), Recurring Deposits (RDs), and other deposits with a bank, post office, or co-operative bank.</p>
            <p className="mt-3 text-sm text-neutral-dark/80 dark:text-neutral-light/80">If a senior citizen claims this deduction, they cannot claim the ₹10,000 deduction under Section 80TTA.</p>
        </>
    )
  },
  { 
    id: DeductionKey.SEC_80U, 
    label: 'Section 80U (Self-disability)', 
    description: 'Deduction for taxpayer with a disability.', 
    limit: 125000,
    detailedDescription: (
        <>
            <p className="mb-2">Provides a flat deduction to a resident individual who suffers from a physical or mental disability.</p>
            <h4 className="font-semibold text-primary dark:text-primary-light mt-4 mb-2">Deduction Amount:</h4>
            <ul className="list-disc list-inside space-y-1">
                <li><strong>₹75,000</strong> for a disability of 40% or more but less than 80%.</li>
                <li><strong>₹1,25,000</strong> for a severe disability of 80% or more.</li>
            </ul>
             <p className="mt-3 text-sm text-neutral-dark/80 dark:text-neutral-light/80">The taxpayer must furnish a valid medical certificate to claim this deduction.</p>
        </>
    )
  },
  { 
    id: DeductionKey.HRA_10_13A, 
    label: 'HRA Exemption (House Rent Allowance)', 
    description: 'Calculated HRA exemption amount.', 
    limit: Infinity,
    detailedDescription: (
        <>
            <p className="mb-2"><strong>For:</strong> Salaried individuals who receive House Rent Allowance (HRA) as part of their salary and live in a rented house.</p>
            <h4 className="font-semibold text-primary dark:text-primary-light mt-4 mb-2">The exempted amount is the lowest of the following:</h4>
            <ul className="list-disc list-inside space-y-1">
                <li>Actual HRA received from the employer.</li>
                <li>50% of salary* for those living in metro cities (Delhi, Mumbai, Chennai, Kolkata), or 40% for non-metros.</li>
                <li>Actual rent paid minus 10% of salary*.</li>
            </ul>
            <p className="mt-3 text-sm text-neutral-dark/80 dark:text-neutral-light/80">*Salary for HRA = Basic Salary + Dearness Allowance (if part of retirement benefits) + Commission based on a fixed percentage of turnover.</p>
        </>
    )
  },
];
