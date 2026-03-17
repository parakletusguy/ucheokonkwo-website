// src/lib/db.ts
// Direct SQLite client using better-sqlite3.
// This acts as a drop-in replacement for Prisma on Windows
// dev environments where the Prisma query engine binary fails
// on paths containing spaces.
//
// NOTE: better-sqlite3 is SYNCHRONOUS — this is intentional.
// On a single-author blog with low concurrency, sync SQLite is fast enough.
// For production scale, swap for Prisma + Neon PostgreSQL.

import Database from 'better-sqlite3';
import path from 'path';
import { randomBytes } from 'crypto';

// Resolve the database path — works whether running from root or /src
const DB_PATH = path.join(process.cwd(), 'prisma', 'dev.db');

// Singleton database instance
let dbInstance: Database.Database | null = null;

function getDb(): Database.Database {
  if (!dbInstance) {
    dbInstance = new Database(DB_PATH);
    // WAL mode = much faster writes, safe for concurrent reads
    dbInstance.pragma('journal_mode = WAL');
    // Enforce foreign key constraints
    dbInstance.pragma('foreign_keys = ON');
  }
  return dbInstance;
}

function cuid(): string {
  return 'c' + randomBytes(10).toString('hex');
}

// ─── Article Operations ──────────────────────────────────────────────────────

export function createArticle(status: 'draft' | 'published' = 'draft') {
  const db = getDb();
  const id = cuid();
  const now = new Date().toISOString();
  db.prepare(
    `INSERT INTO Article (id, status, createdAt, updatedAt) VALUES (?, ?, ?, ?)`
  ).run(id, status, now, now);
  return { id, status, createdAt: now, updatedAt: now };
}

export function publishArticle(id: string) {
  const db = getDb();
  const now = new Date().toISOString();
  db.prepare(`UPDATE Article SET status = 'published', updatedAt = ? WHERE id = ?`).run(now, id);
}

export function listPublishedArticles() {
  const db = getDb();
  const articles = db
    .prepare(`SELECT * FROM Article WHERE status = 'published' ORDER BY createdAt DESC`)
    .all() as { id: string; status: string; createdAt: string; updatedAt: string }[];

  return articles.map((a) => ({
    ...a,
    translations: db
      .prepare(`SELECT title, content, lang FROM Translation WHERE articleId = ? AND lang = 'en'`)
      .all(a.id),
  }));
}

export function getArticleWithTranslations(id: string, lang: string = 'en') {
  const db = getDb();
  const article = db
    .prepare(`SELECT * FROM Article WHERE id = ?`)
    .get(id) as { id: string; status: string; createdAt: string } | undefined;

  if (!article) return null;

  const translation = db
    .prepare(`SELECT title, content, lang FROM Translation WHERE articleId = ? AND lang = ?`)
    .get(id, lang) as { title: string; content: string; lang: string } | undefined;

  // Fallback to English if requested lang translation doesn't exist
  const fallback = translation
    ? translation
    : (db
        .prepare(`SELECT title, content, lang FROM Translation WHERE articleId = ? AND lang = 'en'`)
        .get(id) as { title: string; content: string; lang: string } | undefined);

  return { ...article, translation: fallback };
}

// ─── Translation Operations ───────────────────────────────────────────────────

export function createTranslations(
  articleId: string,
  translations: { lang: string; title: string; content: string }[]
) {
  const db = getDb();
  const stmt = db.prepare(
    `INSERT OR REPLACE INTO Translation (id, articleId, lang, title, content, createdAt)
     VALUES (?, ?, ?, ?, ?, ?)`
  );
  const now = new Date().toISOString();
  const insertMany = db.transaction((items: typeof translations) => {
    for (const t of items) {
      stmt.run(cuid(), articleId, t.lang, t.title, t.content, now);
    }
  });
  insertMany(translations);
}
