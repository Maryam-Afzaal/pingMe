"use client";

import { useState, useEffect } from "react";
import { Search, MapPin, TrendingUp, Users, Zap } from "lucide-react";

const rotatingWords = [
  "Internships",
  "Hackathons",
  "Dream Jobs",
  "Competitions",
  "Mock Tests",
];

const stats = [
  { label: "Opportunities", value: "2,400+", icon: TrendingUp, color: "text-sky-600" },
  { label: "Active Students", value: "18,000+", icon: Users, color: "text-indigo-600" },
  { label: "Cities Covered", value: "4+", icon: MapPin, color: "text-emerald-600" },
];

interface HeroProps {
  onSearch: (query: string) => void;
}

export default function Hero({ onSearch }: HeroProps) {
  const [wordIdx, setWordIdx] = useState(0);
  const [query, setQuery] = useState("");
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setWordIdx((i) => (i + 1) % rotatingWords.length);
        setVisible(true);
      }, 300);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <section className="relative overflow-hidden hero-mesh dot-pattern">
      {/* Decorative blobs */}
      <div className="absolute top-10 left-1/4 w-64 h-64 bg-sky-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-indigo-200/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-10 w-40 h-40 bg-emerald-200/20 rounded-full blur-2xl pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 pt-14 pb-16 text-center">
        {/* Top badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-sky-50 border border-sky-200 rounded-full text-sm font-medium text-sky-700 mb-6 animate-fade-in">
          <Zap className="w-3.5 h-3.5 text-sky-500" fill="currentColor" />
          Pakistan&apos;s #1 Student Opportunity Platform
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 leading-tight mb-4">
          Find Your Next
          <br />
          <span
            className="gradient-text inline-block transition-all duration-300"
            style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(8px)" }}
          >
            {rotatingWords[wordIdx]}
          </span>
        </h1>

        <p className="text-lg text-slate-500 max-w-xl mx-auto mb-10 leading-relaxed">
          Discover curated internships, jobs, hackathons, competitions, and prep
          resources — across{" "}
          <span className="font-semibold text-slate-700">
            Lahore, Islamabad, Karachi, Sahiwal
          </span>{" "}
          and beyond.
        </p>

        {/* Search bar */}
        <form onSubmit={handleSubmit} className="relative max-w-2xl mx-auto mb-8">
          <div className="flex items-center bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-200 overflow-hidden focus-within:border-sky-400 focus-within:shadow-sky-100/80 transition-all">
            <Search className="ml-5 w-5 h-5 text-slate-400 flex-shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search internships, companies, skills..."
              className="flex-1 px-4 py-4 text-base text-slate-800 bg-transparent outline-none placeholder:text-slate-400"
            />
            <button
              type="submit"
              className="m-2 px-6 py-3 bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-semibold rounded-xl hover:opacity-90 transition-all shadow-md hover:shadow-sky-300/50 whitespace-nowrap text-sm"
            >
              Search
            </button>
          </div>
        </form>

        {/* Quick filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {["Remote", "Lahore", "Islamabad", "Karachi", "Sahiwal", "Worldwide"].map((loc) => (
            <button
              key={loc}
              onClick={() => onSearch(loc)}
              className="px-4 py-1.5 bg-white border border-slate-200 rounded-full text-sm text-slate-600 font-medium hover:border-sky-300 hover:text-sky-700 hover:bg-sky-50 transition-all"
            >
              {loc}
            </button>
          ))}
        </div>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-6 sm:gap-10">
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-xl border border-slate-200 flex items-center justify-center shadow-sm">
                  <Icon className={`w-5 h-5 ${s.color}`} />
                </div>
                <div className="text-left">
                  <div className="text-xl font-bold text-slate-900 leading-none">{s.value}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{s.label}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
