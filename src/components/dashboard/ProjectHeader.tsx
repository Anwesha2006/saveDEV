import { Folder, Settings } from "lucide-react";

interface ProjectHeaderProps {
  projectName: string;
  progress: number;
}

export const ProjectHeader = ({ projectName, progress }: ProjectHeaderProps) => {
  return (
    <header className="h-16 bg-card border-b border-border px-6 flex items-center justify-between shrink-0">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
          <Folder className="w-4 h-4 text-primary" />
        </div>
        <div>
          <h1 className="font-semibold text-sm">{projectName}</h1>
          <p className="text-xs text-muted-foreground">
            {progress === 100 ? "Completed" : `${Math.round(progress)}% complete`}
          </p>
        </div>
      </div>

      <button className="btn-ghost p-2">
        <Settings className="w-5 h-5" />
      </button>
    </header>
  );
};
