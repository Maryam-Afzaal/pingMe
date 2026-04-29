"use client";

import {
  MapPin,
  Calendar,
  ExternalLink,
  Star,
  Clock,
  DollarSign,
  Trophy,
  Briefcase,
  Zap,
  Code2,
  FileText,
  Target,
} from "lucide-react";
import { Listing } from "@/types";

const categoryConfig: Record<
  string,
  {
    icon: React.ElementType;
    color: string;
    bg: string;
    border: string;
    badge: string;
  }
> = {
  internships: {
    icon: Briefcase,
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-100",
    badge: "badge-internships",
  },
  jobs: {
    icon: Zap,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "border-emerald-100",
    badge: "badge-jobs",
  },
  hackathons: {
    icon: Code2,
    color: "text-purple-600",
    bg: "bg-purple-50",
    border: "border-purple-100",
    badge: "badge-hackathons",
  },
  competitions: {
    icon: Trophy,
    color: "text-amber-600",
    bg: "bg-amber-50",
    border: "border-amber-100",
    badge: "badge-competitions",
  },
  prep: {
    icon: Target,
    color: "text-orange-600",
    bg: "bg-orange-50",
    border: "border-orange-100",
    badge: "badge-prep",
  },
  "mock-tests": {
    icon: FileText,
    color: "text-pink-600",
    bg: "bg-pink-50",
    border: "border-pink-100",
    badge: "badge-mock-tests",
  },
  "interview-prep": {
    icon: Target,
    color: "text-orange-600",
    bg: "bg-orange-50",
    border: "border-orange-100",
    badge: "badge-interview-prep",
  },
};

const categoryLabels: Record<string, string> = {
  internships: "Internship",
  jobs: "Job",
  hackathons: "Hackathon",
  competitions: "Competition",
  prep: "Prep",
  "mock-tests": "Mock Test",
  "interview-prep": "Interview Prep",
};

function getCompanyInitials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

function getGradient(name: string) {
  const gradients = [
    "from-sky-400 to-blue-600",
    "from-violet-400 to-purple-600",
    "from-emerald-400 to-teal-600",
    "from-orange-400 to-red-500",
    "from-pink-400 to-rose-600",
    "from-amber-400 to-orange-500",
  ];
  const idx = name.charCodeAt(0) % gradients.length;
  return gradients[idx];
}

function formatDate(dateStr: string) {
  if (!dateStr || dateStr === "Ongoing") return "Ongoing";
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  } catch {
    return dateStr;
  }
}

