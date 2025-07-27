'use client'

import { usePathname } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import Link from 'next/link'
import { useState } from 'react'
import { 
  FaHome, 
  FaCog, 
  FaEnvelope, 
  FaTruck, 
  FaLeaf, 
  FaQuestionCircle, 
  FaSignOutAlt,
  FaUser,
  FaBars,
  FaTimes,
  FaFileAlt
} from 'react-icons/fa'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const { isAuthenticated, isLoading, signOut, user } = useAuth()
  const [isSigningOut, setIsSigningOut] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mx-auto mb-4" />
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    )
  }

  // Always show login page regardless of auth state
  if (pathname === '/admin/login') {
    return children
  }

  // If not authenticated, show a simple message instead of redirecting
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Accès non autorisé</h1>
          <p className="text-gray-600 mb-8">Veuillez vous connecter pour accéder au panneau d'administration.</p>
          <Link
            href="/admin/login"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Se connecter
          </Link>
        </div>
      </div>
    )
  }

  const handleSignOut = async () => {
    try {
      setIsSigningOut(true)
      await signOut()
      // Manual redirect after signout
      window.location.href = '/admin/login'
    } catch (error) {
      console.error('Error signing out:', error)
    } finally {
      setIsSigningOut(false)
    }
  }

  const navigation = [
    { name: 'Tableau de bord', href: '/admin', icon: FaHome },
    { name: 'Mission', href: '/admin/mission', icon: FaCog },
    { name: 'Services', href: '/admin/services', icon: FaTruck },
    { name: 'Détails Services', href: '/admin/service-details', icon: FaFileAlt },
    { name: 'Flotte', href: '/admin/fleet', icon: FaTruck },
    { name: 'Environnement', href: '/admin/environment', icon: FaLeaf },
    { name: 'FAQ', href: '/admin/faq', icon: FaQuestionCircle },
    { name: 'Demandes', href: '/admin/demandes', icon: FaEnvelope },
    { name: 'Page Accueil', href: '/', icon: FaHome },
  ]

  return (
    <>
      <div 
        className={`min-h-screen bg-gray-50 transition-opacity duration-500 ${
          isSigningOut ? 'opacity-0' : 'opacity-100'
        }`}
        style={{
          visibility: isSigningOut ? 'hidden' : 'visible',
          pointerEvents: isSigningOut ? 'none' : 'auto'
        }}
      >
        {/* Sidebar pour mobile */}
        <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
          <div className="fixed inset-y-0 left-0 flex w-64 flex-col bg-white shadow-xl">
            <div className="flex h-16 items-center justify-between px-4 border-b border-gray-200">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-white text-sm font-bold">AWL</span>
                </div>
                <span className="text-lg font-semibold text-gray-900">Admin</span>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FaTimes className="h-6 w-6" />
              </button>
            </div>
            <nav className="flex-1 px-4 py-6 space-y-2">
              {navigation.map((item) => {
                const isActive = pathname === item.href
                const isHomePage = item.href === '/'
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? isHomePage
                          ? 'bg-blue-600 text-white border border-blue-600'
                          : 'bg-blue-50 text-blue-700 border border-blue-200'
                        : isHomePage
                          ? 'text-blue-600 hover:bg-blue-50 hover:text-blue-700'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.name}
                  </Link>
                )
              })}
            </nav>
            <div className="border-t border-gray-200 p-4">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center mr-3">
                  <FaUser className="h-4 w-4 text-gray-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{user?.email}</p>
                  <p className="text-xs text-gray-500">Administrateur</p>
                </div>
              </div>
              <button
                onClick={handleSignOut}
                disabled={isSigningOut}
                className="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors disabled:opacity-50"
              >
                <FaSignOutAlt className="mr-3 h-5 w-5" />
                Déconnexion
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar pour desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
          <div className="flex flex-col flex-grow bg-white border-r border-gray-200">
            <div className="flex h-16 items-center px-4 border-b border-gray-200">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-white text-sm font-bold">AWL</span>
                </div>
                <span className="text-lg font-semibold text-gray-900">Administration</span>
              </div>
            </div>
            <nav className="flex-1 px-4 py-6 space-y-2">
              {navigation.map((item) => {
                const isActive = pathname === item.href
                const isHomePage = item.href === '/'
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? isHomePage
                          ? 'bg-blue-600 text-white border border-blue-600'
                          : 'bg-blue-50 text-blue-700 border border-blue-200'
                        : isHomePage
                          ? 'text-blue-600 hover:bg-blue-50 hover:text-blue-700'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.name}
                  </Link>
                )
              })}
            </nav>
            <div className="border-t border-gray-200 p-4">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center mr-3">
                  <FaUser className="h-4 w-4 text-gray-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{user?.email}</p>
                  <p className="text-xs text-gray-500">Administrateur</p>
                </div>
              </div>
              <button
                onClick={handleSignOut}
                disabled={isSigningOut}
                className="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors disabled:opacity-50"
              >
                <FaSignOutAlt className="mr-3 h-5 w-5" />
                Déconnexion
              </button>
            </div>
          </div>
        </div>

        {/* Contenu principal */}
        <div className="lg:pl-64">
          {/* Header mobile */}
          <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:hidden">
            <button
              type="button"
              className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <FaBars className="h-6 w-6" />
            </button>
            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
              <div className="flex flex-1 items-center">
                <h1 className="text-lg font-semibold text-gray-900">Administration AWL</h1>
              </div>
            </div>
          </div>

          {/* Contenu */}
          <main className="py-6">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              {children}
            </div>
          </main>
        </div>
      </div>
    </>
  )
} 