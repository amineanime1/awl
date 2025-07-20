'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <main className="min-h-screen pt-20 pb-12 flex items-center justify-center">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl font-bold text-red-600 mb-6">
          Une erreur est survenue
        </h1>
        <p className="text-xl text-gray-600 mb-12">
          Désolé, une erreur inattendue s'est produite. Veuillez réessayer.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Réessayer
          </button>
          <Link
            href="/"
            className="bg-gray-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
          >
            Retour à l'accueil
          </Link>
        </div>
      </div>
    </main>
  )
} 