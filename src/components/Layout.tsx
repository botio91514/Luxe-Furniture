import { useState, useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from '../sections/Navigation';
import Footer from '../sections/Footer';
import CustomCursor from '../components/CustomCursor';


gsap.registerPlugin(ScrollTrigger);

const Layout = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const lenisRef = useRef<Lenis | null>(null);
    const location = useLocation();

    useEffect(() => {
        // Initialize Lenis smooth scroll
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
        });

        lenisRef.current = lenis;

        // Connect Lenis to GSAP ScrollTrigger
        lenis.on('scroll', ScrollTrigger.update);

        // Synchronize Lenis with GSAP's ticker
        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });

        gsap.ticker.lagSmoothing(0);

        // Cleanup
        return () => {
            lenis.destroy();
            gsap.ticker.remove((time) => {
                lenis.raf(time * 1000);
            });
        };
    }, []);

    // Reset scroll on route change
    useEffect(() => {
        lenisRef.current?.scrollTo(0, { immediate: true });
    }, [location.pathname]);

    // Lock body scroll when menu is open
    useEffect(() => {
        if (menuOpen) {
            document.body.style.overflow = 'hidden';
            lenisRef.current?.stop();
        } else {
            document.body.style.overflow = '';
            lenisRef.current?.start();
        }
    }, [menuOpen]);

    return (
        <div className="relative min-h-screen bg-[#F3F3F3]">
            <CustomCursor />
            <Navigation menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

            <main>
                <Outlet />
            </main>

            <Footer />
        </div>
    );
};

export default Layout;
