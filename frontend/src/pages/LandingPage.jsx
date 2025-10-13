import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ThemeToggle from '../components/ThemeToggle';

const Header = () => (
    <header className="absolute top-0 left-0 right-0 p-4 sm:p-6 z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center gap-2">
                <img src="/app_logo.png" alt="Smart Resume Screener Logo" className="h-20 w-auto" />
            </div>
            <ThemeToggle />
        </div>
    </header>
);

const FeatureCard = ({ icon, title, description, index }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        viewport={{ once: true }}
        className="bg-white dark:bg-surface border border-gray-200 dark:border-border rounded-xl p-6 text-center"
    >
        <div className="text-primary mx-auto mb-4 w-fit bg-blue-100 dark:bg-primary/20 p-3 rounded-full">{icon}</div>
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{title}</h3>
        <p className="text-gray-500 dark:text-text-secondary">{description}</p>
    </motion.div>
);

const HowItWorksStep = ({ number, title, description, icon }) => (
    <div className="flex items-start gap-6">
        <div className="flex-shrink-0 flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 dark:bg-primary/20 text-primary flex items-center justify-center font-bold text-2xl mb-2">
                {number}
            </div>
        </div>
        <div>
            <div className="flex items-center gap-3 mb-2">
                <div className="text-primary">{icon}</div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{title}</h3>
            </div>
            <p className="text-gray-500 dark:text-text-secondary text-lg">{description}</p>
        </div>
    </div>
);

const Footer = () => (
    <footer className="w-full mt-24 border-t border-gray-200 dark:border-border py-8">
        <div className="max-w-7xl mx-auto text-center text-gray-500 dark:text-text-secondary">
            <p>&copy; {new Date().getFullYear()} Smart Resume Screener. All Rights Reserved.</p>

        </div>
    </footer>
);

function LandingPage() {
    return (
        <div className="min-h-screen w-full p-4 sm:p-8 bg-gray-50 dark:bg-background transition-colors duration-300 overflow-x-hidden">
            <Header />
            <motion.div
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="text-center pt-24 pb-16 md:pt-32 md:pb-20"
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

            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
                <FeatureCard
                    index={0}
                    icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12 12 0 0012 21c4.276 0 8.016-2.276 10-5.618a12.006 12.006 0 00-2.382-5.992z" /></svg>}
                    title="AI-Powered Scoring"
                    description="Our advanced AI provides a detailed, multi-criteria score for every resume."
                />
                <FeatureCard
                    index={1}
                    icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-2.144M12 6a3 3 0 11-6 0 3 3 0 016 0zM4 20h5v-2a3 3 0 00-5.356-2.144" /></svg>}
                    title="Batch Processing"
                    description="Analyze dozens of resumes at once and get a ranked summary list instantly."
                />
                <FeatureCard
                    index={2}
                    icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>}
                    title="PDF Reports"
                    description="Download professional, multi-page PDF reports for offline sharing and review."
                />
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true, amount: 0.3 }}
                className="max-w-4xl mx-auto mt-24 text-center"
            >
                <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 dark:text-white">How It Works in 3 Easy Steps</h2>
                <p className="text-gray-500 dark:text-text-secondary mt-4 text-xl">From a pile of resumes to a shortlist of champions.</p>
                <div className="mt-16 space-y-16 text-left">
                    <HowItWorksStep 
                        number="1"
                        title="Upload Documents"
                        description="Simply provide a job description and upload all your candidate resumes in PDF format. Our system handles the rest."
                        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>}
                    />
                    <HowItWorksStep 
                        number="2"
                        title="AI Analyzes & Ranks"
                        description="Our intelligent engine reads and understands each resume, scoring it against your job description on multiple criteria like skills, experience, and education."
                        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>}
                    />
                    <HowItWorksStep 
                        number="3"
                        title="Get Actionable Insights"
                        description="Instantly receive a ranked list of candidates with detailed justifications, strengths, and weaknesses, along with a downloadable PDF report."
                        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>}
                    />
                </div>
            </motion.div>
            
            <Footer />
        </div>
    );
}

export default LandingPage;
