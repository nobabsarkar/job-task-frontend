// /** biome-ignore-all lint/suspicious/noArrayIndexKey: <explanation> */
// "use client";

// import Link from "next/link";
// import { motion, useReducedMotion } from "motion/react";
// import {
//   ArrowDownRight,
//   ArrowRight,
//   BookOpen,
//   Check,
//   CheckCircle2,
//   ChevronRight,
//   Code2,
//   GraduationCap,
//   MessageSquareText,
//   Sparkles,
//   Target,
//   Users,
// } from "lucide-react";

// import { Button } from "@/components/ui/button";

// const stats = [
//   { icon: BookOpen, value: "08", label: "Projects" },
//   { icon: Users, value: "03", label: "Mentors" },
//   { icon: CheckCircle2, value: "12", label: "Completed" },
// ];

// const projects = [
//   {
//     icon: Code2,
//     title: "Portfolio Website",
//     subtitle: "Frontend Development",
//     progress: 85,
//   },
//   {
//     icon: Target,
//     title: "Project Review",
//     subtitle: "Mentor feedback",
//     progress: 60,
//   },
// ];

// const HeroSection = () => {
//   const shouldReduceMotion = useReducedMotion();

//   const reveal = {
//     hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 24 },
//     visible: { opacity: 1, y: 0 },
//   };

//   return (
//     <section className="relative isolate overflow-hidden bg-background text-foreground">
//       {/* Subtle background decoration */}
//       <div
//         aria-hidden="true"
//         className="pointer-events-none absolute inset-0 -z-10"
//       >
//         <div className="absolute left-1/2 top-0 h-[420px] w-[680px] -translate-x-1/2 rounded-full bg-primary/[0.055] blur-[120px]" />
//         <div className="absolute right-0 top-1/3 h-64 w-64 rounded-full bg-primary/[0.035] blur-[100px]" />
//         <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
//       </div>

//       <div className="mx-auto grid min-h-[calc(100svh-4rem)] w-full max-w-7xl items-center gap-14 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1.02fr_0.98fr] lg:gap-12 lg:px-10 lg:py-24">
//         {/* Left: Hero content */}
//         <motion.div
//           initial="hidden"
//           animate="visible"
//           variants={{
//             visible: {
//               transition: {
//                 staggerChildren: shouldReduceMotion ? 0 : 0.12,
//               },
//             },
//           }}
//           className="relative z-10 mx-auto w-full max-w-2xl lg:mx-0"
//         >
//           <motion.div variants={reveal} transition={{ duration: 0.55 }}>
//             <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-3.5 py-2 text-sm font-medium shadow-sm backdrop-blur">
//               <span className="flex size-6 items-center justify-center rounded-full bg-primary/10 text-primary">
//                 <Sparkles className="size-3.5" />
//               </span>
//               A better way to learn and grow
//               <ArrowRight className="size-3.5 text-muted-foreground" />
//             </div>
//           </motion.div>

//           <motion.div
//             variants={reveal}
//             transition={{ duration: 0.65, ease: "easeOut" }}
//             className="mt-8 space-y-5"
//           >
//             <h1 className="max-w-2xl text-4xl font-bold leading-[1.12] tracking-[-0.045em] sm:text-5xl md:text-6xl xl:text-[4.4rem]">
//               Turn what you learn into{" "}
//               <span className="relative inline-block text-primary">
//                 real results.
//                 <svg
//                   aria-hidden="true"
//                   viewBox="0 0 250 12"
//                   fill="none"
//                   className="absolute -bottom-2 left-0 w-full text-primary/25"
//                 >
//                   <path
//                     d="M3 8C65 2 167 2 247 7"
//                     stroke="currentColor"
//                     strokeWidth="5"
//                     strokeLinecap="round"
//                   />
//                 </svg>
//               </span>
//             </h1>

//             <p className="max-w-xl text-base leading-8 text-muted-foreground sm:text-lg">
//               Build real-world projects, learn from experienced mentors, and
//               turn your progress into meaningful achievements — all in one
//               learning workspace.
//             </p>
//           </motion.div>

