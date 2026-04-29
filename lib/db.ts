import Database from 'better-sqlite3';
import path from 'path';
import { mockListings } from './data';

// Store DB in the root of the project
const dbPath = path.join(process.cwd(), 'pingme.db');
const db = new Database(dbPath);

// Initialize Schema
db.exec(`
  CREATE TABLE IF NOT EXISTS listings (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    company TEXT NOT NULL,
    location TEXT NOT NULL,  -- Stored as JSON string
    category TEXT NOT NULL,
    tags TEXT NOT NULL,      -- Stored as JSON string
    description TEXT NOT NULL,
    deadline TEXT,
    salary TEXT,
    prize TEXT,
    duration TEXT,
    link TEXT NOT NULL,
    featured INTEGER DEFAULT 0,
    postedAt TEXT NOT NULL,
    type TEXT,
    level TEXT
  )
`);

// Seed Database if empty
const { count } = db.prepare('SELECT COUNT(*) as count FROM listings').get() as { count: number };

if (count === 0) {
  const insert = db.prepare(`
    INSERT INTO listings (id, title, company, location, category, tags, description, deadline, salary, prize, duration, link, featured, postedAt, type, level)
    VALUES (@id, @title, @company, @location, @category, @tags, @description, @deadline, @salary, @prize, @duration, @link, @featured, @postedAt, @type, @level)
  `);

  const seedTransaction = db.transaction((listings) => {
    for (const listing of listings) {
      insert.run({
        ...listing,
        // Convert arrays/booleans to SQLite-friendly formats
        location: JSON.stringify(listing.location),
        tags: JSON.stringify(listing.tags),
        featured: listing.featured ? 1 : 0
      });
    }
  });

  seedTransaction(mockListings);
  console.log("🌱 Database seeded successfully with mock data!");
}

export default db;