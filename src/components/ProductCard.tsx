import { useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Plus, ArrowUpRight } from 'lucide-react';

interface ProductProps {
    id: number;
    name: string;
    price: number;
    image: string;
    category: string;
    index: number;
}

const ProductCard = ({ name, price, image, category, index }: ProductProps) => {
    const cardRef = useRef<HTMLDivElement>(null);

    // Mouse move effect for subtle 3D tilt
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 400, damping: 40 });
    const mouseY = useSpring(y, { stiffness: 400, damping: 40 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], [7, -7]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], [-7, 7]);

    function handleMouseMove({ clientX, clientY, currentTarget }: React.MouseEvent) {
        const { left, top, width, height } = currentTarget.getBoundingClientRect();
        const xPct = (clientX - left) / width - 0.5;
        const yPct = (clientY - top) / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    }

    function handleMouseLeave() {
        x.set(0);
        y.set(0);
    }

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="group relative flex flex-col gap-6 cursor-pointer perspective-1000"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ perspective: 1000 }}
        >
            {/* Image Container with 3D Tilt */}
            <motion.div
                className="relative aspect-[3/4] overflow-hidden bg-[#F0F0F0] w-full shadow-lg group-hover:shadow-2xl transition-shadow duration-500"
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d"
                }}
            >
                <motion.div
                    className="w-full h-full"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                    <img
                        src={image}
                        alt={name}
                        className="w-full h-full object-cover"
                    />
                </motion.div>

                {/* Overlay Darken */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500 pointer-events-none" />

                {/* Category Tag */}
                <div className="absolute top-4 left-4 z-10 translate-z-20" style={{ transform: "translateZ(20px)" }}>
                    <span className="inline-block px-3 py-1 bg-white/90 backdrop-blur-md text-[10px] uppercase tracking-widest font-medium text-black">
                        {category}
                    </span>
                </div>

                {/* Action Button - Appears on Hover */}
                <div
                    className="absolute bottom-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out z-10"
                    style={{ transform: "translateZ(30px)" }}
                >
                    <button className="h-12 w-12 rounded-full bg-white text-black flex items-center justify-center hover:bg-black hover:text-white transition-colors duration-300 shadow-xl">
                        <Plus size={20} />
                    </button>
                </div>
            </motion.div>

            {/* Product Details */}
            <div className="flex justify-between items-start px-1">
                <div className="space-y-1">
                    <h3 className="text-xl font-serif text-black group-hover:underline decoration-1 underline-offset-4 transition-all">
                        {name}
                    </h3>
                    <p className="text-sm text-[#7C7C7C] font-medium tracking-wide">USD {price.toLocaleString()}</p>
                </div>

                {/* Arrow Reveal */}
                <div className="overflow-hidden">
                    <div className="translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                        <ArrowUpRight size={20} className="text-black" />
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ProductCard;