//           <motion.div
//             variants={reveal}
//             transition={{ duration: 0.55 }}
//             className="mt-8 flex flex-col gap-3 sm:flex-row"
//           >
//             <Button
//               size="lg"
//               className="group h-12 rounded-xl px-6 text-base shadow-lg shadow-primary/15 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/20"
//             >
//               <Link href="/register">
//                 Start learning
//                 <ArrowRight className="ml-2 size-4 transition-transform duration-300 group-hover:translate-x-1" />
//               </Link>
//             </Button>

//             <Button
//               variant="outline"
//               size="lg"
//               className="h-12 rounded-xl bg-background/70 px-6 text-base transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40"
//             >
//               <Link href="/login">
//                 Explore workspace
//                 <ChevronRight className="ml-1 size-4" />
//               </Link>
//             </Button>
//           </motion.div>

//           <motion.div
//             variants={reveal}
//             transition={{ duration: 0.55 }}
//             className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground"
//           >
//             <span className="flex items-center gap-2">
//               <CheckCircle2 className="size-4 text-primary" />
//               Hands-on projects
//             </span>
//             <span className="flex items-center gap-2">
//               <CheckCircle2 className="size-4 text-primary" />
//               Personalized feedback
//             </span>
//           </motion.div>

//           <motion.div
//             variants={reveal}
//             transition={{ duration: 0.55 }}
//             className="mt-10 flex items-center gap-4 border-t border-border/70 pt-6"
//           >
//             <div className="flex -space-x-2">
//               {[
//                 "bg-primary/15",
//                 "bg-muted",
//                 "bg-primary/25",
//                 "bg-secondary",
//               ].map((color, index) => (
//                 <div
//                   key={index}
//                   className={`flex size-9 items-center justify-center rounded-full border-2 border-background ${color}`}
//                 >
//                   {index === 0 ? (
//                     <GraduationCap className="size-4 text-primary" />
//                   ) : index === 1 ? (
//                     <BookOpen className="size-4 text-foreground" />
//                   ) : index === 2 ? (
//                     <Code2 className="size-4 text-primary" />
//                   ) : (
//                     <Users className="size-4 text-foreground" />
//                   )}
//                 </div>
//               ))}
//             </div>

//             <div>
//               <p className="text-sm font-semibold">Learn. Build. Improve.</p>
//               <p className="mt-0.5 text-xs text-muted-foreground">
//                 Your growth, one project at a time.
//               </p>
//             </div>
//           </motion.div>
//         </motion.div>

//         {/* Right: Animated learning dashboard */}
//         <motion.div
//           initial={{
//             opacity: 0,
//             y: shouldReduceMotion ? 0 : 28,
//             scale: shouldReduceMotion ? 1 : 0.98,
//           }}
//           animate={{ opacity: 1, y: 0, scale: 1 }}
//           transition={{
//             duration: 0.8,
//             delay: shouldReduceMotion ? 0 : 0.2,
//             ease: "easeOut",
//           }}
//           className="relative mx-auto w-full max-w-[540px] lg:ml-auto"
//         >
//           {/* Decorative outline */}
//           <div
//             aria-hidden="true"
//             className="absolute -inset-3 -z-10 rounded-[2rem] border border-border/60 bg-muted/20 sm:-inset-5"
//           />

//           <div className="overflow-hidden rounded-2xl border border-border/80 bg-card shadow-2xl shadow-foreground/[0.06] sm:rounded-3xl">
//             {/* Dashboard top bar */}
//             <div className="flex items-center justify-between border-b border-border/70 px-4 py-4 sm:px-6">
//               <div className="flex items-center gap-3">
//                 <div className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
//                   <GraduationCap className="size-5" />
//                 </div>

//                 <div>
//                   <p className="text-sm font-semibold tracking-tight">
//                     Learning workspace
//                   </p>
//                   <p className="mt-0.5 text-xs text-muted-foreground">
//                     Your progress at a glance
//                   </p>
//                 </div>
//               </div>

//               <div className="flex items-center gap-2 rounded-full border border-border/70 bg-background px-3 py-1.5">
//                 <span className="relative flex size-2">
//                   <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary/40" />
//                   <span className="relative inline-flex size-2 rounded-full bg-primary" />
//                 </span>
//                 <span className="text-xs font-medium">Active</span>
//               </div>
//             </div>

