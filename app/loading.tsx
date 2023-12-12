"use client";

const Loading = () => {
  return ( 
    <div className="w-full h-full flex items-center justify-center bg-black">
      <div className="flex flex-col gap-y-4">
        <div>
            <svg width="45" height="46" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M36.7597 0.00649569L45 26.8312L22.5 45.2987L3.20175e-06 26.8312L8.24027 0.0064932L36.7597 0.00649569Z" fill="white"/>
            </svg>
        </div>
      </div>
    </div>
  );
}
 
export default Loading;