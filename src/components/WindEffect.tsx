import { motion } from "framer-motion";

interface WindEffectProps {
  isActive: boolean;
}

export function WindEffect({ isActive }: WindEffectProps) {
  const particles = Array.from({ length: 20 }, (_, i) => i);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map((i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
          initial={{
            x: -10,
            y: Math.random() * window.innerHeight,
            opacity: 0,
          }}
          animate={{
            x: window.innerWidth + 10,
            y: Math.random() * window.innerHeight + (Math.random() - 0.5) * 100,
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            delay: Math.random() * 1,
            ease: "easeOut",
          }}
        />
      ))}

      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={`large-${i}`}
          className="absolute w-2 h-2 bg-purple-400/20 rounded-full"
          initial={{
            x: -20,
            y: Math.random() * window.innerHeight,
            opacity: 0,
            scale: 0,
          }}
          animate={{
            x: window.innerWidth + 20,
            y: Math.random() * window.innerHeight + (Math.random() - 0.5) * 200,
            opacity: [0, 0.8, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            delay: Math.random() * 1.5,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}
