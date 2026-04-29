"use client";

import { MapPin, SlidersHorizontal, ArrowUpDown } from "lucide-react";
import { Location } from "@/types";

const locations: Array<{ id: Location | "all"; label: string; flag: string }> = [
  { id: "all", label: "All Locations", flag: "🌍" },
  { id: "lahore", label: "Lahore", flag: "🏙️" },
  { id: "islamabad", label: "Islamabad", flag: "🏛️" },
  { id: "karachi", label: "Karachi", flag: "🌊" },
  { id: "sahiwal", label: "Sahiwal", flag: "🌾" },
  { id: "worldwide", label: "Worldwide", flag: "🌐" },
  { id: "remote", label: "Remote", flag: "💻" },
];

const sortOptions = [
  { id: "latest", label: "Latest" },
  { id: "deadline", label: "Deadline" },
  { id: "featured", label: "Featured" },
];

interface FilterBarProps {
  location: Location | "all";
  sort: string;
  onLocationChange: (l: Location | "all") => void;
  onSortChange: (s: string) => void;
  totalCount: number;
}

export default function FilterBar({
  location,
  sort,
  onLocationChange,
  onSortChange,
  totalCount,
}: FilterBarProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
      {/* Location pills */}
      <div className="flex items-center gap-2 flex-wrap">
        <MapPin className="w-4 h-4 text-slate-400 flex-shrink-0" />
        <div className="flex flex-wrap gap-1.5">
          {locations.map((loc) => (
            <button
              key={loc.id}
              onClick={() => onLocationChange(loc.id)}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                location === loc.id
                  ? "bg-slate-900 text-white shadow-sm"
                  : "bg-white border border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50"
              }`}
            >
              <span>{loc.flag}</span>
              <span className="hidden sm:inline">{loc.label}</span>
              <span className="sm:hidden">{loc.label.split(" ")[0]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-3 flex-shrink-0">
        <span className="text-sm text-slate-500 font-medium">
          <span className="font-bold text-slate-800">{totalCount}</span> results
        </span>

        <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-xl px-3 py-2">
          <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
          <select
            value={sort}
            onChange={(e) => onSortChange(e.target.value)}
            className="text-xs font-semibold text-slate-700 bg-transparent outline-none cursor-pointer"
          >
            {sortOptions.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
