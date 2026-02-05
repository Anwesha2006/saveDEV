import { useState } from "react";
import { motion } from "framer-motion";
import { Folder, ExternalLink, Type, Code, Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "structure", label: "Folder Structure", icon: Folder },
  { id: "inspiration", label: "UI Inspiration", icon: ExternalLink },
  { id: "fonts", label: "Font Suggestions", icon: Type },
  { id: "code", label: "Code Preview", icon: Code },
];

const folderStructure = `src/
├── components/
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   └── Modal.tsx
│   ├── layout/
│   │   ├── Sidebar.tsx
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   └── features/
│       ├── Dashboard/
│       ├── Projects/
│       └── Settings/
├── hooks/
│   ├── useAuth.ts
│   └── useProjects.ts
├── lib/
│   ├── api.ts
│   └── utils.ts
├── pages/
│   ├── index.tsx
│   ├── dashboard.tsx
│   └── project/[id].tsx
└── styles/
    └── globals.css`;

const uiInspirations = [
  { name: "Linear", url: "linear.app", description: "Clean sidebar, keyboard-first UX" },
  { name: "Vercel Dashboard", url: "vercel.com/dashboard", description: "Minimal, high contrast dark theme" },
  { name: "Notion", url: "notion.so", description: "Block-based content, flexible layouts" },
  { name: "Raycast", url: "raycast.com", description: "Command palette, quick actions" },
  { name: "Stripe Docs", url: "stripe.com/docs", description: "Technical documentation patterns" },
];

const fontSuggestions = [
  { name: "Inter", type: "UI/Body", description: "Clean, highly readable, variable font" },
  { name: "JetBrains Mono", type: "Code", description: "Developer-friendly, ligatures support" },
  { name: "Geist", type: "UI/Display", description: "Modern, Vercel's design system font" },
  { name: "Cal Sans", type: "Display", description: "Bold, statement headings" },
];

const codePreview = `export const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const { user } = useAuth();
  
  return (
    <Layout>
      <Sidebar />
      <Main>
        <Header title="Projects" />
        <ProjectGrid projects={projects} />
      </Main>
    </Layout>
  );
};`;

export const PrototypeSection = () => {
  const [activeTab, setActiveTab] = useState("structure");
  const [showCode, setShowCode] = useState(false);

  return (
    <div className="space-y-4">
      {/* Tabs */}
      <div className="flex items-center gap-2 p-1 bg-secondary/50 rounded-lg w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all",
              activeTab === tab.id
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="card-elevated p-6"
      >
        {activeTab === "structure" && (
          <div>
            <h4 className="font-semibold mb-4 flex items-center gap-2">
              <Folder className="w-5 h-5 text-primary" />
              Recommended Folder Structure
            </h4>
            <pre className="font-mono text-sm text-muted-foreground bg-secondary/30 p-4 rounded-lg overflow-x-auto">
              {folderStructure}
            </pre>
          </div>
        )}

        {activeTab === "inspiration" && (
          <div>
            <h4 className="font-semibold mb-4 flex items-center gap-2">
              <ExternalLink className="w-5 h-5 text-primary" />
              UI Inspiration Sources
            </h4>
            <div className="grid gap-3">
              {uiInspirations.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
                >
                  <div>
                    <h5 className="font-medium text-sm">{item.name}</h5>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                  </div>
                  <a
                    href={`https://${item.url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-ghost text-xs py-1.5 px-3"
                  >
                    Visit
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "fonts" && (
          <div>
            <h4 className="font-semibold mb-4 flex items-center gap-2">
              <Type className="w-5 h-5 text-primary" />
              Font Recommendations
            </h4>
            <div className="grid md:grid-cols-2 gap-3">
              {fontSuggestions.map((font) => (
                <div key={font.name} className="p-4 rounded-lg bg-secondary/30">
                  <div className="flex items-center gap-2 mb-2">
                    <h5 className="font-medium text-sm">{font.name}</h5>
                    <span className="text-xs px-2 py-0.5 rounded bg-primary/10 text-primary">
                      {font.type}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">{font.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "code" && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold flex items-center gap-2">
                <Code className="w-5 h-5 text-primary" />
                Code Preview
              </h4>
              <button
                onClick={() => setShowCode(!showCode)}
                className="btn-ghost text-xs py-1.5"
              >
                {showCode ? (
                  <>
                    <EyeOff className="w-4 h-4" />
                    Hide Code
                  </>
                ) : (
                  <>
                    <Eye className="w-4 h-4" />
                    Reveal Code
                  </>
                )}
              </button>
            </div>
            <div className="relative">
              <pre
                className={cn(
                  "font-mono text-sm bg-secondary/30 p-4 rounded-lg overflow-x-auto transition-all duration-300",
                  !showCode && "blur-sm select-none"
                )}
              >
                <code className="text-muted-foreground">{codePreview}</code>
              </pre>
              {!showCode && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-sm text-muted-foreground bg-card/90 px-4 py-2 rounded-lg">
                    Code is partially hidden to encourage original implementation
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};
