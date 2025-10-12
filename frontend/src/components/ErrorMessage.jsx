import React from 'react';
import { motion } from 'framer-motion';

const ErrorMessage = ({ message }) => {
  if (!message) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mt-6 p-4 bg-red-800/60 border border-red-700 text-red-200 rounded-lg text-center shadow-lg"
    >
      <p className="font-medium">{message}</p>
    </motion.div>
  );
};

export default ErrorMessage;