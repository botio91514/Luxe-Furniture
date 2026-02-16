import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';

interface MenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { label: 'Shop', href: '/collection' },
  { label: 'About', href: '/about' },
  { label: 'Collection', href: '/collection' },
  { label: 'Contact', href: '/contact' },
];

const MenuOverlay = ({ isOpen, onClose }: MenuOverlayProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ clipPath: "circle(0% at calc(100% - 40px) 40px)" }}
          animate={{ clipPath: "circle(150% at calc(100% - 40px) 40px)" }}
          exit={{ clipPath: "circle(0% at calc(100% - 40px) 40px)" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[1001] bg-white flex flex-col justify-center px-8 md:px-20"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-8 right-8 w-12 h-12 flex items-center justify-center rounded-full bg-black text-white hover:bg-[#333] transition-colors"
          >
            <X size={24} />
          </button>

          {/* Menu Items */}
          <div className="space-y-4">
            {menuItems.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ y: 80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 80, opacity: 0 }}
                transition={{ duration: 0.8, delay: 0.1 * index, ease: [0.76, 0, 0.24, 1] }}
              >
                <Link
                  to={item.href}
                  onClick={onClose}
                  className="block text-5xl md:text-7xl lg:text-8xl font-serif text-black hover:text-[#5E5E5E] transition-colors duration-300"
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Contact Info Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="absolute bottom-12 left-8 right-8 md:left-20 md:right-20 flex flex-col md:flex-row justify-between gap-8 pt-8 border-t border-gray-200"
          >
            <div>
              <h4 className="text-sm font-medium uppercase tracking-wider text-gray-500 mb-2">Socials</h4>
              <div className="flex gap-4 text-black font-medium">
                <a href="#">Instagram</a>
                <a href="#">Twitter</a>
                <a href="#">LinkedIn</a>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium uppercase tracking-wider text-gray-500 mb-2">Code</h4>
              <p className="text-black font-medium">React • Tailwind • Framer Motion</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MenuOverlay;
