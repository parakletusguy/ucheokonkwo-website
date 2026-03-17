/**
 * Manual DB Setup Script
 * Run this with: node scripts/setup-db.js
 * This bootstraps the SQLite database when Prisma CLI fails on Windows paths with spaces.
 */

const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

const dbPath = path.join(__dirname, '..', 'prisma', 'dev.db');

// Ensure prisma directory exists
fs.mkdirSync(path.dirname(dbPath), { recursive: true });

const db = new Database(dbPath);

console.log('✅ Connected to SQLite database at:', dbPath);

db.exec(`
CREATE TABLE IF NOT EXISTS "Article" (
  "id"        TEXT NOT NULL PRIMARY KEY,
  "status"    TEXT NOT NULL DEFAULT 'draft',
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "Translation" (
  "id"        TEXT NOT NULL PRIMARY KEY,
  "articleId" TEXT NOT NULL,
  "lang"      TEXT NOT NULL,
  "title"     TEXT NOT NULL,
  "content"   TEXT NOT NULL,
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY ("articleId") REFERENCES "Article"("id") ON DELETE CASCADE
);

CREATE UNIQUE INDEX IF NOT EXISTS "Translation_articleId_lang_key" ON "Translation"("articleId", "lang");
`);

console.log('✅ Tables created: Article, Translation');
db.close();
console.log('✅ Database setup complete. Ready for development!');
