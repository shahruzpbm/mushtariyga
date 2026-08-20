import { motion } from "framer-motion";
import { ChevronRight, Gift, Heart, PenLine, Quote } from "lucide-react";
import type { Character } from "../data";
import { NAME_OF_DAY } from "../data";

export default function GreetingScene({
  char,
  index,
  total,
  onNext,
}: {
  char: Character;
  index: number;
  total: number;
  onNext: () => void;
}) {
  const isLast = index === total - 1;

  return (
    <div className="scene">
      {/* ambient backdrop tinted by character accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#250a18] via-[#1c0713] to-[#14050d]" />
      <div className="blob left-[-15%] top-[-6%] h-72 w-72" style={{ background: `${char.accent}3d` }} />
      <div className="blob bottom-[-8%] right-[-14%] h-80 w-80" style={{ background: "rgba(255,120,164,0.22)", animationDelay: "-8s" }} />

      {/* top progress */}
      <div className="relative z-10 shrink-0 px-5 pt-[calc(0.9rem+env(safe-area-inset-top))]">
        <div className="mx-auto flex max-w-md items-center justify-between">
          <span className="text-[11px] font-semibold tracking-[0.28em] text-[#ffb3d1]">
            {index + 1}/{total} · TABRIK
          </span>
          <div className="flex items-center gap-1">
            {Array.from({ length: total }).map((_, i) => (
              <motion.span key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.15 + i * 0.08, type: "spring", stiffness: 300, damping: 16 }}>
                <Heart
                  className="h-3.5 w-3.5"
                  style={{
                    color: i <= index ? char.accent : "rgba(255,255,255,0.25)",
                    fill: i <= index ? char.accent : "transparent",
                  }}
                />
              </motion.span>
            ))}
          </div>
        </div>
      </div>

      {/* scrollable card area */}
      <div className="scroll-area nice-scroll relative z-10 px-5 py-4">
        <motion.div
          key={char.id}
          initial={{ opacity: 0, y: 60, rotate: index % 2 === 0 ? -2.5 : 2.5, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, rotate: index % 2 === 0 ? -1 : 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="paper relative mx-auto max-w-md rounded-[26px] px-6 pb-7 pt-14"
        >
          <div className="tape -top-3 left-8 -rotate-6" />
          <div className="tape -top-3 right-8 rotate-6" />

          {/* identity */}
          <div className="absolute -top-10 left-1/2 -translate-x-1/2">
            <motion.div
              initial={{ scale: 0, rotate: -12 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 220, damping: 14 }}
              className="relative h-20 w-20 overflow-hidden rounded-full border-4 bg-gradient-to-br shadow-[0_10px_25px_-8px_rgba(60,5,25,0.5)]"
              style={{ borderColor: char.accent, backgroundImage: `linear-gradient(135deg, ${char.accent}cc, ${char.accent}55)` }}
            >
              {char.image ? (
                <img src={char.image} alt={char.full} className="h-full w-full object-cover" />
              ) : (
                <span className="flex h-full w-full items-center justify-center font-script text-4xl text-white">M</span>
              )}
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.6 }} className="text-center">
            <h3 className="font-script text-4xl leading-tight" style={{ color: char.accent }}>
              {char.name}
            </h3>
            <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.18em] text-[#8a4257]">{char.role}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mx-auto my-4 flex w-fit items-center gap-2 rounded-full px-3 py-1"
            style={{ background: char.accentSoft }}
          >
            <Quote className="h-3 w-3" style={{ color: char.accent }} />
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em]" style={{ color: char.accent }}>
              {NAME_OF_DAY} uchun
            </span>
          </motion.div>

          {/* message lines with cinematic blur-rise */}
          <div className="space-y-3.5 text-[#46202e]">
            {char.lines.map((line, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 22, filter: "blur(9px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ delay: 0.75 + i * 0.55, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                className={i === 0 ? "font-display text-[19px] font-semibold leading-snug" : "text-[14px] leading-relaxed text-[#5b2a3a]"}
              >
                {line}
              </motion.p>
            ))}
          </div>

          {/* signature */}
          <motion.div
            initial={{ opacity: 0, x: 26, rotate: 6 }}
            animate={{ opacity: 1, x: 0, rotate: -2 }}
            transition={{ delay: 0.9 + char.lines.length * 0.55, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 flex items-center justify-end gap-2"
          >
            <PenLine className="h-4 w-4" style={{ color: char.accent }} />
            <span className="font-script text-3xl" style={{ color: char.accent }}>
              {char.signature}
            </span>
          </motion.div>
        </motion.div>

        <p className="mx-auto mt-4 max-w-[16rem] text-center text-[11px] leading-relaxed text-[#ffd9e8]/55">
          {char.finaleNote}
        </p>
      </div>

      {/* fixed bottom action — always visible on every phone */}
      <div className="relative z-10 shrink-0 px-5 pb-[calc(1.1rem+env(safe-area-inset-bottom))] pt-2">
        <div className="pointer-events-none absolute inset-x-0 -top-8 h-10 bg-gradient-to-t from-[#14050d] to-transparent" />
        <motion.button
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          onClick={onNext}
          className="group relative mx-auto flex w-full max-w-md items-center justify-center gap-2 overflow-hidden rounded-full px-8 py-4 text-[15px] font-semibold text-white shadow-lg transition-transform active:scale-95"
          style={{ background: `linear-gradient(100deg, ${char.accent}, ${char.accent}bb)`, boxShadow: `0 16px 40px -12px ${char.accent}aa` }}
        >
          <span className="absolute inset-0 translate-x-[-120%] bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-[120%]" />
          {isLast ? <Gift className="h-4.5 w-4.5" /> : null}
          {isLast ? "Eng katta kutilmani ochish" : "Keyingi tabrik"}
          <ChevronRight className="h-4.5 w-4.5 transition-transform group-hover:translate-x-1" />
        </motion.button>
      </div>
    </div>
  );
}
