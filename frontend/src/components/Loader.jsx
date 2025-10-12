import React from 'react';
import { motion } from 'framer-motion';

const Loader = () => {
  const spinnerVariants = {
    animate: {
      rotate: 360,
      transition: {
        repeat: Infinity,
        duration: 1,
        ease: "linear",
      },
    },
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4 py-10">
      <motion.svg
        className="h-12 w-12 text-primary"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        variants={spinnerVariants}
        animate="animate"
      >
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </motion.svg>
      <p className="text-textMuted text-lg font-medium">Analyzing resume, please wait...</p>
    </div>
  );
};

export default Loader;