//             <div className="space-y-5 p-4 sm:p-6">
//               {/* Welcome / progress */}
//               <div className="relative overflow-hidden rounded-2xl bg-muted/60 p-5 sm:p-6">
//                 <div
//                   aria-hidden="true"
//                   className="absolute -right-10 -top-12 size-36 rounded-full border border-primary/10"
//                 />
//                 <div
//                   aria-hidden="true"
//                   className="absolute -right-4 -top-6 size-24 rounded-full border border-primary/10"
//                 />

//                 <div className="relative flex items-start justify-between gap-4">
//                   <div>
//                     <p className="text-sm text-muted-foreground">
//                       Your learning journey
//                     </p>
//                     <h2 className="mt-2 max-w-[280px] text-xl font-semibold leading-snug tracking-tight sm:text-2xl">
//                       Consistency creates progress.
//                     </h2>
//                   </div>

//                   <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-border/70 bg-card text-primary">
//                     <ArrowDownRight className="size-5" />
//                   </div>
//                 </div>

//                 <div className="relative mt-6 flex items-end justify-between">
//                   <div>
//                     <p className="text-3xl font-bold tracking-tight">68%</p>
//                     <p className="mt-1 text-xs text-muted-foreground">
//                       Overall progress
//                     </p>
//                   </div>
//                   <span className="rounded-full border border-primary/15 bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
//                     In progress
//                   </span>
//                 </div>

//                 <div
//                   role="progressbar"
//                   aria-label="Overall learning progress"
//                   aria-valuenow={68}
//                   aria-valuemin={0}
//                   aria-valuemax={100}
//                   className="relative mt-4 h-2 overflow-hidden rounded-full bg-border/80"
//                 >
//                   <motion.div
//                     initial={{ width: shouldReduceMotion ? "68%" : "0%" }}
//                     animate={{ width: "68%" }}
//                     transition={{
//                       duration: 1.2,
//                       delay: shouldReduceMotion ? 0 : 0.5,
//                       ease: "easeOut",
//                     }}
//                     className="h-full rounded-full bg-primary"
//                   />
//                 </div>
//               </div>

//               {/* Summary statistics */}
//               <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
//                 {stats.map((item, index) => {
//                   const Icon = item.icon;

//                   return (
//                     <motion.div
//                       key={item.label}
//                       initial={{
//                         opacity: 0,
//                         y: shouldReduceMotion ? 0 : 14,
//                       }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{
//                         duration: 0.45,
//                         delay: shouldReduceMotion ? 0 : 0.35 + index * 0.1,
//                       }}
//                       className="rounded-xl border border-border/80 bg-background p-3.5 transition-colors duration-200 hover:bg-muted/40 sm:rounded-2xl sm:p-4"
//                     >
//                       <Icon className="size-4 text-primary sm:size-5" />
//                       <p className="mt-3 text-xl font-bold tracking-tight sm:text-2xl">
//                         {item.value}
//                       </p>
//                       <p className="mt-1 text-[11px] text-muted-foreground sm:text-xs">
//                         {item.label}
//                       </p>
//                     </motion.div>
//                   );
//                 })}
//               </div>

//               {/* Projects list */}
//               <div className="rounded-2xl border border-border/80 p-4 sm:p-5">
//                 <div className="mb-4 flex items-center justify-between gap-3">
//                   <div>
//                     <h3 className="text-sm font-semibold">Continue learning</h3>
//                     <p className="mt-1 text-xs text-muted-foreground">
//                       Pick up where you left off
//                     </p>
//                   </div>

//                   <span className="rounded-lg bg-muted p-2">
//                     <BookOpen className="size-4 text-muted-foreground" />
//                   </span>
//                 </div>

//                 <div className="space-y-4">
//                   {projects.map((project, index) => {
//                     const Icon = project.icon;

//                     return (
//                       <motion.div
//                         key={project.title}
//                         initial={{
//                           opacity: 0,
//                           x: shouldReduceMotion ? 0 : 12,
//                         }}
//                         animate={{ opacity: 1, x: 0 }}
//                         transition={{
//                           duration: 0.45,
//                           delay: shouldReduceMotion ? 0 : 0.6 + index * 0.12,
//                         }}
//                         className="flex items-center gap-3"
//                       >
//                         <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
//                           <Icon className="size-5" />
//                         </div>

