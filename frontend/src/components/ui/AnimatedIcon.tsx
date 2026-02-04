import { motion } from 'framer-motion';

interface AnimatedIconProps {
    children: React.ReactNode;
    delay?: number;
    duration?: number;
    className?: string;
}

export function AnimatedIcon({ children, delay = 0, duration = 3, className = "" }: AnimatedIconProps) {
    return (
        <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{
                duration: duration,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: delay,
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
