import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Store interactive states as refs so the animation loop can access them instantly without re-rendering
  const isClicked = useRef(false);
  const isHovered = useRef(false);

  // Smooth lerped position tracking
  const mouseCoords = useRef({ x: 0, y: 0 });
  const ringCoords = useRef({ x: 0, y: 0 });
  const dotScale = useRef(1);
  const ringScale = useRef(1);

  useEffect(() => {
    // Hide standard cursor on desktop viewports to prevent double cursor artifacting
    const addCursorStyles = () => {
      const style = document.createElement('style');
      style.id = 'custom-cursor-hide-default';
      style.innerHTML = `
        @media (min-width: 768px) {
          body, a, button, [role="button"], input, textarea, select, .cursor-pointer {
            cursor: none !important;
          }
        }
      `;
      document.head.appendChild(style);
    };
    addCursorStyles();

    const onMouseMove = (e: MouseEvent) => {
      mouseCoords.current.x = e.clientX;
      mouseCoords.current.y = e.clientY;
      if (!isVisible) setIsVisible(true);
    };

    const onMouseDown = () => {
      isClicked.current = true;
    };
    const onMouseUp = () => {
      isClicked.current = false;
    };

    // Fast delegation for hover targeting using mouseover
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('clickable') ||
        target.closest('.clickable') ||
        window.getComputedStyle(target).cursor === 'pointer'
      ) {
        isHovered.current = true;
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('clickable') ||
        target.closest('.clickable')
      ) {
        isHovered.current = false;
      }
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    const onMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseout', onMouseOut);
    document.body.addEventListener('mouseleave', onMouseLeave);
    document.body.addEventListener('mouseenter', onMouseEnter);

    // Performance loop driven by screen refresh rates
    let animationFrameId: number;
    const updateCursor = () => {
      // Smoothly interpolate scale values for organic elasticity
      const targetDotScale = isClicked.current ? 0.7 : isHovered.current ? 1.6 : 1;
      const targetRingScale = isClicked.current ? 0.8 : isHovered.current ? 1.3 : 1;

      dotScale.current += (targetDotScale - dotScale.current) * 0.2;
      ringScale.current += (targetRingScale - ringScale.current) * 0.2;

      // 1. Translate Inner Dot (Extremely responsive, minimal delay)
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseCoords.current.x}px, ${mouseCoords.current.y}px, 0) translate(-50%, -50%) scale(${dotScale.current})`;
      }

      // 2. Trailing Ring using smooth lerping
      const ease = 0.16; // Trailing responsiveness factor
      ringCoords.current.x += (mouseCoords.current.x - ringCoords.current.x) * ease;
      ringCoords.current.y += (mouseCoords.current.y - ringCoords.current.y) * ease;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringCoords.current.x}px, ${ringCoords.current.y}px, 0) translate(-50%, -50%) scale(${ringScale.current})`;
        // Toggle active border styling dynamically via JS
        if (isHovered.current) {
          ringRef.current.style.borderColor = 'rgba(79, 70, 229, 0.8)';
          ringRef.current.style.backgroundColor = 'rgba(79, 70, 229, 0.08)';
        } else {
          ringRef.current.style.borderColor = 'rgba(79, 70, 229, 0.35)';
          ringRef.current.style.backgroundColor = 'transparent';
        }
      }

      animationFrameId = requestAnimationFrame(updateCursor);
    };
    animationFrameId = requestAnimationFrame(updateCursor);

    return () => {
      const styleEl = document.getElementById('custom-cursor-hide-default');
      if (styleEl) styleEl.remove();

      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
      document.body.removeEventListener('mouseleave', onMouseLeave);
      document.body.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Inner Dot Indicator */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-50 h-2.5 w-2.5 rounded-full bg-indigo-500 mix-blend-normal md:block hidden will-change-transform shadow-sm shadow-indigo-500/20"
      />

      {/* Outer Magnetic/Trailing Ring */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 z-50 h-8 w-8 rounded-full border border-indigo-500/35 transition-colors duration-250 ease-out md:block hidden will-change-transform"
      />
    </>
  );
}
