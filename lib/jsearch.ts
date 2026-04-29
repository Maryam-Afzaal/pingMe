type JSearchJob = {
  job_id: string;
  job_title: string;
  employer_name: string;
  job_city: string | null;
  job_description: string;
  job_apply_link: string;
  job_posted_at_datetime_utc: string;
  job_employment_type: string | null;
};

type JSearchResponse = {
  data: JSearchJob[];
};

type Listing = {
  id: string;
  title: string;
  company: string;
  location: string[];
  category: string;
  tags: string[];
  description: string;
  link: string;
  featured: boolean;
  postedAt: string;
  type: string | null;
  level: string | null;
};

export async function fetchJSearchJobs(
  query: string,
  location: string,
  page: number = 1
): Promise<Listing[]> {
  try {
    const url = `https://jsearch.p.rapidapi.com/search?query=${query || "internships"}&location=${location || "Pakistan"}&page=${page}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": process.env.RAPIDAPI_KEY as string,
        "X-RapidAPI-Host": "jsearch.p.rapidapi.com"
      }
    });

    const data: JSearchResponse = await response.json();

    return data.data.map((job) => ({
      id: job.job_id,
      title: job.job_title,
      company: job.employer_name,
      location: [job.job_city || "Remote"],
      category: "jobs",
      tags: [],
      description: job.job_description,
      link: job.job_apply_link,
      featured: false,
      postedAt: job.job_posted_at_datetime_utc,
      type: job.job_employment_type,
      level: null
    }));

  } catch (error) {
    console.error("JSearch API Error:", error);
    return [];
  }
}