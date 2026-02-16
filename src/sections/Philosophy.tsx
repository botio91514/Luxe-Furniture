import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const stats = [
  { value: '15+', label: 'Years of Excellence' },
  { value: '5000+', label: 'Happy Customers' },
  { value: '100%', label: 'Satisfaction Rate' },
];

const Philosophy = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useSpring(useTransform(scrollYProgress, [0, 1], [50, -50]), { stiffness: 60, damping: 20 });
  const imageY = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  return (
    <section ref={containerRef} id="philosophy" className="relative py-24 md:py-32 lg:py-40 bg-[#F3F3F3] overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: Image with Reveal */}
          <div className="relative">
            <motion.div
              style={{ y: imageY }}
              className="relative z-10 w-full overflow-hidden"
              initial={{ clipPath: 'inset(100% 0 0 0)' }}
              whileInView={{ clipPath: 'inset(0% 0 0 0)' }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, margin: "-10%" }}
            >
              <img
                src="/hero-chair.jpg"
                alt="Philosophy"
                className="w-full h-auto object-cover scale-110 aspect-[4/5]"
              />
            </motion.div>

            {/* Decorative Frame Behind */}
            <motion.div
              className="absolute -top-6 -left-6 w-full h-full border border-[#D4C4B0]"
              style={{ y: imageY }}
              initial={{ opacity: 0, x: -20, y: -20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
              viewport={{ once: true }}
            />
          </div>

          {/* Right: Content */}
          <motion.div style={{ y }} className="flex flex-col justify-center">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl lg:text-6xl font-serif text-black leading-[1.1] mb-8"
            >
              Crafting Comfort, <br /> Redefining Style.
            </motion.h2>

            <div className="space-y-6 text-lg md:text-xl text-[#5E5E5E] font-light leading-relaxed">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                At LUXE, we believe that furniture is more than just functional—it's an expression of your personal style and a foundation for your daily life.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                Our pieces are meticulously crafted by skilled artisans who pour their passion into every detail, ensuring that every curve and stitch meets our uncompromising standards.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
              viewport={{ once: true }}
              className="mt-10"
            >
              <a href="#story" className="group inline-flex items-center gap-4 text-sm font-medium uppercase tracking-widest text-black hover:opacity-60 transition-opacity">
                <span>Learn Our Story</span>
                <span className="flex items-center justify-center w-8 h-8 rounded-full border border-black group-hover:bg-black group-hover:text-white transition-all duration-300">
                  <ArrowRight size={14} className="group-hover:-rotate-45 transition-transform duration-300" />
                </span>
              </a>
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 md:gap-8 mt-16 pt-8 border-t border-[#D4C4B0]">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 + (i * 0.1), ease: "easeOut" }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-serif text-black mb-1">{stat.value}</h3>
                  <p className="text-[10px] md:text-xs uppercase tracking-wider text-[#7C7C7C]">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Philosophy;
