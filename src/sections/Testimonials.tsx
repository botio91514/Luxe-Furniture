import { motion } from 'framer-motion';

const reviews = [
  { text: "A triumph of form.", author: "Sarah M." },
  { text: "Obsessed with the texture.", author: "David K." },
  { text: "Finally found it.", author: "Elena R." },
  { text: "Worth every penny.", author: "James L." },
  { text: "Sculptural perfection.", author: "Marcus T." },
  { text: "The leather is alive.", author: "Priya S." },
  { text: "Timeless elegance.", author: "Robert B." },
  { text: "My sanctuary.", author: "Emily W." },
  { text: "Beyond furniture.", author: "Alex D." },
  { text: "Pure aesthetic joy.", author: "Sofia C." },
  { text: "Unmatched quality.", author: "Thomas H." },
  { text: "A modern classic.", author: "Jessica P." },
];

const Testimonials = () => {
  return (
    <section className="relative py-24 md:py-32 bg-white text-black overflow-hidden select-none border-t border-black/5">
      <div className="container mx-auto px-6 md:px-12 lg:px-20 mb-12 md:mb-20 text-center">
        <span className="text-xs font-mono uppercase tracking-widest text-black/40 mb-4 block">Reviews</span>
        <h2 className="text-5xl md:text-7xl lg:text-8xl font-serif text-black leading-[0.9] tracking-tighter">
          WORD OF MOUTH
        </h2>
      </div>

      {/* Masked Gradient Overlay for fade effect - Using CSS Mask for better performance */}
      <div className="relative h-[60vh] md:h-[80vh] overflow-hidden flex gap-4 md:gap-8 justify-center px-4 md:px-12 mask-gradient">
        {/* Column 1 - Slow Up */}
        <ReviewColumn reviews={reviews.slice(0, 4)} duration={45} direction="up" />

        {/* Column 2 - Fast Down (Hidden on Mobile) */}
        <ReviewColumn reviews={reviews.slice(4, 8)} duration={35} direction="down" className="hidden md:block" />

        {/* Column 3 - Medium Up (Hidden on Tablet) */}
        <ReviewColumn reviews={reviews.slice(8, 12)} duration={50} direction="up" className="hidden lg:block" />
      </div>

      <style>{`
                .mask-gradient {
                    mask-image: linear-gradient(to bottom, transparent, black 10%, black 90%, transparent);
                    -webkit-mask-image: linear-gradient(to bottom, transparent, black 10%, black 90%, transparent);
                }
            `}</style>
    </section>
  );
};

interface ReviewColumnProps {
  reviews: { text: string, author: string }[];
  duration: number;
  direction: 'up' | 'down';
  className?: string;
}

const ReviewColumn = ({ reviews, duration, direction, className = "" }: ReviewColumnProps) => {
  return (
    <div className={`flex-1 h-full overflow-hidden relative ${className}`}>
      <motion.div
        className="flex flex-col gap-6 absolute w-full"
        animate={{
          y: direction === 'up' ? ["0%", "-50%"] : ["-50%", "0%"]
        }}
        transition={{
          duration: duration,
          ease: "linear",
          repeat: Infinity
        }}
      >
        {/* Render Reviews Twice for Loop */}
        {[...reviews, ...reviews].map((review, i) => (
          <div key={i} className="p-8 md:p-12 bg-[#F8F8F8] border border-black/5 transition-all duration-300 hover:bg-black hover:text-white group hover:scale-[1.02] hover:shadow-xl cursor-default">
            <div className="flex flex-col gap-6">
              <div className="text-6xl font-serif leading-[0.5] text-black/10 group-hover:text-white/20">"</div>
              <p className="text-xl md:text-2xl font-serif leading-tight group-hover:italic transition-all">
                {review.text}
              </p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-px bg-black/20 group-hover:bg-white/40" />
                <span className="text-xs font-mono uppercase tracking-widest opacity-60">
                  {review.author}
                </span>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default Testimonials;
