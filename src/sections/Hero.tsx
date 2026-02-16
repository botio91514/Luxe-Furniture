import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { Play, ArrowRight } from 'lucide-react';
import FluidPlane from '../components/AbstractShape';
import MagneticButton from '../components/MagneticButton';
import { Link } from 'react-router-dom';

const materialOptions = [
  { id: 'silk', label: 'Silk' },
  { id: 'velvet', label: 'Velvet' },
  { id: 'cotton', label: 'Linen' },
] as const;

const Hero = () => {
  const containerRef = useRef<HTMLElement>(null);
  const [materialType, setMaterialType] = useState<'silk' | 'velvet' | 'cotton'>('silk');

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Parallax text movement
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden bg-[#e0deda]">

      {/* 3D Background - Interactive Fluid Fabric */}
      <div className="absolute inset-0 z-0 h-full w-full transition-colors duration-1000 ease-in-out" style={{
        backgroundColor: materialType === 'velvet' ? '#1a1a1a' : '#e0deda'
      }}>
        <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 5], fov: 50 }}>
          <Environment preset="apartment" />
          <FluidPlane materialType={materialType} />
        </Canvas>
      </div>

      {/* Material Selector - Floating Widget */}
      <div className="absolute top-32 right-6 md:right-12 z-30 flex flex-col items-end gap-4 pointer-events-auto">
        <span className="text-xs font-medium uppercase tracking-widest text-[#7C7C7C] mix-blend-difference">Materiality</span>
        <div className="flex flex-col gap-2 bg-white/20 backdrop-blur-md p-2 rounded-2xl border border-white/20 shadow-xl">
          {materialOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setMaterialType(opt.id)}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 relative group`}
              title={opt.label}
            >
              {/* Dot Indicator */}
              {opt.id === 'silk' && <span className={`block w-4 h-4 rounded-full bg-[#e0deda] border border-gray-300 shadow-sm ${materialType === 'silk' ? 'scale-125 ring-2 ring-black ring-offset-2' : ''}`} />}
              {opt.id === 'velvet' && <span className={`block w-4 h-4 rounded-full bg-[#1a1a1a] border border-gray-500 shadow-sm ${materialType === 'velvet' ? 'scale-125 ring-2 ring-white ring-offset-2' : ''}`} />}
              {opt.id === 'cotton' && <span className={`block w-4 h-4 rounded-full bg-[#E5E4E2] border border-gray-300 shadow-sm ${materialType === 'cotton' ? 'scale-125 ring-2 ring-black ring-offset-2' : ''}`} />}

              {/* Tooltip */}
              <span className="absolute right-12 opacity-0 group-hover:opacity-100 transition-opacity text-xs font-medium bg-black text-white px-2 py-1 rounded pointer-events-none whitespace-nowrap">
                {opt.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Overlay */}
      <div className="absolute inset-0 z-10 flex flex-col justify-center items-center pointer-events-none">
        <motion.div style={{ y, opacity }} className="text-center mix-blend-difference text-[#F3F3F3]">
          <div className="overflow-hidden mb-2 md:mb-4">
            <motion.h1
              key={materialType} // Re-animate on change
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="text-[12vw] md:text-[10vw] font-serif leading-[0.85] tracking-tighter"
            >
              THE ART
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-8 md:mb-12">
            <motion.h1
              key={`${materialType}-2`}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              className="text-[12vw] md:text-[10vw] font-serif leading-[0.85] tracking-tighter italic"
            >
              OF COMFORT
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-sm md:text-lg uppercase tracking-[0.2em] font-light mb-12 mix-blend-difference text-white"
          >
            Timeless Furniture • Sustainable Design
          </motion.p>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="flex flex-col md:flex-row gap-6 pointer-events-auto"
        >
          <Link to="/collection">
            <MagneticButton className="bg-black text-white px-8 py-4 rounded-full flex items-center gap-3 hover:scale-105 transition-transform border border-transparent hover:border-white/20">
              <span className="uppercase tracking-widest text-xs">Explore Collection</span>
              <ArrowRight size={14} />
            </MagneticButton>
          </Link>
          <MagneticButton className="px-8 py-4 rounded-full border border-black/20 flex items-center gap-3 bg-white/10 backdrop-blur-sm hover:bg-white transition-colors group">
            <Play size={10} fill="currentColor" className="text-black" />
            <span className="uppercase tracking-widest text-xs text-black">Watch Film</span>
          </MagneticButton>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-10 left-10 md:left-20 z-20 hidden md:flex items-center gap-4 mix-blend-difference text-white"
      >
        <div className="h-px w-12 bg-white" />
        <span className="text-xs uppercase tracking-widest">Scroll to Explore</span>
      </motion.div>
    </section>
  );
};

export default Hero;
