"use client"
import Header from "@/components/Header"
import { Document, Page } from 'react-pdf';
import Background from "@/components/Wallpaper"
import { useState } from "react";


export default function Test() {
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);


  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }
  const pdfURL = 'example.pdf';
  return (
    <>
    
        <>
          <Background/>
          <Header/>
            <div className="fixed top-[50px] h-full w-full">
            <Document file="example.pdf" onLoadSuccess={onDocumentLoadSuccess}>
              <Page pageNumber={pageNumber} />
            </Document> 
            </div>
        </>
      </>
  )
}