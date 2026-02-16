import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Instagram, Twitter, Facebook, Send } from 'lucide-react';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Shop', href: '/collection' },
  { label: 'Contact', href: '/contact' },
];

const supportLinks = [
  { label: 'FAQ', href: '#' },
  { label: 'Shipping', href: '#' },
  { label: 'Returns', href: '#' },
  { label: 'Track Order', href: '#' },
];

const legalLinks = [
  { label: 'Privacy Policy', href: '#' },
  { label: 'Terms of Service', href: '#' },
];

const Footer = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;

    if (!section || !content) return;

    const ctx = gsap.context(() => {
      // Footer wipe reveal
      gsap.fromTo(
        section,
        { clipPath: 'inset(100% 0 0 0)' },
        {
          clipPath: 'inset(0% 0 0 0)',
          duration: 0.8,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Logo fade + scale
      const logo = content.querySelector('.footer-logo');
      if (logo) {
        gsap.fromTo(
          logo,
          { scale: 0.9, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
            delay: 0.2,
          }
        );
      }

      // Link columns stagger
      const linkColumns = content.querySelectorAll('.link-column');
      linkColumns.forEach((column, index) => {
        const links = column.querySelectorAll('a');
        gsap.fromTo(
          links,
          { opacity: 0, x: -10 },
          {
            opacity: 1,
            x: 0,
            duration: 0.4,
            ease: 'smooth',
            stagger: 0.05,
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
            delay: 0.3 + index * 0.1,
          }
        );
      });

      // Newsletter
      const newsletter = content.querySelector('.newsletter-section');
      if (newsletter) {
        gsap.fromTo(
          newsletter,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 70%',
              toggleActions: 'play none none none',
            },
            delay: 0.5,
          }
        );
      }

      // Social icons pop in
      const socials = content.querySelectorAll('.social-icon');
      gsap.fromTo(
        socials,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          ease: 'elastic.out(1, 0.5)',
          stagger: 0.08,
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
          delay: 0.7,
        }
      );

      // Copyright fade
      const copyright = content.querySelector('.copyright');
      if (copyright) {
        gsap.fromTo(
          copyright,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.4,
            ease: 'smooth',
            scrollTrigger: {
              trigger: section,
              start: 'top 60%',
              toggleActions: 'play none none none',
            },
            delay: 0.9,
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer
      id="footer"
      ref={sectionRef}
      className="relative bg-black text-white overflow-hidden"
    >
      <div ref={contentRef} className="w-full px-6 md:px-12 lg:px-20 py-16 md:py-20">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="footer-logo mb-6">
              <a href="#" className="text-3xl md:text-4xl font-serif text-white">
                LUXE
              </a>
            </div>
            <p className="text-sm text-[#7C7C7C] leading-relaxed mb-6">
              Crafting comfort, redefining style. Premium furniture for the modern home.
            </p>
            {/* Social Icons */}
            <div className="flex gap-4">
              <a
                href="#"
                className="social-icon w-10 h-10 rounded-full border border-[#7C7C7C] flex items-center justify-center text-white hover:bg-white hover:text-black hover:border-white transition-all duration-300 hover:-translate-y-1"
                aria-label="Facebook"
              >
                <Facebook size={16} />
              </a>
              <a
                href="#"
                className="social-icon w-10 h-10 rounded-full border border-[#7C7C7C] flex items-center justify-center text-white hover:bg-white hover:text-black hover:border-white transition-all duration-300 hover:-translate-y-1"
                aria-label="Instagram"
              >
                <Instagram size={16} />
              </a>
              <a
                href="#"
                className="social-icon w-10 h-10 rounded-full border border-[#7C7C7C] flex items-center justify-center text-white hover:bg-white hover:text-black hover:border-white transition-all duration-300 hover:-translate-y-1"
                aria-label="Twitter"
              >
                <Twitter size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="link-column">
            <h4 className="text-sm font-medium uppercase tracking-wider mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-[#7C7C7C] hover:text-white hover:translate-x-1 inline-block transition-all duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="link-column">
            <h4 className="text-sm font-medium uppercase tracking-wider mb-6">Support</h4>
            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-[#7C7C7C] hover:text-white hover:translate-x-1 inline-block transition-all duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="newsletter-section">
            <h4 className="text-sm font-medium uppercase tracking-wider mb-2">Stay Inspired</h4>
            <p className="text-sm text-[#7C7C7C] mb-6">
              Subscribe for exclusive offers and design tips
            </p>
            <form onSubmit={handleSubscribe} className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-3 bg-transparent border border-[#7C7C7C] text-white text-sm placeholder:text-[#7C7C7C] focus:border-white focus:outline-none focus:ring-0 transition-colors duration-300"
                required
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300"
                aria-label="Subscribe"
              >
                <Send size={14} />
              </button>
            </form>
            {subscribed && (
              <p className="text-xs text-green-400 mt-2">Thank you for subscribing!</p>
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-[#333] mb-8" />

        {/* Bottom Row */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Legal Links */}
          <div className="flex flex-wrap gap-6">
            {legalLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs text-[#7C7C7C] hover:text-white transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="copyright text-xs text-[#7C7C7C]">
            © 2024 LUXE. All rights reserved.
          </p>
        </div>
      </div>

      {/* Large Background Logo */}
      <div className="absolute bottom-0 right-0 text-[20vw] font-serif text-white/[0.02] leading-none pointer-events-none select-none">
        LUXE
      </div>
    </footer>
  );
};

export default Footer;
