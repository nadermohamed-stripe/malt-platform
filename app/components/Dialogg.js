import React, { Fragment, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import {
  BanknotesIcon,
  BuildingOfficeIcon,
  CheckCircleIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/20/solid'

export default function Dialogg({isOpen, setIsOpen}) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const projects = [
    {
      name: 'Web Design Project',
      amount: '$5,000',
      customer: 'Acme Inc.',
      freelancers: [
        { name: 'John Doe', amount: '$3,000' },
        { name: 'Jane Smith', amount: '$2,000' }
      ],
      description: 'Design a modern and responsive website for Acme Inc.',
      timeline: 'April 1, 2023 - May 15, 2023',
      status: 'In Progress',
    },
    /* ...other projects... */
  ]

  const handleButtonClick = async () => {
    setIsLoading(true);
    setIsSuccess(false);

    try {
      const response = await fetch('/api/cpt1', { method: 'POST' });
      const data = await response.json();
      if (response.ok && data.Transfer) {
        setTimeout(() => {
          setIsLoading(false); // Stop the spinner
          setIsSuccess(true); // Show success checkmark
          
          setTimeout(() => {
            setIsSuccess(false); // Reset success for next time
            setIsOpen(false); // Close the dialog
          }, 2000); // Show success for 2 seconds then close dialog
        }, 2000); // Assume showing spinner for 2 seconds for demo
      } else {
        setIsLoading(false);
        console.error('Transfer failed:', data.error);
      }
    } catch (error) {
      setIsLoading(false);
      console.error('Error processing transfer:', error);
    }
  };

  return (
    <>
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog as="div" onClose={() => setIsOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="fixed inset-0 overflow-y-auto">
            <div className="fixed inset-0 overflow-y-auto" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>

                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel className="relative bg-white p-4 shadow-xl sm:max-w-lg sm:w-full sm:p-6 sm:rounded-lg">
                  {isLoading ? (
                    <div className="spinner-container">
                      <div className="spinner" />
                    </div>
                  ) : isSuccess ? (
                    <div className="flex items-center justify-center h-full">
                      <div className="flex flex-col items-center justify-center space-y-4">
                        <CheckCircleIcon className="h-24 w-24 text-green-600 checkmark" aria-hidden="true" />
                        <p className="text-xl font-medium">Success</p>
                      </div>
                    </div>
                  ) : (
                      <>
                        <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                          {projects[0].name} 
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">{projects[0].description}</p>
                          <p className="mt-4 text-sm text-gray-600">Customer: {projects[0].customer}</p>
                          <p className="mt-2 text-sm text-gray-600">Amount: {projects[0].amount}</p>
                          <p className="mt-2 text-sm text-gray-600">Timeline: {projects[0].timeline}</p>
                          <div className="mt-4">
                            <h4 className="text-sm font-medium text-gray-900">Freelancers Payments:</h4>
                            <ul className="mt-2">
                              {projects[0].freelancers.map(freelancer => (
                                <li key={freelancer.name} className="text-sm text-gray-500">{freelancer.name} - {freelancer.amount}</li>
                              ))}
                            </ul>
                          </div>
                          <div className="mt-5">
                            <img src="https://via.placeholder.com/400x200?text=Gantt+Chart+Placeholder" alt="Gantt Chart" className="mx-auto" />
                            <p className="mt-2 text-xs text-gray-400">* This is a placeholder image representing a Gantt chart.</p>
                          </div>
                        </div>
                      </>
                    )}
                    <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:col-start-2 sm:text-sm"
                        onClick={handleButtonClick}
                      >
                        Accept
                      </button>
                      <button
                        type="button"
                        className="mt-3 inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                        onClick={() => setIsOpen(false)}
                      >
                        Deny
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>

              </div>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition.Root>
    </>
  )
}