import React from 'react';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-white p-0 fixed bottom-0 w-full shadow-md">
      <div className="flex justify-around items-center">
        <div className="flex flex-col items-center">
        <Image 
              src="/home.png" 
              alt="Dish Image" 
              width={32} 
              height={32}
              className="rounded"
            />
        </div>
        <div className="flex flex-col items-center bg-orange-500 p-2 rounded">
        <Image 
              src="/kiosk.png" 
              alt="Dish Image" 
              width={32} 
              height={32} 
              className="rounded"
            />
        </div>
        <div className="flex flex-col items-center">
        <Image 
              src="/userkiosk.png" 
              alt="Dish Image" 
              width={32} 
              height={32} 
              className="rounded"
            />
        </div>
      </div>
    </footer>
  );
}
