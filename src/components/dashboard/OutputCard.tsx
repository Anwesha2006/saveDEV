import { motion } from "framer-motion";
import { Copy, Check } from "lucide-react";
import { useState } from "react";

interface OutputCardProps {
  title: string;
  content: string;
  index: number;
}

export const OutputCard = ({ title, content, index }: OutputCardProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="card-elevated p-5 group"
    >
      <div className="flex items-start justify-between gap-4 mb-3">
        <h4 className="font-semibold text-sm">{title}</h4>
        <button
          onClick={handleCopy}
          className="opacity-0 group-hover:opacity-100 transition-opacity btn-ghost p-1.5"
          title="Copy to clipboard"
        >
          {copied ? (
            <Check className="w-4 h-4 text-step-complete" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </button>
      </div>
      <p className="text-sm text-muted-foreground whitespace-pre-wrap leading-relaxed">
        {content}
      </p>
    </motion.div>
  );
};
