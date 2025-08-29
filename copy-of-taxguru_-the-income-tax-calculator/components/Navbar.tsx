import React from 'react';
import CalculatorIcon from './icons/CalculatorIcon';
import InfoIcon from './icons/InfoIcon';
import ChatIcon from './icons/ChatIcon';
import SunIcon from './icons/SunIcon';
import MoonIcon from './icons/MoonIcon';
import SystemIcon from './icons/SystemIcon';

type View = 'calculator' | 'about';
type Theme = 'light' | 'dark' | 'system';

interface NavbarProps {
    activeView: View;
    setActiveView: (view: View) => void;
    isChatbotOpen: boolean;
    toggleChatbot: () => void;
    theme: Theme;
    toggleTheme: () => void;
}

interface NavItemProps {
    children: React.ReactNode;
    isActive: boolean;
    onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ children, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            isActive
                ? 'bg-primary text-white shadow-md font-semibold'
                : 'text-neutral-dark dark:text-neutral-light hover:bg-neutral/50 dark:hover:bg-neutral-dark'
        }`}
    >
        {children}
    </button>
);

const Navbar: React.FC<NavbarProps> = ({ activeView, setActiveView, isChatbotOpen, toggleChatbot, theme, toggleTheme }) => {
    const renderThemeIcon = () => {
        switch (theme) {
            case 'light':
                return <SunIcon className="h-5 w-5" />;
            case 'dark':
                return <MoonIcon className="h-5 w-5" />;
            case 'system':
            default:
                return <SystemIcon className="h-5 w-5" />;
        }
    };
    
    return (
        <header className="bg-white/80 dark:bg-neutral-dark/80 backdrop-blur-sm sticky top-0 z-40 shadow-sm">
            <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex-shrink-0">
                        <div className="flex items-baseline">
                            <span className="text-2xl font-bold text-primary-dark dark:text-primary-light">TaxGuru</span>
                            <span className="text-xl font-bold text-primary-dark dark:text-primary-light ml-2 hidden md:inline">: The Income Tax Calculator</span>
                        </div>
                    </div>
                    <div className="flex items-center space-x-1 sm:space-x-2">
                        <NavItem isActive={activeView === 'calculator'} onClick={() => setActiveView('calculator')}>
                            <CalculatorIcon className="h-5 w-5"/>
                            <span className="hidden sm:inline">Calculator</span>
                        </NavItem>
                        <NavItem isActive={activeView === 'about'} onClick={() => setActiveView('about')}>
                            <InfoIcon className="h-5 w-5"/>
                            <span className="hidden sm:inline">Tax Guide</span>
                        </NavItem>
                        <NavItem isActive={isChatbotOpen} onClick={toggleChatbot}>
                            <ChatIcon className="h-5 w-5"/>
                            <span className="hidden sm:inline">TaxGPT</span>
                        </NavItem>
                        <button
                            onClick={toggleTheme}
                            className="flex items-center justify-center p-2 rounded-md text-neutral-dark dark:text-neutral-light hover:bg-neutral/50 dark:hover:bg-neutral-dark transition-colors"
                            aria-label={`Switch to ${theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light'} mode`}
                        >
                            {renderThemeIcon()}
                        </button>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;