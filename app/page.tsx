"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { LayoutGrid, List, Search, X, Loader2 } from "lucide-react";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CategoryTabs from "@/components/CategoryTabs";
import FilterBar from "@/components/FilterBar";
import ListingCard from "@/components/ListingCard";
import FeaturedBanner from "@/components/FeaturedBanner";
import NewsletterSection from "@/components/NewsletterSection";
import CitiesSection from "@/components/CitiesSection";
import EmptyState from "@/components/EmptyState";
import Footer from "@/components/Footer";
import { Category, Location, Listing } from "@/types";

function HomeContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [category, setCategory] = useState<Category | "all">(
    (searchParams.get("category") as Category | "all") || "all"
  );
  const [location, setLocation] = useState<Location | "all">(
    (searchParams.get("location") as Location | "all") || "all"
  );
  const [search, setSearch] = useState(searchParams.get("q") || "");
  const [sort, setSort] = useState<"latest" | "deadline" | "featured">("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // --- NEW: State for our Backend API ---
  const [listings, setListings] = useState<Listing[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Sync URL params
  useEffect(() => {
    const params = new URLSearchParams();
    if (category !== "all") params.set("category", category);
    if (location !== "all") params.set("location", location);
    if (search) params.set("q", search);
    const query = params.toString();
    router.replace(query ? `?${query}` : "/", { scroll: false });
  }, [category, location, search, router]);

  // --- NEW: Fetch Data from API ---
  useEffect(() => {
    const fetchListings = async () => {
      setIsLoading(true);
      try {
        const params = new URLSearchParams();
        if (category !== "all") params.set("category", category);
        if (location !== "all") params.set("location", location);
        if (search) params.set("q", search);
        if (sort) params.set("sort", sort);

        const res = await fetch(`/api/opportunities?${params.toString()}`);
        if (!res.ok) throw new Error("Failed to fetch API");
        
        const data = await res.json();
        setListings(data.results || []);
        setTotalCount(data.total || 0);
      } catch (err) {
        console.error("Error fetching listings:", err);
        setListings([]);
        setTotalCount(0);
      } finally {
        setIsLoading(false);
      }
    };

    // Add a slight debounce to prevent rapid API calls when typing in search
    const delayDebounceFn = setTimeout(() => {
      fetchListings();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [category, location, search, sort]);

  const featuredItems = listings.filter((l) => l.featured).slice(0, 5);

  const resetFilters = () => {
    setCategory("all");
    setLocation("all");
    setSearch("");
    setSort("featured");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      {/* Hero */}
      <Hero onSearch={(q) => setSearch(q)} />

      {/* Category tabs (passing empty object for counts since API handles total now) */}
      <CategoryTabs active={category} onChange={setCategory} counts={{}} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Active search banner */}
        {search && (
          <div className="flex items-center gap-3 bg-sky-50 border border-sky-200 rounded-xl px-4 py-3 mb-6">
            <Search className="w-4 h-4 text-sky-500 flex-shrink-0" />
            <span className="text-sm text-sky-800">
              Showing results for &quot;
              <span className="font-bold">{search}</span>&quot;
            </span>
            <button
              onClick={() => setSearch("")}
              className="ml-auto flex items-center gap-1 text-xs text-sky-600 hover:text-sky-800 font-medium"
            >
              <X className="w-3.5 h-3.5" />
              Clear
            </button>
          </div>
        )}

        {/* Featured banner */}
        {!search && category === "all" && location === "all" && featuredItems.length > 0 && !isLoading && (
          <FeaturedBanner items={featuredItems} />
        )}

        {/* Cities section */}
        {!search && category === "all" && location === "all" && !isLoading && (
          <CitiesSection />
        )}

        {/* Filter bar */}
        <FilterBar
          location={location}
          sort={sort}
          onLocationChange={setLocation}
          onSortChange={(s) => setSort(s as "latest" | "deadline" | "featured")}
          totalCount={totalCount}
        />

        {/* View toggle */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-slate-900">
            {category === "all"
              ? "All Opportunities"
              : category
                  .split("-")
                  .map((w) => w[0].toUpperCase() + w.slice(1))
                  .join(" ")}
            {location !== "all" && (
              <span className="text-slate-400 font-normal">
                {" "}
                · {location.charAt(0).toUpperCase() + location.slice(1)}
              </span>
            )}
          </h2>

          <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-xl p-1">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-lg transition-all ${
                viewMode === "grid"
                  ? "bg-slate-900 text-white"
                  : "text-slate-400 hover:text-slate-700"
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-lg transition-all ${
                viewMode === "list"
                  ? "bg-slate-900 text-white"
                  : "text-slate-400 hover:text-slate-700"
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Listings or Loading State */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-10 h-10 text-sky-500 animate-spin mb-4" />
            <p className="text-slate-500 font-medium">Fetching opportunities...</p>
          </div>
        ) : listings.length === 0 ? (
          <EmptyState onReset={resetFilters} />
        ) : (
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
                : "flex flex-col gap-3"
            }
          >
            {listings.map((listing, i) => (
              <div
                key={listing.id}
                className="animate-fade-in"
                style={{ animationDelay: `${Math.min(i * 0.04, 0.4)}s`, animationFillMode: "both" }}
              >
                <ListingCard listing={listing} viewMode={viewMode} />
              </div>
            ))}
          </div>
        )}

        {/* Load more (Visual only for now) */}
        {!isLoading && listings.length > 0 && (
          <div className="text-center mt-10">
            <button className="px-8 py-3.5 bg-white border border-slate-200 text-slate-700 font-semibold text-sm rounded-xl hover:border-sky-300 hover:text-sky-700 hover:bg-sky-50 transition-all shadow-sm">
              Load More Opportunities
            </button>
          </div>
        )}

        <NewsletterSection />
      </main>

      <Footer />
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-500">Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}