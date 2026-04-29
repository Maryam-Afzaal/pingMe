"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Bell,
  Menu,
  X,
  Zap,
  BookOpen,
  Briefcase,
  Trophy,
  Code2,
  FileText,
  Target,
  ChevronDown,
} from "lucide-react";

const navLinks = [
  {
    label: "Internships",
    href: "/?category=internships",
    icon: Briefcase,
    color: "text-blue-600",
  },
  {
    label: "Jobs",
    href: "/?category=jobs",
    icon: Zap,
    color: "text-green-600",
  },
  {
    label: "Hackathons",
    href: "/?category=hackathons",
    icon: Code2,
    color: "text-purple-600",
  },
  {
    label: "Competitions",
    href: "/?category=competitions",
    icon: Trophy,
    color: "text-amber-600",
  },
  {
    label: "Mock Tests",
    href: "/?category=mock-tests",
    icon: FileText,
    color: "text-pink-600",
  },
  {
    label: "Interview Prep",
    href: "/?category=interview-prep",
    icon: Target,
    color: "text-orange-600",
  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notifCount] = useState(3);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/90 backdrop-blur-xl shadow-sm border-b border-slate-100"
            : "bg-white/70 backdrop-blur-md"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="relative w-8 h-8 bg-gradient-to-br from-sky-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                <Zap className="w-4 h-4 text-white" fill="white" />
              </div>
              <span className="text-xl font-bold text-slate-900 tracking-tight">
                Ping<span className="gradient-text">Me</span>
              </span>
            </Link>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-all group"
                  >
                    <Icon
                      className={`w-3.5 h-3.5 ${link.color} group-hover:scale-110 transition-transform`}
                    />
                    {link.label}
                  </Link>
                );
              })}
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-2">
              <button className="relative p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-all">
                <Bell className="w-5 h-5" />
                {notifCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                    {notifCount}
                  </span>
                )}
              </button>

              <Link
                href="#post"
                className="hidden sm:flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-sky-500 to-indigo-600 text-white text-sm font-semibold rounded-xl hover:opacity-90 transition-all shadow-md hover:shadow-sky-200 hover:-translate-y-0.5"
              >
                Post Opportunity
              </Link>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-50 transition-all"
              >
                {mobileOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-white border-t border-slate-100 px-4 py-3 space-y-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 transition-all"
                >
                  <Icon className={`w-4 h-4 ${link.color}`} />
                  {link.label}
                </Link>
              );
            })}
            <div className="pt-2 border-t border-slate-100">
              <Link
                href="#post"
                className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-gradient-to-r from-sky-500 to-indigo-600 text-white text-sm font-semibold rounded-xl"
              >
                Post Opportunity
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Spacer */}
      <div className="h-16" />
    </>
  );
}
