import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  // For now, let the client-side auth handle authentication
  // This avoids issues with Supabase Auth cookies in middleware
  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*']
} 