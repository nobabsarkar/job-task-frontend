/** biome-ignore-all lint/a11y/noSvgWithoutTitle: <explanation> */
"use client";

import Logo from "@/assets/svg/logo";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";

const footerNavs = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Submissions", href: "/submissions" },
  { label: "Mentor Review", href: "/review" },
  { label: "Documentation", href: "/docs" },
];

const FooterSection = () => {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="border-t border-border/80 bg-background text-foreground transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-10">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          {/* Brand Info */}
          <div className="flex flex-col items-center gap-3 md:items-start">
            <Link
              href="/"
              className="group flex shrink-0 items-center gap-3"
              aria-label="ProjectHub home"
            >
              <Logo />

              <div className="flex flex-col">
                <span className="text-lg font-bold tracking-tight text-foreground">
                  Project<span className="text-primary">Hub</span>
                </span>

                <span className="hidden text-[11px] text-muted-foreground sm:block">
                  Submit. Review. Grow.
                </span>
              </div>
            </Link>
            <p className="text-center text-xs sm:text-sm text-muted-foreground md:text-left">
              Streamlining student project submissions & mentor reviews.
            </p>
          </div>

          {/* Navigation Links */}
          <ul className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm font-medium text-muted-foreground">
            {footerNavs.map((nav) => (
              <li key={nav.label}>
                <Link
                  href={nav.href}
                  className="transition-colors hover:text-foreground"
                >
                  {nav.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Social Icons */}
          <div className="flex items-center gap-2.5">
            {/* GitHub Icon */}
            <Link
              href="https://github.com/nobabsarkar"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="flex size-9 items-center justify-center rounded-xl border border-border/80 bg-card text-muted-foreground shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/50 hover:bg-primary/10 hover:text-primary"
            >
              <FaGithub />
            </Link>

            {/* LinkedIn Icon */}
            <Link
              href="www.linkedin.com/in/nobabsarkar"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="flex size-9 items-center justify-center rounded-xl border border-border/80 bg-card text-muted-foreground shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/50 hover:bg-primary/10 hover:text-primary"
            >
              <FaLinkedin />
            </Link>

            {/* Portfolio (Globe) Icon */}
            <Link
              href="https://my-portfolio-five-zeta-19.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Portfolio"
              className="flex size-9 items-center justify-center rounded-xl border border-border/80 bg-card text-muted-foreground shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/50 hover:bg-primary/10 hover:text-primary"
            >
              <svg
                className="size-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                <path d="M2 12h20" />
              </svg>
            </Link>

            {/* Facebook Icon */}
            <Link
              href="https://www.facebook.com/md.nobabsirkar"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="flex size-9 items-center justify-center rounded-xl border border-border/80 bg-card text-muted-foreground shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/50 hover:bg-primary/10 hover:text-primary"
            >
              <FaFacebook />
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border/60 pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>© {year} ProjectReview.io. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="transition-colors hover:underline">
              Privacy Policy
            </Link>
            <Link href="/terms" className="transition-colors hover:underline">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
