import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const items = [
    { id: 1, image: '/hero-chair.jpg', title: 'The Void', subtitle: 'Seating' },
    { id: 2, image: '/hero-living-room.jpg', title: 'Obsidian', subtitle: 'Living' },
    { id: 3, image: '/product-lamp-1.jpg', title: 'Halo', subtitle: 'Lighting' },
    { id: 4, image: '/luxe-dining.jpg', title: 'Monolith', subtitle: 'Dining' },
    { id: 5, image: '/luxe-bed.jpg', title: 'Zenith', subtitle: 'Rest' },
];

const Vortex = () => {
    const containerRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    return (
        <section ref={containerRef} className="relative h-[400vh] bg-black">
            <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden perspective-1000">
                {/* Ambient Background Text */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
                    <h2 className="text-[20vw] font-serif text-white/5 leading-none tracking-tighter mix-blend-difference blur-sm animate-pulse">
                        DEPTH
                    </h2>
                </div>

                {/* The Tunnel */}
                <div className="relative w-full h-full flex items-center justify-center">
                    {items.map((item, index) => {
                        // Stagger the animation range for each item
                        const start = index * 0.2;
                        const end = start + 0.4;

                        return (
                            <TunnelItem
                                key={item.id}
                                item={item}
                                scrollYProgress={scrollYProgress}
                                range={[start, end]}
                                index={index}
                                total={items.length}
                            />
                        );
                    })}
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
                    <span className="text-xs font-mono uppercase text-white/40 tracking-widest">Dive Deeper</span>
                    <div className="w-px h-12 bg-gradient-to-b from-white to-transparent" />
                </div>
            </div>
        </section>
    );
};

const TunnelItem = ({ item, scrollYProgress, range, index }: any) => {
    // Determine visibility and motion based on scroll range
    // range: [start, end]
    const [start, end] = range;

    // Scale: Small (far away) -> Large (close up)
    const scale = useTransform(scrollYProgress, [start, end], [0.5, 1.2]);

    // Y Position: Moves up slightly as it approaches to create parallax
    const y = useTransform(scrollYProgress, [start, end], ["100vh", "-100vh"]);

    // Rotation: Twists as it passes
    const rotate = useTransform(scrollYProgress, [start, end], [index % 2 === 0 ? -15 : 15, 0]);

    // Opacity: Fade in quickly, stay visible, fade out
    // Ensure all offsets are strictly within [0, 1] and strictly ascending
    const fadeInEnd = Math.min(start + 0.05, end - 0.05); // Short fade in
    const fadeOutStart = Math.max(end - 0.05, start + 0.05); // Short fade out

    // Safety check: if inputs are invalid (e.g. start > end), fallback to simple 0-1
    const safeInput = [start, fadeInEnd, fadeOutStart, end].sort((a, b) => a - b);
    // Ensure values are clamped 0-1
    const clampedInput = safeInput.map(v => Math.max(0, Math.min(1, v)));

    const opacity = useTransform(scrollYProgress, clampedInput, [0, 1, 1, 0]);

    return (
        <motion.div
            style={{
                scale,
                opacity,
                rotate,
                y,
                zIndex: index,
                position: 'absolute',
                left: index % 2 === 0 ? '10%' : 'auto',
                right: index % 2 === 0 ? 'auto' : '10%',
            }}
            className="w-[80vw] md:w-[40vw] max-w-lg aspect-[3/4] bg-[#111] border border-white/10 p-2 md:p-4 flex flex-col shadow-2xl origin-center"
        >
            {/* Image Container */}
            <div className="flex-1 overflow-hidden relative grayscale hover:grayscale-0 transition-all duration-500">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-40 mix-blend-multiply" />
            </div>

            {/* Minimal Info - Absolute */}
            <div className="absolute bottom-8 left-8 z-10">
                <span className="text-xs font-mono uppercase tracking-widest text-white/50 block mb-2">{item.subtitle}</span>
                <h3 className="text-4xl md:text-6xl font-serif text-white leading-none">{item.title}</h3>
            </div>

            {/* Huge Number */}
            <span className="absolute -top-12 -right-4 text-[12rem] font-serif text-white/5 font-bold leading-none select-none pointer-events-none">
                {index + 1}
            </span>
        </motion.div>
    );
};

export default Vortex;
