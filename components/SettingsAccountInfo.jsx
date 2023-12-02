import { useCallback, useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default async function SettingsAccountInfo({ session }) {
  const supabase = createClientComponentClient()
  const [loading, setLoading] = useState(true)
  const [fullname, setFullname] = useState(null)
  const [username, setUsername] = useState(null)
  const [avatar_url, setAvatarUrl] = useState(null)
  const user = session?.user

  const getProfile = useCallback(async () => {
    try {
      setLoading(true)

      const { data, error, status } = await supabase
        .from('users')
        .select(`full_name, username, avatar_url`)
        .eq('id', user?.id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setFullname(data.full_name)
        setUsername(data.username)
        setAvatarUrl(data.avatar_url)
      }
    } catch (error) {
      alert('Error loading user data!')
    } finally {
      setLoading(false)
    }
  }, [user, supabase])

  useEffect(() => {
    getProfile()
  }, [user, getProfile])
  
    return ( 
        <div className="flex flex-row gap-x-2 h-[40px] w-full px-2 select-none">
            <div className="flex w-[35px] h-[35px] rounded-full bg-white"></div>
            <div className="flex flex-col">
              <p className="font-semibold text-xs text-white/40">{fullname || ''}</p>
              <p className="font-regular text-xs text-white/40">{username || ''}</p>
            </div>
          </div>
     );
}