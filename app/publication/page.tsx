"use client";

import { useState } from 'react';

import Header from "@/components/Header";
import bg from '@/public/background.png'

export default function Home() {

    const [file, setFile] = useState(null); 
    const handleFileChange = (event: any) => { setFile(event.target.files[0]); }; 
    const handleFormSubmit = async (event: any) => { event.preventDefault(); 
    const formData = new FormData(); 
    formData.append('file', file); 
    try { 
        const response = await fetch('/api/processDocument', { 
            method: 'POST', 
            body: formData, 
        }); 
    if (response.ok) { 
        const result = await response.json(); console.log(result); 
    } else { 
        console.error('Error processing document:', response.statusText); } 
    } catch (error) { console.error('Error processing document:', error); } };


  return (
    <div style={{
      backgroundImage: `url(${bg.src})`,
      width: '100%',
      height: '100%' }} className="bg-cover bg-center flex">
    <Header/>
    <form onSubmit={handleFormSubmit} className='mt-12'> 
        <input type="file" accept=".pdf" onChange={handleFileChange} /> 
        <button type="submit">Submit</button> 
    </form>
    </div>
  )
}