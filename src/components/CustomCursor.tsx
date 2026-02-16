import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorTextRef = useRef<HTMLSpanElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const mousePos = useRef({ x: 0, y: 0 });
  const isTouch = useRef(false);

  useEffect(() => {
    // Detect touch device
    isTouch.current = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch.current) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.08,
        ease: 'power2.out',
      });
    };

    const onMouseEnterInteractive = (e: Event) => {
      const target = e.target as HTMLElement;
      const viewText = target.dataset.cursorText || 'View';
      setCursorText(viewText);
      setIsExpanded(true);
    };

    const onMouseLeaveInteractive = () => {
      setIsExpanded(false);
      setCursorText('');
    };

    // Add listeners
    document.addEventListener('mousemove', onMouseMove);

    // Add hover effects to interactive elements
    const interactiveElements = document.querySelectorAll(
      'a, button, [data-cursor-expand], .product-card-3d, .img-scale'
    );

    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', onMouseEnterInteractive);
      el.addEventListener('mouseleave', onMouseLeaveInteractive);
    });

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', onMouseEnterInteractive);
        el.removeEventListener('mouseleave', onMouseLeaveInteractive);
      });
    };
  }, []);

  // Re-attach listeners when DOM changes
  useEffect(() => {
    if (isTouch.current) return;

    const onMouseEnterInteractive = (e: Event) => {
      const target = e.target as HTMLElement;
      const viewText = target.dataset.cursorText || 'View';
      setCursorText(viewText);
      setIsExpanded(true);
    };

    const onMouseLeaveInteractive = () => {
      setIsExpanded(false);
      setCursorText('');
    };

    const observer = new MutationObserver(() => {
      const interactiveElements = document.querySelectorAll(
        'a, button, [data-cursor-expand], .product-card-3d, .img-scale'
      );

      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', onMouseEnterInteractive);
        el.removeEventListener('mouseleave', onMouseLeaveInteractive);
        el.addEventListener('mouseenter', onMouseEnterInteractive);
        el.addEventListener('mouseleave', onMouseLeaveInteractive);
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  // Hide on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <div
      ref={cursorRef}
      className={`custom-cursor ${isExpanded ? 'expanded' : ''}`}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 9999,
      }}
    >
      <span ref={cursorTextRef} className="custom-cursor-text">
        {cursorText}
      </span>
    </div>
  );
};

export default CustomCursor;
