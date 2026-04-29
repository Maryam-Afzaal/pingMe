export type Category =
  | "internships"
  | "competitions"
  | "hackathons"
  | "mock-tests"
  | "interview-prep"
  | "jobs";

export type Location =
  | "lahore"
  | "islamabad"
  | "karachi"
  | "sahiwal"
  | "worldwide"
  | "remote";

export interface Listing {
  id: string;
  title: string;
  company: string;
  logo?: string;
  location: Location[];
  category: Category;
  tags: string[];
  description: string;
  deadline?: string;
  salary?: string;
  prize?: string;
  duration?: string;
  link: string;
  featured?: boolean;
  postedAt: string;
  type?: string;
  level?: string;
}

export interface FilterState {
  category: Category | "all";
  location: Location | "all";
  search: string;
  sort: "latest" | "deadline" | "featured";
}
