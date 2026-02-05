import { motion } from "framer-motion";
import { Brain, Layers, Zap, GitBranch, Palette, Server, Database, Rocket } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Analysis",
    description: "Get instant validation on your problem statement, target users, and scalability potential.",
  },
  {
    icon: Layers,
    title: "PPT Generation",
    description: "Generate professional slide content with design hints, layout suggestions, and icon recommendations.",
  },
  {
    icon: Palette,
    title: "UI Inspiration",
    description: "Curated design references, font suggestions, and folder structure for your frontend.",
  },
  {
    icon: GitBranch,
    title: "Prototype Structure",
    description: "Get a complete frontend architecture with component hierarchy and file organization.",
  },
  {
    icon: Server,
    title: "Backend Blueprint",
    description: "API structure, folder organization, and recommended services for your use case.",
  },
  {
    icon: Database,
    title: "Database Design",
    description: "Schema suggestions, relationships, and database selection based on your needs.",
  },
  {
    icon: Rocket,
    title: "Deployment Guide",
    description: "Step-by-step deployment instructions for Vercel, Railway, or your preferred platform.",
  },
  {
    icon: Zap,
    title: "Review & Improve",
    description: "Paste your deployed link for AI-powered feedback on UX, performance, and tech improvements.",
  },
];

export const FeaturesSection = () => {
  return (
    <section className="relative py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Everything you need,{" "}
            <span className="gradient-text">in one place</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Stop context-switching between ChatGPT, Figma, Notion, and documentation. 
            Build your entire project in a unified workflow.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="group card-elevated p-6 hover:border-primary/30 transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
