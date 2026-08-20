import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import confetti from "canvas-confetti";
import { Check, Heart, RotateCcw, Send, Share2, Sparkles, X } from "lucide-react";
import Cake from "./Cake";
import { CHARACTERS, CHANNEL, CHANNEL_URL, NAME_OF_DAY } from "../data";

type Phase = "cake" | "blackout" | "party";

const heart = confetti.shapeFromPath({
  path: "M167 72c19,-38 37,-56 75,-56 42,0 76,33 76,75 0,76 -76,151 -151,227 -76,-76 -151,-151 -151,-227 0,-42 33,-75 76,-75 38,0 57,18 76,56z",
});

const COLORS = ["#ff5d8f", "#ffb3d1", "#c084fc", "#ffd166", "#ffffff"];

function burst(power = 1) {
  confetti({
    particleCount: Math.round(90 * power),
    spread: 75,
    origin: { x: 0.5, y: 0.62 },
    colors: COLORS,
    zIndex: 55,
    scalar: 1.05,
  });
  confetti({ particleCount: Math.round(40 * power), spread: 120, origin: { x: 0, y: 0.7 }, angle: 60, colors: COLORS, zIndex: 55 });
  confetti({ particleCount: Math.round(40 * power), spread: 120, origin: { x: 1, y: 0.7 }, angle: 120, colors: COLORS, zIndex: 55 });
  confetti({
    particleCount: Math.round(26 * power),
    spread: 100,
    origin: { x: 0.5, y: 0.4 },
    shapes: [heart],
    colors: ["#ff4d7e", "#ff8fb8", "#e0336b"],
    scalar: 1.7,
    gravity: 0.7,
    zIndex: 55,
  });
  confetti({ particleCount: Math.round(30 * power), spread: 160, startVelocity: 55, origin: { x: 0.5, y: 0.5 }, shapes: ["square"], colors: COLORS, scalar: 0.55, ticks: 300, zIndex: 55 });
}

const BALLOON_COLORS = [
  ["#ff8fb8", "#ff5d8f"],
  ["#c9a6ff", "#8b5cf6"],
  ["#ffd9a8", "#ffb45e"],
  ["#a8c1ff", "#5a6ce0"],
  ["#ffb3d1", "#ef5d9e"],
];

