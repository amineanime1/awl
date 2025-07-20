import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Service = {
  id: string
  title: string
  description: string
  icon: string
  created_at: string
}

export type Message = {
  id: string
  name: string
  email: string
  message: string
  read: boolean
  created_at: string
}

export type Content = {
  id: string
  page: string
  section: string
  content: string
  created_at: string
  updated_at: string
} 