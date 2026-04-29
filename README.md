# PingMe 🚀

**Pakistan's #1 Student Opportunity Platform**

Find internships, jobs, hackathons, competitions, mock tests, and interview preparation resources — across Lahore, Islamabad, Karachi, Sahiwal and worldwide.

---

## Features

- 🔍 **Smart Search** — Search by title, company, skill, or location
- 📍 **City Filter** — Lahore, Islamabad, Karachi, Sahiwal, Worldwide, Remote
- 🗂️ **6 Categories** — Internships, Jobs, Hackathons, Competitions, Mock Tests, Interview Prep
- 🏷️ **Featured Listings** — Auto-rotating featured opportunity banner
- 📧 **Newsletter Signup** — Weekly digest subscription
- 📱 **Fully Responsive** — Mobile-first design
- 🌙 **Light Theme** — Clean, professional UI
- ⚡ **Next.js 14** — App Router, API routes, TypeScript

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone or unzip the project
cd pingme

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Fill in your API keys in .env.local (optional for basic usage)

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

---

## Project Structure

```
pingme/
├── app/
│   ├── api/
│   │   └── opportunities/route.ts   # REST API endpoint
│   ├── globals.css                  # Global styles + CSS vars
│   ├── layout.tsx                   # Root layout
│   └── page.tsx                     # Main page
├── components/
│   ├── Navbar.tsx                   # Sticky navigation
│   ├── Hero.tsx                     # Hero with rotating words
│   ├── CategoryTabs.tsx             # Category switcher
│   ├── FilterBar.tsx                # Location + sort controls
│   ├── ListingCard.tsx              # Grid/list card component
│   ├── FeaturedBanner.tsx           # Auto-rotating featured banner
│   ├── CitiesSection.tsx            # City browse cards
│   ├── NewsletterSection.tsx        # Email subscription
│   ├── EmptyState.tsx               # No results UI
│   └── Footer.tsx                   # Site footer
├── lib/
│   └── data.ts                      # Mock listings data + config
├── types/
│   └── index.ts                     # TypeScript types
└── .env.example                     # Environment variables template
```

---

## API Integration

### Adzuna Jobs API (Recommended — Free Tier)

1. Register at https://developer.adzuna.com
2. Add credentials to `.env.local`
3. Update `app/api/opportunities/route.ts` to fetch from Adzuna

### RapidAPI JSearch (LinkedIn Jobs)

1. Subscribe to JSearch on RapidAPI
2. Add `NEXT_PUBLIC_RAPIDAPI_KEY` to `.env.local`

### Devpost API (Hackathons)

1. Get API access from https://devpost.com/api
2. Add key to `.env.local`

---

## Customization

### Add More Cities

Edit `lib/data.ts` → `locationConfig` and `types/index.ts` → `Location` type.

### Add Real Listings

Replace or augment `mockListings` in `lib/data.ts` with API calls.

### Theme Colors

Edit CSS variables in `app/globals.css` under `:root`.

---

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Fonts**: DM Sans (Google Fonts)

---

## License

MIT License — free to use for personal and commercial projects.

---

Built with ❤️ for students across Pakistan 🇵🇰
