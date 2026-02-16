import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const items = [
    { id: 1, image: '/hero-chair.jpg', title: 'The Void', subtitle: 'Seating', year: '2024' },
    { id: 2, image: '/hero-living-room.jpg', title: 'Obsidian', subtitle: 'Living', year: '2023' },
    { id: 3, image: '/product-lamp-1.jpg', title: 'Halo', subtitle: 'Lighting', year: '2024' },
    { id: 4, image: '/luxe-dining.jpg', title: 'Monolith', subtitle: 'Dining', year: '2023' },
    { id: 5, image: '/luxe-bed.jpg', title: 'Zenith', subtitle: 'Rest', year: '2024' },
];

const HorizontalCinema = () => {
    const containerRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Parallax background movement
    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]);

    return (
        <section ref={containerRef} className="relative bg-black text-white overflow-hidden py-32">
            {/* Wide "Film Strip" Background - Subtle Texture */}
            <div className="absolute top-0 left-0 w-[200vw] h-full opacity-[0.05] pointer-events-none select-none grayscale flex items-center">
                <motion.div style={{ x }} className="flex gap-4 md:gap-8 w-full h-1/2">
                    {[...items, ...items, ...items].map((item, i) => (
                        <div key={i} className="flex-shrink-0 w-[40vw] aspect-video bg-neutral-800 opacity-50 overflow-hidden">
                            <img src={item.image} alt="" className="w-full h-full object-cover grayscale blur-sm" />
                        </div>
                    ))}
                </motion.div>
            </div>

            <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10 space-y-32">
                {items.map((item, index) => (
                    <CinemaRow key={item.id} item={item} index={index} />
                ))}
            </div>
        </section>
    );
};

const CinemaRow = ({ item, index }: { item: any; index: number }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 md:gap-24`}
        >
            {/* Image Side */}
            <div className="w-full md:w-1/2 aspect-video bg-neutral-900 overflow-hidden relative group cursor-pointer border border-white/10">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-80 group-hover:opacity-100" />

                {/* Center Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-transparent transition-colors duration-500">
                    <div className="w-20 h-20 rounded-full border border-white/30 flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform duration-500 group-hover:bg-white group-hover:border-white">
                        <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[16px] border-l-white border-b-[10px] border-b-transparent ml-1 group-hover:border-l-black transition-colors duration-500" />
                    </div>
                </div>
            </div>

            {/* Content Side */}
            <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'text-left' : 'text-right'}`}>
                <div className={`flex flex-col ${index % 2 === 0 ? 'items-start' : 'items-end'}`}>
                    <span className="text-xs font-mono uppercase tracking-widest text-white/40 mb-6 block border-b border-white/20 pb-2">
                        0{index + 1} — {item.subtitle}
                    </span>
                    <h3 className="text-6xl md:text-8xl font-serif text-white mb-8 leading-[0.85] tracking-tighter">
                        {item.title}
                    </h3>
                    <p className={`text-white/60 max-w-sm font-light leading-relaxed mb-8 ${index % 2 === 0 ? 'text-left' : 'text-right'}`}>
                        A cinematic exploration of form and void, designed to disrupt the ordinary and define the space.
                    </p>
                    <button className="px-8 py-3 bg-white text-black text-xs font-mono uppercase tracking-widest hover:bg-neutral-200 transition-colors">
                        View Details
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default HorizontalCinema;
