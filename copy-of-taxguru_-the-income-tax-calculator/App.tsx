
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import TaxCalculator from './components/TaxCalculator';
import AboutTax from './components/AboutTax';
import Chatbot from './components/Chatbot';
import Footer from './components/Footer';

type View = 'calculator' | 'about';
type Theme = 'light' | 'dark' | 'system';

const App: React.FC = () => {
    const [activeView, setActiveView] = useState<View>('calculator');
    const [isChatbotOpen, setIsChatbotOpen] = useState(false);
    const [theme, setTheme] = useState<Theme>(() => {
        const savedTheme = localStorage.getItem('theme');
        return (savedTheme as Theme) || 'system';
    });

    useEffect(() => {
        const root = window.document.documentElement;
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

        const applyTheme = (currentTheme: Theme) => {
            localStorage.setItem('theme', currentTheme);
            if (currentTheme === 'dark' || (currentTheme === 'system' && mediaQuery.matches)) {
                root.classList.add('dark');
            } else {
                root.classList.remove('dark');
            }
        };

        applyTheme(theme);

        const handleChange = (e: MediaQueryListEvent) => {
            if (theme === 'system') {
                if (e.matches) {
                    root.classList.add('dark');
                } else {
                    root.classList.remove('dark');
                }
            }
        };

        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prevTheme => {
            if (prevTheme === 'light') return 'dark';
            if (prevTheme === 'dark') return 'system';
            return 'light'; // from 'system'
        });
    };


    const renderContent = () => {
        switch (activeView) {
            case 'calculator':
                return <TaxCalculator />;
            case 'about':
                return <AboutTax />;
            default:
                return <TaxCalculator />;
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-neutral-light dark:bg-neutral-darkest text-neutral-darkest dark:text-neutral-light">
            <Navbar 
                activeView={activeView} 
                setActiveView={setActiveView} 
                isChatbotOpen={isChatbotOpen}
                toggleChatbot={() => setIsChatbotOpen(prev => !prev)}
                theme={theme}
                toggleTheme={toggleTheme}
            />
            <main className="flex-grow">
                {renderContent()}
                {isChatbotOpen && <Chatbot onClose={() => setIsChatbotOpen(false)} />}
            </main>
            <Footer />
        </div>
    );
};

export default App;