import React from "react";
import { BRAND, C } from "../theme";

/** Ilustrações e ícones vetoriais originais (sem assets de terceiros). */

export const Building: React.FC<{ w: number; h: number; lit?: number; hue?: number; id: string }> = ({
  w,
  h,
  lit = 0.35,
  hue = 0,
  id,
}) => {
  const cols = 4;
  const rows = 5;
  const wins: React.ReactNode[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const on = ((r * 7 + c * 3 + hue) % 5) / 5 < lit;
      wins.push(
        <rect
          key={`${r}-${c}`}
          x={86 + c * 34}
          y={34 + r * 30}
          width={22}
          height={18}
          rx={3}
          fill={on ? "#FFD98A" : "#2C333D"}
          opacity={on ? 0.95 : 1}
        />,
      );
    }
  }
  return (
    <svg width={w} height={h} viewBox="0 0 300 200" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id={`sky-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={hue % 2 ? "#243042" : "#1F2B3A"} />
          <stop offset="1" stopColor={hue % 2 ? "#3B3A4A" : "#32424F"} />
        </linearGradient>
      </defs>
      <rect width="300" height="200" fill={`url(#sky-${id})`} />
      <circle cx={hue % 2 ? 248 : 52} cy="42" r="16" fill="#F4E6C3" opacity="0.5" />
      <rect x="20" y="98" width="52" height="102" fill="#222932" />
      <rect x="236" y="76" width="50" height="124" fill="#20262E" />
      <rect x="74" y="20" width="152" height="180" rx="6" fill="#171C22" />
      {wins}
      {[0, 1, 2, 3, 4].map((r) => (
        <rect key={r} x="74" y={56 + r * 30} width="152" height="3" fill="#3A424D" />
      ))}
      <rect x="0" y="188" width="300" height="12" fill="#12161B" />
    </svg>
  );
};

export const MapArt: React.FC<{ w: number; h: number }> = ({ w, h }) => (
  <svg width={w} height={h} viewBox="0 0 600 240" preserveAspectRatio="xMidYMid slice">
    <rect width="600" height="240" fill="#1A2027" />
    <path d="M-10 70L610 30M-10 180L610 150M120 -10L170 250M380 -10L420 250" stroke="#2C343E" strokeWidth="18" />
    <path d="M-10 124L610 96" stroke="#39424E" strokeWidth="26" />
    <path d="M250 -10L300 250" stroke="#39424E" strokeWidth="22" />
    <rect x="440" y="110" width="120" height="70" rx="12" fill={BRAND.deep} transform="rotate(-3 500 145)" />
    <path d="M-10 124L610 96" stroke="#4A5562" strokeWidth="2" strokeDasharray="14 14" />
    <rect x="30" y="16" width="64" height="30" rx="5" fill="#222932" />
    <rect x="196" y="194" width="50" height="34" rx="5" fill="#222932" />
    <rect x="330" y="186" width="60" height="36" rx="5" fill="#222932" />
  </svg>
);

export const Pin: React.FC<{ size: number; color?: string }> = ({ size, color = C.accent }) => (
  <svg width={size} height={size * 1.3} viewBox="0 0 40 52">
    <path d="M20 2C10 2 3 9.5 3 19c0 12 17 31 17 31s17-19 17-31C37 9.5 30 2 20 2z" fill={color} />
    <circle cx="20" cy="19" r="6.5" fill={C.accentInk} />
  </svg>
);

type IconProps = { size: number; color?: string; stroke?: number };
const base = (size: number) => ({ width: size, height: size, viewBox: "0 0 24 24", fill: "none" as const });

export const IconCheck: React.FC<IconProps> = ({ size, color = C.accentInk, stroke = 3 }) => (
  <svg {...base(size)}>
    <path d="M5 12.5l4.5 4.5L19 7.5" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
export const IconLink: React.FC<IconProps> = ({ size, color = C.accentInk, stroke = 2.4 }) => (
  <svg {...base(size)}>
    <path
      d="M10 14a4.5 4.5 0 0 0 6.4 0l3-3a4.5 4.5 0 0 0-6.4-6.4l-1.2 1.2M14 10a4.5 4.5 0 0 0-6.4 0l-3 3a4.5 4.5 0 0 0 6.4 6.4l1.2-1.2"
      stroke={color}
      strokeWidth={stroke}
      strokeLinecap="round"
    />
  </svg>
);
export const IconCalendar: React.FC<IconProps> = ({ size, color = C.text, stroke = 2 }) => (
  <svg {...base(size)}>
    <rect x="3.5" y="5" width="17" height="15.5" rx="3" stroke={color} strokeWidth={stroke} />
    <path d="M3.5 10h17M8 3v4M16 3v4" stroke={color} strokeWidth={stroke} strokeLinecap="round" />
  </svg>
);
export const IconSearch: React.FC<IconProps> = ({ size, color = C.muted, stroke = 2.2 }) => (
  <svg {...base(size)}>
    <circle cx="11" cy="11" r="6.5" stroke={color} strokeWidth={stroke} />
    <path d="M16 16l4.5 4.5" stroke={color} strokeWidth={stroke} strokeLinecap="round" />
  </svg>
);
export const IconHome: React.FC<IconProps> = ({ size, color = C.text, stroke = 2 }) => (
  <svg {...base(size)}>
    <path d="M4 11l8-7 8 7v8.5a1 1 0 0 1-1 1h-4.5V14h-5v6.5H5a1 1 0 0 1-1-1V11z" stroke={color} strokeWidth={stroke} strokeLinejoin="round" />
  </svg>
);
export const IconFlag: React.FC<IconProps> = ({ size, color = C.text, stroke = 2 }) => (
  <svg {...base(size)}>
    <path d="M5 21V4M5 5h11l-2 4 2 4H5" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const Avatar: React.FC<{ size: number; label: string; bg?: string; color?: string; ring?: string }> = ({
  size,
  label,
  bg = C.surface3,
  color = C.text,
  ring,
}) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: size,
      background: bg,
      color,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: 800,
      fontSize: size * 0.36,
      letterSpacing: "-0.02em",
      flexShrink: 0,
      boxShadow: ring ? `0 0 0 4px ${C.surface}, 0 0 0 7px ${ring}` : undefined,
    }}
  >
    {label}
  </div>
);
export const IconBell: React.FC<IconProps> = ({ size, color = C.text, stroke = 2 }) => (
  <svg {...base(size)}>
    <path d="M6 16.5V11a6 6 0 0 1 12 0v5.5l1.5 2h-15l1.5-2z" stroke={color} strokeWidth={stroke} strokeLinejoin="round" />
    <path d="M10 20.5a2 2 0 0 0 4 0" stroke={color} strokeWidth={stroke} strokeLinecap="round" />
  </svg>
);

export const House: React.FC<{ w: number; h: number }> = ({ w, h }) => (
  <svg width={w} height={h} viewBox="0 0 250 220">
    <rect y="200" width="250" height="20" fill="#12161B" />
    <path d="M36 112L125 38l89 74z" fill="#2C343E" />
    <rect x="56" y="110" width="138" height="90" fill="#1F262E" />
    <rect x="76" y="128" width="36" height="30" rx="4" fill="#FFD98A" opacity="0.9" />
    <rect x="138" y="128" width="36" height="30" rx="4" fill="#2C333D" />
    <rect x="108" y="160" width="34" height="40" rx="3" fill="#39424E" />
    <rect x="158" y="56" width="18" height="34" fill="#262D36" />
  </svg>
);
