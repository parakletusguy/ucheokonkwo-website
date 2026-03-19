import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Known root domains that support subdomains.
// Vercel preview URLs, .vercel.app, etc. are NOT in this list and pass through freely.
const ROOT_DOMAINS = ["uchennaokonkwo.com", "ucheokonkwo.com", "localhost"];

function getSubdomain(hostname: string): string | null {
  for (const root of ROOT_DOMAINS) {
    if (hostname === root) return null; // exact match — no subdomain
    if (hostname.endsWith("." + root)) {
      // e.g. "admin.localhost" → "admin", "admin.ucheokonkwo.com" → "admin"
      return hostname.slice(0, hostname.length - root.length - 1).split(".")[0];
    }
  }
  return null; // unknown domain (Vercel preview, etc.) — pass through
}

export function middleware(request: NextRequest) {
  const host = request.headers.get("host") || "";
  const hostname = host.split(":")[0]; // strip port
  const subdomain = getSubdomain(hostname);

  // No subdomain or unrecognised host — pass through
  if (!subdomain) return NextResponse.next();

  const { pathname } = request.nextUrl;

  if (subdomain === "www") return NextResponse.next();

  if (subdomain === "admin") {
    if (pathname.startsWith("/admin")) return NextResponse.next();
    const url = request.nextUrl.clone();
    url.pathname = "/admin";
    return NextResponse.redirect(url);
  }

  // Unknown subdomain — block
  return new NextResponse("Page does not exist", { status: 404 });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
