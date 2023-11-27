'use client'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/types_db'

export default function AuthForm() {
  const supabase = createClientComponentClient<Database>()

  return (
    <Auth
      supabaseClient={supabase}
      providers={['google']}
      magicLink={true}
      appearance={{
        theme: ThemeSupa,
        variables: {
          default: {
            colors: {
              brandButtonText: 'black',
              brand: '#000000',
              brandAccent: '#e5e5e5'
            }
          }
        }
      }}
      theme="dark"
      showLinks={false}
      redirectTo="http://localhost:3000/auth/callback"
    />
  )
}