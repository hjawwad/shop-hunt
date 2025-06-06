import { NextResponse } from 'next/server';

export function middleware(request) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname;

  // Define public paths that don't require authentication
  const isPublicPath = path === '/admin/login';

  // Check if the user is authenticated
  const isAuthenticated = request.cookies.has('adminToken');

  // Redirect authenticated users away from login page
  if (isPublicPath && isAuthenticated) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  // Redirect unauthenticated users to login page
  if (!isPublicPath && !isAuthenticated) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  return NextResponse.next();
}

// Configure which routes to run middleware on
export const config = {
  matcher: ['/admin/:path*'],
}; 