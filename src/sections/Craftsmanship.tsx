import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Craftsmanship = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Parallax text movement
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);

  return (
    <section ref={containerRef} className="relative min-h-screen bg-black text-white py-32 overflow-hidden flex flex-col justify-center">

      {/* Background Text Texture */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none select-none overflow-hidden">
        <div className="animate-marquee whitespace-nowrap text-[20vw] font-serif leading-none">
          HANDMADE • PASSION • SOUL • HANDMADE • PASSION • SOUL •
        </div>
        <div className="animate-marquee-reverse whitespace-nowrap text-[20vw] font-serif leading-none">
          DETAILS • QUALITY • ART • DETAILS • QUALITY • ART •
        </div>
        <div className="animate-marquee whitespace-nowrap text-[20vw] font-serif leading-none">
          FUTURE • HERITAGE • NOW • FUTURE • HERITAGE • NOW •
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-20 items-center">

        {/* Image Composition */}
        <div className="relative">
          <motion.div style={{ y: y1 }} className="w-4/5 ml-auto relative z-10">
            <img
              src="/hero-chair.jpg"
              alt="Detail"
              className="w-full h-auto grayscale contrast-125 brightness-90"
            />
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white rounded-full flex items-center justify-center mix-blend-difference">
              <span className="text-black font-bold uppercase text-xs tracking-widest text-center">100+<br />Hours</span>
            </div>
          </motion.div>

          <motion.div style={{ y: y2 }} className="absolute top-20 -left-10 w-3/5 z-0 opacity-50">
            <img
              src="/texture-wood.jpg"
              alt="Wood Grain"
              className="w-full h-auto"
            />
          </motion.div>
        </div>

        {/* Content */}
        <div className="relative text-white z-20">
          <h2 className="text-6xl md:text-8xl font-serif leading-[0.85] tracking-tighter mb-12">
            UN<br />COMPRO<br />MISED.
          </h2>

          <div className="space-y-12">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest mb-4 border-b border-white/20 pb-2 inline-block">The Human Touch</h3>
              <p className="text-lg md:text-xl font-light text-white/70 max-w-sm leading-relaxed">
                Machines build products. Hands build soul. Every curve is shaped by an artisan who refuses to settle for "good enough."
              </p>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest mb-4 border-b border-white/20 pb-2 inline-block">Material Integrity</h3>
              <p className="text-lg md:text-xl font-light text-white/70 max-w-sm leading-relaxed">
                We don't hide imperfections; we celebrate them. The grain of the wood, the mark of the chisel — these are the signatures of truth.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Craftsmanship;
