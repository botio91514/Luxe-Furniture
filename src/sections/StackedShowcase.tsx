import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const items = [
    { id: 1, image: '/hero-chair.jpg', title: 'The Void', subtitle: 'Seating', year: '2024', description: "Sculpted from a single block of aerospace aluminum, finished in matte noir." },
    { id: 2, image: '/hero-living-room.jpg', title: 'Obsidian', subtitle: 'Living', year: '2023', description: "A study in depth and comfort. Italian velvet absorbs light while reflecting luxury." },
    { id: 3, image: '/product-lamp-1.jpg', title: 'Halo', subtitle: 'Lighting', year: '2024', description: " ethereal glow cast through hand-blown smoked glass. The centerpiece of any room." },
    { id: 4, image: '/luxe-dining.jpg', title: 'Monolith', subtitle: 'Dining', year: '2023', description: "Raw concrete meets warm walnut. A brutalist statement for the modern gathering." },
    { id: 5, image: '/luxe-bed.jpg', title: 'Zenith', subtitle: 'Rest', year: '2024', description: "Elevated sleep. Suspended aesthetics that defy gravity and embrace silence." },
    { id: 6, image: '/texture-marble.jpg', title: 'Discover', subtitle: 'Full Archive', year: '2025', description: "Explore the complete collection of 50+ unique pieces.", isCta: true },
];

