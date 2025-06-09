import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";

interface AnimatedCardProps {
  title: string;
  description: string;
  content: string;
  variant:
    | "default"
    | "hover"
    | "pulse"
    | "bounce"
    | "rotate"
    | "shake"
    | "glow"
    | "slide";
  delay: number;
}

export function AnimatedCard({
  title,
  description,
  content,
  variant,
  delay,
}: AnimatedCardProps) {
  const getVariantAnimation = () => {
    switch (variant) {
      case "hover":
        return {
          whileHover: {
            scale: 1.05,
            rotateY: 10,
            boxShadow: "0 25px 50px -12px rgba(139, 69, 219, 0.5)",
          },
          whileTap: { scale: 0.95 },
        };
      case "pulse":
        return {
          animate: {
            scale: [1, 1.02, 1],
            opacity: [1, 0.8, 1],
          },
          transition: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          },
        };
      case "bounce":
        return {
          animate: { y: [0, -10, 0] },
          transition: {
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          },
        };
      case "rotate":
        return {
          animate: {
            rotateZ: [0, 5, -5, 0],
            scale: [1, 1.02, 1],
          },
          transition: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          },
        };
      case "shake":
        return {
          animate: {
            x: [0, -5, 5, -5, 5, 0],
            rotate: [0, -1, 1, -1, 1, 0],
          },
          transition: {
            duration: 0.5,
            repeat: Infinity,
            repeatDelay: 2,
            ease: "easeInOut",
          },
        };
      case "glow":
        return {
          animate: {
            boxShadow: [
              "0 0 20px rgba(139, 69, 219, 0.5)",
              "0 0 40px rgba(59, 130, 246, 0.7)",
              "0 0 20px rgba(139, 69, 219, 0.5)",
            ],
          },
          transition: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          },
        };
      case "slide":
        return {
          animate: {
            x: [0, 10, -10, 0],
            y: [0, -5, 5, 0],
          },
          transition: {
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          },
        };
      default:
        return {};
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      {...getVariantAnimation()}
      className="w-80 relative z-10"
    >
      <Card className="bg-gradient-to-br from-slate-800 to-slate-900 dark:from-slate-900 dark:to-slate-950 border-slate-600 dark:border-slate-700 shadow-xl overflow-hidden">
        <CardHeader>
          <CardTitle className="text-slate-100 dark:text-slate-100">
            {title}
          </CardTitle>
          <CardDescription className="text-slate-300 dark:text-slate-400">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-slate-200 dark:text-slate-300">{content}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
