import { NextResponse } from 'next/server';

const BACKEND = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:3001/api/v1';

export async function GET(
  _req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const res = await fetch(`${BACKEND}/posts/${params.id}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return NextResponse.json(null, { status: res.status });
    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(null, { status: 503 });
  }
}
