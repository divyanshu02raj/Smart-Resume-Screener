import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import ScreeningForm from '../components/ScreeningForm';
import ResultsDashboard from '../components/ResultsDashboard';

function Dashboard() {
    const { user } = useAuth();
    const [jobDescription, setJobDescription] = useState('');
    const [resumeFiles, setResumeFiles] = useState(null);

    const [latestBatch, setLatestBatch] = useState([]);

    const [isLoading, setIsLoading] = useState(false);
    const [isFetchingHistory, setIsFetchingHistory] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchLatest = async () => {
            if (!user?.token) {
                setIsFetchingHistory(false);
                return;
            };
            
            setIsFetchingHistory(true);
            try {
                const config = { headers: { Authorization: `Bearer ${user.token}` } };
                const response = await axios.get('https://smart-resume-screener-mcth.onrender.com/api/screen', config);

                if (response.data && response.data.length > 0) {
                    setLatestBatch([response.data[0]]);
                }

            } catch (err) {
                console.error("Failed to fetch history:", err);
            } finally {
                setIsFetchingHistory(false);
            }
        };
        fetchLatest();
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
            const response = await axios.post('https://smart-resume-screener-mcth.onrender.com/api/screen', formData, config);

            setLatestBatch(response.data);

        } catch (err) {
            setError('An error occurred during screening. Please try again.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full bg-gray-50 dark:bg-background">
            <Header />

            <div className="p-4 sm:p-6">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center my-8"
                >
                    <h1 className="text-5xl md:text-6xl font-extrabold text-gray-800 dark:text-white">Smart Resume Screener</h1>
                    <p className="text-gray-500 dark:text-text-secondary mt-3 text-lg">Instantly transform resumes into actionable intelligence.</p>
                </motion.div>

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

                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white mt-12 mb-4">
                        Most Recent Screening
                    </h2>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="mt-10"
                    >
                        <ResultsDashboard
                            isLoading={isFetchingHistory}
                            error={error}
                            batches={latestBatch}
                        />
                    </motion.div>
                </main>
            </div>
        </div>
    );
}

export default Dashboard;