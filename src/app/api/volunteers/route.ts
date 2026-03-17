import { NextRequest, NextResponse } from 'next/server';
import Database from 'better-sqlite3';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'db', 'uho.db');

function getDb() {
  const db = new Database(DB_PATH);
  // Ensure volunteers table exists
  db.exec(`
    CREATE TABLE IF NOT EXISTS volunteers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      ward TEXT NOT NULL,
      createdAt TEXT DEFAULT (datetime('now'))
    );
  `);
  return db;
}

/* GET /api/volunteers — list all volunteers */
export async function GET() {
  try {
    const db = getDb();
    const volunteers = db.prepare('SELECT * FROM volunteers ORDER BY createdAt DESC').all();
    return NextResponse.json({ volunteers }, { headers: { 'Cache-Control': 'no-store' } });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

/* POST /api/volunteers — register a new volunteer */
export async function POST(req: NextRequest) {
  const { name, email, phone, ward } = await req.json();
  if (!name || !email || !ward) {
    return NextResponse.json({ error: 'Name, email, and ward are required.' }, { status: 400 });
  }
  try {
    const db = getDb();
    const stmt = db.prepare('INSERT INTO volunteers (name, email, phone, ward) VALUES (?, ?, ?, ?)');
    stmt.run(name, email, phone || null, ward);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
