/** biome-ignore-all lint/suspicious/noArrayIndexKey: <explanation> */
"use client";

import { motion, useReducedMotion, Variants } from "motion/react";
import {
  Send,
  ShieldCheck,
  ListFilter,
  CheckCircle2,
  ArrowRight,
  Code,
  SlidersHorizontal,
  Database,
} from "lucide-react";

const steps = [
  {
    step: "01",
    title: "Student Submission Project",
    description:
      "Students submit project details (Name, Repo URL, Live Link, Description) with built-in rate-limiting and duplicate prevention to stop spam.",
    icon: Send,
    badge: "Student View",
    highlight: "Zod Validation & Rate Limit",
  },
  {
    step: "02",
    title: "Secure JWT & RBAC Auth",
    description:
      "Role-Based Access Control securely separates permissions. Students manage personal entries while Mentors and Admins access review tools.",
    icon: ShieldCheck,
    badge: "Security",
    highlight: "Role-Based Access",
  },
  {
    step: "03",
    title: "Server-Side Filtering & Pagination",
    description:
      "Mentors review submissions via a paginated data table equipped with robust server-side status filters for 'Approved' and 'Rejected' projects.",
    icon: ListFilter,
    badge: "Mentor View",
    highlight: "Optimized Performance",
  },
  {
    step: "04",
    title: "Approval & Status Management",
    description:
      "Instantly approve or reject submissions with aggregated stats tracking overall pending and approved counts stored via Prisma and PostgreSQL.",
    icon: CheckCircle2,
    badge: "Evaluation",
    highlight: "Real-time Metrics",
  },
];

const HowItWorksSection = () => {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.15,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <section className="relative isolate overflow-hidden bg-background py-20 text-foreground sm:py-28">
      {/* Decorative background grid and ambient lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[400px] w-full bg-primary/[0.03] blur-[140px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808010_1px,transparent_1px),linear-gradient(to_bottom,#80808010_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary shadow-xs">
              <SlidersHorizontal className="size-3.5" />
              Workflow Architecture
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl"
          >
            How the submission & review pipeline works
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-base text-muted-foreground sm:text-lg leading-relaxed"
          >
            Designed with Next.js, Express, TypeScript, and Prisma to deliver a
            seamless separation between student submissions and mentor
            evaluation tools.
          </motion.p>
        </div>

        {/* Steps Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8"
        >
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.step}
                variants={itemVariants}
                className="group relative flex flex-col justify-between rounded-2xl border border-border/80 bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/[0.04]"
              >
                <div>
                  {/* Top card header */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold tracking-widest text-muted-foreground/60">
                      {item.step}
                    </span>
                    <span className="rounded-full border border-border/60 bg-muted/50 px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground">
                      {item.badge}
                    </span>
                  </div>

                  {/* Icon box */}
                  <div className="mt-6 flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
                    <Icon className="size-6" />
                  </div>

                  {/* Content */}
                  <h3 className="mt-6 text-lg font-semibold tracking-tight text-foreground">
                    {item.title}
                  </h3>

                  <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>

                {/* Footer badge highlight */}
                <div className="mt-8 border-t border-border/60 pt-4">
                  <div className="flex items-center justify-between text-xs font-semibold text-primary">
                    <span>{item.highlight}</span>
                    <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom Tech Stack Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-6 rounded-2xl border border-border/80 bg-muted/30 p-6 text-center sm:gap-10 sm:p-8 backdrop-blur-sm"
        >
          <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-muted-foreground">
            <Code className="size-4 text-primary" />
            <span>TypeScript / Next.js / Tailwind</span>
          </div>
          <div className="hidden size-1.5 rounded-full bg-border sm:block" />
          <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-muted-foreground">
            <Database className="size-4 text-primary" />
            <span>Prisma ORM & PostgreSQL</span>
          </div>
          <div className="hidden size-1.5 rounded-full bg-border sm:block" />
          <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-muted-foreground">
            <ShieldCheck className="size-4 text-primary" />
            <span>JWT Role-Based Access Control</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
