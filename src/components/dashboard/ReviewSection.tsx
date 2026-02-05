import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, RefreshCw, CheckCircle, AlertTriangle, Lightbulb, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface FeedbackItem {
  type: "strength" | "issue" | "suggestion";
  title: string;
  description: string;
}

const mockFeedback: FeedbackItem[] = [
  {
    type: "strength",
    title: "Clean Visual Hierarchy",
    description: "The dashboard layout has excellent information architecture. Users can quickly identify key actions and navigate between sections.",
  },
  {
    type: "strength",
    title: "Responsive Design",
    description: "The app adapts well to different screen sizes. Mobile experience is solid with proper touch targets.",
  },
  {
    type: "issue",
    title: "Loading States Missing",
    description: "Several interactive elements don't show loading indicators. Add skeleton loaders for async content.",
  },
  {
    type: "issue",
    title: "Accessibility Concerns",
    description: "Some interactive elements lack proper ARIA labels. Screen reader users may have difficulty navigating.",
  },
  {
    type: "suggestion",
    title: "Add Keyboard Shortcuts",
    description: "Developer tools benefit greatly from keyboard shortcuts. Consider adding a command palette (Cmd+K).",
  },
  {
    type: "suggestion",
    title: "Implement Dark/Light Toggle",
    description: "While dark mode is default, some users prefer light mode. Consider adding a theme switcher in settings.",
  },
];

export const ReviewSection = () => {
  const [url, setUrl] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [feedback, setFeedback] = useState<FeedbackItem[]>([]);

  const handleAnalyze = async () => {
    if (!url.trim()) return;
    
    setIsAnalyzing(true);
    // Simulate analysis
    await new Promise(resolve => setTimeout(resolve, 2000));
    setFeedback(mockFeedback);
    setIsAnalyzing(false);
  };

  const getIcon = (type: FeedbackItem["type"]) => {
    switch (type) {
      case "strength":
        return CheckCircle;
      case "issue":
        return AlertTriangle;
      case "suggestion":
        return Lightbulb;
    }
  };

  const getStyles = (type: FeedbackItem["type"]) => {
    switch (type) {
      case "strength":
        return "border-step-complete/30 bg-step-complete/5";
      case "issue":
        return "border-destructive/30 bg-destructive/5";
      case "suggestion":
        return "border-primary/30 bg-primary/5";
    }
  };

  const getIconColor = (type: FeedbackItem["type"]) => {
    switch (type) {
      case "strength":
        return "text-step-complete";
      case "issue":
        return "text-destructive";
      case "suggestion":
        return "text-primary";
    }
  };

  return (
    <div className="space-y-6">
      {/* URL input */}
      <div className="card-elevated p-6">
        <label className="block text-sm font-medium text-muted-foreground mb-3">
          Paste your deployed URL
        </label>
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <ExternalLink className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://your-app.vercel.app"
              className="input-enhanced w-full pl-11"
            />
          </div>
          <button
            onClick={handleAnalyze}
            disabled={!url.trim() || isAnalyzing}
            className={cn(
              "btn-primary shrink-0",
              (!url.trim() || isAnalyzing) && "opacity-50 cursor-not-allowed"
            )}
          >
            {isAnalyzing ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Analyze
              </>
            )}
          </button>
        </div>
      </div>

      {/* Feedback results */}
      {feedback.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Grouped by type */}
          {(["strength", "issue", "suggestion"] as const).map((type) => {
            const items = feedback.filter((f) => f.type === type);
            if (items.length === 0) return null;

            const Icon = getIcon(type);
            const title = type === "strength" ? "Strengths" : type === "issue" ? "Issues to Address" : "Suggestions";

            return (
              <div key={type}>
                <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                  <Icon className={cn("w-4 h-4", getIconColor(type))} />
                  {title}
                </h4>
                <div className="grid gap-3">
                  {items.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={cn(
                        "p-4 rounded-lg border",
                        getStyles(type)
                      )}
                    >
                      <h5 className="font-medium text-sm mb-1">{item.title}</h5>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            );
          })}
        </motion.div>
      )}
    </div>
  );
};
