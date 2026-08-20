import { useEffect } from "react";
import { motion } from "framer-motion";
import { HeartHandshake, Sparkles } from "lucide-react";
import type { Character } from "../data";

const HOLD_MS = 2800;

export default function RevealScene({
  char,
  index,
  total,
  onDone,
}: {
  char: Character;
  index: number;
  total: number;
  onDone: () => void;
}) {
  useEffect(() => {
    const t = setTimeout(onDone, HOLD_MS);
    return () => clearTimeout(t);
  }, [onDone]);

  const letters = char.name.split("");

  return (
    <div className="scene" onClick={onDone}>
      {/* backdrop */}
      {char.image ? (
        <div className="absolute inset-0 overflow-hidden">
          <img key={char.id} src={char.image} alt={char.full} className="kenburns h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#180710b8] via-transparent to-[#160510f5]" />
        </div>
      ) : (
        <div className="absolute inset-0 overflow-hidden bg-gradient-to-b from-[#2b0a1d] via-[#3d0f2a] to-[#160510]">
          <div className="blob left-[-10%] top-[8%] h-64 w-64" style={{ background: "rgba(239,93,158,0.34)" }} />
          <div className="blob bottom-[10%] right-[-12%] h-72 w-72" style={{ background: "rgba(255,180,94,0.22)", animationDelay: "-6s" }} />
          {/* monogram in place of a photo */}
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-1/2 top-[16%] -translate-x-1/2"
          >
            <div className="relative flex h-36 w-36 items-center justify-center rounded-full border border-white/25 bg-white/10 backdrop-blur-md sm:h-44 sm:w-44">
              <div className="pulse-ring absolute inset-0 rounded-full border border-[#ffb3d1]/50" />
              <span className="font-script text-7xl text-[#ffe3ee] sm:text-8xl">M</span>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.7 }}
              className="mt-4 flex items-center justify-center gap-2 text-[#ffd9e8]"
            >
              <HeartHandshake className="h-4 w-4" />
              <span className="text-[11px] tracking-[0.3em]">RASM O'RNIGA — ISM</span>
            </motion.div>
          </motion.div>
        </div>
      )}

      {/* top chip */}
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative z-10 flex items-center justify-center pt-[calc(1.25rem+env(safe-area-inset-top))]"
      >
        <div className="flex items-center gap-3 rounded-full border border-white/15 bg-black/30 px-4 py-2 backdrop-blur-md">
          <Sparkles className="h-3.5 w-3.5 text-[#ffd166]" />
          <span className="text-[11px] font-semibold tracking-[0.3em] text-[#ffe3ee]">
            {index + 1}-TABRIK / {total}
          </span>
        </div>
      </motion.div>

      {/* bottom identity */}
      <div className="relative z-10 mt-auto px-6 pb-[calc(3.5rem+env(safe-area-inset-bottom))] text-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.8 }}
          className="mx-auto mb-4 max-w-[20rem] text-[13px] leading-relaxed text-[#ffd9e8]/85"
        >
          {char.hint}
        </motion.p>

        <div className="flex justify-center overflow-visible">
          {letters.map((l, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 46, rotate: -8, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, rotate: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.35 + i * 0.09, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className="font-script text-[20vw] leading-none text-shimmer-dark drop-shadow-[0_8px_30px_rgba(0,0,0,0.55)] sm:text-8xl"
            >
              {l === "-" ? "\u00A0-\u00A0" : l}
            </motion.span>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.15, duration: 0.7 }}
          className="mt-3 text-[11px] font-medium tracking-[0.34em] text-[#ffc9dd]"
        >
          {char.full.toUpperCase()}
        </motion.p>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.4, duration: HOLD_MS / 1000 - 0.6, ease: "linear" }}
          className="mx-auto mt-5 h-[2px] w-40 origin-left rounded-full bg-gradient-to-r from-[#ff5d8f] to-[#ffb45e]"
        />
      </div>
    </div>
  );
}
