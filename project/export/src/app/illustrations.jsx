/* global React */
// ─────────────────────────────────────────────────────────────
// Cerria — Illustrated SVG scenes (mascot, book covers, scenery)
// ─────────────────────────────────────────────────────────────

// Mascot: kelinci-bintang ("Bicy")
const Mascot = ({ size = 90, mood = 'happy', style = {} }) => {
  const eyes = mood === 'wink' ?
  <><circle cx="40" cy="56" r="3.2" fill="#2A1F18" /><path d="M55 55 q4 2 8 0" stroke="#2A1F18" strokeWidth="2.6" strokeLinecap="round" fill="none" /></> :
  <><circle cx="40" cy="56" r="3.2" fill="#2A1F18" /><circle cx="60" cy="56" r="3.2" fill="#2A1F18" /><circle cx="41.2" cy="55" r="1" fill="#fff" /><circle cx="61.2" cy="55" r="1" fill="#fff" /></>;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" style={style} data-comment-anchor="fcf802bdab-svg-12-5">
      {/* Star aura */}
      <g opacity="0.9">
        <path d="M50 6 l4 9 9 1.5 -7 6 2 9.5 -8 -4.6 -8 4.6 2 -9.5 -7 -6 9 -1.5z" fill="#FFC857" stroke="#E89F1A" strokeWidth="2" strokeLinejoin="round" />
      </g>
      {/* Ears */}
      <g>
        <ellipse cx="36" cy="32" rx="7" ry="14" fill="#FFE3CD" stroke="#3A2A1E" strokeWidth="2.4" />
        <ellipse cx="64" cy="32" rx="7" ry="14" fill="#FFE3CD" stroke="#3A2A1E" strokeWidth="2.4" />
        <ellipse cx="36" cy="34" rx="3" ry="9" fill="#FFB7A0" />
        <ellipse cx="64" cy="34" rx="3" ry="9" fill="#FFB7A0" />
      </g>
      {/* Head */}
      <ellipse cx="50" cy="58" rx="22" ry="20" fill="#FFF3DE" stroke="#3A2A1E" strokeWidth="2.6" />
      {/* Cheek blush */}
      <ellipse cx="34" cy="64" rx="4" ry="2.4" fill="#FFB59E" opacity="0.8" />
      <ellipse cx="66" cy="64" rx="4" ry="2.4" fill="#FFB59E" opacity="0.8" />
      {/* Eyes */}
      {eyes}
      {/* Nose + mouth */}
      <path d="M48 64 q2 1.4 4 0" stroke="#3A2A1E" strokeWidth="2" fill="#FF8C9A" strokeLinejoin="round" />
      <path d="M50 65 v3" stroke="#3A2A1E" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M46 68 q4 4 8 0" stroke="#3A2A1E" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>);

};

