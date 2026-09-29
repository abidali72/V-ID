import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      // Check if hovering over interactive elements
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest('button, a, input, [role="button"], .cursor-pointer');
        setIsHovered(!!interactive);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      id="custom-cursor-container"
      className="hidden lg:block fixed inset-0 pointer-events-none z-50 overflow-hidden"
      aria-hidden="true"
    >
      {/* Outer subtle ring */}
      <div
        id="cursor-outer-ring"
        className={`fixed top-0 left-0 rounded-full border border-black transition-transform duration-150 ease-out -translate-x-1/2 -translate-y-1/2 ${
          isHovered
            ? 'w-10 h-10 scale-125 border-black/80 bg-black/5'
            : 'w-7 h-7 scale-100 border-black/40'
        }`}
        style={{
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%) ${
            isHovered ? 'scale(1.25)' : 'scale(1)'
          }`,
        }}
      />
      {/* Inner precise dot */}
      <div
        id="cursor-inner-dot"
        className={`fixed top-0 left-0 rounded-full bg-black transition-all duration-100 ease-out -translate-x-1/2 -translate-y-1/2 ${
          isHovered ? 'w-1.5 h-1.5 opacity-60' : 'w-1 h-1 opacity-100'
        }`}
        style={{
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`,
        }}
      />
    </div>
  );
};
