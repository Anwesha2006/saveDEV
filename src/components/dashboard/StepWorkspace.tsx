import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, RefreshCw, ArrowRight, Sparkles } from "lucide-react";
import { type WorkflowStep } from "@/lib/workflow-steps";
import { cn } from "@/lib/utils";
import { OutputCard } from "./OutputCard";
import { SlideCard, mockSlides } from "./SlideCard";
import { PrototypeSection } from "./PrototypeSection";
import { ReviewSection } from "./ReviewSection";

interface StepWorkspaceProps {
  step: WorkflowStep;
  isCompleted: boolean;
  onComplete: () => void;
}

// Mock AI-generated content for demonstration
const mockOutputs: Record<string, { title: string; content: string }[]> = {
  "problem-statement": [
    {
      title: "Problem Analysis",
      content: "Developers face fragmented workflows when building projects. Tools like ChatGPT for ideas, Figma for design, Notion for docs, and various IDEs create context-switching overhead that reduces productivity by up to 40%.",
    },
    {
      title: "Core Pain Points",
      content: "• Information scattered across 5+ tools\n• No unified view of project progress\n• Repetitive context-sharing with AI assistants\n• Difficulty tracking decisions made in different platforms",
    },
    {
      title: "Opportunity",
      content: "A unified AI workspace that maintains context across all development phases could save developers 10+ hours per project while improving decision quality.",
    },
  ],
  "users-scalability": [
    {
      title: "Primary Target Users",
      content: "• Full-stack developers (40%)\n• Web3/Blockchain developers (25%)\n• AI/ML builders & hackathon participants (20%)\n• CS students building portfolios (15%)",
    },
    {
      title: "Market Size Analysis",
      content: "TAM: 28M professional developers globally\nSAM: 8M developers actively building side projects\nSOM: 400K early adopters in dev-tool space",
    },
    {
      title: "Scalability Assessment",
      content: "High scalability potential with SaaS model. Cloud-native architecture allows horizontal scaling. AI inference costs manageable with proper caching and model selection.",
    },
  ],
  "feasibility": [
    {
      title: "Market Validation",
      content: "Strong demand signals: 73% of surveyed developers report tool fragmentation as a top frustration. Indie dev communities actively discussing this problem.",
    },
    {
      title: "Competitive Landscape",
      content: "• Linear: Project management focus, not full workflow\n• Notion AI: General purpose, lacks dev-specific features\n• GitHub Copilot: Code-only, no planning phase\n\nGap: No tool covers problem→deployment workflow.",
    },
    {
      title: "Recommendation",
      content: "✅ Proceed with development. Clear market gap and strong willingness-to-pay signals from developer community.",
    },
  ],
  "backend-structure": [
    {
      title: "Recommended Architecture",
      content: "Serverless-first approach with Next.js API routes or separate Express/Fastify backend. Consider edge functions for latency-sensitive operations.",
    },
    {
      title: "Folder Structure",
      content: "api/\n├── auth/\n├── projects/\n├── ai/\n├── webhooks/\n└── middleware/",
    },
    {
      title: "Services to Consider",
      content: "• Supabase: Auth + Database + Real-time\n• OpenAI/Anthropic: AI generation\n• Resend: Transactional emails\n• Stripe: Payments\n• Vercel: Hosting + Edge",
    },
  ],
  "api-database": [
    {
      title: "Database Schema",
      content: "PostgreSQL with the following core tables:\n• users (auth)\n• projects\n• steps (workflow progress)\n• outputs (AI-generated content)\n• feedback",
    },
    {
      title: "Key API Endpoints",
      content: "POST /api/projects - Create project\nGET /api/projects/:id - Get project\nPOST /api/steps/:id/generate - Generate AI content\nPATCH /api/steps/:id/complete - Mark step complete",
    },
    {
      title: "Relationships",
      content: "User → hasMany → Projects\nProject → hasMany → Steps\nStep → hasMany → Outputs\nProject → hasOne → Deployment",
    },
  ],
  "deployment": [
    {
      title: "Recommended Platform",
      content: "Vercel for frontend + API routes. Supabase for database and auth. This stack offers the best DX and automatic scaling.",
    },
    {
      title: "CI/CD Setup",
      content: "1. Connect GitHub repo to Vercel\n2. Enable preview deployments\n3. Set up environment variables\n4. Configure production branch\n5. Enable analytics and monitoring",
    },
    {
      title: "Monitoring",
      content: "• Vercel Analytics for performance\n• Sentry for error tracking\n• Supabase dashboard for database\n• Optional: Posthog for product analytics",
    },
  ],
};

