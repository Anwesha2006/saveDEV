import { motion } from "framer-motion";
import { Code2, Blocks, Sparkles, GraduationCap } from "lucide-react";

const users = [
  {
    icon: Code2,
    title: "Full-Stack Developers",
    description: "Streamline your development process from ideation to deployment.",
  },
  {
    icon: Blocks,
    title: "Web3 Builders",
    description: "Build decentralized apps with structured guidance and best practices.",
  },
  {
    icon: Sparkles,
    title: "AI & Hackathon Builders",
    description: "Ship MVPs faster with AI-assisted planning and prototyping.",
  },
  {
    icon: GraduationCap,
    title: "Students & Learners",
    description: "Learn by building with step-by-step guidance and real project structure.",
  },
];

export const TargetUsersSection = () => {
  return (
    <section className="relative py-24 px-6 bg-secondary/30">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Built for <span className="gradient-text">builders</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Whether you're shipping a side project or building the next big thing, 
            we've got you covered.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {users.map((user, index) => (
            <motion.div
              key={user.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex items-start gap-4 p-6 rounded-xl bg-card border border-border hover:border-primary/30 transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center shrink-0">
                <user.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">{user.title}</h3>
                <p className="text-sm text-muted-foreground">{user.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
