import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// The secret password. In production this should come from an env variable.
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Idemili2025!';

export async function POST(request: NextRequest) {
  const body = await request.json();

  if (body.password === ADMIN_PASSWORD) {
    const response = NextResponse.json({ ok: true });
    // Set a simple httpOnly session cookie valid for 8 hours
    response.cookies.set('admin_session', 'authenticated', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 8, // 8 hours
      path: '/',
    });
    return response;
  }

  return NextResponse.json({ error: 'Incorrect password.' }, { status: 401 });
}
