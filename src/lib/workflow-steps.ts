import {
  MessageSquare,
  Users,
  CheckCircle,
  Presentation,
  Palette,
  Layout,
  Server,
  Database,
  Rocket,
  RefreshCw,
} from "lucide-react";

export interface WorkflowStep {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  icon: typeof MessageSquare;
  inputPlaceholder: string;
  inputType: "textarea" | "input" | "url";
}

export const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    id: "problem-statement",
    title: "Problem Statement",
    shortTitle: "Problem",
    description: "Describe the problem you're trying to solve. What pain point are you addressing? Who experiences this problem?",
    icon: MessageSquare,
    inputPlaceholder: "E.g., Full-stack developers feel scattered when building projects. Ideas are spread across PDFs, WhatsApp, ChatGPT, and Figma...",
    inputType: "textarea",
  },
  {
    id: "users-scalability",
    title: "Users & Scalability",
    shortTitle: "Users",
    description: "Define your target users and analyze the scalability potential of your solution.",
    icon: Users,
    inputPlaceholder: "Who are your primary users? What's the market size?",
    inputType: "textarea",
  },
  {
    id: "feasibility",
    title: "Feasibility Check",
    shortTitle: "Feasibility",
    description: "Will people actually use this? Let's validate the market need and competitive landscape.",
    icon: CheckCircle,
    inputPlaceholder: "List existing alternatives or competitors...",
    inputType: "textarea",
  },
  {
    id: "ppt-content",
    title: "PPT Content",
    shortTitle: "PPT",
    description: "Generate slide content for your pitch deck with clear structure and key points.",
    icon: Presentation,
    inputPlaceholder: "Any specific points you want to emphasize in your presentation?",
    inputType: "textarea",
  },
  {
    id: "ppt-design",
    title: "PPT Design Inspiration",
    shortTitle: "Design",
    description: "Get design inspiration, color schemes, and layout suggestions for your slides.",
    icon: Palette,
    inputPlaceholder: "What style are you going for? (minimal, bold, corporate, startup...)",
    inputType: "input",
  },
  {
    id: "frontend-prototype",
    title: "Frontend Prototype",
    shortTitle: "Frontend",
    description: "Get folder structure, UI inspiration links, font suggestions, and component hierarchy.",
    icon: Layout,
    inputPlaceholder: "What type of app are you building? (dashboard, landing page, mobile app...)",
    inputType: "input",
  },
  {
    id: "backend-structure",
    title: "Backend Structure",
    shortTitle: "Backend",
    description: "Get API structure, folder organization, and recommended backend services.",
    icon: Server,
    inputPlaceholder: "What functionality does your backend need? (auth, payments, real-time...)",
    inputType: "textarea",
  },
  {
    id: "api-database",
    title: "API & Database",
    shortTitle: "Database",
    description: "Database schema design, API endpoints, and data relationship recommendations.",
    icon: Database,
    inputPlaceholder: "What data will you be storing? What are the main entities?",
    inputType: "textarea",
  },
  {
    id: "deployment",
    title: "Deployment",
    shortTitle: "Deploy",
    description: "Get deployment recommendations, hosting options, and CI/CD setup guidance.",
    icon: Rocket,
    inputPlaceholder: "Any preferences for hosting? (Vercel, Railway, AWS, self-hosted...)",
    inputType: "input",
  },
  {
    id: "review-improvements",
    title: "Review & Improvements",
    shortTitle: "Review",
    description: "Paste your deployed link for AI-powered feedback on UX, performance, and tech improvements.",
    icon: RefreshCw,
    inputPlaceholder: "https://your-deployed-app.vercel.app",
    inputType: "url",
  },
];
