"use client";

import { useState } from "react";
import { Bell, CheckCircle, Loader2 } from "lucide-react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  return (
    <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-8 sm:p-12 my-12 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative text-center max-w-xl mx-auto">
        <div className="inline-flex items-center justify-center w-14 h-14 bg-sky-500/20 rounded-2xl mb-5">
          <Bell className="w-7 h-7 text-sky-400" />
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
          Never Miss an Opportunity
        </h2>
        <p className="text-slate-400 mb-8 text-sm leading-relaxed">
          Get weekly digests of the best internships, hackathons, and jobs
          tailored for Pakistani students — straight to your inbox.
        </p>

        {submitted ? (
          <div className="flex items-center justify-center gap-3 text-emerald-400">
            <CheckCircle className="w-6 h-6" />
            <span className="font-semibold">You&apos;re on the list! 🎉</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your university email..."
              className="flex-1 px-5 py-3.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-slate-500 outline-none focus:border-sky-400 transition-colors text-sm"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-bold rounded-xl hover:opacity-90 transition-all shadow-lg disabled:opacity-60"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Subscribe"
              )}
            </button>
          </form>
        )}

        <p className="text-xs text-slate-600 mt-4">
          No spam. Unsubscribe anytime. 10,000+ students already subscribed.
        </p>
      </div>
    </section>
  );
}