//                         <div className="min-w-0 flex-1">
//                           <p className="truncate text-sm font-medium">
//                             {project.title}
//                           </p>
//                           <p className="mt-1 truncate text-xs text-muted-foreground">
//                             {project.subtitle}
//                           </p>
//                           <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
//                             <motion.div
//                               initial={{
//                                 width: shouldReduceMotion
//                                   ? `${project.progress}%`
//                                   : "0%",
//                               }}
//                               animate={{ width: `${project.progress}%` }}
//                               transition={{
//                                 duration: 0.9,
//                                 delay: shouldReduceMotion
//                                   ? 0
//                                   : 0.8 + index * 0.12,
//                               }}
//                               className="h-full rounded-full bg-primary/80"
//                             />
//                           </div>
//                         </div>

//                         <span className="shrink-0 text-xs font-semibold tabular-nums text-muted-foreground">
//                           {project.progress}%
//                         </span>
//                       </motion.div>
//                     );
//                   })}
//                 </div>
//               </div>

//               {/* Feedback notification */}
//               <div className="flex items-center gap-3 rounded-xl border border-border/70 bg-background p-3.5 sm:p-4">
//                 <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
//                   <MessageSquareText className="size-5" />
//                 </div>

//                 <div className="min-w-0 flex-1">
//                   <p className="text-sm font-semibold">New mentor feedback</p>
//                   <p className="mt-1 text-xs leading-5 text-muted-foreground">
//                     Your latest submission has feedback to review.
//                   </p>
//                 </div>

//                 <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
//                   <Check className="size-4" />
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Floating card */}
//           <motion.div
//             animate={shouldReduceMotion ? { y: 0 } : { y: [0, -5, 0] }}
//             transition={{
//               duration: 4,
//               repeat: shouldReduceMotion ? 0 : Infinity,
//               ease: "easeInOut",
//             }}
//             className="absolute -bottom-5 -left-2 hidden items-center gap-3 rounded-2xl border border-border/80 bg-card p-3.5 shadow-xl sm:flex lg:-left-7"
//           >
//             <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
//               <CheckCircle2 className="size-5" />
//             </div>
//             <div>
//               <p className="text-sm font-semibold">You&apos;re improving!</p>
//               <p className="mt-1 text-xs text-muted-foreground">
//                 Every project counts.
//               </p>
//             </div>
//           </motion.div>
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;

/** biome-ignore-all lint/suspicious/noArrayIndexKey: <explanation> */
"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Code2,
  FileCheck2,
  GraduationCap,
  Inbox,
  ShieldCheck,
  Sparkles,
  UserCheck,
  XCircle,
  Clock,
} from "lucide-react";

import { Button } from "@/components/ui/button";

// Mock data aligned with the hiring task requirements
const stats = [
  { icon: Inbox, value: "128", label: "Submissions" },
  { icon: Clock, value: "14", label: "Pending" },
  { icon: CheckCircle2, value: "98", label: "Approved" },
];

const submissions = [
  {
    icon: Code2,
    title: "Citizen Complaints API",
    student: "Sarah Chen",
    role: "Student Portal",
    status: "Approved",
    statusColor: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
  },
  {
    icon: FileCheck2,
    title: "Next.js Admin Dashboard",
    student: "Alex Rivera",
    role: "Mentor Review",
    status: "Pending",
    statusColor: "text-amber-500 bg-amber-500/10 border-amber-500/20",
  },
];

