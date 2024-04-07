
"use client"
import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Navbar from './navbar'

const navigation = [
  { name: 'Product', href: '#' },
  { name: 'Features', href: '#' },
  { name: 'Marketplace', href: '#' },
  { name: 'Company', href: '#' },
]

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="bg-white-900">
        <Navbar />

      <div className="relative isolate overflow-hidden pt-14 h-screen">
        <img
          src="./homescreen.png"
          alt=""
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />



    </div>
    </div>

  )
}
