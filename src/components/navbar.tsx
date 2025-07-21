"use client"

import { useState } from 'react'
import Link from 'next/link'
import { FaBars, FaTimes } from 'react-icons/fa'
import { usePathname } from 'next/navigation'
import { useScrollPosition } from '@/hooks/useScrollPosition'

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const { isOnLightSection, transitionProgress } = useScrollPosition()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  // Déterminer les couleurs selon la section
  const isLightMode = isOnLightSection
  
  const navClasses = `fixed w-full z-50 transition-all duration-300 ${
    isLightMode 
      ? 'pt-8 pb-2 backdrop-blur-sm ' 
      : 'py-8 bg-transparent'
  }`
  
  const menuBgClasses = isLightMode 
    ? ' rounded-full py-1 px-1 flex items-center gap-2' 
    : 'bg-white/20 rounded-full py-1 px-1 flex items-center gap-2'

  const linkClasses = (isActive: boolean) => {
    if (isLightMode) {
      return `px-6 py-2 rounded-full font-gantari transition-all text-sm font-semibold ${
        isActive
          ? 'primary-blue-bg text-white'
          : 'text-gray-700 hover:primary-blue-bg hover:text-white'
      }`
    } else {
      return `px-6 py-2 rounded-full font-gantari transition-all text-sm font-semibold ${
        isActive
          ? 'bg-white text-black'
          : 'text-white hover:bg-white hover:text-black'
      }`
    }
  }

  const contactButtonClasses = isLightMode
    ? 'primary-blue-bg flex items-center gap-2 text-white  px-8 py-2 rounded-full font-semibold font-gantari hover:bg-[#0C7EC0] transition-all'
    : 'bg-white/20 flex items-center gap-2 text-white border border-white px-8 py-2 rounded-full font-semibold font-gantari hover:bg-white hover:text-black transition-all'

  const mobileMenuClasses = isLightMode
    ? 'md:hidden absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-sm shadow-lg'
    : 'md:hidden absolute top-full left-0 right-0 mt-2 bg-black/80 backdrop-blur-sm'

  const mobileLinkClasses = (isActive: boolean) => {
    if (isLightMode) {
      return `px-6 py-2 rounded-full font-gantari transition-all ${
        isActive
          ? 'primary-blue-bg text-white'
          : 'text-gray-700 hover:primary-blue-bg hover:text-white'
      }`
    } else {
      return `px-6 py-2 rounded-full font-gantari transition-all ${
        isActive
          ? 'bg-white text-black'
          : 'text-white hover:bg-white hover:text-black'
      }`
    }
  }

  return (
    <nav className={navClasses}>
      <div className="w-[90%] px-4 mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0 relative">
          <img 
            src="/svg/awl-logo-blue.svg"
            alt="AWL Logo"
            className={`w-auto transition-all duration-300 ${
              isLightMode ? 'opacity-0 h-12' : 'opacity-100 h-12'
            } absolute inset-0`}
          />
          <img 
            src="/svg/awl-logo-dark.svg"
            alt="AWL Logo"
            className={`w-auto transition-all duration-300 ${
              isLightMode ? 'opacity-100 h-12' : 'opacity-0 h-12'
            }`}
          />
        </Link>
        
        {/* Navigation Links */}
        <div className={menuBgClasses}>
          {[
            { href: '/', label: 'Home' },
            { href: '/about', label: 'About' },
            { href: '/services', label: 'Works' },
            { href: '/careers', label: 'Careers' },
            { href: '/contact', label: 'Contact' }
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={linkClasses(pathname === link.href)}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {/* Bouton Contact */}
          <Link
            href="/contact"
            className={contactButtonClasses}
          >
            Contact  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className={`lg:hidden transition-colors ${
            isLightMode ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-300'
          }`}
          onClick={toggleMenu}
        >
          {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 mt-2 bg-white shadow-lg border border-gray-200">
            <div className="py-4 flex flex-col">
              {[
                { href: '/', label: 'Home' },
                { href: '/about', label: 'About' },
                { href: '/services', label: 'Works' },
                { href: '/careers', label: 'Careers' },
                { href: '/contact', label: 'Contact' }
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-6 py-3 font-gantari transition-all border-b border-gray-100 last:border-b-0 ${
                    pathname === link.href
                      ? 'bg-blue-50 text-blue-600 font-semibold'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={toggleMenu}
                >
                  {link.label}
                </Link>
              ))}
              
              {/* Contact Button in Mobile Menu */}
              <div className="px-6 pt-4">
                <Link
                  href="/contact"
                  className="primary-blue-bg text-white px-6 py-3 rounded-full font-semibold font-gantari hover:bg-[#0C7EC0] transition-all flex items-center justify-center gap-2"
                  onClick={toggleMenu}
                >
                  Contact
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
} 