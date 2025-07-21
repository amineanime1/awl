import { CheckCircle, FileText, ThumbsUp, ThumbsDown, Volume2, Edit, Upload, RotateCcw, ChevronDown } from 'lucide-react'

interface AIModel {
  name: string
  imageSupport: boolean
  bestFor: string[]
}

const aiModels: AIModel[] = [
  {
    name: 'GPT-4o',
    imageSupport: true,
    bestFor: ['UI → code', 'OCR', 'diagrams']
  },
  {
    name: 'GPT-4.1 Vision',
    imageSupport: true,
    bestFor: ['Similar to 4o', 'slower']
  },
  {
    name: 'Claude 4 Opus',
    imageSupport: true,
    bestFor: ['PDFs', 'design-to-code']
  },
  {
    name: 'Gemini 2.5 Pro',
    imageSupport: true,
    bestFor: ['UI screenshots', 'form-based UIs']
  }
]

export default function AIModelsComparison() {
  return (
    <section className="bg-gray-900 text-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-sm text-gray-400">03-pro</span>
          </div>
          <div className="flex items-center gap-2 mb-6">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <h2 className="text-2xl font-bold">TL;DR — Use these for image to code:</h2>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="bg-gray-800 rounded-lg overflow-hidden mb-8">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-700">
                  <th className="px-6 py-4 text-left font-semibold">Model</th>
                  <th className="px-6 py-4 text-left font-semibold">Image Support</th>
                  <th className="px-6 py-4 text-left font-semibold">Best For</th>
                </tr>
              </thead>
              <tbody>
                {aiModels.map((model, index) => (
                  <tr key={model.name} className={index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-750'}>
                    <td className="px-6 py-4 font-medium">{model.name}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>{model.name === 'GPT-4.1 Vision' ? 'Yes (if enabled)' : 'Yes'}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {model.bestFor.map((useCase, idx) => (
                          <span
                            key={idx}
                            className="inline-block bg-gray-700 px-2 py-1 rounded text-sm"
                          >
                            {useCase}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-300 mb-8 leading-relaxed">
          Want to upload a specific image to test how one of these models would handle the code extraction? 
          I can walk you through how to use each model with it, or even show a sample result.
        </p>

        {/* Action Icons */}
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
            <FileText className="w-5 h-5" />
          </button>
          <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
            <ThumbsUp className="w-5 h-5" />
          </button>
          <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
            <ThumbsDown className="w-5 h-5" />
          </button>
          <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
            <Volume2 className="w-5 h-5" />
          </button>
          <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
            <Edit className="w-5 h-5" />
          </button>
          <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
            <Upload className="w-5 h-5" />
          </button>
          <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
            <RotateCcw className="w-5 h-5" />
          </button>
          <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
            <ChevronDown className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  )
} 