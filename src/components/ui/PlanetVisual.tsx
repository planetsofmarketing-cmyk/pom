'use client';

import { useEffect, useRef, type CSSProperties } from 'react';
import { drawPlanetSphere, type PlanetTextureType } from '@/lib/planetTextures';

const PLANET_SURFACES: Record<string, { type: PlanetTextureType; colors: string[]; ring?: boolean }> = {
  sun: { type: 'swirl', colors: ['#ff9a1f', '#ffb84d', '#e8590c'] },
  mercury: { type: 'rock', colors: ['#8c8a86', '#5d5b58', '#b7b4ae'] },
  venus: { type: 'swirl', colors: ['#e8a65a', '#c76f2b', '#f6d49a'] },
  earth: { type: 'earth', colors: ['#1f5fae', '#2f8f4e', '#fff'] },
  mars: { type: 'rock', colors: ['#b2482a', '#7a2c18', '#d98a5f'] },
  jupiter: { type: 'bands', colors: ['#d9b48a', '#a8714a', '#f2e1c8', '#8a5a3b'] },
  saturn: { type: 'bands', colors: ['#e6cf9a', '#c9a96a', '#f5ead0', '#b99454'], ring: true },
  uranus: { type: 'bands', colors: ['#9bdff2', '#4b9db7', '#d1f6ff'] },
  neptune: { type: 'bands', colors: ['#2e5be0', '#1c3a9e', '#6f95ff'] },
  pluto: { type: 'rock', colors: ['#b9aa97', '#776c60', '#e1d0bc'] },
};

interface PlanetVisualProps {
  name: string;
  size: number;
  className?: string;
  style?: CSSProperties;
}

export default function PlanetVisual({ name, size, className = '', style }: PlanetVisualProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const key = name.toLowerCase().replace(/^the\s+/, '');
  const surface = PLANET_SURFACES[key] ?? PLANET_SURFACES.mercury;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const pixelSize = Math.max(32, Math.round(size * Math.min(window.devicePixelRatio || 1, 2)));
    canvas.width = pixelSize;
    canvas.height = pixelSize;
    drawPlanetSphere(canvas, surface.type, surface.colors);
  }, [size, surface]);

  return (
    <span
      className={`relative inline-flex flex-shrink-0 items-center justify-center ${className}`}
      style={{ width: size, height: size, ...style }}
      aria-hidden="true"
    >
      {surface.ring && (
        <>
          <span className="absolute left-[-24%] top-[32%] z-0 h-[42%] w-[148%] rotate-[-18deg] rounded-[50%] border-[5px] border-[#d6c294]/70 shadow-[0_0_10px_rgba(214,194,148,0.3)]" />
          <span
            className="absolute left-[-24%] top-[32%] z-20 h-[42%] w-[148%] rotate-[-18deg] rounded-[50%] border-[5px] border-[#d6c294]/70"
            style={{ clipPath: 'inset(55% 0 0)' }}
          />
        </>
      )}
      <canvas ref={canvasRef} width={size * 2} height={size * 2} className="relative z-10 block h-full w-full rounded-full" />
    </span>
  );
}