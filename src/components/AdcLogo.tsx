import React from 'react';

/**
 * The official ADC (African Democratic Congress) logo.
 * A faithful SVG recreation of the green square logo with the
 * orange handshake motif and white "ADC" wordmark.
 *
 * Props:
 *   size  — controls width & height (default: 40)
 *   className — optional extra Tailwind / CSS classes
 */
interface AdcLogoProps {
  size?: number;
  className?: string;
}

export default function AdcLogo({ size = 40, className = '' }: AdcLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="African Democratic Congress (ADC) Logo"
      className={className}
    >
      {/* Green background */}
      <rect width="200" height="200" fill="#1DB954" rx="8" />

      {/* ── Handshake ────────────────────────────────────────────────── */}
      {/* Left sleeve cuff – dark with checkered pattern */}
      <rect x="6" y="62" width="42" height="52" rx="6" fill="#1a1a1a" />
      <rect x="6" y="62" width="42" height="10" rx="4" fill="#fff" opacity="0.15"/>
      {/* Green/white sleeve stripe */}
      <rect x="8"  y="70" width="8" height="8" fill="#fff" opacity="0.5"/>
      <rect x="20" y="70" width="8" height="8" fill="#00a651" opacity="0.8"/>
      <rect x="32" y="70" width="8" height="8" fill="#fff" opacity="0.5"/>
      <rect x="8"  y="80" width="8" height="8" fill="#00a651" opacity="0.8"/>
      <rect x="20" y="80" width="8" height="8" fill="#fff" opacity="0.5"/>
      <rect x="32" y="80" width="8" height="8" fill="#00a651" opacity="0.8"/>

      {/* Right sleeve cuff – dark with checkered pattern */}
      <rect x="152" y="62" width="42" height="52" rx="6" fill="#1a1a1a" />
      <rect x="152" y="62" width="42" height="10" rx="4" fill="#fff" opacity="0.15"/>
      <rect x="154" y="70" width="8" height="8" fill="#fff" opacity="0.5"/>
      <rect x="166" y="70" width="8" height="8" fill="#00a651" opacity="0.8"/>
      <rect x="178" y="70" width="8" height="8" fill="#fff" opacity="0.5"/>
      <rect x="154" y="80" width="8" height="8" fill="#00a651" opacity="0.8"/>
      <rect x="166" y="80" width="8" height="8" fill="#fff" opacity="0.5"/>
      <rect x="178" y="80" width="8" height="8" fill="#00a651" opacity="0.8"/>

      {/* Left hand / wrist – orange skin tone */}
      <path
        d="M42 90 C42 80, 55 72, 68 78 L100 96 L80 112 C65 120, 42 112, 42 100 Z"
        fill="#E07B39"
      />
      {/* Left hand fingers */}
      <path d="M68 78 C72 65, 82 64, 84 74 L85 90" stroke="#C96B2A" strokeWidth="2" fill="none"/>
      <path d="M76 76 C80 63, 90 62, 92 72 L92 88" stroke="#C96B2A" strokeWidth="2" fill="none"/>
      <path d="M84 78 C88 66, 97 66, 97 76" stroke="#C96B2A" strokeWidth="2" fill="none"/>
      <path d="M91 82 C95 72, 103 73, 102 83" stroke="#C96B2A" strokeWidth="2" fill="none"/>
      {/* Fingernail highlights */}
      <ellipse cx="82" cy="71" rx="3" ry="4" fill="#f5c8a0" opacity="0.7"/>
      <ellipse cx="90" cy="69" rx="3" ry="4" fill="#f5c8a0" opacity="0.7"/>

      {/* Right hand / wrist – lighter orange skin tone */}
      <path
        d="M158 90 C158 80, 145 72, 132 78 L100 96 L120 112 C135 120, 158 112, 158 100 Z"
        fill="#D4712E"
      />
      {/* Right hand fingers */}
      <path d="M132 78 C128 65, 118 64, 116 74 L115 90" stroke="#C06020" strokeWidth="2" fill="none"/>
      <path d="M124 76 C120 63, 110 62, 108 72 L108 88" stroke="#C06020" strokeWidth="2" fill="none"/>
      <path d="M116 78 C112 66, 103 66, 103 76" stroke="#C06020" strokeWidth="2" fill="none"/>
      <path d="M109 82 C105 72, 97 73, 98 83" stroke="#C06020" strokeWidth="2" fill="none"/>
      {/* Fingernail highlights */}
      <ellipse cx="118" cy="71" rx="3" ry="4" fill="#f5c8a0" opacity="0.7"/>
      <ellipse cx="110" cy="69" rx="3" ry="4" fill="#f5c8a0" opacity="0.7"/>

      {/* Grip / clasp area highlight */}
      <ellipse cx="100" cy="97" rx="14" ry="10" fill="#C96B2A" opacity="0.5"/>

      {/* ── "ADC" Wordmark ───────────────────────────────────────────── */}
      <text
        x="100"
        y="170"
        textAnchor="middle"
        fontFamily="Arial Black, Impact, sans-serif"
        fontWeight="900"
        fontSize="46"
        fill="#FFFFFF"
        letterSpacing="2"
      >
        ADC
      </text>
    </svg>
  );
}
