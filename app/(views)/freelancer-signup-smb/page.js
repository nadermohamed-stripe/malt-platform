"use client"

import React from 'react';
import { useRouter } from 'next/navigation';

// Assuming you have already built the Navbar component
import Navbar from '../home/navbar';
import Combo from '@/app/components/Combo';
import { useState } from 'react';

const WebsitePage = () => {
  const [currentScreen, setCurrentScreen] = useState(1);
  const router = useRouter();

  const handleFollowingClick = () => {
    if (currentScreen === 1) {
      setCurrentScreen(2);
    } else {
      router.push('/onboarding-smb');
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar Component */}
      <Navbar />

      {/* Horizontal Layout */}
      <div className="flex-grow flex border-t-4">
        {/* Left Part (2/3) */}
        <div className="w-2/3 bg-white-200 relative">
          {/* Content for the left part */}
          {currentScreen === 1 && (
            <img src="./rhs.png" alt="LHS Image" className="w-full" />
          )}

          {/* Screen Content */}
          {currentScreen === 2 && (
            <div>
              <img src="./rhs2.png" alt="LHS Image" className="w-full" />
            </div>
          )}

          {/* Next Button */}
          <div className="absolute bottom-4 right-4">
            <button
              className="bg-rose-500 hover:bg-rose-700 text-white py-2 px-8 rounded-full"
              onClick={handleFollowingClick}
            >
              Next
            </button>
          </div>
        </div>

        {/* Right Part (1/3) */}
        <div className="w-1/3 bg-gray-300">
          {/* Content for the right part goes here */}
          <img src="./lhs.png" alt="LHS Image" className="w-full" />
        </div>
      </div>
    </div>
  );
};

export default WebsitePage;