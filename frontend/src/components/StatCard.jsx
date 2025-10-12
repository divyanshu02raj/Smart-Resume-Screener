import { motion } from "framer-motion";

const StatCard = ({ title, value, isLarge = false }) => {
    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };
    
    return (
        <motion.div 
            variants={cardVariants}
            className={`bg-surface border border-border rounded-xl p-6 ${isLarge ? 'lg:col-span-2' : ''} transition-all duration-300 hover:scale-[1.03] hover:bg-surface/80`}
        >
            <p className="text-sm text-text-secondary font-medium">{title}</p>
            <p className={`font-bold text-white truncate ${isLarge ? 'text-3xl mt-2' : 'text-2xl mt-1'}`}>{value}</p>
        </motion.div>
    );
};

export default StatCard;