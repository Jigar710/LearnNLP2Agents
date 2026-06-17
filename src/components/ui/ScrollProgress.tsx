import { useEffect, useState } from 'react';

/**
 * ScrollProgress (PRD §11.11) — fixed bar at the very top of the page (above
 * the navbar) showing reading progress 0–100% in the current phase color.
 *
 * The faint full-width track also serves as the topic page's phase-colored top
 * border (PRD §17 Step 5.1).
 */
interface Props {
  phaseColor?: string; // hex, defaults to phase-1 teal
}

export default function ScrollProgress({ phaseColor = '#0D9488' }: Props) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function onScroll() {
      const el = document.documentElement;
      const scrollable = el.scrollHeight - el.clientHeight;
      const pct = scrollable > 0 ? (el.scrollTop / scrollable) * 100 : 0;
      setProgress(Math.min(100, Math.max(0, pct)));
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div
      role="progressbar"
      aria-label="Reading progress"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '4px',
        zIndex: 60,
        background: `color-mix(in srgb, ${phaseColor} 22%, transparent)`,
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          height: '100%',
          width: `${progress}%`,
          background: phaseColor,
          transition: 'width 80ms linear',
        }}
      />
    </div>
  );
}
