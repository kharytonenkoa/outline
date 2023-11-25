"use client";

import { Toaster } from "react-hot-toast";

const ToasterProvider = () => {
  return ( 
    <Toaster 
      toastOptions={{
        style: {
          background: 'white',
          color: '#fff',
        }
      }}
    /> 
  );
}
 
export default ToasterProvider;