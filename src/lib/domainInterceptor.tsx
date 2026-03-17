"use client";

import React from "react";

// Domain routing is handled server-side by src/middleware.ts.
// This component is a transparent wrapper kept for future client-side
// domain-aware UI enhancements (e.g. subdomain-specific theming).
const DomainInterceptor = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default DomainInterceptor;
