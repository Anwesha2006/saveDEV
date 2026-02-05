import { useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { StepWorkspace } from "@/components/dashboard/StepWorkspace";
import { ProjectHeader } from "@/components/dashboard/ProjectHeader";
import { WORKFLOW_STEPS, type WorkflowStep } from "@/lib/workflow-steps";

const Dashboard = () => {
  const [currentStep, setCurrentStep] = useState<WorkflowStep>(WORKFLOW_STEPS[0]);
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());

  const handleStepComplete = (stepId: string) => {
    setCompletedSteps(prev => {
      const next = new Set(prev);
      if (next.has(stepId)) {
        next.delete(stepId);
      } else {
        next.add(stepId);
      }
      return next;
    });
  };

  const handleStepClick = (step: WorkflowStep) => {
    setCurrentStep(step);
  };

  const progress = (completedSteps.size / WORKFLOW_STEPS.length) * 100;

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar
        steps={WORKFLOW_STEPS}
        currentStep={currentStep}
        completedSteps={completedSteps}
        onStepClick={handleStepClick}
        progress={progress}
      />
      
      <main className="flex-1 flex flex-col min-h-screen">
        <ProjectHeader projectName="My New Project" progress={progress} />
        
        <div className="flex-1 p-6 lg:p-8 overflow-auto">
          <StepWorkspace
            step={currentStep}
            isCompleted={completedSteps.has(currentStep.id)}
            onComplete={() => handleStepComplete(currentStep.id)}
          />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