function getDaysLeft(deadline?: string) {
  if (!deadline || deadline === "Ongoing") return null;
  const diff = Math.ceil(
    (new Date(deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  );
  return diff;
}

interface ListingCardProps {
  listing: Listing;
  viewMode: "grid" | "list";
}

export default function ListingCard({ listing, viewMode }: ListingCardProps) {
  const config = categoryConfig[listing.category] || categoryConfig.internships;
  const Icon = config.icon;
  const daysLeft = getDaysLeft(listing.deadline);
  const urgency = daysLeft !== null && daysLeft <= 7;

  if (viewMode === "list") {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 hover:border-sky-200 hover:shadow-lg hover:shadow-sky-50 transition-all duration-200 p-5 flex items-start gap-4 group">
        {/* Logo */}
        <div
          className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getGradient(listing.company)} flex items-center justify-center flex-shrink-0 text-white text-sm font-bold shadow-sm`}
        >
          {getCompanyInitials(listing.company)}
        </div>

        {/* Main */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <span className={`pill ${config.badge} text-xs`}>
                  <Icon className="w-3 h-3" />
                  {categoryLabels[listing.category]}
                </span>
                {listing.featured && (
                  <span className="pill bg-amber-50 text-amber-700 text-xs">
                    <Star className="w-3 h-3" fill="currentColor" />
                    Featured
                  </span>
                )}
              </div>
              <h3 className="font-bold text-slate-900 text-base group-hover:text-sky-700 transition-colors truncate">
                {listing.title}
              </h3>
              <p className="text-sm text-slate-500 mt-0.5">{listing.company}</p>
            </div>
            <a
              href={listing.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 flex items-center gap-1.5 px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-sky-600 transition-colors"
            >
              Apply
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="flex items-center gap-4 mt-2 flex-wrap">
            <div className="flex items-center gap-1 text-xs text-slate-400">
              <MapPin className="w-3 h-3" />
              {listing.location.join(", ")}
            </div>
            {listing.deadline && (
              <div
                className={`flex items-center gap-1 text-xs ${urgency ? "text-red-500 font-semibold" : "text-slate-400"}`}
              >
                <Calendar className="w-3 h-3" />
                {daysLeft !== null
                  ? urgency
                    ? `${daysLeft}d left!`
                    : `${daysLeft}d left`
                  : formatDate(listing.deadline)}
              </div>
            )}
            {(listing.salary || listing.prize) && (
              <div className="flex items-center gap-1 text-xs text-slate-400">
                <DollarSign className="w-3 h-3" />
                {listing.salary || listing.prize}
              </div>
            )}
            {listing.type && (
              <span className="tag-chip">{listing.type}</span>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 card-hover overflow-hidden flex flex-col group">
      {/* Top accent */}
      <div className={`h-1 w-full bg-gradient-to-r ${getGradient(listing.company)}`} />

      <div className="p-5 flex flex-col flex-1">
        {/* Header row */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div
            className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getGradient(listing.company)} flex items-center justify-center text-white text-sm font-bold shadow-sm flex-shrink-0`}
          >
            {getCompanyInitials(listing.company)}
          </div>

          <div className="flex flex-wrap gap-1.5 justify-end">
            {listing.featured && (
              <span className="pill bg-amber-50 text-amber-700 text-[11px]">
                <Star className="w-3 h-3" fill="currentColor" />
                Featured
              </span>
            )}
            <span className={`pill ${config.badge} text-[11px]`}>
              <Icon className="w-3 h-3" />
              {categoryLabels[listing.category]}
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-bold text-slate-900 text-base leading-snug group-hover:text-sky-700 transition-colors mb-1">
          {listing.title}
        </h3>
        <p className="text-sm text-slate-500 mb-3">{listing.company}</p>

        {/* Description */}
        <p className="text-sm text-slate-500 leading-relaxed line-clamp-2 flex-1 mb-4">
          {listing.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {listing.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="tag-chip">
              {tag}
            </span>
          ))}
          {listing.tags.length > 3 && (
            <span className="tag-chip">+{listing.tags.length - 3}</span>
          )}
        </div>

        {/* Meta */}
        <div className="flex flex-wrap gap-3 text-xs text-slate-400 mb-4">
          <span className="flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            {listing.location.join(", ")}
          </span>
          {listing.type && (
            <span className="flex items-center gap-1">
              <Briefcase className="w-3 h-3" />
              {listing.type}
            </span>
          )}
          {listing.duration && (
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {listing.duration}
            </span>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <div>
            {(listing.salary || listing.prize) && (
              <div className="text-sm font-bold text-slate-900">
                {listing.salary || listing.prize}
              </div>
            )}
            {listing.deadline && listing.deadline !== "Ongoing" && (
              <div
                className={`text-xs mt-0.5 ${urgency ? "text-red-500 font-semibold" : "text-slate-400"}`}
              >
                {urgency && "⚡ "}
                {daysLeft !== null && daysLeft > 0
                  ? `${daysLeft} days left`
                  : daysLeft === 0
                  ? "Ends today!"
                  : "Closed"}
              </div>
            )}
            {listing.deadline === "Ongoing" && (
              <div className="text-xs text-emerald-600 font-semibold">Always open</div>
            )}
          </div>

          <a
            href={listing.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-sky-600 text-white text-xs font-bold rounded-xl transition-colors"
          >
            {listing.category === "mock-tests" || listing.category === "interview-prep"
              ? "Start"
              : "Apply"}
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
}
