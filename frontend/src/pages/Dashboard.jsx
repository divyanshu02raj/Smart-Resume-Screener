import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ScreeningForm from '../components/ScreeningForm';
import ResultsDashboard from '../components/ResultsDashboard';
import ThemeToggle from '../components/ThemeToggle';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

// A dedicated LogoutButton component for a cleaner look
const LogoutButton = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();

    const onLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <button onClick={onLogout} className="flex items-center gap-2 text-sm text-gray-500 dark:text-text-secondary hover:text-red-500 dark:hover:text-red-400 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
            <span className="hidden sm:inline">Logout</span>
        </button>
    );
};


function Dashboard() {
    const { user } = useAuth();
    const [jobDescription, setJobDescription] = useState('');
    const [resumeFiles, setResumeFiles] = useState(null);
    // This state now holds an array of BATCHES, not individual results
    const [batches, setBatches] = useState([]); 
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchHistory = async () => {
            if (!user?.token) return;
            setIsLoading(true);
            try {
                const config = { headers: { Authorization: `Bearer ${user.token}` } };
                const response = await axios.get('http://localhost:5001/api/screen', config);
                setBatches(response.data); // The API now returns an array of batches
            } catch (err) {
                console.error("Failed to fetch history:", err);
                // We can comment this out to prevent a benign error message on first login
                // setError('Could not load past screening results.'); 
            } finally {
                setIsLoading(false);
            }
        };
        fetchHistory();
    }, [user]);

    const handleFileChange = (e) => setResumeFiles(e.target.files);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!resumeFiles || resumeFiles.length === 0 || !jobDescription) {
            setError('Please provide a job description and at least one resume file.');
            return;
        }
        if (!user?.token) {
            setError('You must be logged in to perform a screening.');
            return;
        }

        const formData = new FormData();
        for (let i = 0; i < resumeFiles.length; i++) { 
            formData.append('resumes', resumeFiles[i]); 
        }
        formData.append('jobDescription', jobDescription);
        
        setIsLoading(true);
        setError('');
        
        try {
            const config = { headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${user.token}` } };
            const response = await axios.post('http://localhost:5001/api/screen', formData, config);
            
            // The API now returns an array with the single new batch.
            // We add this new batch to the top of our existing list for an instant UI update.
            setBatches(prevBatches => [...response.data, ...prevBatches]);

        } catch (err) {
            setError('An error occurred during screening. Please try again.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };
    
    // Note: handleDownloadReport and summaryStats are no longer needed in this component.
    // This logic has been moved to the new BatchCard component for better encapsulation.

    return (
        <div className="min-h-screen w-full p-4 sm:p-6 bg-gray-100 dark:bg-background">
            {/* Top Navigation Bar */}
            <nav className="max-w-7xl mx-auto flex justify-between items-center mb-8">
                <div className="flex items-center gap-3">
                    <img src="/logo.png" alt="Logo" className="h-8 w-8"/>
                    <h1 className="text-xl font-bold text-gray-800 dark:text-white hidden sm:block">Smart Screener</h1>
                </div>
                <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-500 dark:text-text-secondary hidden sm:block">{user?.email}</span>
                    <LogoutButton />
                    <ThemeToggle />
                </div>
            </nav>

            {/* Hero Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center mb-12"
            >
                <h1 className="text-5xl md:text-6xl font-extrabold text-gray-800 dark:text-white">Smart Resume Screener</h1>
                <p className="text-gray-500 dark:text-text-secondary mt-3 text-lg">Instantly transform resumes into actionable intelligence.</p>
            </motion.div>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    <ScreeningForm
                        jobDescription={jobDescription}
                        setJobDescription={setJobDescription}
                        handleFileChange={handleFileChange}
                        handleSubmit={handleSubmit}
                        isLoading={isLoading}
                    />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mt-10"
                >
                    <ResultsDashboard
                        isLoading={isLoading}
                        error={error}
                        batches={batches} // Pass the full array of batches
                    />
                </motion.div>
            </main>
        </div>
    );
}

export default Dashboard;

