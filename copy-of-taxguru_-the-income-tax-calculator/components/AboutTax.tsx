
import React, { useState } from 'react';
import Card from './Card';

// Modal component for displaying the benefits
interface InfoModalProps {
    title: string;
    children: React.ReactNode;
    onClose: () => void;
    dialogClassName?: string;
}

const InfoModal: React.FC<InfoModalProps> = ({ title, children, onClose, dialogClassName = 'max-w-3xl' }) => (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4" onClick={onClose} aria-modal="true" role="dialog">
        <div className={`bg-white dark:bg-neutral-dark rounded-xl shadow-2xl w-full max-h-[90vh] flex flex-col ${dialogClassName}`} onClick={e => e.stopPropagation()}>
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

const benefitsData = [
    {
        title: '1️⃣ Nation-Building Contribution 🛣️🏥📚',
        desc: "When you pay taxes, you're directly contributing to the country’s development.",
        list: { title: '✅ Taxes fund:', items: ['Roads, highways, and transportation systems 🛣️', 'Government hospitals and public health infrastructure 🏥', 'Schools and colleges 🏫', 'Defence and police services 🛡️👮', 'Emergency relief and disaster management 🚒', 'Clean water and sanitation projects 🚰'] },
        why: 'Every rupee paid as tax helps build a stronger, more self-reliant India.',
    },
    {
        title: '2️⃣ Legal Obligation & National Responsibility ⚖️📜',
        desc: 'According to the Income Tax Act, it is mandatory to pay income tax if your income exceeds the basic exemption limit. Filing taxes on time helps maintain transparency and uphold civic responsibility.',
        why: "Avoids legal issues, ensures you're a responsible and law-abiding citizen.",
    },
    {
        title: '3️⃣ Improves Your Financial Reputation 🏦💳',
        desc: 'Filing ITR regularly shows you’re financially disciplined. This is crucial when applying for:',
        list: { items: ['Personal or home loans 🏠', 'Vehicle loans 🚗', 'Credit cards 💳', 'Insurance policies with high cover 🛡️'] },
        why: 'Lenders often request 2–3 years of ITR as proof of stable income.',
    },
    {
        title: '4️⃣ Ease in Visa Processing & International Travel ✈️🛂',
        desc: 'Embassies of countries like the US, UK, Canada, Germany, and Schengen nations often ask for ITRs of the past 2–3 years while processing visas.',
        why: 'Regular ITR filing makes your visa process faster and more credible.',
    },
    {
        title: '5️⃣ Claiming Tax Refunds 💰📩',
        desc: 'If excess tax is deducted (like TDS from salary, fixed deposits, or rent), you can claim the refund only by filing your ITR.',
        why: 'You can recover thousands of rupees, especially if you’re eligible for deductions under 80C, 80D, etc.',
    },
    {
        title: '6️⃣ Helps in Carrying Forward Losses 📉➡️📈',
        desc: 'If you incur losses in business, property, or stocks, you can carry them forward up to 8 years — but only if you file your ITR before the due date.',
        why: 'It helps reduce tax liability in future years when you make profits.',
    },
    {
        title: '7️⃣ Required for Government Tenders & Contracts 🧾📁',
        desc: 'Many government departments, PSUs, and corporate agencies require the submission of ITRs before assigning:',
        list: { items: ['Work contracts', 'Consultancy projects', 'Vendor registrations'] },
        why: 'Builds your eligibility to work with the government or large clients.',
    },
    {
        title: '8️⃣ Important for Freelancers, Consultants & Self-Employed 💼📊',
        desc: 'For people with no Form 16 (like freelancers, gig workers, or small business owners), ITR is the only proof of income. It acts as an income certificate for:',
        list: { items: ['Loan approvals', 'Renting properties', 'Securing business investments'] },
        why: 'It is the primary document to prove your financial standing and is essential for various financial applications.',
    },
    {
        title: '9️⃣ Avoids Penalties, Notices & Prosecution 🚫📮',
        desc: 'If you fail to file your tax return:',
        list: { items: ['You may be charged late fees of ₹1,000 to ₹5,000 under Section 234F', 'You’ll pay interest on unpaid tax under Section 234A/B/C', 'In serious cases, you can face prosecution and up to 7 years’ imprisonment'] },
        why: 'Filing on time avoids all unnecessary financial and legal troubles.',
    },
    {
        title: '🔟 Clean Financial Records & Peace of Mind 🧘‍♂️🗂️',
        desc: 'Having your taxes filed gives you confidence and documentation for:',
        list: { items: ['Personal record keeping', 'Financial planning', 'Audit protection'] },
        why: 'No stress during scrutiny or income verification.',
    },
    {
        title: '1️⃣1️⃣ Makes You Eligible for Subsidies & Schemes 🏠🎓',
        desc: 'Many government subsidies and schemes require ITR as proof of eligibility, including:',
        list: { items: ['PMAY (Pradhan Mantri Awas Yojana) 🏠', 'Education Loans under Vidyalakshmi Scheme 🎓', 'Start-up incentives and MSME benefits 📈'] },
        why: 'Helps unlock government support when you need it.',
    },
    {
        title: '1️⃣2️⃣ Useful for High-Value Transactions 💼🏦',
        desc: 'You’ll need ITR copies for documentation if you perform high-value transactions such as:',
        list: { items: ['Buy/sell property', 'Invest large sums', 'Purchase luxury items or insurance > ₹50,000'] },
        why: 'Keeps you in good standing with banks and the IT department.',
    },
    {
        title: '1️⃣3️⃣ Eligibility for Capital Gains Benefits 📊📄',
        desc: 'When selling shares, mutual funds, or property, you can use capital gain exemptions (like Section 54, 54EC) — but only if you file your ITR correctly.',
        why: 'Saves significant tax during asset sales.',
    },
    {
        title: '1️⃣4️⃣ Claim Deductions & Save More 💸🧾',
        desc: 'Filing ITR lets you claim:',
        list: { items: ['Section 80C: Investments, LIC, PF, tuition fees', 'Section 80D: Medical insurance', 'Section 80G: Donations', 'Section 24(b): Home loan interest'] },
        why: 'You can save ₹50,000 to ₹1.5 lakh+ per year!',
    },
    {
        title: '1️⃣5️⃣ Helps During Insurance Claims 🏥📄',
        desc: 'Some high-cover term insurance or health policies need ITR for:',
        list: { items: ['Proving income during claim settlement', 'Justifying high sum assured cover'] },
        why: 'Ensures faster, smoother claim process.',
    },
    {
        title: '1️⃣6️⃣ Income Proof for Property Rentals 🏢🧾',
        desc: 'Landlords and societies may require ITR:',
        list: { items: ['When renting a flat', 'For high-end apartments or gated communities'] },
        why: 'Establishes credibility as a reliable tenant.',
    },
    {
        title: '1️⃣7️⃣ Contributes to a Transparent Economy 🌐📊',
        desc: 'When more people pay taxes, black money circulation reduces, and India moves toward a cashless, formal, and strong economy.',
        why: 'It increases GDP and brings down inflation and corruption.',
    }
];

const BenefitsContent = () => (
    <div className="space-y-6">
        <p>Paying income tax is more than just a legal obligation — it reflects your financial discipline, builds national infrastructure, and opens up various personal and business opportunities. Here's a detailed breakdown of every benefit of paying taxes and filing your Income Tax Return (ITR) regularly:</p>
        
        {benefitsData.map((item, index) => (
            <div key={index}>
                <h4 className="text-lg font-bold text-primary dark:text-primary-light mb-2">{item.title}</h4>
                {item.desc && <p className="mb-2">{item.desc}</p>}
                {item.list && (
                    <div className="bg-neutral-light/50 dark:bg-neutral-dark/30 p-3 rounded-lg my-2">
                        {item.list.title && <p className="font-semibold mb-1">{item.list.title}</p>}
                        <ul className="list-disc list-inside space-y-1 pl-2">
                            {item.list.items.map((li, i) => <li key={i}>{li}</li>)}
                        </ul>
                    </div>
                )}
                {item.why && <p className="mt-2 text-sm italic text-neutral-dark/80 dark:text-neutral-light/80">📌 <strong>Why it matters:</strong> {item.why}</p>}
            </div>
        ))}
    </div>
);

const consequencesData = [
  { title: '⚖️ 1. Legal Penalties & Fines', desc: 'Under the Income Tax Act, 1961, non-compliance with income tax regulations invites strict monetary penalties.', subSections: [ { title: '🔸 Late Filing Penalty (Section 234F)', desc: 'If you file your ITR after the due date:', list: ['₹5,000 penalty if filed after the due date but before December 31.', '₹10,000 if filed after December 31.', '₹1,000 for individuals with income below ₹5 lakhs.'] }, { title: '🔸 Underreporting/ Misreporting Income', list: ['Underreporting: Penalty up to 50% of the tax due.', 'Misreporting: Penalty up to 200% of the tax evaded (Section 270A).'] } ] },
  { title: '🧮 2. Interest on Tax Due', desc: 'If you delay paying tax or pay less than required:', list: ['Section 234A – Interest on late filing @ 1% per month.', 'Section 234B – If advance tax is not paid or short-paid.', 'Section 234C – If advance tax is not paid in installments as required.'], why: '📉 The interest keeps accumulating monthly, increasing your overall liability significantly.' },
  { title: '👮‍♂️ 3. Prosecution & Imprisonment', desc: 'For willful tax evasion or fraudulent filing:', list: ['Minimum imprisonment: 3 months', 'Maximum imprisonment: 7 years', 'Plus, fine may also be imposed.'], note: '📌 Examples that can lead to prosecution: Not filing ITR despite being liable, Concealing income, Submitting fake documents, Failing to deposit TDS deducted.' },
  { title: '🏦 4. Attachment of Bank Accounts or Property', desc: 'The Income Tax Department can:', list: ['Freeze your bank accounts', 'Seize your movable and immovable assets', 'Auction your property to recover pending dues.'], why: '💥 Even salary accounts, FDs, mutual funds, or vehicles can be attached.' },
  { title: '🚫 5. Ineligibility for Loans or Credit Cards', desc: 'Banks require ITRs as proof of income. Without ITR:', list: ['❌ No home/car/personal loans', '❌ Rejected credit card applications', '📉 Damaged credit score'], why: '⛔ Even co-borrower eligibility may be affected if one party hasn\'t filed taxes.' },
  { title: '🌍 6. Rejection of Visa Applications', desc: 'Most foreign embassies (USA, UK, Canada, Schengen) ask for 3 years of ITRs.', why: 'No ITR = ❌ Visa denial or delays. 🛫 Even for tourist, student, or work visas, non-filers face strict scrutiny or rejection.' },
];

const ConsequencesContent = () => (
    <div className="space-y-6">
        {consequencesData.map((item, index) => (
            <div key={index}>
                <h4 className="text-lg font-bold text-red-600 dark:text-red-400 mb-2">{item.title}</h4>
                {item.desc && <p className="mb-2">{item.desc}</p>}
                 {item.subSections && item.subSections.map((sub, i) => (
                    <div key={i} className="pl-4 border-l-2 border-neutral dark:border-neutral-dark/50 my-2">
                        <h5 className="font-semibold text-neutral-darkest dark:text-white mb-1">{sub.title}</h5>
                        {sub.desc && <p className="mb-1 text-sm">{sub.desc}</p>}
                        {sub.list && <ul className="list-disc list-inside space-y-1 pl-2 text-sm">{sub.list.map((li, idx) => <li key={idx}>{li}</li>)}</ul>}
                    </div>
                ))}
                {item.list && (
                    <div className="bg-neutral-light/50 dark:bg-neutral-dark/30 p-3 rounded-lg my-2">
                        <ul className="list-disc list-inside space-y-1 pl-2">{item.list.map((li, i) => <li key={i}>{li}</li>)}</ul>
                    </div>
                )}
                {item.note && <p className="mt-2 text-sm italic text-neutral-dark/80 dark:text-neutral-light/80">{item.note}</p>}
                {item.why && <p className="mt-2 text-sm font-semibold text-neutral-dark/80 dark:text-neutral-light/80">{item.why}</p>}
            </div>
        ))}
        <div className="mt-8 pt-4 border-t border-neutral dark:border-neutral-darkest">
            <h4 className="font-bold text-lg text-red-600 dark:text-red-400">🚫 Conclusion: Avoiding Tax = Costly Mistake 😟</h4>
            <p className="mt-2">💡 Non-payment or avoidance of income tax in India may seem small initially, but it leads to a long list of financial, legal, and personal problems. From hefty penalties to jail time, the consequences are real and impactful.</p>
        </div>
    </div>
);

const NewRegimeContent = () => (
    <div className="space-y-6">
        <h4 className="text-lg font-bold text-primary dark:text-primary-light">📊 Income Tax Slabs and Rates</h4>
        <div className="border border-neutral dark:border-neutral-dark rounded-lg p-4 space-y-2">
            <div className="flex justify-between font-semibold border-b pb-2"><span>Annual Income</span><span>Tax Rate</span></div>
            <div className="flex justify-between"><span>Up to ₹4,00,000</span><span>Nil</span></div>
            <div className="flex justify-between"><span>₹4,00,001 to ₹8,00,000</span><span>5%</span></div>
            <div className="flex justify-between"><span>₹8,00,001 to ₹12,00,000</span><span>10%</span></div>
            <div className="flex justify-between"><span>₹12,00,001 to ₹16,00,000</span><span>15%</span></div>
            <div className="flex justify-between"><span>₹16,00,001 to ₹20,00,000</span><span>20%</span></div>
            <div className="flex justify-between"><span>₹20,00,001 to ₹24,00,000</span><span>25%</span></div>
            <div className="flex justify-between"><span>Above ₹24,00,000</span><span>30%</span></div>
        </div>
        <p>✅ These are applicable to all individuals: salaried, pensioners, self-employed, and HUFs opting for the new regime.</p>

        <h4 className="text-lg font-bold text-primary dark:text-primary-light">🧮 Standard Deduction</h4>
        <p>Under the new regime, a standard deduction of <strong>₹75,000</strong> is available to salaried employees and pensioners (including family pension).</p>
        <p>📝 This is a flat deduction applied to your gross salary/pension income.</p>

        <h4 className="text-lg font-bold text-primary dark:text-primary-light">💸 Rebate under Section 87A</h4>
        <p>Taxpayers with net taxable income up to <strong>₹12,00,000</strong> are eligible for a rebate of <strong>₹60,000</strong>. This means if your tax liability is ₹60,000 or less, you pay Zero tax.</p>
        
        <h4 className="text-lg font-bold text-primary dark:text-primary-light">💼 Surcharge on High Income</h4>
        <div className="border border-neutral dark:border-neutral-dark rounded-lg p-4 space-y-2">
            <div className="flex justify-between font-semibold border-b pb-2"><span>Total Income</span><span>Surcharge Rate</span></div>
            <div className="flex justify-between"><span>₹50 lakh – ₹1 crore</span><span>10%</span></div>
            <div className="flex justify-between"><span>₹1 crore – ₹2 crore</span><span>15%</span></div>
            <div className="flex justify-between"><span>₹2 crore – ₹5 crore</span><span>25%</span></div>
            <div className="flex justify-between"><span>Above ₹5 crore</span><span>25% (capped)</span></div>
        </div>

        <h4 className="text-lg font-bold text-primary dark:text-primary-light">⚠️ No Deductions Allowed (Except Few)</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <h5 className="font-semibold mb-2">🚫 Not Allowed:</h5>
                <ul className="list-disc list-inside space-y-1">
                    <li>Section 80C, 80D, 80E</li>
                    <li>HRA & LTA exemptions</li>
                    <li>Home loan interest (self-occupied)</li>
                </ul>
            </div>
            <div>
                <h5 className="font-semibold mb-2">✅ Allowed:</h5>
                <ul className="list-disc list-inside space-y-1">
                    <li>Standard Deduction (₹75,000)</li>
                    <li>Employer’s NPS contribution</li>
                    <li>Agniveer Corpus Fund</li>
                </ul>
            </div>
        </div>
        
        <h4 className="text-lg font-bold text-primary dark:text-primary-light">📝 Key Highlights</h4>
        <ul className="list-disc list-inside space-y-1">
            <li>More tax-friendly slabs for middle class.</li>
            <li>Attractive for people with fewer investments or deductions.</li>
            <li>Simpler compliance, lesser documentation.</li>
            <li><strong>₹12 lakh income effectively tax-free</strong> if you claim standard deduction and 87A rebate.</li>
        </ul>
    </div>
);

const OldRegimeContent = () => (
    <div className="space-y-6">
        <h4 className="text-lg font-bold text-primary dark:text-primary-light">📊 Income Tax Slabs and Rates</h4>
        <div className="space-y-4">
            <div className="border border-neutral dark:border-neutral-dark rounded-lg p-4">
                <h5 className="font-semibold mb-2">Below 60 Years</h5>
                <div className="flex justify-between"><span>Up to ₹2,50,000</span><span>Nil</span></div>
                <div className="flex justify-between"><span>₹2,50,001 to ₹5,00,000</span><span>5%</span></div>
                <div className="flex justify-between"><span>₹5,00,001 to ₹10,00,000</span><span>20%</span></div>
                <div className="flex justify-between"><span>Above ₹10,00,000</span><span>30%</span></div>
            </div>
            <div className="border border-neutral dark:border-neutral-dark rounded-lg p-4">
                <h5 className="font-semibold mb-2">60 to 80 Years (Senior Citizens)</h5>
                <div className="flex justify-between"><span>Up to ₹3,00,000</span><span>Nil</span></div>
                <div className="flex justify-between"><span>₹3,00,001 to ₹5,00,000</span><span>5%</span></div>
                <div className="flex justify-between"><span>₹5,00,001 to ₹10,00,000</span><span>20%</span></div>
                <div className="flex justify-between"><span>Above ₹10,00,000</span><span>30%</span></div>
            </div>
             <div className="border border-neutral dark:border-neutral-dark rounded-lg p-4">
                <h5 className="font-semibold mb-2">Above 80 Years (Super Senior Citizens)</h5>
                <div className="flex justify-between"><span>Up to ₹5,00,000</span><span>Nil</span></div>
                <div className="flex justify-between"><span>₹5,00,001 to ₹10,00,000</span><span>20%</span></div>
                <div className="flex justify-between"><span>Above ₹10,00,000</span><span>30%</span></div>
            </div>
        </div>

        <h4 className="text-lg font-bold text-primary dark:text-primary-light">🧮 Standard Deduction</h4>
        <p>A standard deduction of <strong>₹50,000</strong> is available for salaried employees and pensioners.</p>

        <h4 className="text-lg font-bold text-primary dark:text-primary-light">💸 Rebate under Section 87A</h4>
        <p>A rebate up to <strong>₹12,500</strong> is available for individuals with a net taxable income up to <strong>₹5,00,000</strong>.</p>
        
        <h4 className="text-lg font-bold text-primary dark:text-primary-light">💼 Surcharge on High Income</h4>
        <div className="border border-neutral dark:border-neutral-dark rounded-lg p-4 space-y-2">
            <div className="flex justify-between font-semibold border-b pb-2"><span>Total Income</span><span>Surcharge Rate</span></div>
            <div className="flex justify-between"><span>₹50 lakh – ₹1 crore</span><span>10%</span></div>
            <div className="flex justify-between"><span>₹1 crore – ₹2 crore</span><span>15%</span></div>
            <div className="flex justify-between"><span>₹2 crore – ₹5 crore</span><span>25%</span></div>
            <div className="flex justify-between"><span>Above ₹5 crore</span><span>37%</span></div>
        </div>

        <h4 className="text-lg font-bold text-primary dark:text-primary-light">✅ Key Advantage: Extensive Deductions</h4>
        <p>The biggest draw of the old regime is the ability to claim numerous deductions to lower your taxable income. Popular ones include:</p>
         <ul className="list-disc list-inside space-y-1">
            <li><strong>Section 80C:</strong> Up to ₹1.5 lakh for investments (PPF, ELSS, etc.).</li>
            <li><strong>Section 80D:</strong> For medical insurance premiums.</li>
            <li><strong>HRA Exemption:</strong> For rent paid.</li>
            <li><strong>Home Loan Interest:</strong> Up to ₹2 lakh on self-occupied property.</li>
        </ul>
        
        <h4 className="text-lg font-bold text-primary dark:text-primary-light">📝 Key Highlights</h4>
        <ul className="list-disc list-inside space-y-1">
            <li>Ideal for taxpayers who make full use of available deductions.</li>
            <li>Requires meticulous record-keeping and proof of investments/expenses.</li>
            <li>Higher tax rates compared to the new regime if no deductions are claimed.</li>
        </ul>
    </div>
);

const EfilingGuideContent = () => (
    <div className="space-y-6 text-base">
        <div>
            <h4 className="text-lg font-bold text-primary dark:text-primary-light mb-2">1. Prepare Before You Begin 📝</h4>
            <p className="mb-2">Gather these documents:</p>
            <ul className="list-disc list-inside space-y-1 pl-2">
                <li>🆔 PAN card</li>
                <li>🆔 Aadhaar card</li>
                <li>📄 Form 16 (if salaried)</li>
                <li>🗂️ Form 26AS (tax summary)</li>
                <li>🏦 Bank statements/passbooks</li>
                <li>🧾 Proof of investments (LIC, PPF, ELSS, etc.)</li>
                <li>🏠 Details of other income (interest, rent, capital gains)</li>
                <li>💳 Correct bank account details</li>
            </ul>
        </div>
        <div>
            <h4 className="text-lg font-bold text-primary dark:text-primary-light mb-2">2. Register or Login 🔐</h4>
            <p>Go to: <a href="https://www.incometax.gov.in" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">www.incometax.gov.in</a> 🌐</p>
            <ul className="list-disc list-inside space-y-1 pl-2">
                <li>If new, click Register (use PAN to start).</li>
                <li>If already registered, click Login (enter PAN, password, captcha).</li>
            </ul>
        </div>
        <div>
            <h4 className="text-lg font-bold text-primary dark:text-primary-light mb-2">3. Start the Filing Process 🚦</h4>
             <ul className="list-disc list-inside space-y-1 pl-2">
                <li>On dashboard, click e-File &gt; Income Tax Returns &gt; File Income Tax Return</li>
                <li>Click Start New Filing 🆕</li>
            </ul>
        </div>
         <div>
            <h4 className="text-lg font-bold text-primary dark:text-primary-light mb-2">4. Select Year, Mode, and Status 📅</h4>
            <ul className="list-disc list-inside space-y-1 pl-2">
                <li>Assessment Year: 2025-26</li>
                <li>Filing Mode: Online 💻</li>
                <li>Status: Individual (most users 👤)</li>
            </ul>
        </div>
        <div>
            <h4 className="text-lg font-bold text-primary dark:text-primary-light mb-2">5. Choose ITR Form 📑</h4>
             <p className="mb-2">Let the portal suggest, or pick manually:</p>
            <ul className="list-disc list-inside space-y-1 pl-2">
                <li><strong>ITR-1 (Sahaj):</strong> Salary, 1 house, no capital gains/business</li>
                <li><strong>ITR-2:</strong> Multiple houses, capital gains, foreign assets</li>
                <li><strong>ITR-4:</strong> Presumptive business/professional income</li>
            </ul>
        </div>
        <div>
             <h4 className="text-lg font-bold text-primary dark:text-primary-light mb-2">7. Select Tax Regime ⚖️</h4>
             <p>Choose: New Regime (lower rates, fewer deductions) ✂️ or Old Regime (more deductions) 💸</p>
        </div>
        <div>
            <h4 className="text-lg font-bold text-primary dark:text-primary-light mb-2">8. Fill in the Return 🖊️</h4>
            <ul className="list-disc list-inside space-y-1 pl-2">
                <li><strong>Personal info:</strong> Check/edit name, address, Aadhaar, email, bank details.</li>
                <li><strong>Income details:</strong> Review auto-filled data (from Form 16, bank). Add other income (interest, rent, etc.) 💰</li>
                <li><strong>Deductions:</strong> If old regime, enter 80C, 80D, 80G, etc. 📉</li>
                <li><strong>Tax paid:</strong> Auto-filled from Form 26AS; cross-check amounts ☑️</li>
            </ul>
        </div>
        <div>
            <h4 className="text-lg font-bold text-primary dark:text-primary-light mb-2">9. Validate and Check ✔️</h4>
            <ul className="list-disc list-inside space-y-1 pl-2">
                 <li>Use “Preview” or “Validate” to check.</li>
                 <li>Review all details carefully.</li>
                 <li>Fix any errors the portal highlights 🛠️</li>
            </ul>
        </div>
         <div>
            <h4 className="text-lg font-bold text-primary dark:text-primary-light mb-2">10. Submit and E-Verify 🚀</h4>
            <ul className="list-disc list-inside space-y-1 pl-2">
                 <li>Click Submit to file your return.</li>
                 <li><strong>E-verify:</strong> Use Aadhaar OTP, Net Banking, etc. (fastest! ⏱️)</li>
            </ul>
        </div>
         <div>
            <h4 className="text-lg font-bold text-primary dark:text-primary-light mb-2">11. Download Acknowledgement 📥</h4>
            <p>After e-verification, download/save your ITR-V for records.</p>
        </div>
         <div>
            <h4 className="text-lg font-bold text-primary dark:text-primary-light mb-2">Tips & Reminders 💡</h4>
            <ul className="list-disc list-inside space-y-1 pl-2">
                 <li>Use “Save Draft” 📝 often to avoid data loss.</li>
                 <li>Use ‘Help’ (?) if unsure in any section.</li>
                 <li>Filing deadline is usually July 31 📅</li>
            </ul>
        </div>
    </div>
);


const videoTutorials = [
    {
        lang: 'English',
        embedUrl: 'https://www.youtube.com/embed/MQpbxF_RngI?start=1&autoplay=1&rel=0',
    },
    {
        lang: 'Hindi (हिन्दी)',
        embedUrl: 'https://www.youtube.com/embed/ISRY0MHxKuA?autoplay=1&rel=0',
    },
    {
        lang: 'Kannada (ಕನ್ನಡ)',
        embedUrl: 'https://www.youtube.com/embed/dIuSJrHqPtA?start=291&autoplay=1&rel=0',
    },
    {
        lang: 'Tamil (தமிழ்)',
        embedUrl: 'https://www.youtube.com/embed/bJTvlzfCODw?autoplay=1&rel=0',
    },
    {
        lang: 'Telugu (తెలుగు)',
        embedUrl: 'https://www.youtube.com/embed/7mOK9MiEYMg?autoplay=1&rel=0',
    },
];

const AboutTax: React.FC = () => {
    const [isBenefitsModalOpen, setIsBenefitsModalOpen] = useState(false);
    const [isConsequencesModalOpen, setIsConsequencesModalOpen] = useState(false);
    const [isOldRegimeModalOpen, setIsOldRegimeModalOpen] = useState(false);
    const [isNewRegimeModalOpen, setIsNewRegimeModalOpen] = useState(false);
    const [isEfilingModalOpen, setIsEfilingModalOpen] = useState(false);
    const [activeVideo, setActiveVideo] = useState<{ title: string; src: string } | null>(null);

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-8">
            <h1 className="text-4xl font-extrabold text-center text-neutral-darkest dark:text-white tracking-tight">Tax Guide</h1>
            <p className="text-center text-neutral-dark dark:text-neutral-light max-w-2xl mx-auto">Your comprehensive guide to understanding income tax in India. Learn the basics, why it's important, and how to manage it effectively.</p>

            <div className="space-y-8">
                <Card>
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-xl font-semibold text-center text-neutral-darkest dark:text-white mb-4">Why Bother with Taxes?</h3>
                            <div className="flex justify-center items-center gap-4 flex-wrap">
                                <button
                                    onClick={() => setIsBenefitsModalOpen(true)}
                                    className="inline-flex items-center gap-2 bg-primary hover:bg-primary-light text-white font-bold py-3 px-6 rounded-full shadow-lg transition-transform transform hover:scale-105"
                                >
                                    🌟 View Benefits of Paying Tax
                                </button>
                                <button
                                    onClick={() => setIsConsequencesModalOpen(true)}
                                    className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-transform transform hover:scale-105"
                                >
                                    🚨 View Consequences of Not Paying
                                </button>
                            </div>
                        </div>
                    </div>
                </Card>

                 <Card>
                    <div>
                        <h3 className="text-xl font-semibold text-center text-neutral-darkest dark:text-white mb-4">Choose Your Path: Tax Regimes Explained</h3>
                         <div className="flex justify-center items-center gap-4 flex-wrap">
                             <button
                                onClick={() => setIsOldRegimeModalOpen(true)}
                                className="inline-flex items-center gap-2 bg-neutral-dark hover:bg-neutral-darkest text-white font-bold py-3 px-6 rounded-full shadow-lg transition-transform transform hover:scale-105"
                            >
                                📜 View Old Regime Details
                            </button>
                             <button
                                onClick={() => setIsNewRegimeModalOpen(true)}
                                className="inline-flex items-center gap-2 bg-neutral-dark hover:bg-neutral-darkest text-white font-bold py-3 px-6 rounded-full shadow-lg transition-transform transform hover:scale-105"
                            >
                                🧾 View New Regime Details
                            </button>
                        </div>
                    </div>
                </Card>

                <Card>
                    <div>
                        <h3 className="text-xl font-semibold text-center text-neutral-darkest dark:text-white mb-4">Practical Guides</h3>
                        <div className="flex justify-center items-center gap-4 flex-wrap">
                             <button
                                onClick={() => setIsEfilingModalOpen(true)}
                                className="inline-flex items-center gap-2 bg-secondary hover:bg-secondary-dark text-white font-bold py-3 px-6 rounded-full shadow-lg transition-transform transform hover:scale-105"
                            >
                                📄 How to use the E-Filing Website
                            </button>
                        </div>
                    </div>
                </Card>

                <Card>
                    <div>
                        <h3 className="text-xl font-semibold text-center text-neutral-darkest dark:text-white mb-4">Video Tutorials</h3>
                        <p className="text-center text-neutral-dark dark:text-neutral-light mb-6">Watch these videos for better understanding the Indian tax system</p>
                        <div className="flex justify-center items-center gap-4 flex-wrap">
                            {videoTutorials.map((video) => (
                                <button
                                    key={video.lang}
                                    onClick={() => setActiveVideo({ title: `E-Filing Tutorial (${video.lang})`, src: video.embedUrl })}
                                    className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-transform transform hover:scale-105"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" />
                                    </svg>
                                    <span>{video.lang}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </Card>
            </div>


             {isBenefitsModalOpen && (
                <InfoModal
                    title="🌟 Complete Guide: Advantages of Paying Income Tax in India 🇮🇳"
                    onClose={() => setIsBenefitsModalOpen(false)}
                >
                    <BenefitsContent />
                </InfoModal>
            )}

            {isConsequencesModalOpen && (
                <InfoModal
                    title="🚨📉 Consequences of Not Paying Income Tax in India"
                    onClose={() => setIsConsequencesModalOpen(false)}
                >
                    <ConsequencesContent />
                </InfoModal>
            )}

            {isOldRegimeModalOpen && (
                <InfoModal
                    title="📜 Old Income Tax Regime Details"
                    onClose={() => setIsOldRegimeModalOpen(false)}
                >
                    <OldRegimeContent />
                </InfoModal>
            )}
            
            {isNewRegimeModalOpen && (
                <InfoModal
                    title="🧾 New Income Tax Regime – FY 2025–26 (AY 2026–27)"
                    onClose={() => setIsNewRegimeModalOpen(false)}
                >
                    <NewRegimeContent />
                </InfoModal>
            )}

            {isEfilingModalOpen && (
                <InfoModal
                    title="📄 Step-by-Step Guide: How to use the E-Filing Website"
                    onClose={() => setIsEfilingModalOpen(false)}
                >
                    <EfilingGuideContent />
                </InfoModal>
            )}

            {activeVideo && (
                <InfoModal
                    title={activeVideo.title}
                    onClose={() => setActiveVideo(null)}
                    dialogClassName="max-w-4xl"
                >
                     <div className="relative w-full overflow-hidden rounded-lg" style={{ paddingTop: '56.25%' }}>
                        <iframe
                            className="absolute top-0 left-0 w-full h-full"
                            src={activeVideo.src}
                            title={activeVideo.title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen>
                        </iframe>
                    </div>
                </InfoModal>
            )}
        </div>
    );
};

export default AboutTax;