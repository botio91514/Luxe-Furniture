import { useRef } from 'react';
import { motion } from 'framer-motion';

const categories = [
    {
        id: 1,
        title: 'Living',
        description: 'Statement sofas and armchairs for the heart of your home.',
        image: '/hero-living-room.jpg',
    },
    {
        id: 2,
        title: 'Dining',
        description: 'Elegant tables and chairs for memorable gatherings.',
        image: '/luxe-dining.jpg',
    },
    {
        id: 3,
        title: 'Bedroom',
        description: 'Sanctuaries of rest crafted with premium materials.',
        image: '/luxe-bed.jpg',
    },
];

const FeaturedCategories = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <section ref={containerRef} className="py-24 md:py-32 bg-black text-white relative overflow-hidden">
            <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-20">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8"
                >
                    <div className="max-w-2xl">
                        <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white leading-[1.1] mb-6">
                            Curated <br /> Spaces
                        </h2>
                        <div className="h-px w-24 bg-white/30" />
                    </div>
                    <p className="text-[#a0a0a0] max-w-sm text-lg leading-relaxed font-light">
                        Explore our collections by room, each designed to create a cohesive and luxurious atmosphere.
                    </p>
                </motion.div>

                <div className="space-y-0 border-t border-white/20">
                    {categories.map((category, index) => (
                        <CategoryItem key={category.id} category={category} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

const CategoryItem = ({ category, index }: { category: any, index: number }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: index * 0.1 }}
            className="group relative border-b border-white/20 py-16 md:py-24 cursor-pointer transition-colors duration-500 hover:bg-white/5"
        >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 relative z-10 w-full">
                <h3 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white transition-transform duration-700 ease-[0.16,1,0.3,1] group-hover:translate-x-8 md:group-hover:translate-x-12">
                    {category.title}
                </h3>

                <div className="flex items-center gap-6 md:gap-12 opacity-0 -translate-x-4 md:-translate-x-8 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-700 ease-[0.16,1,0.3,1] delay-100">
                    <p className="hidden md:block text-sm md:text-base text-[#a0a0a0] font-light max-w-xs text-right">
                        {category.description}
                    </p>
                    <span className="w-16 h-16 rounded-full border border-white/30 flex items-center justify-center shrink-0 group-hover:bg-white group-hover:text-black transition-colors duration-500">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="transform -rotate-45 group-hover:rotate-0 transition-transform duration-500">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </span>
                </div>
            </div>

            {/* Background Image Reveal on Hover */}
            <div className="absolute top-1/2 right-0 md:right-20 -translate-y-1/2 w-[60vw] md:w-[40vw] aspect-video opacity-0 scale-90 rotate-2 group-hover:opacity-40 group-hover:scale-100 group-hover:rotate-0 transition-all duration-700 ease-[0.16,1,0.3,1] pointer-events-none mix-blend-lighten z-0">
                <img src={category.image} alt={category.title} className="w-full h-full object-cover grayscale" />
            </div>
        </motion.div>
    );
};

export default FeaturedCategories;
