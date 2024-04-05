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
      router.push('/onboarding');
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar Component */}
      <Navbar />

      {/* Horizontal Layout */}
      <div className="flex-grow flex">
        {/* Left Part (2/3) */}
        <div className="w-2/3 bg-gray-200 p-4 relative">
          {/* Content for the left part */}
          <h2 className="text-2xl font-bold mb-4">Left Part</h2>
          {currentScreen === 1 && (
            <p>This is the left part of the page FIRST SCREEN, occupying 2/3 of the width.</p>
          )}

          {/* Screen Content */}
          {currentScreen === 2 && (
            <div>
              <p>This is the left part of the page SECOND SCREEN, occupying 2/3 of the width.</p>
            </div>
          )}

          {/* Following Button */}
          <div className="absolute bottom-4 right-4">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleFollowingClick}
            >
              Following
            </button>
          </div>
        </div>

        {/* Right Part (1/3) */}
        <div className="w-1/3 bg-gray-300 p-4">
          {/* Content for the right part goes here */}
          <h2 className="text-2xl font-bold mb-4">Right Part</h2>
          <p>This is the right part of the page, occupying 1/3 of the width.</p>
        </div>
      </div>
    </div>
  );
};

export default WebsitePage;