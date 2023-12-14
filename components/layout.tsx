"use client";

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