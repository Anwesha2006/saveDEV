"use client";
import { motion } from "framer-motion";

export const Logo = ({ className = "w-8 h-8" }: { className?: string }) => (
  <motion.svg
    viewBox="0 0 40 40"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.3 }}
  >
    <rect
      width="40"
      height="40"
      rx="10"
      fill="hsl(var(--primary) / 0.2)"
    />

    <path
      d="M12 20L18 26L28 14"
      stroke="hsl(var(--primary))"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />

    <circle
      cx="20"
      cy="20"
      r="12"
      stroke="hsl(var(--primary) / 0.3)"
      strokeWidth="2"
      fill="none"
    />
  </motion.svg>
);
