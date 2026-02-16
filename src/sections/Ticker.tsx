import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useVelocity, useAnimationFrame, useMotionValue } from 'framer-motion';
import { wrap } from '@motionone/utils';

interface ParallaxTextProps {
    children: string;
    baseVelocity: number;
}

function ParallaxText({ children, baseVelocity = 100 }: ParallaxTextProps) {
    const baseX = useMotionValue(0);
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, {
        damping: 50,
        stiffness: 400
    });
    const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
        clamp: false
    });

    const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

    const directionFactor = useRef<number>(1);

    useAnimationFrame((_t, delta) => {
        let moveBy = directionFactor.current * (baseVelocity / 1) * (delta / 1000);

        if (velocityFactor.get() < 0) {
            directionFactor.current = -1;
        } else if (velocityFactor.get() > 0) {
            directionFactor.current = 1;
        }

        moveBy += directionFactor.current * moveBy * velocityFactor.get();
        baseX.set(baseX.get() + moveBy);
    });

    return (
        <div className="overflow-hidden m-0 whitespace-nowrap flex flex-nowrap py-2 bg-white">
            <motion.div
                className="flex items-center gap-10 md:gap-20 text-6xl md:text-9xl uppercase font-serif tracking-tighter leading-none"
                style={{ x }}
            >
                {/* 
                    Performance Optimization:
                    Instead of heavy image textures, we use CSS text-stroke.
                    This uses GPU acceleration and is much lighter than background-clip: text with images.
                */}
                <span className="block text-transparent [-webkit-text-stroke:1px_#000] hover:text-black transition-colors duration-500">{children}</span>
                <span className="block text-transparent [-webkit-text-stroke:1px_#000] hover:text-black transition-colors duration-500">{children}</span>
                <span className="block text-transparent [-webkit-text-stroke:1px_#000] hover:text-black transition-colors duration-500">{children}</span>
                <span className="block text-transparent [-webkit-text-stroke:1px_#000] hover:text-black transition-colors duration-500">{children}</span>
            </motion.div>
        </div>
    );
}

const Ticker = () => {
    return (
        <section className="relative z-20 bg-white py-16 md:py-24 border-b border-black/5 overflow-hidden">
            <div className="space-y-6 md:space-y-12">
                {/* Row 1: High speed, Left */}
                <div className="opacity-90">
                    <ParallaxText baseVelocity={-2}>
                        Heritage • Craft • Legacy • Detail •
                    </ParallaxText>
                </div>

                {/* Row 2: Slower, Right */}
                <div className="opacity-70">
                    <ParallaxText baseVelocity={2}>
                        Silence • Form • Space • Light •
                    </ParallaxText>
                </div>
            </div>
        </section>
    );
};

export default Ticker;
