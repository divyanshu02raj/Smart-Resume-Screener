import React from 'react';
import Loader from './Loader';
import ErrorMessage from './ErrorMessage';
import BatchCard from './BatchCard';
import { motion } from 'framer-motion';

const ResultsDashboard = ({ isLoading, error, batches }) => {
  if (isLoading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  if (!batches || batches.length === 0) {
      return (
        <div className="text-center text-gray-500 dark:text-text-secondary py-20">
            <h2 className="text-2xl font-semibold">No Screenings Yet</h2>
            <p>Perform a new screening to see your results and history here.</p>
        </div>
      );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      {batches.map(batch => (
          <BatchCard key={batch._id} batch={batch} />
      ))}
    </motion.div>
  );
};

export default ResultsDashboard;