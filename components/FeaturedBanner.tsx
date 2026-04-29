"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ExternalLink, Flame } from "lucide-react";
import { Listing } from "@/types";

interface FeaturedBannerProps {
  items: Listing[];
}

export default function FeaturedBanner({ items }: FeaturedBannerProps) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (items.length <= 1) return;
    const t = setInterval(() => setCurrent((c) => (c + 1) % items.length), 5000);
    return () => clearInterval(t);
  }, [items.length]);

  if (!items.length) return null;

  const item = items[current];

  const gradients = [
    "from-sky-500 via-blue-600 to-indigo-700",
    "from-violet-500 via-purple-600 to-indigo-700",
    "from-emerald-500 via-teal-600 to-cyan-700",
    "from-orange-500 via-red-500 to-pink-600",
  ];

  return (
    <div className="relative overflow-hidden rounded-2xl mb-8">
      <div
        className={`bg-gradient-to-r ${gradients[current % gradients.length]} transition-all duration-700`}
      >
        <div className="relative p-6 sm:p-8">
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 right-1/4 w-32 h-32 bg-white/5 rounded-full translate-y-1/2" />

          <div className="relative flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              {/* Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 rounded-full text-white text-xs font-bold mb-3">
                <Flame className="w-3 h-3" />
                Featured Opportunity
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white mb-1 leading-tight">
                {item.title}
              </h3>
              <p className="text-white/80 text-sm mb-3">{item.company}</p>
              <p className="text-white/70 text-sm leading-relaxed max-w-xl line-clamp-2 mb-4">
                {item.description}
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 bg-white text-slate-900 text-sm font-bold rounded-xl hover:bg-white/90 transition-all shadow-lg"
                >
                  {item.category === "mock-tests" || item.category === "interview-prep"
                    ? "Start Now"
                    : "Apply Now"}
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                {(item.salary || item.prize) && (
                  <span className="px-3 py-2 bg-white/20 text-white text-sm font-semibold rounded-xl">
                    {item.salary || item.prize}
                  </span>
                )}
                {item.deadline && item.deadline !== "Ongoing" && (
                  <span className="px-3 py-2 bg-white/20 text-white text-sm rounded-xl">
                    Due {item.deadline}
                  </span>
                )}
              </div>
            </div>

            {/* Nav buttons */}
            {items.length > 1 && (
              <div className="hidden sm:flex flex-col gap-2 flex-shrink-0">
                <button
                  onClick={() => setCurrent((c) => (c - 1 + items.length) % items.length)}
                  className="p-2 bg-white/20 hover:bg-white/30 rounded-lg text-white transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setCurrent((c) => (c + 1) % items.length)}
                  className="p-2 bg-white/20 hover:bg-white/30 rounded-lg text-white transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Dots */}
          {items.length > 1 && (
            <div className="flex gap-1.5 mt-4">
              {items.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-1.5 rounded-full transition-all ${
                    i === current ? "w-6 bg-white" : "w-1.5 bg-white/40"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
