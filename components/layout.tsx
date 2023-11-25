"use client";
import Header from '@/components/Header';
import bg from '@/public/background.png'

interface PageProps {
  children: React.ReactNode;
}

const layout = ({ children }: PageProps) => {
  return ( <div style={{
    backgroundImage: `url(${bg.src})`,
    width: '100%',
    height: '100%' }} className="bg-cover bg-center flex">
    <Header />
    <main className='h-screen flex'>
      {children}
    </main>
  </div> );
}
 
export default layout;