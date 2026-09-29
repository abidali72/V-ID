import React, { useEffect, useRef, useState } from 'react';
import { BG_IMAGE_1, BG_IMAGE_2 } from '../data';

export const ImageRevealBackground: React.FC = () => {
  const revealLayerRef = useRef<HTMLDivElement>(null);
  const patternRef = useRef<SVGPatternElement>(null);
  const [cellSize, setCellSize] = useState<number>(48);

  useEffect(() => {
    // Check if window is available
    if (typeof window === 'undefined') return;

    let animId: number;
    const mouse = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    };
    const smooth = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    };
    const gridOffset = { x: 0, y: 0 };

    // Offscreen canvas for mask generation
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const updateDimensions = () => {
      // Fluid cell size
      const newCellSize = Math.round(
        Math.min(64, Math.max(36, window.innerWidth * 0.028))
      );
      setCellSize(newCellSize);

      // Downscale mask canvas slightly for optimal rendering performance while maintaining smoothness
      const scale = 0.5;
      canvas.width = Math.max(100, Math.floor(window.innerWidth * scale));
      canvas.height = Math.max(100, Math.floor(window.innerHeight * scale));
    };

    updateDimensions();

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleResize = () => {
      updateDimensions();
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    const renderLoop = () => {
      // Ease smooth cursor toward mouse position (factor 0.1)
      smooth.x += (mouse.x - smooth.x) * 0.1;
      smooth.y += (mouse.y - smooth.y) * 0.1;

      // Spotlight radius (fluid): Math.round(Math.min(420, Math.max(160, window.innerWidth * 0.16)))
      const rawRadius = Math.round(
        Math.min(420, Math.max(160, window.innerWidth * 0.16))
      );

      if (ctx && canvas.width > 0 && canvas.height > 0) {
        const scaleX = canvas.width / window.innerWidth;
        const scaleY = canvas.height / window.innerHeight;
        const cx = smooth.x * scaleX;
        const cy = smooth.y * scaleY;
        const radius = rawRadius * scaleX;

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw soft radial gradient circle
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
        grad.addColorStop(0, 'rgba(255,255,255,1)');
        grad.addColorStop(0.4, 'rgba(255,255,255,1)');
        grad.addColorStop(0.6, 'rgba(255,255,255,0.75)');
        grad.addColorStop(0.75, 'rgba(255,255,255,0.4)');
        grad.addColorStop(0.88, 'rgba(255,255,255,0.12)');
        grad.addColorStop(1, 'rgba(255,255,255,0)');

        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const maskUrl = `url(${canvas.toDataURL('image/png')})`;
        if (revealLayerRef.current) {
          revealLayerRef.current.style.maskImage = maskUrl;
          revealLayerRef.current.style.webkitMaskImage = maskUrl;
          revealLayerRef.current.style.maskSize = '100% 100%';
          (revealLayerRef.current.style as any).webkitMaskSize = '100% 100%';
        }
      }

      // Parallax grid calculation
      const normX = smooth.x / window.innerWidth - 0.5;
      const normY = smooth.y / window.innerHeight - 0.5;
      const targetOffX = normX * 16;
      const targetOffY = normY * 16;

      gridOffset.x += (targetOffX - gridOffset.x) * 0.06;
      gridOffset.y += (targetOffY - gridOffset.y) * 0.06;

      if (patternRef.current) {
        patternRef.current.setAttribute('x', gridOffset.x.toFixed(2));
        patternRef.current.setAttribute('y', gridOffset.y.toFixed(2));
      }

      animId = requestAnimationFrame(renderLoop);
    };

    animId = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div
      id="desktop-image-reveal-bg"
      className="hidden lg:block fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Base Layer: BG_IMAGE_1 */}
      <div
        id="bg-base-layer"
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url("${BG_IMAGE_1}")` }}
      />

      {/* Reveal Layer: BG_IMAGE_2 with dynamic canvas mask */}
      <div
        id="bg-reveal-layer"
        ref={revealLayerRef}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url("${BG_IMAGE_2}")`,
          maskRepeat: 'no-repeat',
          WebkitMaskRepeat: 'no-repeat',
        }}
      />

      {/* Subtle SVG Grid Overlay */}
      <svg
        id="bg-grid-overlay"
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ opacity: 0.1 }}
      >
        <defs>
          <pattern
            id="reveal-bg-grid-pattern"
            ref={patternRef}
            width={cellSize}
            height={cellSize}
            patternUnits="userSpaceOnUse"
          >
            <path
              d={`M ${cellSize} 0 L 0 0 0 ${cellSize}`}
              fill="none"
              stroke="#64748b"
              strokeWidth="0.6"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#reveal-bg-grid-pattern)" />
      </svg>
    </div>
  );
};