export const StepWorkspace = ({ step, isCompleted, onComplete }: StepWorkspaceProps) => {
  const [inputValue, setInputValue] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [outputs, setOutputs] = useState<{ title: string; content: string }[]>([]);
  const [showSlides, setShowSlides] = useState(false);
  const [showPrototype, setShowPrototype] = useState(false);

  const handleGenerate = async () => {
    if (!inputValue.trim()) return;
    
    setIsGenerating(true);
    // Simulate AI generation
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (step.id === "ppt-content" || step.id === "ppt-design") {
      setShowSlides(true);
    } else if (step.id === "frontend-prototype") {
      setShowPrototype(true);
    } else {
      setOutputs(mockOutputs[step.id] || [
        {
          title: "AI Analysis",
          content: "Based on your input, here's a comprehensive analysis of the key points and recommendations for moving forward with your project.",
        },
        {
          title: "Key Insights",
          content: "• Important consideration #1\n• Important consideration #2\n• Important consideration #3",
        },
      ]);
    }
    setIsGenerating(false);
  };

  const Icon = step.icon;
  const isReviewStep = step.id === "review-improvements";
  const isPPTStep = step.id === "ppt-content" || step.id === "ppt-design";
  const isPrototypeStep = step.id === "frontend-prototype";
  const hasOutput = outputs.length > 0 || showSlides || showPrototype;

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        key={step.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Step header */}
        <div className="flex items-start gap-4 mb-8">
          <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
            <Icon className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-2">{step.title}</h2>
            <p className="text-muted-foreground">{step.description}</p>
          </div>
        </div>

        {/* Review section has special UI */}
        {isReviewStep ? (
          <ReviewSection />
        ) : (
          <>
            {/* Input section */}
            <div className="card-elevated p-6 mb-6">
              <label className="block text-sm font-medium text-muted-foreground mb-3">
                Your Input
              </label>
              {step.inputType === "textarea" ? (
                <textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={step.inputPlaceholder}
                  className="input-enhanced w-full min-h-[120px] resize-none"
                />
              ) : (
                <input
                  type={step.inputType === "url" ? "url" : "text"}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={step.inputPlaceholder}
                  className="input-enhanced w-full"
                />
              )}

              <div className="flex items-center gap-3 mt-4">
                <button
                  onClick={handleGenerate}
                  disabled={!inputValue.trim() || isGenerating}
                  className={cn(
                    "btn-primary",
                    (!inputValue.trim() || isGenerating) && "opacity-50 cursor-not-allowed"
                  )}
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      Generate with AI
                    </>
                  )}
                </button>

                {hasOutput && (
                  <button
                    onClick={handleGenerate}
                    disabled={isGenerating}
                    className="btn-ghost"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Regenerate
                  </button>
                )}
              </div>
            </div>

            {/* Output section */}
            <AnimatePresence mode="wait">
              {/* PPT Slides */}
              {isPPTStep && showSlides && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-4 mb-6"
                >
                  <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-primary" />
                    Generated Slide Outline
                  </h3>
                  
                  <div className="grid gap-4">
                    {mockSlides.map((slide) => (
                      <SlideCard key={slide.slideNumber} {...slide} />
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Prototype Section */}
              {isPrototypeStep && showPrototype && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="mb-6"
                >
                  <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-2 mb-4">
                    <Sparkles className="w-4 h-4 text-primary" />
                    Frontend Blueprint
                  </h3>
                  <PrototypeSection />
                </motion.div>
              )}

              {/* Standard outputs */}
              {outputs.length > 0 && !isPPTStep && !isPrototypeStep && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-4 mb-6"
                >
                  <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-primary" />
                    AI-Generated Insights
                  </h3>
                  
                  <div className="grid gap-4">
                    {outputs.map((output, index) => (
                      <OutputCard
                        key={index}
                        title={output.title}
                        content={output.content}
                        index={index}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}

        {/* Complete step section */}
        {(hasOutput || isReviewStep) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="card-elevated p-6 bg-secondary/30 mt-6"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors cursor-pointer",
                    isCompleted
                      ? "bg-step-complete border-step-complete"
                      : "border-muted-foreground hover:border-primary"
                  )}
                  onClick={onComplete}
                >
                  {isCompleted && <Check className="w-4 h-4 text-primary-foreground" />}
                </div>
                <span className="font-medium">
                  {isCompleted ? "Step completed!" : "Mark this step as complete"}
                </span>
              </div>

              {isCompleted && (
                <button className="btn-primary text-sm py-2">
                  Continue to Next Step
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};
