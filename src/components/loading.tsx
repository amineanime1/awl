import Image from 'next/image'

export function Loading() {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="flex flex-col items-center space-y-6">
        {/* Logo AWL avec animation de pulsation */}
        <div className="relative">
          <Image
            src="/svg/awl-logo-icon.svg"
            alt="AWL Logo"
            width={120}
            height={60}
            className="animate-pulse"
          />
          <div className="absolute inset-0 bg-blue-600/20 rounded-full animate-ping"></div>
        </div>
        
        {/* Barre de progression animée */}
        <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-blue-600 to-blue-800 rounded-full animate-pulse">
            <div className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full animate-shimmer"></div>
          </div>
        </div>
        
        {/* Texte de chargement */}
        <div className="text-center space-y-2">
          <p className="text-gray-600 font-medium">Chargement en cours...</p>
          <p className="text-sm text-gray-500">Veuillez patienter</p>
        </div>
        
        {/* Points animés */}
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  )
} 