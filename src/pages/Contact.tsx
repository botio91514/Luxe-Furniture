import { motion } from 'framer-motion';
import { Send, MapPin, Phone, Mail } from 'lucide-react';
import MagneticButton from '../components/MagneticButton';

const Contact = () => {
    return (
        <section className="pt-32 pb-24 min-h-screen bg-[#F3F3F3]">
            <div className="container mx-auto px-6 md:px-12 lg:px-20">
                <header className="mb-20">
                    <motion.h1
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-5xl md:text-6xl lg:text-9xl font-serif text-black leading-[0.9] tracking-tighter mb-8"
                    >
                        Let's Talk.
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-lg md:text-xl text-[#5E5E5E] max-w-2xl font-light leading-relaxed"
                    >
                        Whether you have a question about our collections, need design advice, or just want to say hello, we'd love to hear from you.
                    </motion.p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="space-y-8"
                    >
                        <div className="space-y-6">
                            <div className="group relative">
                                <input
                                    type="text"
                                    placeholder="Name"
                                    className="w-full bg-transparent border-b border-black py-4 text-black text-lg placeholder:text-[#5E5E5E] focus:outline-none focus:border-black/50 transition-colors"
                                />
                                <span className="absolute bottom-0 left-0 w-0 h-px bg-black group-focus-within:w-full transition-all duration-300" />
                            </div>
                            <div className="group relative">
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className="w-full bg-transparent border-b border-black py-4 text-black text-lg placeholder:text-[#5E5E5E] focus:outline-none focus:border-black/50 transition-colors"
                                />
                                <span className="absolute bottom-0 left-0 w-0 h-px bg-black group-focus-within:w-full transition-all duration-300" />
                            </div>
                            <div className="group relative">
                                <textarea
                                    rows={4}
                                    placeholder="Message"
                                    className="w-full bg-transparent border-b border-black py-4 text-black text-lg placeholder:text-[#5E5E5E] focus:outline-none focus:border-black/50 resize-none transition-colors"
                                />
                                <span className="absolute bottom-0 left-0 w-0 h-px bg-black group-focus-within:w-full transition-all duration-300" />
                            </div>
                        </div>

                        <MagneticButton className="w-full md:w-auto px-8 py-4 bg-black text-white rounded-full flex items-center justify-center gap-3 hover:bg-[#1a1a1a] transition-colors">
                            <span className="text-sm font-medium uppercase tracking-wide">Send Message</span>
                            <Send size={16} />
                        </MagneticButton>
                    </motion.div>

                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="space-y-12"
                    >
                        <div>
                            <h3 className="text-xl font-serif text-black mb-6">Visit Our Showroom</h3>
                            <p className="text-[#5E5E5E] leading-relaxed mb-4">
                                Experience the craftsmanship firsthand.
                                <br />
                                Open Monday - Saturday, 10am - 7pm.
                            </p>
                            <a href="#" className="inline-flex items-center gap-2 text-black hover:text-[#5E5E5E] transition-colors border-b border-black pb-1">
                                <MapPin size={16} />
                                <span>123 Artisan Avenue, Design District, NY 10013</span>
                            </a>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <h4 className="text-sm font-medium uppercase tracking-wider mb-2 text-black">Call Us</h4>
                                <a href="tel:+15551234567" className="flex items-center gap-2 text-[#5E5E5E] hover:text-black transition-colors">
                                    <Phone size={16} />
                                    <span>+1 (555) 123-4567</span>
                                </a>
                            </div>
                            <div>
                                <h4 className="text-sm font-medium uppercase tracking-wider mb-2 text-black">Email Us</h4>
                                <a href="mailto:hello@luxe.com" className="flex items-center gap-2 text-[#5E5E5E] hover:text-black transition-colors">
                                    <Mail size={16} />
                                    <span>hello@luxe.com</span>
                                </a>
                            </div>
                        </div>

                        {/* Map Visual (Placeholder) */}
                        <div className="relative aspect-video w-full overflow-hidden bg-[#E0E0E0] mt-8 group">
                            <img
                                src="/luxe-dining.jpg" // Using an existing image as placeholder for map/showroom
                                alt="Showroom Map"
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                            />
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <span className="bg-white px-4 py-2 text-xs font-medium uppercase tracking-widest text-black shadow-lg">Map View</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
