import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const products = [
  // CHAIRS
  { id: 1, name: 'Obsidian Sofa', price: '$3,200', image: '/hero-living-room.jpg', category: 'CHAIRS' },
  { id: 2, name: 'Void Lounge', price: '$890', image: '/hero-chair.jpg', category: 'CHAIRS' },
  { id: 11, name: 'Lunar Stool', price: '$350', image: '/hero-chair.jpg', category: 'CHAIRS' },

  // DINING TABLES
  { id: 3, name: 'Nebula Dining', price: '$2,450', image: '/product-table-1.jpg', category: 'DINING TABLES' },
  { id: 10, name: 'Apex Large Table', price: '$2,100', image: '/luxe-dining.jpg', category: 'DINING TABLES' },

  // COFFEE TABLE
  { id: 13, name: 'Orbit Coffee', price: '$850', image: '/texture-marble.jpg', category: 'COFFEE TABLE' },
  { id: 14, name: 'Low Slate', price: '$920', image: '/texture-wood.jpg', category: 'COFFEE TABLE' },

  // SIDEBOARDS
  { id: 8, name: 'Monolith Sideboard', price: '$1,850', image: '/luxe-dining.jpg', category: 'SIDEBOARDS' },
  { id: 15, name: 'Veneer Credenza', price: '$2,100', image: '/hero-living-room.jpg', category: 'SIDEBOARDS' },

  // TV CABINETS
  { id: 16, name: 'Media Console X', price: '$1,600', image: '/luxe-bed.jpg', category: 'TV CABINETS' },

  // BEDS
  { id: 6, name: 'Zenith Bed', price: '$2,800', image: '/luxe-bed.jpg', category: 'BEDS' },
  { id: 17, name: 'Cloud Platform', price: '$3,100', image: '/hero-living-room.jpg', category: 'BEDS' },

  // ALMIRAHS / BOOK SHELVES
  { id: 18, name: 'Archive Shelf', price: '$1,400', image: '/product-lamp-1.jpg', category: 'ALMIRAHS' },

  // OTHERS
  { id: 4, name: 'Halo Lamp', price: '$420', image: '/product-lamp-1.jpg', category: 'OTHERS' },
  { id: 7, name: 'Aether Rug', price: '$1,200', image: '/texture-wood.jpg', category: 'OTHERS' },
  { id: 12, name: 'Terra Vase', price: '$180', image: '/texture-leather.jpg', category: 'OTHERS' },
];

const Collection = ({ limit }: { limit?: number }) => {
  return (
    <section className="bg-white py-32 relative overflow-hidden text-black transition-colors duration-500">
      <div className="container mx-auto px-6 md:px-12 lg:px-20 mb-20 flex justify-between items-end">
        <div>
          <h2 className="text-5xl md:text-8xl font-serif text-black leading-none tracking-tighter">
            THE COLLECTION.
          </h2>
          <p className="text-black/50 mt-4 text-sm font-mono uppercase tracking-widest">
            Curated Works 2024
          </p>
        </div>
        <Link to="/collection" className="hidden md:flex items-center gap-2 text-black/60 hover:text-black transition-colors">
          <span className="text-xs font-mono uppercase tracking-widest">View Gallery</span>
          <ArrowUpRight size={14} />
        </Link>
      </div>

      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <SpotlightGrid products={limit ? products.slice(0, limit) : products} />
      </div>
    </section>
  );
};

const SpotlightGrid = ({ products }: { products: any[] }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    let { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      onMouseMove={onMouseMove}
      className="group relative"
    >
      {/* The Spotlight Border Overlay - Darkened for Light Mode */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100 z-30"
        style={{
          background: useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(0,0,0,0.05), transparent 40%)`,
        }}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-black/5 border border-black/5">
        {products.map((product, index) => (
          <ProductItem key={product.id} product={product} index={index} />
        ))}
      </div>
    </div>
  );
};

const ProductItem = ({ product, index }: { product: any, index: number }) => {
  return (
    <div className="group/item relative h-[60vh] bg-[#FAFAFA] border border-transparent overflow-hidden cursor-pointer transition-colors hover:bg-white">
      {/* Image */}
      <div className="absolute inset-8 transition-all duration-700 ease-[0.16,1,0.3,1] group-hover/item:inset-0 group-hover/item:scale-100 scale-95 origin-center">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover grayscale transition-all duration-700 group-hover/item:grayscale-0 group-hover/item:scale-105"
        />
      </div>

      {/* Overlay Gradient on Hover for text readability */}
      <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/item:opacity-30 bg-black pointer-events-none" />

      {/* Default State: Minimal Info in center/corner */}
      <div className="absolute top-8 left-8 z-10 transition-opacity duration-300 group-hover/item:opacity-0 pointer-events-none">
        <span className="text-xs font-mono uppercase tracking-widest text-black/40">
          0{index + 1}
        </span>
      </div>

      {/* Hover State: Detailed Info with White Text (since bg is darkened) */}
      <div className="absolute inset-0 p-8 flex flex-col justify-between z-20 pointer-events-none">
        <div className="flex justify-end translate-y-4 opacity-0 transition-all duration-500 group-hover/item:translate-y-0 group-hover/item:opacity-100">
          <span className="text-xs font-mono uppercase tracking-widest text-white border border-white/30 px-3 py-1 rounded-full backdrop-blur-sm">
            {product.category}
          </span>
        </div>

        <div>
          <h3 className="text-5xl font-serif text-white mb-2 translate-y-8 transition-transform duration-500 group-hover/item:translate-y-0 leading-none">
            {product.name}
          </h3>
          <div className="overflow-hidden">
            <p className="text-white/80 font-mono text-sm translate-y-full transition-transform duration-500 group-hover/item:translate-y-0 delay-75">
              {product.price}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collection;
