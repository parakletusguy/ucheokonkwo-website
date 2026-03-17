import { NextRequest, NextResponse } from 'next/server';
import Database from 'better-sqlite3';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'db', 'uho.db');

function getDb() {
  const db = new Database(DB_PATH);
  db.exec(`
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      ward TEXT NOT NULL,
      message TEXT NOT NULL,
      read INTEGER DEFAULT 0,
      createdAt TEXT DEFAULT (datetime('now'))
    );
  `);
  return db;
}

/* GET /api/messages */
export async function GET() {
  try {
    const db = getDb();
    const messages = db.prepare('SELECT * FROM messages ORDER BY createdAt DESC').all();
    return NextResponse.json({ messages }, { headers: { 'Cache-Control': 'no-store' } });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

/* POST /api/messages — constituent submits a petition */
export async function POST(req: NextRequest) {
  const { name, ward, message } = await req.json();
  if (!name || !ward || !message) {
    return NextResponse.json({ error: 'Name, ward, and message are required.' }, { status: 400 });
  }
  try {
    const db = getDb();
    db.prepare('INSERT INTO messages (name, ward, message) VALUES (?, ?, ?)').run(name, ward, message);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
