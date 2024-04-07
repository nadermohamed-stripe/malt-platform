"use client"

import React from 'react';
import Image from 'next/image';
import Navbar from '../home/navbar';
import { useRouter } from 'next/navigation';

export default function Select() {
  const router = useRouter();

  const handleFreelancerClick = () => {
    router.push('/freelancer-signup');
  };

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <main className="bg-gray-100 flex-grow flex flex-col justify-center items-center px-8">
        <h1 className="text-2xl font-bold mb-8 text-stone-700">
          <span>What kind of account would you like to create?</span>
        </h1>
        <div className="flex gap-8">
          <div className="bg-white rounded-lg shadow-md overflow-hidden w-72 cursor-pointer">
            <div className="p-8">
              <div className="flex justify-center mb-4">
                <Image src="/man.svg" alt="Malt" width={100} height={100} />
              </div>
              <div className="text-center">
                <h2 className="text-lg font-bold mb-2 text-stone-700">Company</h2>
                <p className="text-gray-600">Find the right talent for your business.</p>
              </div>
            </div>
          </div>
          <div
            className="bg-white rounded-lg shadow-md overflow-hidden w-72 cursor-pointer"
            onClick={handleFreelancerClick}
          >
            <div className="p-8">
              <div className="flex justify-center mb-4">
                <Image src="/woman.svg" alt="Malt" width={100} height={100} />
              </div>
              <div className="text-center">
                <h2 className="text-lg font-bold mb-2 text-stone-700">Freelancer</h2>
                <p className="text-gray-600">Grow your freelance business with Malt.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 text-gray-600 mt-8">
          <i className="icon-rocket"></i>
          <span>Malt Strategy</span>
          <a href="/c/maltstrategy/consultants" className="text-gray-800 hover:text-gray-900">
            Learn More
          </a>
        </div>
        <div className="flex items-center gap-2 text-gray-600 mt-4">
          <span>Already have an account?</span>
          <a href="/signin" className="text-gray-800 hover:text-gray-900">
            Sign in
          </a>
        </div>
      </main>
    </div>
  );
}