// Book cover — algorithmically pretty
const BookCover = ({ theme = 'forest', title, w = 120, h = 160, rounded = 14 }) => {
  const palettes = {
    forest: ['#2F6B4A', '#6FBE8F', '#FFC857', '#FFF3DE'],
    ocean: ['#1F5C8A', '#5BB6E1', '#FFE0B0', '#FFF3DE'],
    sunset: ['#C44A2C', '#FF8C42', '#FFC857', '#FFF3DE'],
    purple: ['#5B3A8A', '#9B59B6', '#FFD17A', '#FFF3DE'],
    night: ['#1B2A4E', '#4A6BB0', '#FFC857', '#FFE9C2'],
    meadow: ['#5C8A35', '#9CCB58', '#FFEBA1', '#FFFCE9']
  };
  const [c1, c2, c3, paper] = palettes[theme] || palettes.forest;
  return (
    <svg width={w} height={h} viewBox="0 0 120 160" style={{ display: 'block', borderRadius: rounded, overflow: 'hidden' }}>
      <defs>
        <linearGradient id={`bg-${theme}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={c1} />
          <stop offset="100%" stopColor={c2} />
        </linearGradient>
      </defs>
      <rect width="120" height="160" rx={rounded} fill={`url(#bg-${theme})`} />
      {/* Sun/moon */}
      <circle cx="92" cy="38" r="14" fill={c3} opacity="0.95" />
      {/* Mountain/hill silhouettes */}
      <path d="M0 110 L24 80 L48 100 L72 70 L96 96 L120 86 L120 160 L0 160 Z" fill={c1} opacity="0.65" />
      <path d="M0 130 L20 110 L40 124 L60 104 L84 122 L104 110 L120 122 L120 160 L0 160 Z" fill="#000" opacity="0.18" />
      {/* Trees / fauna stylised */}
      <g opacity="0.85">
        <ellipse cx="22" cy="118" rx="10" ry="14" fill={c3} opacity="0.4" />
        <ellipse cx="100" cy="124" rx="8" ry="11" fill={c3} opacity="0.4" />
      </g>
      {/* Title plate */}
      <rect x="10" y="124" width="100" height="28" rx="8" fill={paper} opacity="0.94" />
      <text x="60" y="142" textAnchor="middle" fontFamily="Baloo 2, sans-serif" fontSize="11" fontWeight="800" fill="#3A2A1E">{(title || '').slice(0, 22)}</text>
    </svg>);

};

// Scenery for story panel inside reader / video book hero
const Scene = ({ kind = 'island', w = 360, h = 180, rounded = 22 }) => {
  if (kind === 'island') {
    return (
      <svg width={w} height={h} viewBox="0 0 360 180" style={{ display: 'block', borderRadius: rounded }}>
        <defs>
          <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFD89B" />
            <stop offset="100%" stopColor="#FFB36B" />
          </linearGradient>
          <linearGradient id="sea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#5BB6E1" />
            <stop offset="100%" stopColor="#1F5C8A" />
          </linearGradient>
        </defs>
        <rect width="360" height="180" rx={rounded} fill="url(#sky)" />
        <circle cx="280" cy="50" r="28" fill="#FFF1B0" opacity="0.9" />
        {/* Distant island */}
        <path d="M40 110 q40 -50 100 -10 q40 -30 80 0 q60 -30 120 -2 v82 H40 z" fill="#3B7A56" />
        <path d="M0 130 q60 -20 120 0 q60 -20 120 0 q60 -20 120 0 v50 H0 z" fill="url(#sea)" />
        {/* Palm */}
        <g transform="translate(50,60)">
          <path d="M5 90 q-2 -45 8 -70" stroke="#5A3520" strokeWidth="6" fill="none" strokeLinecap="round" />
          <path d="M14 24 q-20 -10 -32 4" stroke="#2F6B4A" strokeWidth="6" fill="none" strokeLinecap="round" />
          <path d="M14 24 q22 -8 32 4" stroke="#2F6B4A" strokeWidth="6" fill="none" strokeLinecap="round" />
          <path d="M14 24 q-6 -22 6 -32" stroke="#2F6B4A" strokeWidth="6" fill="none" strokeLinecap="round" />
        </g>
        {/* Bottle */}
        <g transform="translate(180,128)">
          <rect x="-6" y="-2" width="22" height="10" rx="3" fill="#9DD3E0" opacity="0.9" />
          <rect x="-2" y="-7" width="6" height="6" rx="2" fill="#5A3520" />
        </g>
      </svg>);

  }
  // forest
  return (
    <svg width={w} height={h} viewBox="0 0 360 180" style={{ display: 'block', borderRadius: rounded }}>
      <defs>
        <linearGradient id="forest-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#A8DA9C" />
          <stop offset="100%" stopColor="#3F8A55" />
        </linearGradient>
      </defs>
      <rect width="360" height="180" rx={rounded} fill="url(#forest-sky)" />
      {/* trees */}
      {[20, 80, 140, 220, 280, 340].map((x, i) =>
      <g key={i} transform={`translate(${x},${60 + i % 2 * 8})`}>
          <rect x="-4" y="48" width="8" height="40" fill="#5A3520" />
          <polygon points="-22,50 22,50 0,12" fill="#2F6B4A" />
          <polygon points="-18,32 18,32 0,0" fill="#3F8A55" />
        </g>
      )}
      <ellipse cx="180" cy="170" rx="220" ry="18" fill="#1F4E36" />
    </svg>);

};

window.Mascot = Mascot;
window.BookCover = BookCover;
window.Scene = Scene;