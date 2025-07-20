'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, loading, signOut } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  // Ne pas afficher le layout sur la page de connexion
  if (pathname === '/admin/login') {
    return children
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent" />
      </div>
    )
  }

  if (!user) {
    router.push('/admin/login')
    return null
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Admin Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link
                href="/admin"
                className="flex items-center px-4 text-gray-900 hover:text-blue-600"
              >
                Dashboard
              </Link>
              <Link
                href="/admin/content"
                className="flex items-center px-4 text-gray-900 hover:text-blue-600"
              >
                Contenu
              </Link>
              <Link
                href="/admin/messages"
                className="flex items-center px-4 text-gray-900 hover:text-blue-600"
              >
                Messages
              </Link>
              <Link
                href="/admin/services"
                className="flex items-center px-4 text-gray-900 hover:text-blue-600"
              >
                Services
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">{user.email}</span>
              <button
                onClick={() => signOut()}
                className="text-gray-900 hover:text-blue-600"
              >
                Déconnexion
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  )
} 