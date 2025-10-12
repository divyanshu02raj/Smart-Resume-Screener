import React from 'react';
import Loader from './Loader';
import ErrorMessage from './ErrorMessage';
import ResultsSummary from './ResultsSummary';
import StatCard from './StatCard';
import { AnimatePresence, motion } from 'framer-motion';

const ResultsDashboard = ({ isLoading, error, results, stats, onDownload, isDownloading }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  if (isLoading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;
  if (results.length === 0) return null;

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-4 flex justify-between items-center">
          <h2 className="text-3xl font-bold text-white">Dashboard</h2>
          <button 
            onClick={onDownload} 
            disabled={isDownloading} 
            className="bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors flex items-center gap-2"
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            <span className="sm:hidden">{isDownloading ? '...' : 'Report'}</span>
            <span className="hidden sm:inline">{isDownloading ? 'Generating...' : 'Download Report'}</span>
        </button>
        </div>
        <StatCard title="Total Resumes" value={stats.total} />
        <StatCard title="Top Tier (≥80)" value={stats.topTier} />
        <StatCard title="Top Candidate" value={stats.topCandidate} isLarge={true} />
      </div>
      <ResultsSummary results={results} />
    </motion.div>
  );
};

export default ResultsDashboard;