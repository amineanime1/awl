"use client"

import { useState } from 'react'
import Link from 'next/link'
import { FaBars, FaTimes } from 'react-icons/fa'
import { usePathname } from 'next/navigation'

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav className="fixed w-full z-50 py-8">
      <div className="w-[90%] px-4 mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <img 
            src="/svg/awl-logo-blue.svg"
            alt="AWL Logo"
            className="h-12 w-auto"
          />
        </Link>
        <div className="bg-white/20 rounded-full px-2 py-1.5 flex items-center gap-1">
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
                className={`px-6 py-1.5 rounded-full font-gantari transition-all text-sm font-semibold ${
                  pathname === link.href
                    ? 'bg-white text-black'
                    : 'text-white hover:bg-white hover:text-black'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-12">
          {/* Navigation Links avec fond semi-transparent */}
       

          {/* Bouton Contact */}
          <Link
            href="/contact"
            className="bg-white/20 flex items-center gap-2 text-white border border-white px-8 py-1.5 rounded-full font-semibold font-gantari hover:bg-white hover:text-black transition-all"
          >
            Contact  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white hover:text-blue-300 transition-colors"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 mt-2 bg-black/80 backdrop-blur-sm">
            <div className="w-[90%] mx-auto py-6 flex flex-col gap-4">
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
                  className={`px-6 py-2 rounded-full font-gantari transition-all ${
                    pathname === link.href
                      ? 'bg-white text-black'
                      : 'text-white hover:bg-white hover:text-black'
                  }`}
                  onClick={toggleMenu}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
} 