import Header from "@/components/Header";
import AccountForm from "@/components/account-form";
import bg from '@/public/background.png'
import { Database } from "@/types_db";
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export default async function Account() {
  const supabase = createServerComponentClient<Database>({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  return (
    <>
    <title>My Profile - Outline</title>
    <div style={{
      backgroundImage: `url(${bg.src})`,
      width: '100%',
      height: '100%' }} className="bg-cover bg-center flex">
    <Header/>
    <div className="fixed flex top-[50px] h-screen w-full items-start justify-center">
        <div className="bg-black/10 backdrop-blur-[50px] border border-input flex w-[700px] h-[500px] rounded-xl">
          <AccountForm session={session}/>
        </div>
    </div>
    </div>
    </>
  )
}