import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-screen pt-20 pb-12 flex items-center justify-center">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-6xl font-bold text-blue-600 mb-6">404</h1>
        <h2 className="text-3xl font-semibold mb-8">Page non trouvée</h2>
        <p className="text-xl text-gray-600 mb-12">
          Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
        </p>
        <Link
          href="/"
          className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Retour à l'accueil
        </Link>
      </div>
    </main>
  )
} 