import { createClient } from '@supabase/supabase-js'

// Variables publiques (accessibles côté client)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Client Supabase côté client (avec anon key)
export const supabase = createClient(
  supabaseUrl || '',
  supabaseAnonKey || ''
)

// Types pour les données (réexportés depuis server.ts)
export interface MissionData {
  quote_text: string
  image_url: string
  image_alt: string
}

export interface ServiceData {
  id: number
  title: string
  description: string
  icon_name: string
  color_class: string
  display_order: number
  is_active: boolean
}

export interface FleetVehicleData {
  id: number
  name: string
  description: string
  image_url: string
  image_alt: string
  display_order: number
  is_active: boolean
}

export interface EnvironmentalCommitmentData {
  id: number
  title: string
  description: string
  details: string
  emoji: string
  image_alt: string
  display_order: number
  is_active: boolean
}

export interface FaqItemData {
  id: number
  question: string
  answer: string
  display_order: number
  is_active: boolean
} 