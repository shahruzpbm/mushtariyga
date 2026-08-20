import { useCallback, useRef, useState } from "react";
import { Hand } from "lucide-react";

/**
 * Interactive cake: press & hold the candle to "blow out" the flame.
 * Fills a progress ring over ~1.6s of holding, then fires onBlown.
 */
export default function Cake({ onBlown }: { onBlown: () => void }) {
  const [progress, setProgress] = useState(0);
  const [blown, setBlown] = useState(false);
  const rafRef = useRef(0);
  const holdingRef = useRef(false);
  const lastRef = useRef(0);

  const stop = useCallback(() => {
    holdingRef.current = false;
    cancelAnimationFrame(rafRef.current);
  }, []);

  const tick = useCallback(
    (t: number) => {
      if (!holdingRef.current) return;
      const dt = t - lastRef.current;
      lastRef.current = t;
      setProgress((p) => {
        const next = Math.min(1, p + dt / 1600);
        if (next >= 1) {
          stop();
          setBlown(true);
          setTimeout(onBlown, 950);
        }
        return next;
      });
      rafRef.current = requestAnimationFrame(tick);
    },
    [onBlown, stop]
  );

  const start = useCallback(
    (e: React.PointerEvent) => {
      if (blown) return;
      (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
      holdingRef.current = true;
      lastRef.current = performance.now();
      rafRef.current = requestAnimationFrame(tick);
    },
    [blown, tick]
  );

  const R = 46;
  const C = 2 * Math.PI * R;

  return (
    <div
      className="relative mx-auto w-fit cursor-pointer touch-none select-none"
      onPointerDown={start}
      onPointerUp={stop}
      onPointerCancel={stop}
      onPointerLeave={stop}
    >
      {/* progress ring around the flame */}
      <svg className="pointer-events-none absolute left-1/2 top-[6px] z-20 -translate-x-1/2" width="120" height="120" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r={R} fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth="5" />
        <circle
          cx="60"
          cy="60"
          r={R}
          fill="none"
          stroke="url(#ringGrad)"
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray={C}
          strokeDashoffset={C * (1 - progress)}
          transform="rotate(-90 60 60)"
          style={{ transition: "stroke-dashoffset 60ms linear" }}
        />
        <defs>
          <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ff5d8f" />
            <stop offset="100%" stopColor="#ffb45e" />
          </linearGradient>
        </defs>
      </svg>

      {/* hold hint */}
      {!blown && progress === 0 && (
        <div className="wiggle-hint pointer-events-none absolute left-1/2 top-[52px] z-30 -translate-x-1/2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-lg">
            <Hand className="h-4.5 w-4.5 text-[#d63a54]" />
          </div>
        </div>
      )}

      {/* smoke after blow */}
      {blown && (
        <>
          <span className="smoke-puff left-[105px] top-[18px] h-4 w-4" style={{ animationDelay: "0ms" }} />
          <span className="smoke-puff left-[112px] top-[26px] h-3 w-3" style={{ animationDelay: "180ms" }} />
          <span className="smoke-puff left-[100px] top-[30px] h-3.5 w-3.5" style={{ animationDelay: "340ms" }} />
        </>
      )}

      <svg width="220" height="250" viewBox="0 0 220 250" className="relative z-10 drop-shadow-[0_25px_45px_rgba(0,0,0,0.45)]">
        <defs>
          <linearGradient id="tier1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffd9e8" />
            <stop offset="100%" stopColor="#ffb3d1" />
          </linearGradient>
          <linearGradient id="tier2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffc9dd" />
            <stop offset="100%" stopColor="#ff8fb8" />
          </linearGradient>
          <linearGradient id="tier3" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ff9dc4" />
            <stop offset="100%" stopColor="#ff6ea3" />
          </linearGradient>
          <radialGradient id="glow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="#ffc46b" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#ffc46b" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* plate */}
        <ellipse cx="110" cy="230" rx="95" ry="12" fill="#f4e5ef" />
        <ellipse cx="110" cy="226" rx="95" ry="12" fill="#fff6fb" />

        {/* bottom tier */}
        <rect x="35" y="178" width="150" height="46" rx="8" fill="url(#tier3)" />
        <path d="M35 186 q7 12 14 0 q7 12 14 0 q7 12 14 0 q7 12 14 0 q7 12 14 0 q7 12 14 0 q7 12 14 0 q7 12 14 0 q7 12 14 0 q7 12 14 0 l0 -8 l-150 0 z" fill="#fff0f6" />
        {/* middle tier */}
        <rect x="50" y="136" width="120" height="44" rx="8" fill="url(#tier2)" />
        <path d="M50 144 q6 11 12 0 q6 11 12 0 q6 11 12 0 q6 11 12 0 q6 11 12 0 q6 11 12 0 q6 11 12 0 q6 11 12 0 q6 11 12 0 q6 11 12 0 l0 -8 l-120 0 z" fill="#fff0f6" />
        {/* top tier */}
        <rect x="65" y="96" width="90" height="42" rx="8" fill="url(#tier1)" />
        <path d="M65 104 q5.5 10 11 0 q5.5 10 11 0 q5.5 10 11 0 q5.5 10 11 0 q5.5 10 11 0 q5.5 10 11 0 q5.5 10 11 0 q5.5 10 12 0 l0 -8 l-90 0 z" fill="#fff0f6" />

        {/* sprinkles */}
        {[45, 78, 118, 152, 170].map((x, i) => (
          <rect key={i} x={x} y={205 + (i % 2) * 6} width="9" height="3.4" rx="1.7" fill={["#8b5cf6", "#ffd166", "#5a6ce0", "#fff", "#ffd166"][i]} transform={`rotate(${(i * 37) % 60 - 30} ${x} 208)`} />
        ))}
        {[72, 105, 138].map((x, i) => (
          <rect key={`m${i}`} x={x} y={161 + (i % 2) * 6} width="9" height="3.4" rx="1.7" fill={["#ffd166", "#8b5cf6", "#fff"][i]} transform={`rotate(${(i * 51) % 60 - 30} ${x} 164)`} />
        ))}

        {/* hearts on top tier */}
        {[84, 110, 136].map((x, i) => (
          <path key={`h${i}`} d="M0 4 C0 1 2.5 0 4 1.5 C5.5 0 8 1 8 4 C8 7 4 9.5 4 9.5 C4 9.5 0 7 0 4 Z" fill="#ff4d7e" transform={`translate(${x - 4}, 116)`} />
        ))}

        {/* candle */}
        <rect x="104" y="52" width="12" height="46" rx="4" fill="#fff" />
        <path d="M104 58 l12 -4 l0 7 l-12 4 z M104 72 l12 -4 l0 7 l-12 4 z M104 86 l12 -4 l0 7 l-12 4 z" fill="#ff5d8f" />
        <line x1="110" y1="52" x2="110" y2="46" stroke="#6b2d3f" strokeWidth="2.4" strokeLinecap="round" />

        {/* flame glow */}
        {!blown && <circle cx="110" cy="34" r="30" fill="url(#glow)" className="flame-glow" style={{ transform: `scale(${1 - progress * 0.7})`, transformOrigin: "110px 34px", opacity: 0.9 - progress * 0.6 }} />}

        {/* flame */}
        {!blown && (
          <g className="flame" style={{ transform: `scale(${1 - progress * 0.88})`, transformOrigin: "110px 46px", opacity: 1 - progress * 0.9 }}>
            <path d="M110 16 C118 27 119 34 110 44 C101 34 102 27 110 16 Z" fill="#ff9d2e" />
            <path d="M110 25 C114.5 31 115 35.5 110 41 C105 35.5 105.5 31 110 25 Z" fill="#ffe9a8" />
          </g>
        )}
      </svg>
    </div>
  );
}
