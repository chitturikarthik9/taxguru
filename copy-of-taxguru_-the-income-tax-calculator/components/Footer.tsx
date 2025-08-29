import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-white dark:bg-neutral-dark mt-12 py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-neutral-dark dark:text-neutral-light">
                <p>&copy; {new Date().getFullYear()} TaxGuru: The Income Tax Calculator. All Rights Reserved.</p>
                <p className="text-xs mt-1">This tool is for informational purposes only. Always consult a certified financial advisor.</p>
            </div>
        </footer>
    );
};

export default Footer;