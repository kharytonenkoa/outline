'use client'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useSupabaseClient } from '@supabase/auth-helpers-react'

export default function AuthForm() {
  const supabaseClient = useSupabaseClient();

  return (
    <Auth
      supabaseClient={supabaseClient}
      providers={['google']}
      magicLink={false}
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
      redirectTo="http://localhost:3000/"
    />
  )
}