export default function FinaleScene({ onReplay }: { onReplay: () => void }) {
  const [phase, setPhase] = useState<Phase>("cake");
  const [sheetOpen, setSheetOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const partyTimers = useRef<number[]>([]);

  const balloons = useMemo(
    () =>
      Array.from({ length: 12 }).map((_, i) => ({
        left: `${4 + ((i * 83) % 92)}%`,
        delay: `${-((i * 1.7) % 14).toFixed(1)}s`,
        dur: `${10 + ((i * 2.3) % 7).toFixed(1)}s`,
        sway: `${2.8 + ((i * 0.7) % 2).toFixed(1)}s`,
        scale: 0.7 + ((i * 0.13) % 0.55),
        c: BALLOON_COLORS[i % BALLOON_COLORS.length],
      })),
    []
  );

  const handleBlown = useCallback(() => {
    setPhase("blackout");
    partyTimers.current.push(
      window.setTimeout(() => setPhase("party"), 1900),
      window.setTimeout(() => burst(1.4), 2050),
      window.setTimeout(() => burst(0.8), 2900),
      window.setTimeout(() => setSheetOpen(true), 3400)
    );
  }, []);

  useEffect(() => {
    return () => partyTimers.current.forEach(clearTimeout);
  }, []);

  // gentle ongoing confetti during party
  useEffect(() => {
    if (phase !== "party") return;
    const id = window.setInterval(() => burst(0.35), 6000);
    return () => clearInterval(id);
  }, [phase]);

  const share = async () => {
    const payload = {
      title: `${NAME_OF_DAY} — tug'ilgan kun tabrigi`,
      text: `${NAME_OF_DAY} uchun «Als go'zallik» uslubidagi maxsus tabrik — ${CHANNEL} tomonidan.`,
      url: window.location.href,
    };
    try {
      if (navigator.share) {
        await navigator.share(payload);
      } else {
        await navigator.clipboard.writeText(`${payload.text}\n${payload.url}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2200);
      }
    } catch {
      /* user cancelled */
    }
  };

  return (
    <div className="scene">
      {/* rich backdrop */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#2b0a1d] via-[#1e0713] to-[#120408]" />
      <div className="blob left-[-12%] top-[4%] h-80 w-80" style={{ background: "rgba(255,93,143,0.28)" }} />
      <div className="blob bottom-[6%] right-[-14%] h-96 w-96" style={{ background: "rgba(139,92,246,0.22)", animationDelay: "-7s" }} />
      <div className="blob left-[22%] top-[38%] h-56 w-56" style={{ background: "rgba(255,180,94,0.16)", animationDelay: "-3s" }} />

      {/* balloons (party only) */}
      {phase === "party" && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {balloons.map((b, i) => (
            <span key={i} className="balloon-pos" style={{ left: b.left, animationDuration: b.dur, animationDelay: b.delay }}>
              <span
                className="balloon block"
                style={{
                  background: `radial-gradient(circle at 32% 28%, ${b.c[0]}, ${b.c[1]})`,
                  animationDuration: b.sway,
                  transform: `scale(${b.scale})`,
                  transformOrigin: "top center",
                }}
              />
            </span>
          ))}
        </div>
      )}

      <AnimatePresence mode="wait">
        {phase === "cake" && (
          <motion.div
            key="cake"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05, transition: { duration: 0.4 } }}
            className="relative z-10 flex h-full flex-col px-6 pb-[calc(1.6rem+env(safe-area-inset-bottom))] pt-[calc(2.4rem+env(safe-area-inset-top))]"
          >
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className="text-center">
              <p className="font-script text-3xl text-[#ffb3d1]">Va nihoyat...</p>
              <h2 className="font-display mt-1 text-4xl font-semibold text-shimmer-dark sm:text-5xl">Eng muhim daqiqa</h2>
              <p className="mx-auto mt-3 max-w-[20rem] text-[13.5px] leading-relaxed text-[#ffe3ee]/85">
                Ko'zingizni yumib, eng aziz tilingizni o'ylang. So'ngra shamni <b className="text-[#ffd166]">bosib turing</b> — sham o'chganda tilingiz osmonga uchadi!
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-1 items-center justify-center"
            >
              <Cake onBlown={handleBlown} />
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="text-center text-[11px] font-medium tracking-[0.3em] text-[#ffb3d1]/80"
            >
              PUFLAGUNGINGIZCHA — USHLAB TURING
            </motion.p>
          </motion.div>
        )}

        {phase === "party" && (
          <motion.div key="party" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="scroll-area nice-scroll relative z-10">
            <div className="flex min-h-full flex-col items-center px-6 pb-[22rem] pt-[calc(3rem+env(safe-area-inset-top))] text-center">
              <motion.p
                initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ delay: 0.2, duration: 0.9 }}
                className="font-script text-4xl text-[#ffb3d1]"
              >
                Muborak bo'lsin!
              </motion.p>

              <motion.h2
                initial={{ opacity: 0, scale: 0.85, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                transition={{ delay: 0.45, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="font-display mt-2 text-[11vw] font-bold leading-[1.02] text-shimmer-dark sm:text-6xl"
              >
                TUG'ILGAN KUNINGIZ
                <br />
                BILAN,
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 26 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.85, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="font-script mt-1 text-[16vw] leading-none text-shimmer-dark drop-shadow-[0_10px_35px_rgba(255,93,143,0.4)] sm:text-7xl"
              >
                {NAME_OF_DAY}!
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="mt-5 max-w-[21rem] text-[13.5px] leading-relaxed text-[#ffe3ee]/85"
              >
                Bu salomnoma sizga dugonangiz <b className="text-[#ffb3d1]">Mohi</b> va «Haqiqiy go'zallik» qahramonlaridan — cheksiz mehr bilan tayyorlandi.
              </motion.p>

              {/* all six well-wishers */}
              <motion.div
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.45, duration: 0.8 }}
                className="mt-7 flex items-center justify-center"
              >
                {CHARACTERS.map((c, i) => (
                  <motion.div
                    key={c.id}
                    initial={{ scale: 0, rotate: -20 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 1.55 + i * 0.12, type: "spring", stiffness: 260, damping: 15 }}
                    className="-ml-2 h-11 w-11 overflow-hidden rounded-full border-2 shadow-lg first:ml-0"
                    style={{ borderColor: c.accent, background: `linear-gradient(135deg, ${c.accent}, ${c.accent}88)` }}
                    title={c.name}
                  >
                    {c.image ? (
                      <img src={c.image} alt={c.name} className="h-full w-full object-cover" />
                    ) : (
                      <span className="flex h-full w-full items-center justify-center font-script text-xl text-white">M</span>
                    )}
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 2.3, duration: 0.7 }}
                  className="ml-3 flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 backdrop-blur-sm"
                >
                  <Heart className="h-3 w-3 fill-[#ff5d8f] text-[#ff5d8f]" />
                  <span className="text-[10px] font-semibold tracking-[0.18em] text-[#ffd9e8]">HAMMASI SIZ UCHUN</span>
                </motion.div>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.6, duration: 0.9 }}
                className="mt-8 flex items-center gap-2 text-[11px] tracking-[0.24em] text-[#ffb3d1]/70"
              >
                <Sparkles className="h-3.5 w-3.5" /> QUYIDA CHAQDIQ ASOSIY SOVG'A <Sparkles className="h-3.5 w-3.5" />
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ---- promo bottom sheet ---- */}
      <AnimatePresence>
        {phase === "party" && sheetOpen && (
          <motion.div
            key="sheet"
            initial={{ y: "108%" }}
            animate={{ y: 0 }}
            exit={{ y: "108%" }}
            transition={{ type: "spring", stiffness: 90, damping: 18 }}
            className="absolute inset-x-0 bottom-0 z-[65] px-3 pb-[calc(0.8rem+env(safe-area-inset-bottom))]"
          >
            <div className="noise relative mx-auto max-w-md overflow-hidden rounded-[28px] border border-white/15 bg-gradient-to-b from-[#3a0e26]/95 to-[#22081a]/98 p-5 shadow-[0_-20px_60px_rgba(0,0,0,0.55)] backdrop-blur-xl">
              <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-[#ff5d8f]/25 blur-3xl" />

              <button onClick={() => setSheetOpen(false)} aria-label="Yopish" className="absolute right-3.5 top-3.5 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/80 transition active:scale-90">
                <X className="h-4 w-4" />
              </button>

              <div className="flex items-center gap-3.5">
                <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#ff5d8f] via-[#c084fc] to-[#ffb45e] font-display text-xl font-bold text-white shadow-lg">
                  PF
                  <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#ffd166]">
                    <Sparkles className="h-3 w-3 text-[#3a0e26]" />
                  </span>
                </div>
                <div className="text-left">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#ffb3d1]">Salomnoma muallifi</p>
                  <p className="text-[15px] font-bold text-white">{CHANNEL}</p>
                </div>
              </div>

              <p className="mt-3.5 text-left text-[12.5px] leading-relaxed text-[#ffe3ee]/85">
                Shunday premium salomnomalar, kreativ dizayn va videomontajlar sizga ham kerakmi? Kanalimizga <b className="text-[#ffd166]">obuna bo'ling</b> — va bu quvonchni do'stlaringizga ham ulashing!
              </p>

              <div className="mt-4 grid grid-cols-2 gap-2.5">
                <a
                  href={CHANNEL_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#ff5d8f] to-[#ff8fb8] px-4 py-3 text-[13px] font-semibold text-white shadow-[0_12px_30px_-10px_rgba(255,93,143,0.7)] transition active:scale-95"
                >
                  <Send className="h-4 w-4" />
                  Kanalga o'tish
                </a>
                <button
                  onClick={share}
                  className="flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-3 text-[13px] font-semibold text-white transition active:scale-95"
                >
                  {copied ? <Check className="h-4 w-4 text-[#7ee2a8]" /> : <Share2 className="h-4 w-4" />}
                  {copied ? "Nusxalandi!" : "Ulashish"}
                </button>
              </div>

              <button onClick={onReplay} className="mt-3 flex w-full items-center justify-center gap-2 rounded-full py-1.5 text-[11px] font-medium text-[#ffd9e8]/70 transition active:scale-95">
                <RotateCcw className="h-3.5 w-3.5" />
                Salomnomani boshidan ko'rish
              </button>

              <p className="mt-1 text-center text-[10px] text-[#ffd9e8]/45">Yuborilgan har bir ulashish — yana bir tabassum!</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* reopen chip */}
      <AnimatePresence>
        {phase === "party" && !sheetOpen && (
          <motion.button
            key="reopen"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={() => setSheetOpen(true)}
            className="absolute bottom-[calc(1rem+env(safe-area-inset-bottom))] left-1/2 z-[64] flex -translate-x-1/2 items-center gap-2 rounded-full bg-gradient-to-r from-[#ff5d8f] to-[#c084fc] px-5 py-3 text-[12px] font-semibold text-white shadow-[0_14px_35px_-10px_rgba(255,93,143,0.7)] active:scale-95"
          >
            <Sparkles className="h-4 w-4" />
            Sovg'ani ochish
          </motion.button>
        )}
      </AnimatePresence>

      {/* ---- blackout overlay ---- */}
      <AnimatePresence>
        {phase === "blackout" && (
          <motion.div
            key="blackout"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8, delay: 0.05 } }}
            transition={{ duration: 0.35 }}
            className="absolute inset-0 z-[60] flex items-center justify-center bg-black"
          >
            <motion.p
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1, transition: { delay: 0.5, duration: 0.8 } }}
              exit={{ opacity: 0 }}
              className="font-script px-6 text-center text-4xl text-[#ffd9e8]"
            >
              Tilagingiz eshitildi...
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
