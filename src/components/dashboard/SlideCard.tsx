import { motion } from "framer-motion";
import { Presentation, Layout, Image, ChevronRight } from "lucide-react";

interface SlideCardProps {
  slideNumber: number;
  title: string;
  bullets: string[];
  layoutHint: string;
  iconSuggestion: string;
}

export const SlideCard = ({
  slideNumber,
  title,
  bullets,
  layoutHint,
  iconSuggestion,
}: SlideCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: slideNumber * 0.05 }}
      className="card-elevated p-5 group hover:border-primary/30 transition-all"
    >
      {/* Slide header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
          <Presentation className="w-4 h-4 text-primary" />
        </div>
        <div className="flex-1">
          <span className="text-xs font-mono text-muted-foreground">Slide {slideNumber}</span>
          <h4 className="font-semibold text-sm">{title}</h4>
        </div>
      </div>

      {/* Bullet points */}
      <ul className="space-y-2 mb-4">
        {bullets.map((bullet, index) => (
          <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
            <ChevronRight className="w-4 h-4 text-primary shrink-0 mt-0.5" />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>

      {/* Design hints */}
      <div className="flex flex-wrap gap-2 pt-3 border-t border-border">
        <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-secondary text-xs">
          <Layout className="w-3 h-3 text-primary" />
          <span className="text-muted-foreground">{layoutHint}</span>
        </div>
        <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-secondary text-xs">
          <Image className="w-3 h-3 text-accent" />
          <span className="text-muted-foreground">{iconSuggestion}</span>
        </div>
      </div>
    </motion.div>
  );
};

// Mock slide data
export const mockSlides: SlideCardProps[] = [
  {
    slideNumber: 1,
    title: "Title Slide",
    bullets: ["DevFlow: AI-Powered Development Workspace", "From problem statement to deployment"],
    layoutHint: "Center-aligned",
    iconSuggestion: "Logo + tagline",
  },
  {
    slideNumber: 2,
    title: "The Problem",
    bullets: [
      "Developers juggle 5+ tools for each project",
      "Ideas scattered across PDFs, chats, and docs",
      "40% productivity loss from context-switching",
    ],
    layoutHint: "Left-aligned with icons",
    iconSuggestion: "Fragmented puzzle pieces",
  },
  {
    slideNumber: 3,
    title: "Our Solution",
    bullets: [
      "Unified AI workspace for entire dev lifecycle",
      "Step-by-step guidance from idea to deploy",
      "Context preserved across all phases",
    ],
    layoutHint: "Split layout",
    iconSuggestion: "Connected workflow diagram",
  },
  {
    slideNumber: 4,
    title: "Key Features",
    bullets: [
      "AI-powered problem validation",
      "Auto-generated pitch decks",
      "Frontend & backend blueprints",
      "One-click deployment guidance",
    ],
    layoutHint: "2x2 grid",
    iconSuggestion: "Feature icons",
  },
  {
    slideNumber: 5,
    title: "Target Market",
    bullets: [
      "28M professional developers globally",
      "8M actively building side projects",
      "Focus: hackathon builders & indie devs",
    ],
    layoutHint: "Stats with emphasis",
    iconSuggestion: "User personas",
  },
];
