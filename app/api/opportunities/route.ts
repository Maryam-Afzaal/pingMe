import { NextResponse } from "next/server";
import db from "@/lib/db";
import { fetchAdzunaJobs } from "@/lib/adzuna";
import crypto from "crypto";

// Ensure Next.js uses the Node runtime for better-sqlite3
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category") || "all";
    const location = searchParams.get("location") || "all";
    const q = searchParams.get("q") || "";
    const sort = searchParams.get("sort") || "featured";
    
    // Pagination parameters
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "12");
    const offset = (page - 1) * limit;

    // 1. Build SQLite Dynamic Query
    let conditions = [];
    let params: any = {};

    if (category !== "all") {
      conditions.push("category = @category");
      params.category = category;
    }

    if (location !== "all") {
      conditions.push("(location LIKE @location OR location LIKE '%worldwide%')");
      params.location = `%${location}%`;
    }

    if (q) {
      conditions.push("(title LIKE @q OR company LIKE @q OR description LIKE @q)");
      params.q = `%${q}%`;
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

    let orderBy = "ORDER BY featured DESC, postedAt DESC";
    if (sort === "latest") orderBy = "ORDER BY postedAt DESC";
    if (sort === "deadline") orderBy = "ORDER BY deadline ASC";

    // Fetch from SQLite
    const sql = `SELECT * FROM listings ${whereClause} ${orderBy} LIMIT @limit OFFSET @offset`;
    const stmt = db.prepare(sql);
    
    const dbResults = stmt.all({ ...params, limit, offset }).map((row: any) => ({
      ...row,
      location: JSON.parse(row.location),
      tags: JSON.parse(row.tags),
      featured: row.featured === 1
    }));

    // 2. Fetch from Adzuna (Only if requesting 'jobs' or 'all')
    let adzunaResults: any[] = [];
    if (category === "all" || category === "jobs") {
       adzunaResults = await fetchAdzunaJobs(q, location, page);
    }

    // Combine results (prioritizing local DB results)
    const combinedResults = [...dbResults, ...adzunaResults].slice(0, limit);

    // Get Total Count for Local DB
    const countStmt = db.prepare(`SELECT COUNT(*) as total FROM listings ${whereClause}`);
    const { total } = countStmt.get(params) as { total: number };

    return NextResponse.json({
      total: total + adzunaResults.length,
      page,
      limit,
      results: combinedResults,
    });

  } catch (error) {
    console.error("GET API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Basic validation
    if (!body.title || !body.company || !body.link) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const newListing = {
      id: `user-${crypto.randomUUID()}`,
      title: body.title,
      company: body.company,
      location: JSON.stringify(body.location || ["worldwide"]),
      category: body.category || "jobs",
      tags: JSON.stringify(body.tags || []),
      description: body.description || "",
      deadline: body.deadline || null,
      salary: body.salary || null,
      prize: body.prize || null,
      duration: body.duration || null,
      link: body.link,
      featured: 0, // User submissions default to non-featured
      postedAt: new Date().toISOString(),
      type: body.type || null,
      level: body.level || null
    };

    const insert = db.prepare(`
      INSERT INTO listings (id, title, company, location, category, tags, description, deadline, salary, prize, duration, link, featured, postedAt, type, level)
      VALUES (@id, @title, @company, @location, @category, @tags, @description, @deadline, @salary, @prize, @duration, @link, @featured, @postedAt, @type, @level)
    `);

    insert.run(newListing);

    return NextResponse.json({ 
      success: true, 
      message: "Opportunity created successfully!",
      id: newListing.id 
    }, { status: 201 });

  } catch (error) {
    console.error("POST API Error:", error);
    return NextResponse.json({ error: "Failed to create listing" }, { status: 500 });
  }
}