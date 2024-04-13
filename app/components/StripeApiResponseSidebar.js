import { Fragment, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { CogIcon } from '@heroicons/react/24/outline';
import { XMarkIcon } from '@heroicons/react/24/outline';

const StripeApiResponseSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [apiResponses, setApiResponses] = useState([]);

  useEffect(() => {
    // Retrieve API responses from localStorage
    const storedResponses = localStorage.getItem('stripeApiResponses');
    if (storedResponses) {
      setApiResponses(JSON.parse(storedResponses));
    }
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        type="button"
        className="fixed bottom-4 left-4 z-50 bg-gray-800 text-white p-2 rounded-full"
        onClick={toggleSidebar}
      >
        <CogIcon className="h-6 w-6" />
      </button>

      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 overflow-hidden z-50" onClose={toggleSidebar}>
          <div className="absolute inset-0 overflow-hidden">
            <Transition.Child
              as={Fragment}
              enter="ease-in-out duration-500"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in-out duration-500"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="absolute inset-0 bg-black bg-opacity-80 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex sm:pl-16">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <div className="w-screen max-w-md">
                  <div className="h-full flex flex-col bg-black text-white font-mono">
                    <div className="px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium">API Responses</Dialog.Title>
                        <div className="ml-3 h-7 flex items-center">
                          <button
                            type="button"
                            className="bg-black rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            onClick={toggleSidebar}
                          >
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 py-6 overflow-y-auto">
                      <div className="space-y-6 px-4 sm:px-6">
                        {apiResponses.map((response, index) => (
                          <div key={index} className="bg-gray-900 p-4 rounded-md">
                            <pre className="text-sm text-white">{JSON.stringify(response, null, 2)}</pre>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default StripeApiResponseSidebar;