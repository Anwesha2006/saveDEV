import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Logo } from "../icons/Logo";

export const Navbar = () => {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 glass-panel"
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <Logo className="w-9 h-9" />
          <span className="font-semibold text-lg">saveDEV</span>
        </Link>

        <div className="flex items-center gap-4">
          <Link to="/dashboard" className="btn-ghost">
            Dashboard
          </Link>
          <Link to="/dashboard" className="btn-primary">
            Get Started
          </Link>
        </div>
      </div>
    </motion.nav>
  );
};
