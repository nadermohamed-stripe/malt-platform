"use client"

import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import {loadConnectAndInitialize} from '@stripe/connect-js/pure';
import {
  ConnectPayments,
  ConnectComponentsProvider,
  ConnectAccountOnboarding,
} from "@stripe/react-connect-js";
import Navbar from '../home/navbar';



const navigation = [
  { name: 'Product', href: '#' },
  { name: 'Features', href: '#' },
  { name: 'Marketplace', href: '#' },
  { name: 'Company', href: '#' },
]

export default function Onboarding() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [stripeConnectInstance] = useState(() => {
    
    const fetchClientSecret = async () => {
      // Fetch the AccountSession client secret
      const response = await fetch('/api/account-session-manuel', { method: "POST" });
      if (!response.ok) {
        // Handle errors on the client side here
        const {error} = await response.json();
        console.error('An error occurred: ', error);
        document.querySelector('#error').removeAttribute('hidden');
        return undefined;
      } else {
        const {client_secret: clientSecret} = await response.json();
        document.querySelector('#error').setAttribute('hidden', '');
        return clientSecret;
      }
    }

    return loadConnectAndInitialize({
      // This is your test publishable API key.
      publishableKey: "pk_test_51P5nnRJoM91GmNSBW0Kz8PrBd0DD5JXiuc1xzt4DNrRPs30hmZHELz5LLRuZJmASXU0Ar1ZmRvpn0GCLJmHXO5iF005IOUBsQ0",
      fetchClientSecret: fetchClientSecret,
      fonts: [
        {
          cssSrc: "https://fonts.googleapis.com/css2?family=Roboto",
        },
      ],
      appearance: {
        // See all possible variables below
        overlays: "dialog",
        variables: {
          fontFamily: 'Roboto',
          colorPrimary: "#FF0000",
        },
      }
    });
  });


  return (
    <header className="bg-white">
      <Navbar />

      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign up to your account
          </h2>
          <div id="error" hidden></div>
          <div className="container">
            <ConnectComponentsProvider connectInstance={stripeConnectInstance}>
              <ConnectAccountOnboarding />
            </ConnectComponentsProvider>
          </div>
        </div>
      </div>
    </header>
  );
}