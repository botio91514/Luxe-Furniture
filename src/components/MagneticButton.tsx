import { useRef, type MouseEvent } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface MagneticButtonProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    strength?: number; // How strong the magnetic pull is
}

const MagneticButton = ({ children, className = '', onClick, strength = 40 }: MagneticButtonProps) => {
    const ref = useRef<HTMLButtonElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

    const handleMouseMove = (e: MouseEvent<HTMLButtonElement>) => {
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current!.getBoundingClientRect();

        // Calculate distance from center
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);

        // Apply magnetic pull
        x.set(middleX / strength);
        y.set(middleY / strength);
    };

    const reset = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.button
            ref={ref}
            className={`relative inline-flex items-center justify-center overflow-hidden ${className}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={reset}
            onClick={onClick}
            style={{
                x: mouseX,
                y: mouseY,
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            <span className="relative z-10">{children}</span>
            {/* Optional: Add a subtle glow or fill effect on hover */}
            <motion.div
                className="absolute inset-0 bg-white/10 rounded-full blur-xl opacity-0 transition-opacity duration-300 pointer-events-none"
                style={{
                    opacity: 0.1
                }}
                whileHover={{ opacity: 0.2 }}
            />
        </motion.button>
    );
};

export default MagneticButton;
