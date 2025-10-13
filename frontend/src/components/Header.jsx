import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ThemeToggle from './ThemeToggle';

const LogoutButton = () => {
    const { logout } = useAuth();
    const onLogout = () => {
        logout();
        window.location.href = '/';
    };

    return (
        <button
            onClick={onLogout}
            className="h-9 w-9 rounded-full flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700/50 hover:text-red-500 dark:hover:text-red-400 transition-all"
            aria-label="Logout"
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
        </button>
    );
};

const Header = () => {
    const { user } = useAuth();

    const getNavLinkClass = ({ isActive }) =>
        `text-sm font-medium transition-colors ${
            isActive
                ? 'text-blue-600 dark:text-blue-400'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
        }`;

    return (
        <header className="sticky top-0 z-10 w-full bg-white/80 dark:bg-background/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
            <nav className="max-w-7xl mx-auto flex justify-between items-center p-4">

                <div className="flex items-center gap-6">                 
                    <div className="hidden md:flex items-center gap-6">
                        <img src="/app_logo.png" alt="Smart Resume Screener Logo" className="h-10 w-auto" />
                        <NavLink to="/dashboard" className={getNavLinkClass} end>Screener</NavLink>
                        <NavLink to="/history" className={getNavLinkClass}>History</NavLink>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-600 dark:text-gray-300 hidden sm:block">{user?.name}</span>
                    <LogoutButton />
                    <ThemeToggle />
                </div>
            </nav>
        </header>
    );
};

export default Header;