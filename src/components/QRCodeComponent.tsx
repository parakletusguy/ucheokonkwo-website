"use client";

import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

interface QRCodeComponentProps {
  value: string;
  size?: number;
  label?: string;
}

export default function QRCodeComponent({ value, size = 120, label }: QRCodeComponentProps) {
  return (
    <div className="flex flex-col items-center gap-3 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm w-fit">
      <div className="p-2 bg-white rounded-lg border border-gray-50">
        <QRCodeSVG 
          value={value} 
          size={size}
          level="H"
          includeMargin={false}
          imageSettings={{
            src: "https://res.cloudinary.com/djh9qeaf6/image/upload/v1773862953/WhatsApp_Image_2026-03-17_at_12.52.14_PM_ahquhm.jpg",
            x: undefined,
            y: undefined,
            height: size * 0.2,
            width: size * 0.2,
            excavate: true,
          }}
        />
      </div>
      {label && (
        <p className="text-[10px] font-bold uppercase tracking-widest text-[#aaa] text-center max-w-[120px]">
          {label}
        </p>
      )}
    </div>
  );
}
