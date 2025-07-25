import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://qrcmkaasinccmazkhjos.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFyY21rYWFzaW5jY21hemtoam9zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMzMjI3MzMsImV4cCI6MjA2ODg5ODczM30.A0bqHs5oAogDsZ7gsmN9XeQaic38nCmshuj_fb3oV9M'

export const supabase = createClient(supabaseUrl, supabaseKey)

export interface BusinessProfile {
  id: string
  business_name: string
  email: string
  description: string
  images: string[]
  created_at: string
}

export interface AdminUser {
  id: string
  email: string
  password_hash: string
}