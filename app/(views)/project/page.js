"use client"
import { Fragment, useState, useRef, useEffect } from 'react'
import { Dialog, Menu, Transition } from '@headlessui/react'
import {
  Bars3CenterLeftIcon,
  BellIcon,
  ClockIcon,
  CogIcon,
  CreditCardIcon,
  DocumentChartBarIcon,
  HomeIcon,
  QuestionMarkCircleIcon,
  ScaleIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import {
  BanknotesIcon,
  BuildingOfficeIcon,
  CheckCircleIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/20/solid'

const navigation = [
  { name: 'Dashboard', href: '#', icon: HomeIcon, current: false },
  { name: 'Inbox', href: '#', icon: ClockIcon, current: false },
  { name: 'Enhance My Profile', href: '#', icon: ScaleIcon, current: false },
  { name: 'Manage My Projects', href: '#', icon: CreditCardIcon, current: false },
  { name: 'Invoices & Payments', href: '#', icon: UserGroupIcon, current: false },
];

const statusStyles = {
  Complete: 'bg-green-100 text-green-800 rounded-2xl',
  processing: 'bg-yellow-100 text-yellow-800 rounded-2xl',
  failed: 'bg-gray-100 text-gray-800 rounded-2xl',
}

const secondaryNavigation = [
  { name: 'My Business', href: '#', icon: CogIcon },
  { name: 'Resources', href: '#', icon: QuestionMarkCircleIcon },
  { name: 'My settings', href: '#', icon: ShieldCheckIcon },
];

const freelancersData = [
    {
      id: 1,
      name: 'Molly Sanders 🇫🇷',
      role: 'Web Designer',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      status: 'Complete',
      amount: 1000
    },
    {
      id: 2,
      name: 'John Doe 🇺🇸',
      role: 'Mobile Developer',
      avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      status: 'processing',
      amount: 2000
    },
];

const hardcodedData = {
  InvoiceID: "XXXXX",
  CustomerID: "cus_Poua0y0f9Xxlip",
  Amount: 1000,
  Destination: "acct_1OzGt6GPyjqeiImv"
};

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ProjectDetails() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [freelancers, setFreelancers] = useState(freelancersData); // Use the initial freelancers data
  const [projectAmount, setProjectAmount] = useState(null);
  const [selectedFreelancer, setSelectedFreelancer] = useState(null);
  const cancelButtonRef = useRef(null);

  const setUpdatedFreelancers = (updatedFreelancers) => {
    setFreelancers(updatedFreelancers);
  };

  useEffect(() => {
    const fetchProjectAmount = async () => {
      try {
        const response = await fetch('/api/get-amounts');
        const data = await response.json();
        setProjectAmount(data.amount);
      } catch (error) {
        console.error('Error fetching project amount:', error);
      }
    };

    fetchProjectAmount();
  }, []);

  const handleTransferClick = (freelancer) => {
    setOpen(true);
    setSelectedFreelancer(freelancer);
  };
  const handleConfirmTransfer = async () => {
    try {
      console.log('handleConfirmTransfer called');
      console.log('selectedFreelancer:', selectedFreelancer);

      const response = await fetch("/api/fpt2", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(hardcodedData),
      });
      const data = await response.json();
      console.log("Transfer successful:", data);
      setOpen(false);

      // Update the status of the selected freelancer
      console.log('Updating freelancers array');
      const updatedFreelancers = freelancers.map((freelancer) =>
        freelancer.id === selectedFreelancer.id
          ? { ...freelancer, status: 'Complete' }
          : freelancer
      );
      console.log('Updated freelancers array:', updatedFreelancers);
      setUpdatedFreelancers(updatedFreelancers);
    } catch (error) {
      console.error("Error transferring funds:", error);
    }
  };

  const project = {
    name: 'Web Design Project',
    client: 'Acme Inc.',
    description: (
      <div>
        <p>Acme Inc. has tasked us with designing a modern and responsive website that will showcase their innovative products and services in a visually appealing way. The website should be easy to navigate, with a clean and intuitive user interface that aligns with Acme brand identity.</p>
        <div className="mt-4 border-t border-gray-200 pt-4">
          <h4 className="text-sm font-medium text-gray-900">Key Project Requirements:</h4>
          <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-gray-500">
            <li>Develop a responsive design that adapts seamlessly across desktop, tablet, and mobile devices</li>
            <li>Incorporate Acme branding guidelines, including their logo, color palette, and typography</li>
            <li>Design an interactive product showcase with high-quality images, detailed descriptions, and smooth transitions</li>
            <li>Implement a user-friendly contact form to facilitate inquiries and lead generation</li>
            <li>Optimize website performance and page load times for a smooth user experience</li>
          </ul>
        </div>
        <div className="mt-4 border-t border-gray-200 pt-4">
          <h4 className="text-sm font-medium text-gray-900">Project Value:</h4>
          <p className="mt-2 text-sm text-gray-500">
            By delivering a modern and responsive website that effectively communicates Acme unique value proposition, we aim to help them attract more customers, increase engagement, and ultimately drive business growth. The project will be completed within the agreed timeline and budget, ensuring a successful collaboration between our teams.
          </p>
        </div>
      </div>
    ),
    status: 'In Progress',
    deadline: 'May 15, 2023',
    amount: '$5,000',
  }

  return (
    <>
      <div className="min-h-full">
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog as="div" className="relative z-40 lg:hidden" onClose={setSidebarOpen}>
            {/* Sidebar content */}
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
          <div className="flex flex-grow flex-col overflow-y-auto bg-white shadow-lg pb-4 pt-5">
            <div className="flex flex-shrink-0 items-center px-4">
              <img
                className="h-8 w-auto"
                src='./malt-logo-red.svg'
                alt="Easywire logo"
              />
            </div>
            <nav className="mt-5 flex flex-1 flex-col divide-y divide-gray-200 overflow-y-auto" aria-label="Sidebar">
              <div className="space-y-5 px-2">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      item.current ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                      'group flex items-center rounded-md px-2 py-2 text-sm font-medium leading-6'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    <item.icon className="mr-4 h-6 w-6 flex-shrink-0 text-gray-400" aria-hidden="true" />
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="mt-8 pt-8">
                <div className="space-y-5 px-2">
                  {secondaryNavigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="group flex items-center rounded-md px-2 py-2 text-sm font-medium leading-6 text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    >
                      <item.icon className="mr-4 h-6 w-6 text-gray-400" aria-hidden="true" />
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
            </nav>
          </div>
        </div>

        <div className="flex flex-1 flex-col lg:pl-64">
          {/* Header code */}
          <main className="flex-1 pb-8">
            <div className="bg-white shadow">
              <div className="px-4 sm:px-6 lg:mx-auto lg:max-w-6xl lg:px-8">
                <div className="py-6 md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center">
                      <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:leading-9">
                        {project.name}
                      </h1>
                    </div>
                    <dl className="mt-6 flex flex-col sm:ml-3 sm:mt-1 sm:flex-row sm:flex-wrap">
                      <dt className="sr-only">Client</dt>
                      <dd className="flex items-center text-sm font-medium capitalize text-gray-500 sm:mr-6">
                        <BuildingOfficeIcon
                          className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                          aria-hidden="true"
                        />
                        {project.client}
                      </dd>
                      <dt className="sr-only">Status</dt>
                      <dd className="mt-3 flex items-center text-sm font-medium capitalize text-gray-500 sm:mr-6 sm:mt-0">
                        <CheckCircleIcon
                          className="mr-1.5 h-5 w-5 flex-shrink-0 text-green-400"
                          aria-hidden="true"
                        />
                        {project.status}
                      </dd>
                      <dt className="sr-only">Deadline</dt>
                      <dd className="mt-3 flex items-center text-sm font-medium capitalize text-gray-500 sm:mr-6 sm:mt-0">
                        <ClockIcon
                          className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                          aria-hidden="true"
                        />
                        {project.deadline}
                      </dd>
                    </dl>
                  </div>

                  <div className="mt-6 flex space-x-3 md:ml-4 md:mt-0">
                    <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:leading-9">
                      {projectAmount ? `€${projectAmount/100}` : 'Loading...'}
                    </h1>
                  </div>

                  <div className="mt-6 flex space-x-3 md:ml-4 md:mt-0">
                    <button
                      type="button"
                      className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    >
                      Edit Project
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="overflow-hidden rounded-lg bg-white shadow">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-base font-semibold leading-6 text-gray-900">Project Description</h3>
                  <div className="mt-2 max-w-xl text-sm text-gray-500">
                    {project.description}
                  </div>
                </div>
              </div>

              <div className="overflow-hidden rounded-lg bg-white shadow">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-base font-semibold leading-6 text-gray-900">Freelancers</h3>
                  
                  
                  <div className="mt-3 flex flex-col space-y-5">
      {freelancers.map((freelancer) => (
        <div key={freelancer.id} className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <img className="h-10 w-10 rounded-full" src={freelancer.avatar} alt="" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-gray-900">{freelancer.name}</p>
              <p className="truncate text-sm text-gray-500">{freelancer.role}</p>
            </div>
          </div>
          <p
            className={classNames(
              'mt-2 text-sm font-medium',
              statusStyles[freelancer.status]
            )}
          >
            Status: {freelancer.status}
          </p>
          <p className="mt-2 text-sm font-medium text-gray-500">
            Amount: €{freelancer.amount / 100}
          </p>
          <button
  type="button"
  className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
  onClick={() => handleTransferClick(freelancer)}
>
  Transfer
</button>
        </div>
      ))}
</div>

                
                
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div>
                  <div className="mt-3 text-left sm:mt-5">
                    <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                      Transfer Details
                    </Dialog.Title>
                    <div className="mt-2">
                      <div className="flex justify-between mt-4">
                        <p className="text-sm text-gray-500">Invoice ID:</p>
                        <p className="text-sm text-right text-gray-500">
                          {hardcodedData.InvoiceID}
                        </p>
                      </div>
                      <div className="flex justify-between mt-4">
                        <p className="text-sm text-gray-500">Destination:</p>
                        <p className="text-sm text-right text-gray-500">
                          {hardcodedData.Destination}
                        </p>
                      </div>
                      <div className="flex justify-between mt-4">
                        <p className="text-sm text-gray-500">Amount:</p>
                        <p className="text-sm text-right text-gray-500">
                          1000 EUR
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-rose-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-rose-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600 sm:col-start-2"
                    onClick={handleConfirmTransfer}
                  >
                    Confirm Transfer
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  </>
);
            }