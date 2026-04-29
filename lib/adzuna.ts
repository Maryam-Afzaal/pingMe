import { Listing } from "@/types";

export async function fetchAdzunaJobs(query: string, location: string, page: number = 1): Promise<Listing[]> {
  const appId = process.env.ADZUNA_APP_ID;
  const appKey = process.env.ADZUNA_APP_KEY;

  if (!appId || !appKey) {
    console.warn("⚠️ Adzuna credentials missing. Skipping external jobs.");
    return [];
  }

  // Fallback to 'pk' or 'us' if location isn't specific, as Adzuna needs a country code
  const country = 'pk'; 
  const url = `https://api.adzuna.com/v1/api/jobs/${country}/search/${page}?app_id=${appId}&app_key=${appKey}&what=${encodeURIComponent(query)}&results_per_page=10`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Adzuna API returned ${res.status}`);
    const data = await res.json();

    return data.results.map((job: any) => ({
      id: `adzuna-${job.id}`,
      title: job.title.replace(/<[^>]*>?/gm, ''), // Strip HTML
      company: job.company.display_name,
      location: ["worldwide"], // Mapping Adzuna location to your types
      category: "jobs",
      tags: [], 
      description: job.description,
      link: job.redirect_url,
      featured: false,
      postedAt: job.created,
      salary: job.salary_min ? `£${job.salary_min.toLocaleString()}/yr` : undefined,
      type: "Full-time"
    }));
  } catch (error) {
    console.error("Adzuna Fetch Error:", error);
    return [];
  }
}