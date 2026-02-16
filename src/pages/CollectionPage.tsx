import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { products } from '../sections/Collection';

const categories = [
    "SIDEBOARDS",
    "TV CABINETS",
    "DINING TABLES",
    "CHAIRS",
    "COFFEE TABLE",
    "ALMIRAHS",
    "BEDS",
    "OTHERS"
];

const CollectionPage = () => {
    return (
        <div className="bg-[#F3F3F3] min-h-screen">
            {/* Header / Intro */}
            <div className="pt-32 pb-20 px-6 md:px-12 lg:px-20 border-b border-black/10">
                <h1 className="text-6xl md:text-9xl font-serif leading-[0.85] tracking-tighter text-black mb-6">
                    THE INDEX.
                </h1>
                <p className="text-sm font-mono uppercase tracking-widest text-black/50 max-w-md">
                    Comprehensive Archive of Form, Function, and Materiality.
                </p>
            </div>

            {/* Categories Loop */}
            <div className="relative z-10 w-full">
                {categories.map((cat, index) => {
                    const categoryProducts = products.filter(p => p.category === cat);
                    // if (categoryProducts.length === 0) return null; // Uncomment to hide empty

                    return (
                        <CategorySection key={cat} title={cat} items={categoryProducts} index={index} />
                    );
                })}
            </div>

            {/* Footer Spacer */}
            <div className="h-[20vh] bg-[#F3F3F3]" />
        </div>
    );
};

const CategorySection = ({ title, items, index }: { title: string, items: any[], index: number }) => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    return (
        <section ref={containerRef} className="relative min-h-[50vh] flex flex-col md:flex-row border-b border-black/10">
            {/* Sticky Title Column */}
            <div className="w-full md:w-1/3 h-[50vh] md:h-screen sticky top-0 bg-[#F3F3F3] border-r border-black/10 flex flex-col justify-between p-6 md:p-12 z-20">
                <div>
                    <span className="text-xs font-mono uppercase tracking-widest text-black/40 block mb-2">
                        Category 0{index + 1}
                    </span>
                    <h2 className="text-5xl md:text-7xl lg:text-8xl font-serif leading-[0.9] tracking-tight text-black break-words">
                        {title}
                    </h2>
                </div>

                <div className="hidden md:block">
                    <p className="text-xs font-mono text-black/60 uppercase tracking-widest mb-2">
                        {items.length} Objects Analyzed
                    </p>
                    <div className="w-full h-px bg-black/10 relative overflow-hidden">
                        <motion.div
                            style={{ scaleX: scrollYProgress }}
                            className="absolute top-0 left-0 w-full h-full bg-black origin-left"
                        />
                    </div>
                </div>
            </div>

            {/* Scrollable Content Column */}
            <div className="w-full md:w-2/3 bg-white min-h-screen">
                <div className="grid grid-cols-1 md:grid-cols-2">
                    {items.map((item, i) => (
                        <ProductCard key={item.id} item={item} index={i} />
                    ))}
                    {/* Empty placeholder to maintain grid balance if needed */}
                    {items.length % 2 !== 0 && <div className="hidden md:block bg-[#FAFAFA]" />}
                    {items.length === 0 && (
                        <div className="col-span-2 p-12 text-center font-mono text-black/30 uppercase tracking-widest">
                            No Artefacts Found in Archive
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

const ProductCard = ({ item, index }: { item: any; index: number }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className={`group relative aspect-[3/4] border-b border-r border-black/10 overflow-hidden cursor-pointer ${index % 2 !== 0 ? 'md:translate-y-24' : ''}`}
        >
            {/* Background transitions */}
            <div className="absolute inset-0 bg-[#FAFAFA] transition-colors duration-500 group-hover:bg-[#EAEAEA]" />

            {/* Image Container with Hover Scale */}
            <div className="absolute inset-8 md:inset-12 overflow-hidden bg-white shadow-sm transition-all duration-500 group-hover:inset-4 group-hover:shadow-xl">
                <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover grayscale transition-all duration-700 ease-[0.19,1,0.22,1] group-hover:grayscale-0 group-hover:scale-110"
                />
            </div>

            {/* Default State: Minimal Info (Bottom Left) */}
            <div className="absolute bottom-6 left-6 z-20 transition-opacity duration-300 group-hover:opacity-0 pointer-events-none">
                <h3 className="text-2xl font-serif text-black">{item.name}</h3>
                <p className="text-xs font-mono text-black/40 mt-1">{item.price}</p>
            </div>

            {/* Hover State: Technical Overlay */}
            <div className="absolute inset-0 p-6 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-30">
                <div className="flex justify-between items-start">
                    <span className="text-[10px] font-mono uppercase bg-black text-white px-2 py-0.5 rounded-full">
                        View Details
                    </span>
                    <span className="text-[10px] font-mono uppercase text-black border border-black/20 px-2 py-0.5 rounded-full">
                        {item.category}
                    </span>
                </div>
            </div>
        </motion.div>
    );
};

export default CollectionPage;
