import { useEffect, useRef } from "react";

interface Petal {
  x: number;
  y: number;
  size: number;
  speedY: number;
  sway: number;
  swaySpeed: number;
  rot: number;
  rotSpeed: number;
  hue: number;
  alpha: number;
  sparkle: boolean;
  phase: number;
}

export default function Petals({ density = 1, sparkleBoost = 0 }: { density?: number; sparkleBoost?: number }) {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let raf = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const COUNT = Math.round((40 + sparkleBoost * 14) * density);
    const petals: Petal[] = Array.from({ length: COUNT }, () => spawn(true));

    function spawn(anywhere = false): Petal {
      const sparkle = Math.random() < 0.22;
      return {
        x: Math.random() * w,
        y: anywhere ? Math.random() * h : -20,
        size: sparkle ? 1 + Math.random() * 1.6 : 5 + Math.random() * 8,
        speedY: sparkle ? 0.15 + Math.random() * 0.25 : 0.5 + Math.random() * 1.1,
        sway: 20 + Math.random() * 40,
        swaySpeed: 0.4 + Math.random() * 0.8,
        rot: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.03,
        hue: 330 + Math.random() * 30,
        alpha: sparkle ? 0.35 + Math.random() * 0.45 : 0.5 + Math.random() * 0.45,
        sparkle,
        phase: Math.random() * Math.PI * 2,
      };
    }

    let t = 0;
    const tick = () => {
      t += 0.016;
      ctx.clearRect(0, 0, w, h);
      for (const p of petals) {
        p.y += p.speedY;
        p.rot += p.rotSpeed;
        const px = p.x + Math.sin(t * p.swaySpeed + p.phase) * p.sway * 0.4;

        if (p.y > h + 30) Object.assign(p, spawn());

        ctx.save();
        ctx.translate(px, p.y);
        ctx.rotate(p.rot);
        if (p.sparkle) {
          const tw = 0.5 + 0.5 * Math.sin(t * 3 + p.phase);
          ctx.globalAlpha = p.alpha * tw;
          ctx.fillStyle = "#fff0f6";
          ctx.beginPath();
          ctx.arc(0, 0, p.size, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.globalAlpha = p.alpha;
          ctx.fillStyle = `hsl(${p.hue} 85% ${82 + Math.sin(p.phase) * 4}%)`;
          ctx.beginPath();
          ctx.moveTo(0, -p.size);
          ctx.bezierCurveTo(p.size * 0.9, -p.size * 0.6, p.size * 0.75, p.size * 0.7, 0, p.size);
          ctx.bezierCurveTo(-p.size * 0.75, p.size * 0.7, -p.size * 0.9, -p.size * 0.6, 0, -p.size);
          ctx.fill();
        }
        ctx.restore();
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [density, sparkleBoost]);

  return <canvas ref={ref} className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true" />;
}
