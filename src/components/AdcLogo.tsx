import React from 'react';

interface AdcLogoProps {
  size?: number;
  className?: string;
}

const LOGO_URL =
  'https://res.cloudinary.com/djh9qeaf6/image/upload/v1773862953/WhatsApp_Image_2026-03-17_at_12.52.14_PM_ahquhm.jpg';

export default function AdcLogo({ size = 40, className = '' }: AdcLogoProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={LOGO_URL}
      alt="African Democratic Congress (ADC) Logo"
      width={size}
      height={size}
      className={className}
      style={{ objectFit: 'contain', display: 'block' }}
    />
  );
}
