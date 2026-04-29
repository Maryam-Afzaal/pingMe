import Link from "next/link";
import { Zap, Github, Twitter, Linkedin, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4 group">
              <div className="w-8 h-8 bg-gradient-to-br from-sky-500 to-indigo-600 rounded-xl flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" fill="white" />
              </div>
              <span className="text-lg font-bold text-white">PingMe</span>
            </Link>
            <p className="text-sm leading-relaxed mb-5">
              Pakistan&apos;s student opportunity hub. Find internships, jobs,
              hackathons, and more.
            </p>
            <div className="flex gap-3">
              {[Twitter, Linkedin, Github, Instagram].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 bg-slate-800 hover:bg-slate-700 rounded-lg flex items-center justify-center transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Opportunities */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Opportunities</h4>
            <ul className="space-y-2.5 text-sm">
              {[
                ["Internships", "/?category=internships"],
                ["Jobs", "/?category=jobs"],
                ["Hackathons", "/?category=hackathons"],
                ["Competitions", "/?category=competitions"],
                ["Mock Tests", "/?category=mock-tests"],
                ["Interview Prep", "/?category=interview-prep"],
              ].map(([label, href]) => (
                <li key={label}>
                  <Link href={href} className="hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Cities */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Browse by City</h4>
            <ul className="space-y-2.5 text-sm">
              {[
                ["🏙️ Lahore", "/?location=lahore"],
                ["🏛️ Islamabad", "/?location=islamabad"],
                ["🌊 Karachi", "/?location=karachi"],
                ["🌾 Sahiwal", "/?location=sahiwal"],
                ["🌐 Worldwide", "/?location=worldwide"],
                ["💻 Remote", "/?location=remote"],
              ].map(([label, href]) => (
                <li key={label}>
                  <Link href={href} className="hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Company</h4>
            <ul className="space-y-2.5 text-sm">
              {["About Us", "Post Opportunity", "Contact", "Privacy Policy", "Terms of Service"].map(
                (label) => (
                  <li key={label}>
                    <a href="#" className="hover:text-white transition-colors">
                      {label}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs">
            © {new Date().getFullYear()} PingMe. Made with ❤️ for Pakistani students.
          </p>
          <p className="text-xs">
            Serving <span className="text-sky-400 font-semibold">Lahore · Islamabad · Karachi · Sahiwal</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
