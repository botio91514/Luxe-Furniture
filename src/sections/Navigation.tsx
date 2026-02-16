import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const navLinks = [
  { title: "The Collection", href: "/collection" },
  { title: "Seating", href: "/collection" }, // Placeholder route
  { title: "Lighting", href: "/collection" }, // Placeholder route
  { title: "Philosophy", href: "/about" },
  { title: "Showrooms", href: "/contact" }
];

const Navigation = ({ menuOpen, setMenuOpen }: { menuOpen: boolean; setMenuOpen: (open: boolean) => void }) => {
  return (
    <>
      {/* Header: Logo (Left) + Menu Text (Right) */}
      <header className="fixed top-0 left-0 w-full z-[100] px-6 py-8 md:px-12 flex justify-between items-end mix-blend-difference text-white pointer-events-none">
        <Link
          to="/"
          className="text-2xl md:text-3xl font-serif tracking-tight z-[102] relative pointer-events-auto hover:opacity-70 transition-opacity leading-none"
          onClick={() => setMenuOpen(false)}
        >
          LUXE
        </Link>

        <div className="flex gap-8 pointer-events-auto z-[102]">
          <Link to="/collection" className="hidden md:block text-sm font-mono uppercase tracking-widest hover:opacity-70 transition-opacity">
            Shop
          </Link>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="group relative flex flex-col items-end gap-1"
          >
            <span className="text-sm font-mono uppercase tracking-widest group-hover:opacity-70 transition-opacity">
              {menuOpen ? "Close" : "Menu"}
            </span>
            <span className={`h-px bg-white transition-all duration-300 ${menuOpen ? "w-full" : "w-0 group-hover:w-full"}`} />
          </button>
        </div>
      </header>

      {/* Editorial Slide-Over Menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
              onClick={() => setMenuOpen(false)}
            />

            {/* Menu Panel - Slides from Right */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: "0%" }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }} // Exponential Ease Out
              className="fixed top-0 right-0 w-full md:w-[600px] h-full bg-[#EAEAEA] z-[101] flex flex-col justify-between p-8 md:p-16 shadow-2xl"
            >
              {/* Top Spacer */}
              <div className="h-20" />

              {/* Links */}
              <nav className="flex flex-col gap-6 md:gap-8">
                {navLinks.map((link, index) => (
                  <div key={index} className="overflow-hidden group">
                    <motion.div
                      initial={{ y: "120%" }}
                      animate={{ y: "0%" }}
                      exit={{ y: "120%" }}
                      transition={{ delay: 0.1 + (index * 0.05), duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
                    >
                      <Link
                        to={link.href}
                        onClick={() => setMenuOpen(false)}
                        className="flex items-baseline justify-between text-5xl md:text-7xl font-serif text-black leading-none hover:text-black/70 transition-all duration-300"
                      >
                        <span>{link.title}</span>
                        <span className="text-lg md:text-xl font-mono text-black/30 group-hover:text-black transition-colors duration-300 tracking-widest">
                          0{index + 1}
                        </span>
                      </Link>
                      <div className="w-full h-px bg-black/10 mt-4 group-hover:bg-black transition-colors duration-500 origin-left scale-x-100" />
                    </motion.div>
                  </div>
                ))}
              </nav>

              {/* Bottom Info with Furniture Specifics */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="border-t border-black/10 pt-8 flex flex-col gap-8"
              >
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-xs font-mono uppercase text-black/40 mb-2 tracking-widest">Customer Care</h4>
                    <div className="flex flex-col gap-1 text-sm text-black/80 font-medium">
                      <a href="#" className="hover:underline">Shipping & Returns</a>
                      <a href="#" className="hover:underline">Care Instructions</a>
                      <a href="#" className="hover:underline">FAQ</a>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xs font-mono uppercase text-black/40 mb-2 tracking-widest">Trade Program</h4>
                    <a href="mailto:trade@luxe.com" className="text-sm text-black/80 font-medium hover:underline block mb-1">Apply for Trade</a>
                    <a href="mailto:studio@luxe.com" className="text-sm text-black/80 font-medium hover:underline">studio@luxe.com</a>
                  </div>
                </div>

                <div className="flex justify-between items-end text-[10px] uppercase tracking-widest text-black/30 font-mono">
                  <span>© 2024 LUXE INTERIORS</span>
                  <span>Timeless Furniture Design</span>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
