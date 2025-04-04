import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

function Loader({ onComplete = () => {} }) {
  const [stage, setStage] = useState(0);
  const letters = ["o", "d", "e", "n", "e", "x"];

  useEffect(() => {
    const sequence = async () => {
      await new Promise(r => setTimeout(r, 300));  
      setStage(1);  
      await new Promise(r => setTimeout(r, 800));  
      setStage(2);  
      await new Promise(r => setTimeout(r, 300));  
      setStage(3);  
      
      // Ensure onComplete is called after the animation completes
      setTimeout(() => {
        onComplete();
      }, 1000); // Adjust timing if needed
    };
    sequence();
  }, []);

  return (
    <div
      className="w-screen h-screen flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: "rgba(13, 60, 89, 1)" }}
    >
      <AnimatePresence>
        {stage < 2 && (
          <motion.div
            key="hole"
            className="absolute bottom-24"
            initial={{ scale: 0, y: 50 }}
            animate={stage >= 1 ? {
              scale: 1,
              y: 0,
              transition: { type: "spring", stiffness: 120, damping: 15 }
            } : {}}
            exit={{
              scale: 0,
              y: 50,
              transition: { duration: 0.4, ease: "easeIn" }
            }}
          >
            <div className="w-36 h-36 rounded-full bg-black/50 shadow-2xl backdrop-blur-md" />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="absolute z-10 w-20 h-20"
        initial={{ scale: 0.5, y: 200 }}
        animate={stage >= 1 ? {
          y: stage >= 3 ? 0 : 0,
          scale: 1,
          x: stage >= 3 ? "-9.5rem" : 0, // Adjusted for better centering
          transition: {
            type: "spring",
            stiffness: stage >= 3 ? 180 : 300,
            damping: 15,
            delay: stage >= 3 ? 0 : 0.2
          }
        } : {}}
      >
        <img
          src="/assets/codenex-logo.png"
          alt="C Logo"
          className="w-full h-full object-contain"
        />
      </motion.div>

      <motion.div
        className="flex items-center gap-3 "
        initial={{ opacity: 0 }}
        animate={stage >= 3 ? { opacity: 1 } : {}}
      >
        {letters.map((letter, index) => (
          <motion.span
            key={index}
            className="text-5xl font-bold tracking-tight"
            style={{ color: "rgba(47, 228, 237, 1)" }}
            initial={{ y: 30, opacity: 0 }}
            animate={stage >= 3 ? {
              y: 0,
              opacity: 1,
              transition: {
                delay: index * 0.09,
                type: "spring",
                stiffness: 350
              }
            } : {}}
          >
            {letter}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
}

export default Loader;
