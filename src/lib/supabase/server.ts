import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'

// Variables publiques (accessibles côté client)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Variable privée (seulement côté serveur) - SANS NEXT_PUBLIC !
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

// Fonction pour créer le client Supabase côté serveur (avec service role)
export function createServerSupabaseClient() {
  if (!supabaseUrl || !supabaseServiceKey) {
    console.warn('Variables d\'environnement Supabase manquantes - utilisation des données par défaut')
    console.warn('NEXT_PUBLIC_SUPABASE_URL:', !!supabaseUrl)
    console.warn('SUPABASE_SERVICE_ROLE_KEY:', !!supabaseServiceKey)
    return null
  }
  
  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  })
}

// Fonction pour créer le client Supabase côté client (avec anon key)
export function createClientSupabaseClient() {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Variables d\'environnement Supabase publiques manquantes')
    return null
  }
  
  return createClient(supabaseUrl, supabaseAnonKey)
}

// Types pour les données
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
  image_url?: string // URL de l'image Cloudinary (optionnel)
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

// Fonctions pour récupérer les données (côté serveur uniquement)
export async function getMissionData(): Promise<MissionData> {
  const supabase = createServerSupabaseClient()
  
  if (!supabase) {
    return {
      quote_text: '"Livrer vite, bien, et toujours à l\'heure — c\'est notre promesse."',
      image_url: '/images/awl-mission.png',
      image_alt: 'AWL Mission'
    }
  }
  
  const { data, error } = await supabase
    .from('mission_section')
    .select('*')
    .single()

  if (error) {
    console.error('Erreur lors de la récupération des données Mission:', error)
    // Retourner des données par défaut en cas d'erreur
    return {
      quote_text: '"Livrer vite, bien, et toujours à l\'heure — c\'est notre promesse."',
      image_url: '/images/awl-mission.png',
      image_alt: 'AWL Mission'
    }
  }

  return data
}

export async function getServicesData(): Promise<ServiceData[]> {
  const supabase = createServerSupabaseClient()
  
  if (!supabase) {
    return []
  }
  
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('is_active', true)
    .order('display_order', { ascending: true })

  if (error) {
    console.error('Erreur lors de la récupération des services:', error)
    return []
  }

  return data || []
}

export async function getFleetData(): Promise<FleetVehicleData[]> {
  const supabase = createServerSupabaseClient()
  
  if (!supabase) {
    return []
  }
  
  const { data, error } = await supabase
    .from('fleet_vehicles')
    .select('*')
    .eq('is_active', true)
    .order('display_order', { ascending: true })

  if (error) {
    console.error('Erreur lors de la récupération de la flotte:', error)
    return []
  }

  return data || []
}

export async function getEnvironmentalData(): Promise<EnvironmentalCommitmentData[]> {
  const supabase = createServerSupabaseClient()
  
  if (!supabase) {
    return []
  }
  
  const { data, error } = await supabase
    .from('environmental_commitments')
    .select('*')
    .eq('is_active', true)
    .order('display_order', { ascending: true })

  if (error) {
    console.error('Erreur lors de la récupération des engagements environnementaux:', error)
    return []
  }

  return data || []
}

export async function getFaqData(): Promise<FaqItemData[]> {
  const supabase = createServerSupabaseClient()
  
  if (!supabase) {
    return []
  }
  
  const { data, error } = await supabase
    .from('faq_items')
    .select('*')
    .eq('is_active', true)
    .order('display_order', { ascending: true })

  if (error) {
    console.error('Erreur lors de la récupération de la FAQ:', error)
    return []
  }

  return data || []
}

// Fonction pour récupérer toutes les données en une fois
export async function getAllPageData() {
  try {
    const [missionData, servicesData, fleetData, environmentalData, faqData] = await Promise.all([
      getMissionData(),
      getServicesData(),
      getFleetData(),
      getEnvironmentalData(),
      getFaqData()
    ])

    return {
      missionData,
      servicesData,
      fleetData,
      environmentalData,
      faqData
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des données:', error)
    // Retourner des données par défaut
    return {
      missionData: {
        quote_text: '"Livrer vite, bien, et toujours à l\'heure — c\'est notre promesse."',
        image_url: '/images/awl-mission.png',
        image_alt: 'AWL Mission'
      },
      servicesData: [],
      fleetData: [],
      environmentalData: [],
      faqData: []
    }
  }
} 