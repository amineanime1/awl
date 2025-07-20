import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Si l'utilisateur n'est pas connecté et essaie d'accéder à /admin
  if (!session && req.nextUrl.pathname.startsWith('/admin')) {
    // Rediriger vers la page de connexion sauf si on est déjà sur la page de connexion
    if (!req.nextUrl.pathname.startsWith('/admin/login')) {
      const redirectUrl = req.nextUrl.clone()
      redirectUrl.pathname = '/admin/login'
      return NextResponse.redirect(redirectUrl)
    }
  }

  // Si l'utilisateur est connecté et essaie d'accéder à la page de connexion
  if (session && req.nextUrl.pathname.startsWith('/admin/login')) {
    const redirectUrl = req.nextUrl.clone()
    redirectUrl.pathname = '/admin'
    return NextResponse.redirect(redirectUrl)
  }

  return res
}

export const config = {
  matcher: ['/admin/:path*'],
} 