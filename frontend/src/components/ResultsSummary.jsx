import React, { useState } from 'react';
import ResultDisplay from './ResultDisplay';
import { motion, AnimatePresence } from 'framer-motion';

const ResultsSummary = ({ results }) => {
  const [expandedId, setExpandedId] = useState(null);
  const sortedResults = [...results].sort((a, b) => b.screeningResult.match_score - a.screeningResult.match_score);

  return (
    <div className="bg-white dark:bg-surface border border-gray-200 dark:border-border rounded-xl shadow-lg">
      <div className="space-y-2 p-2">
        {sortedResults.map((result) => {
          const { match_score, candidate_name } = result.screeningResult;
          const scoreColor = match_score >= 80 ? 'bg-green-500' : match_score >= 50 ? 'bg-yellow-500' : 'bg-red-500';
          const isOpen = result._id === expandedId;

          return (
            <div key={result._id} className="bg-gray-100 dark:bg-background rounded-lg">
              <button 
                onClick={() => setExpandedId(isOpen ? null : result._id)} 
                className="w-full text-left p-4 flex items-center justify-between relative h-16 transition-colors duration-200 hover:bg-gray-200/50 dark:hover:bg-surface/50"
              >
                <motion.span
                  className="font-semibold text-lg text-gray-800 dark:text-text-primary absolute"
                  animate={{
                    left: isOpen ? '50%' : '1rem',
                    x: isOpen ? '-50%' : '0%',
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                >
                  {candidate_name || 'Unnamed'}
                </motion.span>
                
                <div className="flex items-center gap-4 ml-auto z-10">
                  <span
                    className={`text-white text-sm font-bold px-3 py-1 rounded-full ${scoreColor} transition-opacity duration-300 ${isOpen ? 'opacity-70' : 'opacity-100'}`}
                  >
                      {match_score}/100
                  </span>
                  <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
                    <svg className="w-6 h-6 text-gray-500 dark:text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  </motion.div>
                </div>
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div 
                    initial={{ height: 0 }} 
                    animate={{ height: 'auto' }} 
                    exit={{ height: 0 }} 
                    className="overflow-hidden"
                  >
                    <div className="p-4 border-t border-gray-200 dark:border-border"><ResultDisplay result={result} /></div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ResultsSummary;