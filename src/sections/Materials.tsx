import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Material {
  id: number;
  name: string;
  origin: string;
  description: string;
  image: string;
  color: string;
}

const materials: Material[] = [
  {
    id: 1,
    name: 'Walnut',
    origin: 'American Wood',
    description: 'Deep, rich tones with complex grain patterns that deepen with age.',
    image: '/texture-wood.jpg',
    color: '#3E2723'
  },
  {
    id: 2,
    name: 'Marble',
    origin: 'Carrara Stone',
    description: 'Cool to the touch, featuring iconic grey veining on pristine white.',
    image: '/texture-marble.jpg',
    color: '#E0E0E0'
  },
  {
    id: 3,
    name: 'Leather',
    origin: 'Italian Hide',
    description: 'Full-grain texture that develops a unique, personal patina over time.',
    image: '/texture-leather.jpg',
    color: '#4E342E'
  },
  {
    id: 4,
    name: 'Brass',
    origin: 'Solid Metal',
    description: 'Hand-brushed finish that warms the space and reflects golden light.',
    image: '/product-lamp-1.jpg',
    color: '#FFB300'
  }
];

const Materials = () => {
  // Active index for the accordion
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePanelClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <section className="relative py-24 md:py-32 bg-black text-white overflow-hidden min-h-screen flex flex-col justify-center">
      <div className="container mx-auto px-6 md:px-12 lg:px-20 mb-12 md:mb-16 relative z-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-xs font-mono text-white/50 uppercase tracking-widest mb-4 block">Archive</span>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white leading-[0.9] tracking-tighter mb-8">
            MATERIALITY
          </h2>
          <div className="w-full h-px bg-white/20" />
        </motion.div>
      </div>

      {/* Horizontal Accordion - Full Width */}
      <div className="flex flex-col md:flex-row h-[80vh] w-full px-6 md:px-12 lg:px-20 gap-2 md:gap-4">
        {materials.map((item, index) => (
          <MaterialPanel
            key={item.id}
            item={item}
            index={index}
            isActive={activeIndex === index}
            onClick={() => handlePanelClick(index)}
          />
        ))}
      </div>
    </section>
  );
};

interface MaterialPanelProps {
  item: Material;
  index: number;
  isActive: boolean;
  onClick: () => void;
}

const MaterialPanel = ({ item, index, isActive, onClick }: MaterialPanelProps) => {
  return (
    <motion.div
      layout
      onClick={onClick}
      className={`relative overflow-hidden cursor-pointer transition-all duration-700 ease-[0.16,1,0.3,1] rounded-2xl border border-white/10 ${isActive ? 'flex-[10] md:flex-[4]' : 'flex-[1] hover:flex-[1.5] hover:bg-white/5'}`}
    >
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0 bg-black">
        <img
          src={item.image}
          alt={item.name}
          className={`absolute w-full h-full object-cover transition-all duration-1000 ${isActive ? 'grayscale-0 opacity-60 scale-100' : 'grayscale opacity-20 scale-110'}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 h-full p-6 md:p-10 flex flex-col justify-end">
        <AnimatePresence mode="wait">
          {isActive ? (
            <motion.div
              key="active-content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <div className="mb-4">
                <span className="inline-block px-3 py-1 border border-white/30 rounded-full text-[10px] font-mono uppercase tracking-widest text-white/80">{item.origin}</span>
              </div>
              <h3 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white mb-6 uppercase tracking-tight leading-none">{item.name}</h3>
              <p className="text-base md:text-lg text-white/70 max-w-md font-light leading-relaxed mb-6">
                {item.description}
              </p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center md:pb-12"
            >
              {/* Vertical Spine Text */}
              <h3 className="text-xl md:text-2xl font-serif text-white/50 uppercase tracking-[0.2em] rotate-0 md:-rotate-90 whitespace-nowrap origin-center transition-colors hover:text-white">
                {item.name}
              </h3>
              <span className="absolute bottom-8 text-xs font-mono text-white/30">0{index + 1}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Materials;
