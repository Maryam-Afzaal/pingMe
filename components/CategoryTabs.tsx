"use client";

import { Briefcase, Zap, Trophy, Code2, FileText, Target, Globe } from "lucide-react";
import { Category } from "@/types";

const categories: Array<{
  id: Category | "all";
  label: string;
  icon: React.ElementType;
  color: string;
  bg: string;
  activeBg: string;
  activeText: string;
}> = [
  {
    id: "all",
    label: "All",
    icon: Globe,
    color: "text-slate-500",
    bg: "bg-slate-50",
    activeBg: "bg-slate-900",
    activeText: "text-white",
  },
  {
    id: "internships",
    label: "Internships",
    icon: Briefcase,
    color: "text-blue-600",
    bg: "bg-blue-50",
    activeBg: "bg-blue-600",
    activeText: "text-white",
  },
  {
    id: "jobs",
    label: "Jobs",
    icon: Zap,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    activeBg: "bg-emerald-600",
    activeText: "text-white",
  },
  {
    id: "hackathons",
    label: "Hackathons",
    icon: Code2,
    color: "text-purple-600",
    bg: "bg-purple-50",
    activeBg: "bg-purple-600",
    activeText: "text-white",
  },
  {
    id: "competitions",
    label: "Competitions",
    icon: Trophy,
    color: "text-amber-600",
    bg: "bg-amber-50",
    activeBg: "bg-amber-600",
    activeText: "text-white",
  },
  {
    id: "mock-tests",
    label: "Mock Tests",
    icon: FileText,
    color: "text-pink-600",
    bg: "bg-pink-50",
    activeBg: "bg-pink-600",
    activeText: "text-white",
  },
  {
    id: "interview-prep",
    label: "Interview Prep",
    icon: Target,
    color: "text-orange-600",
    bg: "bg-orange-50",
    activeBg: "bg-orange-600",
    activeText: "text-white",
  },
];

interface CategoryTabsProps {
  active: Category | "all";
  onChange: (cat: Category | "all") => void;
  counts: Record<string, number>;
}

export default function CategoryTabs({ active, onChange, counts }: CategoryTabsProps) {
  return (
    <div className="sticky top-16 z-40 bg-white/90 backdrop-blur-xl border-b border-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-1 overflow-x-auto py-3 scrollbar-hide no-scrollbar">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = active === cat.id;
            const count = counts[cat.id] ?? 0;

            return (
              <button
                key={cat.id}
                onClick={() => onChange(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all flex-shrink-0 ${
                  isActive
                    ? `${cat.activeBg} ${cat.activeText} shadow-md`
                    : `${cat.bg} ${cat.color} hover:opacity-80`
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {cat.label}
                {count > 0 && (
                  <span
                    className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold leading-none ${
                      isActive
                        ? "bg-white/25 text-white"
                        : "bg-white text-slate-600 border border-slate-200"
                    }`}
                  >
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
