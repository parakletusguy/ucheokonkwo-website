import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
<<<<<<< HEAD
  const host = request.headers.get('host') || '';
  // Strip port number (e.g. "admin.localhost:3000" → "admin.localhost")
  const hostname = host.split(':')[0];
  const domainArray = hostname.split('.');
  const tld = domainArray[domainArray.length - 1];

  // Detect subdomain:
  // - "admin.localhost" → length 2, tld = "localhost"
  // - "admin.example.com" → length >= 3
  const hasSubdomain =
    (domainArray.length === 2 && tld === 'localhost') ||
    domainArray.length >= 3;

  if (!hasSubdomain) return NextResponse.next();

  const subdomain = domainArray[0];
  const { pathname } = request.nextUrl;

  if (subdomain === 'admin') {
    // Already on an /admin route — let it through
    if (pathname.startsWith('/admin')) return NextResponse.next();
    // Redirect to the admin portal
    const url = request.nextUrl.clone();
    url.pathname = '/admin';
    return NextResponse.redirect(url);
  }

  // Unknown subdomain — block
  return new NextResponse('Page does not exist', { status: 404 });
}

export const config = {
  // Run on all routes except Next.js internals and static files
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
=======
  const { pathname } = request.nextUrl;

  // Only protect /admin routes except the login page itself
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const session = request.cookies.get('admin_session');
    if (!session || session.value !== 'authenticated') {
      // Redirect to login, preserving where they wanted to go
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('from', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
>>>>>>> dc74661fbd1f5bd18ad9b5bfd5c28acbedc8e8c7
};
