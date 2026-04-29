import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PingMe — Find Internships, Jobs, Hackathons & More",
  description:
    "Pakistan's #1 platform for students to discover internships, jobs, hackathons, competitions, mock tests, and interview preparation — across Lahore, Islamabad, Karachi, Sahiwal and worldwide.",
  keywords:
    "internships pakistan, jobs lahore, hackathons islamabad, karachi jobs, student opportunities pakistan, interview prep",
  openGraph: {
    title: "PingMe",
    description: "Opportunities. Unlocked.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
