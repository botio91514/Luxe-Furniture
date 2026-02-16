import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const CTA = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;
    const content = contentRef.current;

    if (!section || !bg || !content) return;

    const ctx = gsap.context(() => {
      // Background parallax reveal
      gsap.fromTo(
        bg,
        { scale: 1.1, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Content container clip-path reveal
      gsap.fromTo(
        content,
        { clipPath: 'polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)', opacity: 0 },
        {
          clipPath: 'polygon(0 0, 100% 5%, 100% 100%, 0 95%)',
          opacity: 1,
          duration: 0.8,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
          delay: 0.2,
        }
      );

      // Headline word-by-word reveal
      const headline = content.querySelector('h2');
      if (headline) {
        gsap.fromTo(
          headline,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 60%',
              toggleActions: 'play none none none',
            },
            delay: 0.5,
          }
        );
      }

      // Body text
      const body = content.querySelector('p');
      if (body) {
        gsap.fromTo(
          body,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: 'smooth',
            scrollTrigger: {
              trigger: section,
              start: 'top 60%',
              toggleActions: 'play none none none',
            },
            delay: 0.7,
          }
        );
      }

      // CTA button with glow
      const cta = content.querySelector('a');
      if (cta) {
        gsap.fromTo(
          cta,
          { scale: 0.9, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            ease: 'elastic.out(1, 0.5)',
            scrollTrigger: {
              trigger: section,
              start: 'top 60%',
              toggleActions: 'play none none none',
            },
            delay: 0.9,
          }
        );
      }

      // Parallax effects
      ScrollTrigger.create({
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          
          // Background deep parallax
          gsap.to(bg, {
            y: -100 * progress,
            ease: 'none',
            overwrite: 'auto',
          });

          // Content shallow parallax
          gsap.to(content, {
            y: -30 * progress,
            ease: 'none',
            overwrite: 'auto',
          });
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-32 md:py-48 lg:py-64 overflow-hidden"
    >
      {/* Background Image */}
      <div
        ref={bgRef}
        className="absolute inset-0"
        style={{ willChange: 'transform' }}
      >
        <img
          src="/luxe-dining.jpg"
          alt="LUXE Dining Room"
          className="w-full h-full object-cover"
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-6 md:px-12 lg:px-20">
        <div
          ref={contentRef}
          className="glass-card max-w-2xl mx-auto px-8 md:px-12 lg:px-16 py-12 md:py-16 text-center"
          style={{ clipPath: 'polygon(0 0, 100% 5%, 100% 100%, 0 95%)' }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-black leading-[1.2] mb-6">
            Ready to Transform
            <br />
            Your Space?
          </h2>

          <p className="text-base md:text-lg text-[#5E5E5E] mb-10 max-w-md mx-auto">
            Explore our complete collection and find the perfect pieces to elevate your home.
          </p>

          <a
            href="#collection"
            className="inline-flex items-center gap-3 px-8 py-4 bg-black text-white text-sm font-medium hover:bg-[#5E5E5E] transition-all duration-300 glow-pulse group"
            data-cursor-text="Shop"
          >
            <span>Shop Now</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
          </a>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 left-8 w-px h-24 bg-white/20 hidden lg:block" />
      <div className="absolute bottom-1/4 right-8 w-px h-24 bg-white/20 hidden lg:block" />
    </section>
  );
};

export default CTA;
