import { NextResponse } from 'next/server'
import { getAllPageData } from '@/lib/supabase/server'
import { defaultPageData } from '@/lib/default-data'

export async function GET() {
  try {
    const data = await getAllPageData()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Erreur API page-data:', error)
    // Retourner les données par défaut en cas d'erreur
    return NextResponse.json(defaultPageData)
  }
} 