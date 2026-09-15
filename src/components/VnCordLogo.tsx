import React from 'react';

interface VnCordLogoProps {
  variant?: 'horizontal' | 'vertical' | 'mark' | 'image';
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'custom';
  className?: string;
  showTagline?: boolean;
  inverted?: boolean; // For dark backgrounds
  onClick?: () => void;
}

// Mark-only component: shows just the logo image cropped/sized appropriately
export const VnCordMark: React.FC<{ size?: number; className?: string }> = ({ size = 64, className = '' }) => {
  return (
    <img
      src="/vncord-logo-main.png"
      alt="VNCORD-DK logo mark"
      width={size}
      height={size}
      style={{ width: size, height: size, objectFit: 'contain', display: 'block' }}
      className={`shrink-0 select-none ${className}`}
      draggable={false}
    />
  );
};

export const VnCordLogo: React.FC<VnCordLogoProps> = ({
  variant = 'horizontal',
  size = 'md',
  className = '',
  showTagline: _showTagline = true,
  inverted: _inverted = false,
  onClick,
}) => {
  // Size mapping
  const heightMap: Record<string, string> = {
    sm: '52px',
    md: '72px',
    lg: '100px',
    xl: '140px',
    custom: 'auto',
  };

  const h = heightMap[size] || '56px';

  // All variants render the actual logo image (vertical layout with text)
  // For 'mark' variant, show a smaller cropped version
  if (variant === 'mark') {
    const markSizes: Record<string, number> = { sm: 36, md: 48, lg: 64, xl: 96, custom: 48 };
    const s = markSizes[size] || 48;
    return (
      <div onClick={onClick} className={`inline-flex ${onClick ? 'cursor-pointer' : ''} ${className}`}>
        <img
          src="/vncord-logo-main.png"
          alt="VNCORD-DK"
          width={s}
          height={s}
          style={{ width: s, height: s, objectFit: 'contain' }}
          className="shrink-0 select-none"
          draggable={false}
        />
      </div>
    );
  }

  // horizontal, vertical, image — all show the full logo PNG
  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      <img
        src="/vncord-logo-main.png"
        alt="VNCORD-DK - Cells for family"
        style={{ height: h, width: 'auto', objectFit: 'contain' }}
        className="shrink-0 select-none block"
        draggable={false}
      />
    </div>
  );
};