const HeroSection = () => {
  const shouldReduceMotion = useReducedMotion();

  const reveal = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="relative isolate overflow-hidden bg-background text-foreground transition-colors duration-300">
      {/* Background Lighting & Grid Texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-primary/10 blur-[130px] dark:bg-primary/20" />
        <div className="absolute -right-20 top-1/3 h-72 w-72 rounded-full bg-primary/5 blur-[100px] dark:bg-primary/10" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      <div className="mx-auto grid min-h-[calc(100vh-4rem)] w-full max-w-7xl items-center gap-12 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:px-10 lg:py-20">
        {/* Left Column: Copy & CTAs */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: shouldReduceMotion ? 0 : 0.1,
              },
            },
          }}
          className="relative z-10 mx-auto w-full max-w-2xl lg:mx-0"
        >
          {/* Tagline Badge */}
          <motion.div variants={reveal} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-3.5 py-1.5 text-xs sm:text-sm font-medium shadow-sm backdrop-blur transition-colors">
              <span className="flex size-5 items-center justify-center rounded-full bg-primary/15 text-primary">
                <Sparkles className="size-3" />
              </span>
              <span>Project Review & Evaluation System</span>
              <ChevronRight className="size-3.5 text-muted-foreground" />
            </div>
          </motion.div>

          {/* Headline */}
          <motion.div
            variants={reveal}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mt-6 space-y-4"
          >
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl leading-[1.15]">
              Streamline project submissions with{" "}
              <span className="relative inline-block text-primary">
                real-time review.
                <svg
                  aria-hidden="true"
                  viewBox="0 0 250 12"
                  fill="none"
                  className="absolute -bottom-2 left-0 w-full text-primary/30"
                >
                  <path
                    d="M3 8C65 2 167 2 247 7"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>

            <p className="max-w-xl text-base sm:text-lg leading-relaxed text-muted-foreground">
              A unified platform for students to submit projects with rate-limit
              protection and for mentors to filter, evaluate, and provide
              structured feedback efficiently.
            </p>
          </motion.div>

          {/* CTAs */}
          <motion.div
            variants={reveal}
            transition={{ duration: 0.5 }}
            className="mt-8 flex flex-col gap-3.5 sm:flex-row"
          >
            <Button
              size="lg"
              className="group h-12 rounded-xl px-6 text-base font-medium shadow-md shadow-primary/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/25"
            >
              <Link href="/register">
                Submit Project
                <ArrowRight className="ml-2 size-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="h-12 rounded-xl border-border bg-card/60 px-6 text-base font-medium backdrop-blur transition-all duration-200 hover:-translate-y-0.5 hover:bg-accent hover:text-accent-foreground"
            >
              <Link href="/login">
                Mentor Dashboard
                <ChevronRight className="ml-1 size-4 text-muted-foreground" />
              </Link>
            </Button>
          </motion.div>

          {/* Key Task Highlights */}
          <motion.div
            variants={reveal}
            transition={{ duration: 0.5 }}
            className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2.5 text-xs sm:text-sm font-medium text-muted-foreground"
          >
            <span className="flex items-center gap-2">
              <ShieldCheck className="size-4 text-primary" />
              RBAC & JWT Auth
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="size-4 text-primary" />
              Server-Side Filtering
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="size-4 text-primary" />
              Rate-Limited Portal
            </span>
          </motion.div>

          {/* Role Access Footer Note */}
          <motion.div
            variants={reveal}
            transition={{ duration: 0.5 }}
            className="mt-10 flex items-center gap-4 border-t border-border/80 pt-6"
          >
            <div className="flex -space-x-2">
              <div className="flex size-9 items-center justify-center rounded-full border-2 border-background bg-primary/10 text-primary font-semibold text-xs">
                <GraduationCap className="size-4" />
              </div>
              <div className="flex size-9 items-center justify-center rounded-full border-2 border-background bg-muted text-foreground font-semibold text-xs">
                <UserCheck className="size-4" />
              </div>
            </div>

            <div>
              <p className="text-xs sm:text-sm font-semibold">
                Dual View Workflow
              </p>
              <p className="text-xs text-muted-foreground">
                Tailored interfaces for Student Submissions & Mentor Management
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Column: Interactive Dashboard Preview */}
        <motion.div
          initial={{
            opacity: 0,
            y: shouldReduceMotion ? 0 : 20,
            scale: shouldReduceMotion ? 1 : 0.98,
          }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 0.7,
            delay: shouldReduceMotion ? 0 : 0.15,
            ease: "easeOut",
          }}
          className="relative mx-auto w-full max-w-[520px] lg:ml-auto"
        >
          {/* Decorative Backdrop Frame */}
          <div
            aria-hidden="true"
            className="absolute -inset-3 -z-10 rounded-[2.2rem] border border-border/50 bg-muted/30 backdrop-blur-sm sm:-inset-4"
          />

          <div className="overflow-hidden rounded-2xl border border-border/80 bg-card shadow-xl dark:shadow-2xl dark:shadow-primary/5">
            {/* Mock Header */}
            <div className="flex items-center justify-between border-b border-border/70 bg-muted/40 px-4 py-3.5 sm:px-5">
              <div className="flex items-center gap-3">
                <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
                  <Inbox className="size-4" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-semibold tracking-tight">
                    Mentor Portal
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    Project Review Feed
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 rounded-full border border-border/80 bg-background px-2.5 py-1 shadow-xs">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
                </span>
                <span className="text-[11px] font-medium text-muted-foreground">
                  Live Sync
                </span>
              </div>
            </div>

            <div className="space-y-4 p-4 sm:p-5">
              {/* Aggregated Stats Cards */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                {stats.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.label}
                      initial={{
                        opacity: 0,
                        y: shouldReduceMotion ? 0 : 10,
                      }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.4,
                        delay: shouldReduceMotion ? 0 : 0.3 + index * 0.08,
                      }}
                      className="rounded-xl border border-border/70 bg-background/80 p-3 text-center sm:p-3.5"
                    >
                      <Icon className="mx-auto size-4 text-primary" />
                      <p className="mt-2 text-lg font-bold tracking-tight sm:text-xl">
                        {item.value}
                      </p>
                      <p className="text-[10px] sm:text-xs text-muted-foreground font-medium">
                        {item.label}
                      </p>
                    </motion.div>
                  );
                })}
              </div>

              {/* Submissions List */}
              <div className="rounded-xl border border-border/70 bg-background/50 p-3.5 sm:p-4">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-xs sm:text-sm font-semibold">
                    Recent Submissions
                  </h3>
                  <span className="text-[11px] font-medium text-primary hover:underline cursor-pointer">
                    View All
                  </span>
                </div>

                <div className="space-y-3">
                  {submissions.map((sub, index) => {
                    const Icon = sub.icon;
                    return (
                      <motion.div
                        key={sub.title}
                        initial={{
                          opacity: 0,
                          x: shouldReduceMotion ? 0 : 10,
                        }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.4,
                          delay: shouldReduceMotion ? 0 : 0.5 + index * 0.1,
                        }}
                        className="flex items-center justify-between rounded-lg border border-border/60 bg-card p-2.5 sm:p-3 transition-colors"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                            <Icon className="size-4" />
                          </div>
                          <div className="min-w-0">
                            <p className="truncate text-xs sm:text-sm font-medium">
                              {sub.title}
                            </p>
                            <p className="text-[11px] text-muted-foreground">
                              {sub.student}
                            </p>
                          </div>
                        </div>

                        <span
                          className={`shrink-0 rounded-full border px-2.5 py-0.5 text-[10px] font-semibold ${sub.statusColor}`}
                        >
                          {sub.status}
                        </span>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Quick Actions Panel */}
              <div className="flex items-center justify-between rounded-xl border border-border/70 bg-muted/30 p-3 text-xs">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="size-4 text-amber-500" />
                  <span>
                    Pending Approval Queue: <strong>14 items</strong>
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Button className="flex size-7 items-center justify-center rounded-md border border-border bg-card text-emerald-500 shadow-xs hover:bg-emerald-500/10 transition-colors">
                    <CheckCircle2 className="size-3.5" />
                  </Button>
                  <Button className="flex size-7 items-center justify-center rounded-md border border-border bg-card text-destructive shadow-xs hover:bg-destructive/10 transition-colors">
                    <XCircle className="size-3.5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Assessment Badge */}
          <motion.div
            animate={shouldReduceMotion ? { y: 0 } : { y: [0, -6, 0] }}
            transition={{
              duration: 4,
              repeat: shouldReduceMotion ? 0 : Infinity,
              ease: "easeInOut",
            }}
            className="absolute -bottom-4 -left-3 hidden items-center gap-3 rounded-xl border border-border/80 bg-card p-3 shadow-lg backdrop-blur-md sm:flex lg:-left-6"
          >
            <div className="flex size-9 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500">
              <CheckCircle2 className="size-5" />
            </div>
            <div>
              <p className="text-xs font-semibold">Evaluation Complete</p>
              <p className="text-[11px] text-muted-foreground">
                Automated feedback logged
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
