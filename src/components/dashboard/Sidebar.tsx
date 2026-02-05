import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Logo } from "@/components/icons/Logo";
import { type WorkflowStep } from "@/lib/workflow-steps";
import { cn } from "@/lib/utils";

interface SidebarProps {
  steps: WorkflowStep[];
  currentStep: WorkflowStep;
  completedSteps: Set<string>;
  onStepClick: (step: WorkflowStep) => void;
  progress: number;
}

export const Sidebar = ({
  steps,
  currentStep,
  completedSteps,
  onStepClick,
  progress,
}: SidebarProps) => {
  return (
    <aside className="w-72 bg-sidebar border-r border-sidebar-border flex flex-col shrink-0">
      {/* Header */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3 mb-6">
          <Logo className="w-8 h-8" />
          <span className="font-semibold">saveDEV</span>
        </div>
        
        {/* Progress bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-mono text-primary">{Math.round(progress)}%</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-primary rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </div>

      {/* Steps list */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-1">
          {steps.map((step, index) => {
            const isActive = step.id === currentStep.id;
            const isCompleted = completedSteps.has(step.id);

            return (
              <li key={step.id}>
                <button
                  onClick={() => onStepClick(step)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all",
                    isActive
                      ? "bg-primary/10 text-primary border border-primary/20"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  )}
                >
                  {/* Step indicator */}
                  <div
                    className={cn(
                      "w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono shrink-0 transition-colors",
                      isCompleted
                        ? "bg-step-complete text-primary-foreground"
                        : isActive
                        ? "bg-primary/20 text-primary border border-primary/30"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    {isCompleted ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      index + 1
                    )}
                  </div>

                  {/* Step title */}
                  <span className="text-sm font-medium truncate">{step.shortTitle}</span>
                </button>

                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="ml-[22px] h-2 w-px bg-border" />
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border">
        <p className="text-xs text-muted-foreground text-center">
          Complete each step to unlock the next
        </p>
      </div>
    </aside>
  );
};
