import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import ResultsDashboard from '../components/ResultsDashboard';

const HistoryPage = () => {
    const { user } = useAuth();
    const [batches, setBatches] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchAllHistory = async () => {
            if (!user?.token) {
                setIsLoading(false);
                setError("You must be logged in to view history.");
                return;
            }

            setIsLoading(true);
            try {
                const config = { headers: { Authorization: `Bearer ${user.token}` } };
                const response = await axios.get('https://smart-resume-screener-mcth.onrender.com/api/screen', config);
                setBatches(response.data);
            } catch (err) {
                console.error("Failed to fetch history:", err);
                setError("Failed to load screening history. Please try again later.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchAllHistory();
    }, [user]);

    return (
        <div className="min-h-screen w-full bg-gray-50 dark:bg-background">
            <Header />

            <main className="max-w-7xl mx-auto p-4 sm:p-6">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">Screening History</h1>
                    <p className="text-gray-500 dark:text-text-secondary mb-8">Review all your past screening batches.</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    <ResultsDashboard
                        isLoading={isLoading}
                        error={error}
                        batches={batches}
                        loadingMessage="Loading screening history..."
                    />
                </motion.div>
            </main>
        </div>
    );
};

export default HistoryPage;