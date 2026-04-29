import { SearchX } from "lucide-react";

interface EmptyStateProps {
  onReset: () => void;
}

export default function EmptyState({ onReset }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="w-20 h-20 bg-slate-100 rounded-2xl flex items-center justify-center mb-5">
        <SearchX className="w-10 h-10 text-slate-400" />
      </div>
      <h3 className="text-xl font-bold text-slate-800 mb-2">No results found</h3>
      <p className="text-slate-500 text-sm mb-6 max-w-sm">
        We couldn&apos;t find any opportunities matching your current filters. Try
        adjusting your search or location.
      </p>
      <button
        onClick={onReset}
        className="px-6 py-3 bg-slate-900 text-white font-semibold text-sm rounded-xl hover:bg-sky-600 transition-colors"
      >
        Clear Filters
      </button>
    </div>
  );
}
