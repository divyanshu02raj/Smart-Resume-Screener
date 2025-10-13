import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ThemeToggle from '../components/ThemeToggle';

const FeatureCard = ({ icon, title, description }) => (
    <div className="bg-white dark:bg-surface border border-gray-200 dark:border-border rounded-xl p-6 text-center">
        <div className="text-primary mx-auto mb-4 w-fit bg-blue-100 dark:bg-primary/20 p-3 rounded-full">{icon}</div>
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{title}</h3>
        <p className="text-gray-500 dark:text-text-secondary">{description}</p>
    </div>
);

function LandingPage() {
    return (
        <div className="min-h-screen w-full p-4 sm:p-8 bg-gray-100 dark:bg-background transition-colors duration-300">
            <ThemeToggle />
            {/* Hero Section */}
            <motion.div 
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="text-center py-20"
            >
                <h1 className="text-5xl md:text-7xl font-extrabold text-gray-800 dark:text-white">
                    Find the Perfect Candidate, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-primary">Faster.</span>
                </h1>
                <p className="text-gray-500 dark:text-text-secondary mt-4 text-xl max-w-2xl mx-auto">
                    Our AI-powered screener analyzes resumes in bulk, providing you with a ranked list of top candidates in seconds.
                </p>
                <div className="mt-8 flex justify-center gap-4">
                    <Link to="/signup">
                        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="bg-primary hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-lg">
                            Get Started for Free
                        </motion.button>
                    </Link>
                    <Link to="/login">
                         <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="bg-gray-200 dark:bg-surface text-gray-800 dark:text-text-primary font-bold py-3 px-8 rounded-lg text-lg">
                            Login
                        </motion.button>
                    </Link>
                </div>
            </motion.div>

            {/* Features Section */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mt-10"
            >
                <FeatureCard 
                    icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12 12 0 0012 21c4.276 0 8.016-2.276 10-5.618a12.006 12.006 0 00-2.382-5.992z" /></svg>}
                    title="AI-Powered Scoring"
                    description="Our advanced AI provides a detailed, multi-criteria score for every resume."
                />
                <FeatureCard 
                    icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-2.144M12 6a3 3 0 11-6 0 3 3 0 016 0zM4 20h5v-2a3 3 0 00-5.356-2.144" /></svg>}
                    title="Batch Processing"
                    description="Analyze dozens of resumes at once and get a ranked summary list instantly."
                />
                <FeatureCard 
                    icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>}
                    title="PDF Reports"
                    description="Download professional, multi-page PDF reports for offline sharing and review."
                />
            </motion.div>
        </div>
    );
}

export default LandingPage;