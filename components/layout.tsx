"use client";
import Header from '@/components/Header';
import bg from '@/public/background.png'

interface PageProps {
  children: React.ReactNode;
}

const layout = ({ children }: PageProps) => {
  return ( 
    <>
    <main className='h-screen flex'>
      {children}
    </main>
    </>
    );
}
 
export default layout;