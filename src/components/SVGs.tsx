import React from 'react';

export const CheckerboardSVG: React.FC<{ className?: string; id?: string }> = ({
  className = '',
  id,
}) => {
  const squareSize = 3.8;
  const rowSpacing = 4.5;
  const colPitch = 7.6;
  const shift = 2.25;

  const rows = [0, 1, 2, 3];
  const cols = [0, 1, 2, 3, 4];

  return (
    <svg
      id={id}
      viewBox="0 0 36 18"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block align-middle select-none ${className}`}
      style={{
        width: 'var(--checker-w)',
        height: 'var(--checker-h)',
        transform: 'translateY(2px)',
      }}
      aria-hidden="true"
    >
      {rows.map((r) => {
        const rowShift = r % 2 === 1 ? shift : 0;
        const y = r * rowSpacing;
        return cols.map((c) => {
          const x = c * colPitch + rowShift;
          if (x < 36) {
            return (
              <rect
                key={`${r}-${c}`}
                x={x}
                y={y}
                width={squareSize}
                height={squareSize}
              />
            );
          }
          return null;
        });
      })}
    </svg>
  );
};

export const WireframeGlobeSVG: React.FC<{
  className?: string;
  id?: string;
}> = ({ className = '', id }) => {
  return (
    <svg
      id={id}
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
      className={`select-none ${className}`}
      style={{
        width: 'var(--globe)',
        height: 'var(--globe)',
      }}
      aria-hidden="true"
    >
      {/* Outer circle */}
      <circle cx="32" cy="32" r="28" />
      {/* Equator */}
      <line x1="4" y1="32" x2="60" y2="32" />
      {/* Horizontal ellipses */}
      <ellipse cx="32" cy="32" rx="28" ry="12" />
      <ellipse cx="32" cy="32" rx="28" ry="22" />
      {/* Prime Meridian */}
      <line x1="32" y1="4" x2="32" y2="60" />
      {/* Vertical ellipses */}
      <ellipse cx="32" cy="32" rx="12" ry="28" />
      <ellipse cx="32" cy="32" rx="22" ry="28" />
    </svg>
  );
};

interface CornerBracketProps {
  position: 'TL' | 'TR' | 'BL' | 'BR';
  className?: string;
  id?: string;
}

export const CornerBracketSVG: React.FC<CornerBracketProps> = ({
  position,
  className = '',
  id,
}) => {
  let path = '';
  switch (position) {
    case 'TL':
      path = 'M0 11.5V0.5H11.5';
      break;
    case 'TR':
      path = 'M0.5 0.5H11.5V11.5';
      break;
    case 'BL':
      path = 'M0 0.5V11.5H11.5';
      break;
    case 'BR':
      path = 'M0.5 11.5H11.5V0.5';
      break;
  }

  return (
    <svg
      id={id}
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="square"
      xmlns="http://www.w3.org/2000/svg"
      className={`select-none ${className}`}
      style={{
        width: 'var(--corner)',
        height: 'var(--corner)',
      }}
      aria-hidden="true"
    >
      <path d={path} />
    </svg>
  );
};
