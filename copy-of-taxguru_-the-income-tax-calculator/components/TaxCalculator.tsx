import React, { useState, useRef, useEffect } from 'react';
import { AgeGroup, DeductionKey, FormData, TaxResults, IncomeData, TaxCalculationResult, FinancialYear } from '../types';
import { useTaxCalculator } from '../hooks/useTaxCalculator';
import { STANDARD_DEDUCTION_OLD, STANDARD_DEDUCTION_NEW } from '../constants';
import { DEDUCTION_OPTIONS } from '../data/deductions';
import Card from './Card';
import CalculatorIcon from './icons/CalculatorIcon';
import InfoIcon from './icons/InfoIcon';

interface DeductionInfoModalProps {
    title: string;
    children: React.ReactNode;
    onClose: () => void;
}

const DeductionInfoModal: React.FC<DeductionInfoModalProps> = ({ title, children, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4" onClick={onClose} aria-modal="true" role="dialog">
        <div className="bg-white dark:bg-neutral-dark rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center p-4 border-b border-neutral dark:border-neutral-darkest">
                <h3 className="text-xl font-bold text-primary dark:text-primary-light">{title}</h3>
                <button onClick={onClose} className="p-1 rounded-full text-neutral-dark dark:text-neutral-light hover:bg-neutral/50 dark:hover:bg-neutral-darkest" aria-label="Close modal">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            <div className="p-6 overflow-y-auto text-neutral-dark dark:text-neutral-light">
                {children}
            </div>
        </div>
    </div>
);

interface IncomeInputProps {
    label: string;
    name: keyof IncomeData;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onInfoClick?: () => void;
}

const IncomeInput: React.FC<IncomeInputProps> = ({ label, name, value, onChange, onInfoClick }) => (
    <div>
        <label htmlFor={name} className="flex items-center text-sm font-medium text-neutral-dark dark:text-neutral-light mb-1">
            {label}
             {onInfoClick && (
                <button 
                    type="button" 
                    onClick={onInfoClick} 
                    className="ml-2 p-1 rounded-full hover:bg-neutral-light/50 dark:hover:bg-neutral-dark/30"
                    aria-label={`More information about ${label}`}
                >
                    <InfoIcon className="w-4 h-4 text-primary" />
                </button>
            )}
        </label>
        <div className="relative mt-1">
            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-neutral-dark dark:text-neutral">₹</span>
            <input
                type="text"
                inputMode="decimal"
                name={name}
                id={name}
                value={value}
                onChange={onChange}
                className="w-full bg-neutral-light dark:bg-neutral-darkest border border-neutral dark:border-neutral-dark rounded-md p-2 pl-8 placeholder-neutral"
                placeholder="0"
                min="0"
            />
        </div>
    </div>
);


const TaxCalculator: React.FC = () => {
    const financialYearOptions = [
        { value: FinancialYear.FY_2024_25, label: 'FY 2024-2025 (Returns to be filed)' },
        { value: FinancialYear.FY_2025_26, label: 'FY 2025-2026 (Returns to be filed)' },
    ];

    const [formData, setFormData] = useState<FormData>({
        financialYear: FinancialYear.FY_2024_25,
        ageGroup: AgeGroup.BELOW_60,
        income: {
            salary: 1000000,
            exemptAllowances: 0,
            interest: 0,
            selfOccupiedInterest: 0,
            rental: 0,
            letOutInterest: 0,
            digitalAssets: 0,
            other: 0,
        },
        selectedDeductions: {},
    });
    const [taxResults, setTaxResults] = useState<TaxResults | null>(null);
    const { calculateTaxes } = useTaxCalculator();
    const resultsRef = useRef<HTMLDivElement>(null);
    const [modalContent, setModalContent] = useState<{ title: string; content: React.ReactNode } | null>(null);

    const formatForInput = (num: number): string => {
        if (num === 0) return '';
        return new Intl.NumberFormat('en-IN').format(num);
    };

    const parseFromInput = (str: string): number => {
        return parseFloat(str.replace(/,/g, '')) || 0;
    };

    useEffect(() => {
        if (taxResults) {
            resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [taxResults]);
    
    const handleFinancialYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFormData(prev => ({ ...prev, financialYear: e.target.value as FinancialYear }));
    };

    const handleIncomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const numericValue = parseFromInput(value);
        setFormData(prev => ({
            ...prev,
            income: {
                ...prev.income,
                [name]: numericValue,
            }
        }));
    };
    
    const handleAgeGroupChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFormData(prev => ({ ...prev, ageGroup: e.target.value as AgeGroup }));
    };

    const handleDeductionChange = (id: DeductionKey, checked: boolean) => {
        const newDeductions = { ...formData.selectedDeductions };
        if (checked) {
            newDeductions[id] = 0;
        } else {
            delete newDeductions[id];
        }
        setFormData(prev => ({ ...prev, selectedDeductions: newDeductions }));
    };

    const handleDeductionAmountChange = (id: DeductionKey, value: string) => {
        const numericValue = parseFromInput(value);
        const deductionInfo = DEDUCTION_OPTIONS.find(d => d.id === id);
        const cappedAmount = Math.min(numericValue, deductionInfo?.limit || Infinity);
        setFormData(prev => ({
            ...prev,
            selectedDeductions: {
                ...prev.selectedDeductions,
                [id]: cappedAmount,
            },
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const results = calculateTaxes(formData);
        setTaxResults(results);
    };

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(value);
    };

    const formatIndianNumber = (value: number) => {
         return new Intl.NumberFormat('en-IN').format(value);
    };

    const getFinancialYearText = (fy: FinancialYear): string => {
        return financialYearOptions.find(opt => opt.value === fy)?.label || '';
    };

    const incomeFields: { name: keyof IncomeData, label: string, info?: React.ReactNode }[] = [
        { name: 'salary', label: 'Income from Salary' },
        { name: 'exemptAllowances', label: 'Exempt allowances (e.g. LTA)' },
        { name: 'interest', label: 'Income from interest' },
        { 
            name: 'selfOccupiedInterest', 
            label: 'Interest on home loan - Self occupied',
            info: (
                 <>
                    <h4 className="font-semibold text-primary dark:text-primary-light mb-2">Section 24(b) – Home Loan Interest</h4>
                    <p className="mb-2"><strong>Limit:</strong> ₹2,00,000 per year</p>
                    <p className="mb-2"><strong>Applies to:</strong> Interest paid on a housing loan for a self-occupied property.</p>
                    <h5 className="font-semibold mt-3 mb-1">Conditions:</h5>
                    <ul className="list-disc list-inside space-y-1">
                        <li>The loan must be for the purchase or construction of the property.</li>
                        <li>Construction must be completed within 5 years from the end of the financial year in which the loan was taken.</li>
                    </ul>
                    <p className="mt-3 text-sm text-neutral-dark/80 dark:text-neutral-light/80">
                        For a let-out property, the full interest amount can be claimed, but the overall loss from house property that can be set off against other income is capped at ₹2,00,000.
                    </p>
                </>
            )
        },
        { name: 'rental', label: 'Rental income received' },
        { name: 'letOutInterest', label: 'Interest on Home Loan - Let Out' },
        { name: 'digitalAssets', label: 'Income from digital assets' },
        { name: 'other', label: 'Other income' },
    ];
    
    const isSenior = formData.ageGroup === AgeGroup.SENIOR || formData.ageGroup === AgeGroup.SUPER_SENIOR;

    const availableDeductions = DEDUCTION_OPTIONS.filter(d => {
        if (isSenior) {
            return d.id !== DeductionKey.SEC_80TTA;
        }
        return d.id !== DeductionKey.SEC_80TTB;
    });

    const renderResultCard = (title: string, result: TaxCalculationResult, isRecommended: boolean) => (
        <Card className={`flex-1 ${isRecommended ? 'border-2 border-secondary' : 'border-2 border-transparent'}`}>
            <h3 className="text-xl font-bold text-center text-primary-dark dark:text-primary-light mb-4">{title}</h3>
            {isRecommended && <div className="text-center text-sm font-semibold bg-secondary/20 text-secondary-dark rounded-full px-3 py-1 mb-4">Recommended</div>}
            <div className="space-y-3 text-neutral-dark dark:text-neutral-light">
                <p className="flex justify-between"><span>Taxable Income:</span> <span className="font-semibold">{formatCurrency(result.taxableIncome)}</span></p>
                <p className="flex justify-between"><span>Base Tax (before Surcharge):</span> <span className="font-semibold">{formatCurrency(result.baseTax)}</span></p>
                {result.surcharge > 0 && (
                    <p className="flex justify-between"><span>Surcharge:</span> <span className="font-semibold">{formatCurrency(result.surcharge)}</span></p>
                )}
                <p className="flex justify-between"><span>Health & Edu Cess (4%):</span> <span className="font-semibold">{formatCurrency(result.cess)}</span></p>
                <hr className="border-neutral/50 dark:border-neutral-darkest"/>
                <p className="flex justify-between text-lg font-bold"><span>Total Tax Liability:</span> <span className="text-primary-dark dark:text-primary-light">{formatCurrency(result.totalTax)}</span></p>
                {result.isRebateApplicable && <p className="text-xs text-center text-green-600 dark:text-green-400">Tax rebate under Section 87A is applicable.</p>}
            </div>
        </Card>
    );

    return (
        <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-8">
            <h1 className="text-4xl font-extrabold text-center text-neutral-darkest dark:text-white tracking-tight">Income Tax Calculator</h1>
            <p className="text-center text-neutral-dark dark:text-neutral-light max-w-2xl mx-auto">Enter your financial details to compare your tax liability under the Old and New tax regimes for {getFinancialYearText(formData.financialYear)}.</p>
            
            <form onSubmit={handleSubmit}>
                <Card className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left side: Income & Age */}
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-neutral-darkest dark:text-white">Your Income & Details</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                            <div className="md:col-span-2">
                                <label htmlFor="financialYear" className="block text-sm font-medium text-neutral-dark dark:text-neutral-light mb-1">Financial Year</label>
                                <select name="financialYear" id="financialYear" value={formData.financialYear} onChange={handleFinancialYearChange} className="w-full bg-neutral-light dark:bg-neutral-darkest border border-neutral dark:border-neutral-dark rounded-md p-2">
                                    {financialYearOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                                </select>
                            </div>
                             <div className="md:col-span-2">
                                <label htmlFor="ageGroup" className="block text-sm font-medium text-neutral-dark dark:text-neutral-light mb-1">Your Age Group</label>
                                <select name="ageGroup" id="ageGroup" value={formData.ageGroup} onChange={handleAgeGroupChange} className="w-full bg-neutral-light dark:bg-neutral-darkest border border-neutral dark:border-neutral-dark rounded-md p-2">
                                    <option value={AgeGroup.BELOW_60}>Below 60 years</option>
                                    <option value={AgeGroup.SENIOR}>60 to 80 years (Senior Citizen)</option>
                                    <option value={AgeGroup.SUPER_SENIOR}>Above 80 years (Super Senior Citizen)</option>
                                </select>
                            </div>
                            {incomeFields.map((field) => (
                                <IncomeInput
                                    key={field.name}
                                    label={field.label}
                                    name={field.name}
                                    value={formatForInput(formData.income[field.name])}
                                    onChange={handleIncomeChange}
                                    onInfoClick={field.info ? () => setModalContent({ title: field.label, content: field.info }) : undefined}
                                />
                            ))}
                        </div>

                        <div className="bg-blue-100 dark:bg-blue-900/30 border-l-4 border-blue-500 text-blue-800 dark:text-blue-300 p-4 rounded-r-lg">
                           <p className="text-sm">A standard deduction of {formatCurrency(STANDARD_DEDUCTION_OLD)} (Old Regime) and {formatCurrency(STANDARD_DEDUCTION_NEW)} (New Regime) is pre-applied to your income, as per current tax laws for salaried individuals.</p>
                        </div>
                    </div>
                    
                    {/* Right side: Deductions */}
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-neutral-darkest dark:text-white">Eligible Deductions & Exemptions (for Old Regime)</h2>
                        <div className="space-y-4 max-h-[30rem] overflow-y-auto pr-2">
                            {availableDeductions.map(deduction => (
                                <div key={deduction.id}>
                                    <div className="flex items-center justify-between">
                                        <label htmlFor={deduction.id} className="flex items-center space-x-3 text-neutral-dark dark:text-neutral-light">
                                            <input type="checkbox" id={deduction.id} checked={formData.selectedDeductions[deduction.id] !== undefined} onChange={(e) => handleDeductionChange(deduction.id, e.target.checked)} className="h-4 w-4 text-primary rounded border-neutral-dark" />
                                            <span>{deduction.label}</span>
                                        </label>
                                        <button 
                                            type="button" 
                                            onClick={() => setModalContent({ title: deduction.label, content: deduction.detailedDescription })} 
                                            className="ml-2 p-1 rounded-full hover:bg-neutral/20 dark:hover:bg-neutral-dark"
                                            aria-label={`More information about ${deduction.label}`}
                                        >
                                            <InfoIcon className="w-4 h-4 text-primary" />
                                        </button>
                                    </div>
                                    {formData.selectedDeductions[deduction.id] !== undefined && (
                                        <div className="mt-2 ml-7">
                                            <label htmlFor={`amount-${deduction.id}`} className="text-xs text-neutral-dark/80 dark:text-neutral-light/80">{deduction.description}</label>
                                            <input
                                                type="text"
                                                inputMode="decimal"
                                                id={`amount-${deduction.id}`}
                                                value={formatForInput(formData.selectedDeductions[deduction.id] || 0)}
                                                onChange={(e) => handleDeductionAmountChange(deduction.id, e.target.value)}
                                                className="w-full mt-1 bg-neutral-light dark:bg-neutral-darkest border border-neutral dark:border-neutral-dark rounded-md p-2 text-sm"
                                                placeholder={deduction.limit !== Infinity ? `Max ${formatIndianNumber(deduction.limit)}` : 'Amount'}
                                                max={deduction.limit !== Infinity ? deduction.limit : undefined}
                                                min="0"
                                            />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="lg:col-span-2 text-center mt-4">
                        <button type="submit" className="inline-flex items-center gap-2 bg-primary hover:bg-primary-light text-white font-bold py-3 px-8 rounded-full shadow-lg transition-transform transform hover:scale-105">
                            <CalculatorIcon className="w-6 h-6" />
                            Calculate Tax
                        </button>
                    </div>
                </Card>
            </form>

            {taxResults && (
                <div ref={resultsRef} className="space-y-8">
                    <h2 className="text-3xl font-bold text-center text-neutral-darkest dark:text-white">Your Tax Comparison</h2>
                    <div className="flex flex-col md:flex-row gap-8">
                        {renderResultCard('Old Regime', taxResults.oldRegime, taxResults.oldRegime.totalTax < taxResults.newRegime.totalTax)}
                        {renderResultCard('New Regime', taxResults.newRegime, taxResults.newRegime.totalTax <= taxResults.oldRegime.totalTax)}
                    </div>
                     <div className="text-center text-sm text-neutral-dark dark:text-neutral-light p-4 bg-neutral-light/50 dark:bg-neutral-dark/30 rounded-lg space-y-2">
                        <p><strong>Disclaimer:</strong> This calculator is for illustrative purposes only. Consult a tax professional for accurate financial advice.</p>
                        <p className="text-lg font-semibold text-secondary">Use our TaxGPT if any queries in income tax.</p>
                     </div>
                </div>
            )}
            
            {modalContent && (
                <DeductionInfoModal
                    title={modalContent.title}
                    onClose={() => setModalContent(null)}
                >
                    {modalContent.content}
                </DeductionInfoModal>
            )}
        </div>
    );
};

export default TaxCalculator;