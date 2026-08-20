import { motion } from "framer-motion";
import { Heart, Sparkles, Flower2, ChevronRight } from "lucide-react";
import { NAME_OF_DAY } from "../data";

const fadeUp = {
  hidden: { opacity: 0, y: 26, filter: "blur(8px)" },
  show: (d: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { delay: d, duration: 0.9, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function IntroScene({ onStart }: { onStart: () => void }) {
  return (
    <div className="scene">
      {/* backdrop */}
      <div className="absolute inset-0">
        <img src="images/hero.jpg" alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#20081299] via-[#2a0a1891] to-[#160510fb]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#160510f2] via-transparent to-transparent" />
      </div>

      <div className="relative z-10 flex h-full flex-col items-center justify-between px-6 pb-[calc(2rem+env(safe-area-inset-bottom))] pt-[calc(3.5rem+env(safe-area-inset-top))] text-center">
        <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0.2} className="flex items-center gap-2.5">
          <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#ffb3d1]" />
          <p className="text-[11px] font-medium tracking-[0.42em] text-[#ffc9dd]">DORAMA · SALOMNOMA</p>
          <span className="h-px w-8 bg-gradient-to-l from-transparent to-[#ffb3d1]" />
        </motion.div>

        <div className="flex flex-col items-center">
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0.45} className="mb-3 flex items-center gap-2 text-[#ffd9e8]">
            <Flower2 className="h-4 w-4" />
            <span className="font-script text-2xl">«Haqiqiy go'zallik» uslubida</span>
            <Flower2 className="h-4 w-4" />
          </motion.div>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.65}
            className="font-display text-[17vw] font-semibold leading-[0.95] text-shimmer-dark sm:text-7xl"
          >
            {NAME_OF_DAY},
          </motion.h1>

          <motion.p variants={fadeUp} initial="hidden" animate="show" custom={0.95} className="mt-4 max-w-[19rem] text-[15px] leading-relaxed text-[#ffe3ee]/90">
            siz uchun Saebom maktabining barcha qahramonlari saf tortdi — har biri sizni o'z uslubida tabriklamoqchi.
          </motion.p>

          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={1.2} className="mt-6 flex items-center gap-2">
            {["6 ta tabrik", "1 ta sovg'a", "cheksiz quvonch"].map((t) => (
              <span
                key={t}
                className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[11px] font-medium text-[#ffe3ee] backdrop-blur-sm"
              >
                <Sparkles className="h-3 w-3 text-[#ffd166]" />
                {t}
              </span>
            ))}
          </motion.div>
        </div>

        <motion.div variants={fadeUp} initial="hidden" animate="show" custom={1.45} className="w-full max-w-xs">
          <button
            onClick={onStart}
            className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-[#ff5d8f] via-[#ff7aa2] to-[#ffb45e] px-8 py-4 text-[15px] font-semibold text-white shadow-[0_18px_45px_-12px_rgba(255,93,143,0.65)] transition-transform active:scale-95"
          >
            <span className="absolute inset-0 translate-x-[-120%] bg-gradient-to-r from-transparent via-white/35 to-transparent transition-transform duration-700 group-hover:translate-x-[120%]" />
            <Heart className="h-4.5 w-4.5 fill-white" />
            Salomnomani boshlash
            <ChevronRight className="h-4.5 w-4.5 transition-transform group-hover:translate-x-1" />
          </button>
          <p className="mt-3 text-[11px] tracking-wide text-[#ffd9e8]/70">Telefonni mustahkam ushlang — quvonch kafolatlangan!</p>
        </motion.div>
      </div>
    </div>
  );
}
