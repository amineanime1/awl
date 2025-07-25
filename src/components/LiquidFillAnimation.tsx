'use client'

interface LiquidFillAnimationProps {
  isLoading: boolean
  color?: string
}

export default function LiquidFillAnimation({ isLoading, color = "#0066FF" }: LiquidFillAnimationProps) {
  if (!isLoading) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-90">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 bg-blue-600 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  )
} 