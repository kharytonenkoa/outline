"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useUser } from "@/hooks/useUser"
import { useCallback, useEffect, useState } from "react"
import Avatar from "../avatar"
import { Label } from "../ui/label"
import { DialogDescription } from "../ui/dialog"
import { Session, createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Database } from "@/types_db"

export default function AccountForm() {
  const supabase = createClientComponentClient<Database>()
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState<string | null>(null)
  const [bio, setBio] = useState<string | null>(null)
  const [avatar_url, setAvatarUrl] = useState<string | null>(null)
  const { user, userDetails } = useUser();

  const getProfile = useCallback(async () => {
    try {
      setLoading(true)

      if (userDetails) {
        setUsername(userDetails?.username)
        setBio(userDetails?.bio)
        setAvatarUrl(userDetails?.avatar_url)
      }
    } catch (error) {
      alert('Error loading user data!')
    } finally {
      setLoading(false)
    }
  }, [ user, supabase])

  useEffect(() => {
    getProfile()
  }, [user, getProfile])

  async function updateProfile({
    username,
    bio,
    avatar_url,
  }: {
    username: string | null
    bio: string | null
    avatar_url: string | null
  }) {
    try {
      setLoading(true)

      const { error } = await supabase.from('users').upsert({
        id: user?.id as string,
        username,
        bio,
        avatar_url,
        updated_at: new Date().toISOString(),
      })
      if (error) throw error
      alert('Profile updated!')
    } catch (error) {
      alert('Error updating the data!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
    <div className="flex items-start w-full h-[60px]">
        <p className="font-semibold text-xl">Account</p>
    </div>
      <div className="space-y-8 w-[600px]">
        <div className="flex flex-row gap-x-4">
        <Avatar
          uid={user?.id}
          url={avatar_url}
          size={100}
          onUpload={(url) => {
            setAvatarUrl(url)
          }}
        />
        <div>
              <Label>Username</Label>
                <Input placeholder={"username"} defaultValue={userDetails?.username} 
                onChange={(e) => setUsername(e.target.value)} className="border border-white/40 bg-black/20"/>
              <DialogDescription>
                This is your public display name.
              </DialogDescription>
        </div>
        </div>
        <div>
              <Label>Bio</Label>
                <Textarea
                  placeholder="Tell us a little bit about yourself"
                  defaultValue={userDetails?.bio}
                  className="resize-none"
                />
              <DialogDescription>
                Maximum 100 characters
              </DialogDescription>
        </div>
        <Button
        onClick={() => updateProfile({ username, bio, avatar_url })}
        disabled={loading}
        >{loading ? 'Loading ...' : 'Update profile'}</Button>
      </div>
    </>
  )
}