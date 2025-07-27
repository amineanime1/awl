"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { FaBars, FaTimes, FaCog } from 'react-icons/fa'
import { usePathname } from 'next/navigation'
import { useScrollPosition } from '@/hooks/useScrollPosition'
import { useAuth } from '@/contexts/AuthContext'

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentHash, setCurrentHash] = useState('')
  const pathname = usePathname()
  const { isOnLightSection, transitionProgress, isInvertedPage } = useScrollPosition()
  const { isAuthenticated } = useAuth()

  // Détecter le hash de l'URL
  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash)
    }

    // Initialiser avec le hash actuel
    setCurrentHash(window.location.hash)
    
    // Écouter les changements de hash
    window.addEventListener('hashchange', handleHashChange)
    
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  // Fermer le menu mobile quand on change de page
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  // Fermer le menu mobile avec la touche Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false)
      }
    }

    if (isMenuOpen) {
      document.addEventListener('keydown', handleEscape)
      // Empêcher le scroll du body quand le menu est ouvert
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  // Fonction pour déterminer si un lien est actif
  const isLinkActive = (href: string) => {
    if (href === '/') {
      // Le lien "Accueil" est actif seulement si on est sur la page d'accueil ET qu'il n'y a pas de hash
      return pathname === '/' && !currentHash
    } else if (href.startsWith('/#')) {
      // Les liens d'ancrage sont actifs si le hash correspond
      return pathname === '/' && currentHash === href
    } else {
      // Les autres liens sont actifs si le pathname correspond
      return pathname === href
    }
  }

  // Déterminer les couleurs selon la section
  // Sur les pages light (/services, /not-found), forcer le mode light SEULEMENT sur desktop
  const isLightMode = (isInvertedPage || isOnLightSection) && typeof window !== 'undefined' && window.innerWidth >= 1024
  
  const navClasses = `fixed w-full z-50 transition-all duration-300 ${
    isLightMode 
      ? 'pt-4 pb-4 backdrop-blur-sm bg-white/80 shadow-sm' 
      : 'py-8 bg-transparent'
  }`
  
  const menuBgClasses = isLightMode 
    ? 'hidden lg:flex rounded-full py-1 px-1 items-center gap-2' 
    : 'hidden lg:flex bg-white/20 rounded-full py-1 px-1 items-center gap-2'

  const linkClasses = (isActive: boolean) => {
    if (isLightMode) {
      return `px-4 lg:px-6 py-2 rounded-full font-gantari transition-all text-sm font-semibold ${
        isActive
          ? 'primary-blue-bg text-white'
          : 'text-gray-700 hover:primary-blue-bg hover:text-white'
      }`
    } else {
      return `px-4 lg:px-6 py-2 rounded-full font-gantari transition-all text-sm font-semibold ${
        isActive
          ? 'bg-white text-black'
          : 'text-white hover:bg-white hover:text-black'
      }`
    }
  }

  const contactButtonClasses = isLightMode
    ? 'primary-blue-bg flex items-center gap-2 text-white px-6 lg:px-8 py-2 rounded-full font-semibold font-gantari hover:bg-[#0C7EC0] transition-all'
    : 'bg-white/20 flex items-center gap-2 text-white border border-white px-6 lg:px-8 py-2 rounded-full font-semibold font-gantari hover:bg-white hover:text-black transition-all'

  // Pour mobile, toujours utiliser le thème sombre
  const mobileMenuClasses = 'fixed inset-0 top-0 left-0 right-0 bg-black/95 backdrop-blur-sm z-50'

  const mobileLinkClasses = (isActive: boolean) => {
    return `px-6 py-4 font-gantari transition-all text-lg ${
      isActive
        ? 'bg-white text-black font-semibold'
        : 'text-white hover:bg-white hover:text-black'
    }`
  }

  return (
    <nav className={navClasses}>
      <div className="w-full max-w-7xl px-4 mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0 relative z-50">
          <img 
            src="/svg/awl-logo-blue.svg"
            alt="AWL Logo"
            className={`w-auto transition-all duration-300 ${
              isLightMode ? 'opacity-0 h-10 lg:h-12' : 'opacity-100 h-10 lg:h-12'
            } absolute inset-0`}
          />
          <img 
            src="/svg/awl-logo-dark.svg"
            alt="AWL Logo"
            className={`w-auto transition-all duration-300 ${
              isLightMode ? 'opacity-100 h-10 lg:h-12' : 'opacity-0 h-10 lg:h-12'
            }`}
          />
        </Link>
        
        {/* Navigation Links - Desktop */}
        <div className={menuBgClasses}>
          {[
            { href: '/', label: 'Accueil' },
            { href: '/services', label: 'Services' },
            { href: '/#fleet', label: 'Véhicules' },
            { href: '/#faq', label: 'FAQ' }
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={linkClasses(isLinkActive(link.href))}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8">
          {/* Lien Admin - visible seulement si connecté */}
          {isAuthenticated && (
            <Link
              href="/admin"
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold font-gantari transition-all ${
                isLightMode
                  ? 'text-gray-700 hover:bg-gray-100'
                  : 'text-white/80 hover:bg-white/20'
              }`}
            >
              <FaCog className="w-4 h-4" />
              <span className="hidden xl:inline">Admin</span>
            </Link>
          )}
          
          {/* Bouton Contact */}
          <Link
            href="/contact"
            className={contactButtonClasses}
          >
            <span className="hidden sm:inline">Contact</span>
            <span className="sm:hidden">Contact</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden transition-colors z-50 text-white hover:text-blue-300"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
        >
          {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className={mobileMenuClasses}>
            {/* Header du menu mobile */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200/20">
              <Link href="/" className="flex-shrink-0 relative" onClick={toggleMenu}>
                <img 
                  src="/svg/awl-logo-dark.svg"
                  alt="AWL Logo"
                  className="h-10 w-auto"
                />
              </Link>
              <button
                className="transition-colors text-white hover:text-blue-300"
                onClick={toggleMenu}
                aria-label="Fermer le menu"
              >
                <FaTimes size={24} />
              </button>
            </div>

            {/* Navigation mobile */}
            <div className="flex flex-col py-8">
              {[
                { href: '/', label: 'Accueil' },
                { href: '/services', label: 'Services' },
                { href: '/#fleet', label: 'Véhicules' },
                { href: '/#faq', label: 'FAQ' }
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={mobileLinkClasses(isLinkActive(link.href))}
                  onClick={toggleMenu}
                >
                  {link.label}
                </Link>
              ))}
              
              {/* Lien Admin dans le menu mobile - visible seulement si connecté */}
              {isAuthenticated && (
                <Link
                  href="/admin"
                  className="px-6 py-4 font-gantari transition-all flex items-center gap-3 text-lg text-white hover:bg-white/10"
                  onClick={toggleMenu}
                >
                  <FaCog className="w-5 h-5" />
                  Admin
                </Link>
              )}
            </div>

            {/* Footer du menu mobile avec bouton contact */}
            <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200/20">
              <Link
                href="/contact"
                className="primary-blue-bg text-white px-6 py-4 rounded-full font-semibold font-gantari hover:bg-[#0C7EC0] transition-all flex items-center justify-center gap-3 text-lg"
                onClick={toggleMenu}
              >
                Contact
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
} 