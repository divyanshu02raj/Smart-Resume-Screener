import { motion } from "framer-motion";

const StatCard = ({ title, value, isLarge = false }) => {
    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };
    
    return (
        <motion.div 
            variants={cardVariants}
            className="bg-white dark:bg-surface border border-gray-200 dark:border-border rounded-xl p-4"
        >
            <p className="text-sm text-gray-500 dark:text-text-secondary font-medium">{title}</p>
            <p className="font-bold text-gray-800 dark:text-white truncate text-2xl mt-1">{value}</p>
        </motion.div>
    );
};

export default StatCard;