const StackedShowcase = () => {
    const containerRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    return (
        <section ref={containerRef} className="relative h-[400vh] bg-[#EAEAEA] text-black">
            <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden w-full">

                <div className="container mx-auto px-6 md:px-12 lg:px-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center h-full">

                    {/* Left: Dynamic Description */}
                    <div className="hidden md:flex flex-col justify-center h-full relative">
                        <div className="absolute top-12 left-0 mb-12">
                            <span className="text-xs font-mono uppercase tracking-widest text-black/40 mb-2 block">
                                Chapter 04
                            </span>
                            <h2 className="text-6xl font-serif text-black leading-none tracking-tight">
                                THE <br /> ARCHIVE.
                            </h2>
                        </div>

                        <div className="relative h-64 w-full mt-32">
                            {items.map((item, index) => {
                                // Logic: Description is visible when this card is ACTIVE (on top)
                                // Card 0 is active from 0 to 0.16
                                const step = 1 / items.length;
                                const start = index * step;
                                const end = start + step;

                                // We want it visible slightly BEFORE start (as previous leaves) and vanish AFTER end
                                // Actually, simpler: sync with card "existence" on top pile.
                                // It should be visible roughly during [start, end].

                                return (
                                    <DescriptionBlock
                                        key={item.id}
                                        item={item}
                                        scrollYProgress={scrollYProgress}
                                        range={[start, end]}
                                        index={index}
                                    />
                                );
                            })}
                        </div>
                    </div>

                    {/* Right: The Stack */}
                    <div className="relative w-full h-full flex items-center justify-center md:justify-end">
                        <div className="relative w-[90vw] md:w-[35vw] aspect-[3/4]">
                            {items.map((item, index) => {
                                const start = index * (1 / items.length);
                                const end = start + (1 / items.length);

                                return (
                                    <StackCard
                                        key={item.id}
                                        item={item}
                                        index={index}
                                        total={items.length}
                                        scrollYProgress={scrollYProgress}
                                        range={[start, end]}
                                    />
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const DescriptionBlock = ({ item, scrollYProgress, range, index }: any) => {
    // Fade in/out based on scroll range
    const opacity = useTransform(scrollYProgress,
        [range[0], range[0] + 0.05, range[1] - 0.05, range[1]],
        [0, 1, 1, 0]
    );

    // Slight Y movement
    const y = useTransform(scrollYProgress, range, [20, -20]);

    return (
        <motion.div
            style={{ opacity, y }}
            className="absolute top-0 left-0 max-w-md"
        >
            <div className="flex items-center gap-4 mb-6">
                <span className="text-xs font-mono uppercase tracking-widest text-black/40">No. 0{index + 1}</span>
                <div className="h-px w-12 bg-black/20" />
                <span className="text-xs font-mono uppercase tracking-widest text-black/40">{item.year}</span>
            </div>

            <h3 className="text-4xl md:text-5xl font-serif mb-6">{item.title}</h3>
            <p className="text-lg text-black/60 font-light leading-relaxed">
                {item.description}
            </p>

            {item.isCta && (
                <a href="/collection" className="inline-block mt-8 px-8 py-3 bg-black text-white text-xs font-mono uppercase tracking-widest hover:bg-[#333] transition-colors">
                    Access Full Collection
                </a>
            )}
        </motion.div>
    );
};

interface Item {
    id: number;
    image: string;
    title: string;
    subtitle: string;
    year: string;
    description: string;
    isCta?: boolean;
}

interface StackCardProps {
    item: Item;
    index: number;
    total: number;
    scrollYProgress: any; // Framer Motion's MotionValue<number>
    range: [number, number];
}

const StackCard = ({ item, index, total, scrollYProgress, range }: StackCardProps) => {
    // Current Card Exit Animation: 0 to 1 based on its specific range
    const cardProgress = useTransform(scrollYProgress, range, [0, 1]);

    // Transform values for EXIT (flying away)
    const yExit = useTransform(cardProgress, [0, 1], ["0%", "-120%"]);
    const rotateExit = useTransform(cardProgress, [0, 1], ["0deg", `${(Math.random() - 0.5) * 20}deg`]);
    const opacityExit = useTransform(cardProgress, [0, 0.5], [1, 0]); // Fade out halfway

    // Background Card Scale Animation: 
    // We use a continuous scale based on absolute index distance from the "active" scroll position
    const scale = useTransform(scrollYProgress, (pos: number) => {
        // Calculate "active index" based on position
        const activeIndex = pos * total;
        const dist = activeIndex - index;

        // If we are the active card (dist approx 0): Scale 1
        // If we are next (dist approx -1): Scale 0.9
        // If we are passed (dist > 0): Scale 1 (and move up)
        if (dist > 0) return 1; // We are leaving
        return Math.min(1, 0.9 + (1 - Math.abs(dist)) * 0.1);
    });

    return (
        <motion.div
            style={{
                y: yExit,
                rotate: rotateExit,
                scale: scale,
                zIndex: total - index,
                opacity: index === total - 1 ? 1 : opacityExit
            }}
            className={`absolute inset-0 shadow-xl flex flex-col p-6 md:p-8 origin-center transition-colors duration-500 ${item.isCta ? 'bg-black text-white' : 'bg-white text-black'}`}
        >
            <div className="flex justify-between items-start mb-4 border-b border-current pb-4 opacity-50">
                <span className="text-xs font-mono uppercase tracking-widest">
                    {item.isCta ? 'END OF ARCHIVE' : `No. 0${index + 1}`}
                </span>
                <span className="text-xs font-mono uppercase tracking-widest">
                    {item.year}
                </span>
            </div>

            <div className={`flex-1 relative overflow-hidden mb-8 ${item.isCta ? 'bg-[#111]' : 'bg-[#F4F4F4]'}`}>
                <img src={item.image} alt={item.title} className={`w-full h-full object-cover grayscale contrast-125 ${item.isCta ? 'opacity-50' : ''}`} />
                {item.isCta && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-6xl font-serif text-white">→</span>
                    </div>
                )}
            </div>

            <div>
                <span className="text-xs font-mono uppercase tracking-widest opacity-50 block mb-2">
                    {item.subtitle}
                </span>
                <h3 className="text-4xl md:text-6xl font-serif leading-none">
                    {item.title}
                </h3>
            </div>
        </motion.div>
    );
};

export default StackedShowcase;
