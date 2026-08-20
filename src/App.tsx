import { useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Petals from "./components/Petals";
import IntroScene from "./components/IntroScene";
import RevealScene from "./components/RevealScene";
import GreetingScene from "./components/GreetingScene";
import FinaleScene from "./components/FinaleScene";
import { CHARACTERS } from "./data";

type Stage = { t: "intro" } | { t: "reveal" | "greet"; i: number } | { t: "finale" };

const sceneVariants = {
  initial: { opacity: 0, scale: 1.03, filter: "blur(6px)" },
  animate: { opacity: 1, scale: 1, filter: "blur(0px)", transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const } },
  exit: { opacity: 0, scale: 0.985, filter: "blur(6px)", transition: { duration: 0.45, ease: "easeIn" as const } },
};

export default function App() {
  const [stage, setStage] = useState<Stage>({ t: "intro" });

  const goReveal = useCallback((i: number) => setStage({ t: "reveal", i }), []);
  const goGreet = useCallback((i: number) => setStage({ t: "greet", i }), []);

  const key = stage.t + (stage.t === "reveal" || stage.t === "greet" ? `-${stage.i}` : "");

  return (
    <div className="app-shell noise">
      {/* global base gradient + petals behind every scene */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#2b0a1d] via-[#1c0713] to-[#120408]" />
      <Petals density={stage.t === "finale" ? 1.2 : 1} sparkleBoost={stage.t === "finale" ? 1 : 0.4} />

      <AnimatePresence mode="wait">
        <motion.div key={key} variants={sceneVariants} initial="initial" animate="animate" exit="exit" className="absolute inset-0">
          {stage.t === "intro" && <IntroScene onStart={() => goReveal(0)} />}

          {stage.t === "reveal" && (
            <RevealScene
              char={CHARACTERS[stage.i]}
              index={stage.i}
              total={CHARACTERS.length}
              onDone={() => goGreet(stage.i)}
            />
          )}

          {stage.t === "greet" && (
            <GreetingScene
              char={CHARACTERS[stage.i]}
              index={stage.i}
              total={CHARACTERS.length}
              onNext={() => (stage.i < CHARACTERS.length - 1 ? goReveal(stage.i + 1) : setStage({ t: "finale" }))}
            />
          )}

          {stage.t === "finale" && <FinaleScene onReplay={() => setStage({ t: "intro" })} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
