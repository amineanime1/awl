"use client"

import { FaWhatsapp } from 'react-icons/fa'

export function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/your-number"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors z-50"
      aria-label="Contactez-nous sur WhatsApp"
    >
      <FaWhatsapp size={32} />
    </a>
  )
} 