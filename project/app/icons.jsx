/* global React */
// ─────────────────────────────────────────────────────────────
// Cerria — Icon set (inline SVG, currentColor-friendly)
// ─────────────────────────────────────────────────────────────

const Icon = ({ name, size = 22, color = 'currentColor', stroke = 2, ...rest }) => {
  const common = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: color, strokeWidth: stroke, strokeLinecap: 'round', strokeLinejoin: 'round', ...rest };
  switch (name) {
    case 'home':
      return <svg {...common}><path d="M3 11.5L12 4l9 7.5"/><path d="M5 10v9a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1v-9"/></svg>;
    case 'book':
      return <svg {...common}><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z"/><path d="M4 20.5A2.5 2.5 0 0 1 6.5 18H20"/></svg>;
    case 'magazine':
      return <svg {...common}><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18"/><path d="M9 4v16"/></svg>;
    case 'map':
      return <svg {...common}><path d="M9 4l-6 2v14l6-2 6 2 6-2V4l-6 2z"/><path d="M9 4v14"/><path d="M15 6v14"/></svg>;
    case 'play':
      return <svg {...common} fill={color} stroke="none"><path d="M7 4.5v15a1 1 0 0 0 1.55.83l11-7.5a1 1 0 0 0 0-1.66l-11-7.5A1 1 0 0 0 7 4.5z"/></svg>;
    case 'pause':
      return <svg {...common} fill={color} stroke="none"><rect x="6" y="4.5" width="4.5" height="15" rx="1.4"/><rect x="13.5" y="4.5" width="4.5" height="15" rx="1.4"/></svg>;
    case 'star':
      return <svg {...common} fill={color} stroke="none"><path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.6L12 17.4 6.1 20.6l1.2-6.6L2.5 9.4l6.6-.9z"/></svg>;
    case 'star-outline':
      return <svg {...common}><path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.6L12 17.4 6.1 20.6l1.2-6.6L2.5 9.4l6.6-.9z"/></svg>;
    case 'lock':
      return <svg {...common}><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>;
    case 'heart':
      return <svg {...common} fill={color} stroke="none"><path d="M12 21s-7-4.35-9.5-9A5 5 0 0 1 12 6a5 5 0 0 1 9.5 6C19 16.65 12 21 12 21z"/></svg>;
    case 'arrow-left':
      return <svg {...common}><path d="M15 18l-6-6 6-6"/></svg>;
    case 'arrow-right':
      return <svg {...common}><path d="M9 6l6 6-6 6"/></svg>;
    case 'chevron-down':
      return <svg {...common}><path d="M6 9l6 6 6-6"/></svg>;
    case 'search':
      return <svg {...common}><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>;
    case 'filter':
      return <svg {...common}><path d="M3 5h18"/><path d="M6 12h12"/><path d="M10 19h4"/></svg>;
    case 'settings':
      return <svg {...common}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06A1.65 1.65 0 0 0 15 19.4a1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09A1.65 1.65 0 0 0 15 4.6a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9c.36.13.78.21 1.51.21H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>;
    case 'volume':
      return <svg {...common}><path d="M11 5L6 9H3v6h3l5 4z"/><path d="M15.5 8.5a4 4 0 0 1 0 7"/><path d="M18.5 5.5a8 8 0 0 1 0 13"/></svg>;
    case 'subtitle':
      return <svg {...common}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M7 12h4"/><path d="M13 12h4"/><path d="M7 16h10"/></svg>;
    case 'moon':
      return <svg {...common}><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>;
    case 'flame':
      return <svg {...common} fill={color} stroke="none"><path d="M12 2c1.5 3 4 4 4 7a4 4 0 0 1-1.5 3.1A3 3 0 0 0 16 14.5c0 2.5-2 5.5-4 7.5-2-2-4-5-4-7.5a3 3 0 0 0 1.5-2.4A4 4 0 0 1 8 9c0-2 1.5-3.5 4-7z"/></svg>;
    case 'check':
      return <svg {...common}><path d="M5 12l5 5L20 7"/></svg>;
    case 'plus':
      return <svg {...common}><path d="M12 5v14M5 12h14"/></svg>;
    case 'rewind':
      return <svg {...common} fill={color} stroke="none"><path d="M11 5L4 12l7 7v-4l8 4V5L11 9z"/></svg>;
    case 'forward':
      return <svg {...common} fill={color} stroke="none"><path d="M13 5l7 7-7 7v-4l-8 4V5l8 4z"/></svg>;
    case 'menu-dots':
      return <svg {...common} fill={color} stroke="none"><circle cx="5" cy="12" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="19" cy="12" r="1.6"/></svg>;
    case 'badge':
      return <svg {...common} fill={color} stroke="none"><path d="M12 2l3 4 5 1-3.5 3.5L18 16l-6-3-6 3 1.5-5.5L4 7l5-1z"/></svg>;
    case 'sparkle':
      return <svg {...common} fill={color} stroke="none"><path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5z"/></svg>;
    case 'shield':
      return <svg {...common}><path d="M12 3l8 3v5c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6z"/></svg>;
    default:
      return <svg {...common}><circle cx="12" cy="12" r="8"/></svg>;
  }
};

window.Icon = Icon;
