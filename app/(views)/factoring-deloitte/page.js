"use client"
import { Fragment, useState, useEffect } from 'react'
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
import StripeApiResponseSidebar from '@/app/components/StripeApiResponseSidebar'

const navigation = [
  { name: 'Dashboard', href: '#', icon: HomeIcon, current: true },
  { name: 'Inbox', href: '#', icon: ClockIcon, current: false },
  { name: 'Enhance My Profile', href: '#', icon: ScaleIcon, current: false },
  { name: 'Manage My Projects', href: '#', icon: CreditCardIcon, current: false },
  { name: 'Invoices & Payments', href: '#', icon: UserGroupIcon, current: false },
//   { name: 'Resources', href: '#', icon: DocumentChartBarIcon, current: false },
]
const secondaryNavigation = [
  { name: 'My Business', href: '#', icon: CogIcon },
  { name: 'Resources', href: '#', icon: QuestionMarkCircleIcon },
  { name: 'My settings', href: '/deloitte', icon: ShieldCheckIcon },
]
const cards = [
    {
      name: 'Web Design Project',
      href: '/project',
      icon: CreditCardIcon,
      amount: '$5,000',
      deadline: 'May 15, 2023',
      client: 'Loreal',
      description: 'Design a modern and responsive website for Acme Inc.',
      status: 'In Progress',
    },
    {
      name: 'Mobile App Development',
      href: '/project',
      icon: ScaleIcon,
      amount: '$8,000',
      deadline: 'June 30, 2023',
      client: 'Globex Corp.',
      description: 'Develop a cross-platform mobile app for Globex Corp.',
      status: 'Pending',
    },
    {
      name: 'SEO Optimization',
      href: '/project',
      icon: DocumentChartBarIcon,
      amount: '$3,500',
      deadline: 'August 1, 2023',
      client: 'Stark Industries',
      description: 'Optimize the website of Stark Industries for better search engine visibility.',
      status: 'Completed',
    },
  ];
  
const transactions = [
  {
    id: 1,
    name: 'Payment to Molly Sanders',
    href: '#',
    amount: '$20,000',
    currency: 'USD',
    status: 'success',
    date: 'July 11, 2020',
    datetime: '2020-07-11',
  },
  // More transactions...
]
const statusStyles = {
  success: 'bg-green-100 text-green-800',
  processing: 'bg-yellow-100 text-yellow-800',
  failed: 'bg-gray-100 text-gray-800',
}

const projects = [
  {
    name: 'Web Design Project',
    amount: '$5,000',
    customer: 'L\'oreal',
    freelancers: [
      { name: 'Xavier 🇫🇷', amount: '$5,000' },
    ],
    description: 'Design a modern and responsive website for L\'oreal new campaign',
    timeline: 'April 1, 2023 - May 15, 2023',
    status: 'In Progress',
  },
  {
    name: 'Mobile App Development',
    amount: '$8,000',
    customer: 'Deloitte DE',
    freelancers: [
      { name: 'John 🇺🇸', amount: '$4,000' },
      { name: 'Linus 🇬🇧', amount: '$4,000' }
    ],
    description: 'Native mobile app development for Deloitte DE',
    timeline: 'April 1, 2023 - May 15, 2023',
    status: 'In Progress',
  },
  {
    name: 'SEO Optimization',
    amount: '$5,000',
    customer: 'SMB Inc.',
    freelancers: [
      { name: 'Manuel 🇫🇷', amount: '$3,000' },
    ],
    description: 'SEO optimization for SMB Inc. website',
    timeline: 'April 1, 2023 - May 15, 2023',
    status: 'In Progress',
  },
  /* ...other projects... */
]
  
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

export default function Factoring() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [accountBalance, setAccountBalance] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null)
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);


  useEffect(() => {
    const fetchAccountBalance = async () => {
      try {
        const response = await fetch('/api/get-amounts-factoring');
        const data = await response.json();
        const stripeApiResponses = JSON.parse(localStorage.getItem('stripeApiResponses')) || [];
        stripeApiResponses.push(data);
        localStorage.setItem('stripeApiResponses', JSON.stringify(stripeApiResponses));
        setAccountBalance(data.amount);
      } catch (error) {
        console.error('Error fetching account balance:', error);
      }
    };
    fetchAccountBalance();
  }, []);

  const handleAcceptClick = async () => {
    setIsLoading(true);
    setIsSuccess(false); // Ensure success is not shown initially
    try {
      const response = await fetch('/api/factoring-pays-deloitte', { method: 'POST' });
      const data = await response.json();
      if (response.ok && data.Transfer) {
        setTimeout(() => {
          setIsLoading(false); // Stop the spinner
          setIsSuccess(true); // Show success checkmark
          
          setTimeout(() => {
            setIsSuccess(false); // Reset success for next time
            setSelectedProject(null); // Close the dialog
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
<style>
  {`
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    .spinner-container {
      position: relative;
      height: 300px; /* Same height as spinner for alignment */
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .spinner {
      position: absolute;
      border: 8px solid rgba(255, 255, 255, 0.3);
      border-top-color: #000;
      border-right-color: #000;
      border-radius: 50%;
      width: 64px;
      height: 64px;
      animation: spin 0.5s ease-in-out infinite;
    }
    .checkmark {
      position: absolute;
      animation: fadeIn 1s; /* Simple fade-in animation for the checkmark */
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
  `}
</style>
      <div className="min-h-full">
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog as="div" className="relative z-40 lg:hidden" onClose={setSidebarOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-cyan-700 pb-4 pt-5">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute right-0 top-0 -mr-12 pt-2">
                      <button
                        type="button"
                        className="relative ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="absolute -inset-0.5" />
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="flex flex-shrink-0 items-center px-4">
                    <img
                      className="h-8 w-auto"
                      src='./malt-logo-red.svg'
                      alt="Easywire logo"
                    />
                  </div>
                  <nav
                    className="mt-5 h-full flex-shrink-0 divide-y divide-cyan-800 overflow-y-auto"
                    aria-label="Sidebar"
                  >
                    <div className="space-y-1 px-2">
                      {navigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            item.current
                              ? 'bg-rose-800 text-white'
                              : 'text-cyan-100 hover:bg-rose-600 hover:text-white',
                            'group flex items-center rounded-md px-2 py-2 text-base font-medium'
                          )}
                          aria-current={item.current ? 'page' : undefined}
                        >
                          <item.icon className="mr-4 h-6 w-6 flex-shrink-0 text-cyan-200" aria-hidden="true" />
                          {item.name}
                        </a>
                      ))}
                    </div>
                    <div className="mt-6 pt-6">
                      <div className="space-y-1 px-2">
                        {secondaryNavigation.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className="group flex items-center rounded-md px-2 py-2 text-base font-medium text-cyan-100 hover:bg-cyan-600 hover:text-white"
                          >
                            <item.icon className="mr-4 h-6 w-6 text-cyan-200" aria-hidden="true" />
                            {item.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  </nav>
                </Dialog.Panel>
              </Transition.Child>
              <div className="w-14 flex-shrink-0" aria-hidden="true">
                {/* Dummy element to force sidebar to shrink to fit close icon */}
              </div>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
<div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
  {/* Sidebar component, swap this element with another sidebar if you like */}
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
          <div className="flex h-16 flex-shrink-0 border-b border-gray-200 bg-white lg:border-none">
            <button
              type="button"
              className="border-r border-gray-200 px-4 text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3CenterLeftIcon className="h-6 w-6" aria-hidden="true" />
            </button>
            {/* Search bar */}
            <div className="flex flex-1 justify-between px-4 sm:px-6 lg:mx-auto lg:max-w-6xl lg:px-8">
              <div className="flex flex-1">
                <form className="flex w-full md:ml-0" action="#" method="GET">
                  <label htmlFor="search-field" className="sr-only">
                    Search
                  </label>
                  <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center" aria-hidden="true">
                      <MagnifyingGlassIcon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <input
                      id="search-field"
                      name="search-field"
                      className="block h-full w-full border-transparent py-2 pl-8 pr-3 text-gray-900 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                      placeholder="Search projects"
                      type="search"
                    />
                  </div>
                </form>
              </div>
              <div className="ml-4 flex items-center md:ml-6">
                <button
                  type="button"
                  className="relative rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="relative flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 lg:rounded-md lg:p-2 lg:hover:bg-gray-50">
                      <span className="absolute -inset-1.5 lg:hidden" />
                      <img
                        className="h-8 w-8 rounded-full"
                        src="./factoring.jpg"
                        alt=""
                      />
                      <span className="ml-3 hidden text-sm font-medium text-gray-700 lg:block">
                        <span className="sr-only">Open user menu for </span>Factoring
                      </span>
                      <ChevronDownIcon
                        className="ml-1 hidden h-5 w-5 flex-shrink-0 text-gray-400 lg:block"
                        aria-hidden="true"
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Your Profile
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Settings
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Logout
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>
          <main className="flex-1 pb-8">
            {/* Page header */}
            <div className="bg-white shadow">
              <div className="px-4 sm:px-6 lg:mx-auto lg:max-w-6xl lg:px-8">
                <div className="py-6 md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200">
                  <div className="min-w-0 flex-1">
                    {/* Profile */}
                    <div className="flex items-center">
                      <img
                        className="hidden h-16 w-16 rounded-full sm:block"
                        src="./factoring.jpg"
                        alt=""
                      />
                      <div>
                        <div className="flex items-center">
                          <img
                            className="h-16 w-16 rounded-full sm:hidden"
                            src="./factoring.jpg"
                            alt=""
                          />
                          <h1 className="ml-3 text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:leading-9">
                            Factoring {accountBalance ? `€${accountBalance/100}` : 'Loading...'}
                          </h1>
                        </div>
                        <dl className="mt-6 flex flex-col sm:ml-3 sm:mt-1 sm:flex-row sm:flex-wrap">
                          <dt className="sr-only">Company</dt>
                          <dd className="flex items-center text-sm font-medium capitalize text-gray-500 sm:mr-6">
                            <BuildingOfficeIcon
                              className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                              aria-hidden="true"
                            />
                            Kurfürstendamm 23 10719 Berlin
                          </dd>
                          <dt className="sr-only">Account status</dt>
                          <dd className="mt-3 flex items-center text-sm font-medium capitalize text-gray-500 sm:mr-6 sm:mt-0">
                            <CheckCircleIcon
                              className="mr-1.5 h-5 w-5 flex-shrink-0 text-green-400"
                              aria-hidden="true"
                            />
                            Verified account
                          </dd>
                          <dt className="sr-only">Account status</dt>
                          <dd className="mt-3 flex items-center text-sm font-medium capitalize text-gray-500 sm:mr-6 sm:mt-0">
                            <CheckCircleIcon
                              className="mr-1.5 h-5 w-5 flex-shrink-0 text-green-400"
                              aria-hidden="true"
                            />
                            VBAN: FR47815510203546361043119564
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 flex space-x-3 md:ml-4 md:mt-0">
                    <button
                      type="button"
                      className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    >
                      Add money
                    </button>
                    <button
                      type="button"
                      className="inline-flex items-center rounded-md bg-rose-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
                    >
                      Send money
                    </button>
                  </div>
                </div>
              </div>
            </div>

                {/* Project grid */}
            <div className="mt-8 px-4 sm:px-6 lg:mx-auto lg:max-w-6xl lg:px-8">
              <h2 className="text-lg leading-6 font-medium text-gray-900">Projects</h2>
              <div className="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {/* Project cards */}
                {projects.map((project) => (
                  <div
                    key={project.name}
                    className="bg-white overflow-hidden shadow rounded-lg cursor-pointer divide-y divide-gray-200 hover:shadow-lg transition-shadow"
                    onClick={() => setSelectedProject(project)}
                  >
                    <div className="p-5">
                      <h3 className="text-lg font-medium text-gray-900">{project.name}</h3>
                      <p className="mt-1 text-sm text-gray-500">Customer: {project.customer}</p>
                      <p className="mt-1 text-sm text-gray-500">Amount: {project.amount}</p>
                      <div className="mt-4">
                        <h4 className="text-sm font-medium text-gray-900">Freelancers:</h4>
                        <ul className="mt-2">
                          {project.freelancers.map(freelancer => (
                            <li key={freelancer.name} className="text-sm text-gray-500">{freelancer.name} - {freelancer.amount}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {selectedProject && (
              <Transition.Root show={true} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => setSelectedProject(null)}>
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

                  <div className="fixed inset-0 z-10 overflow-y-auto">
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
                        <Dialog.Panel className="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                          <div>
                            <div className="mt-3 text-center sm:mt-5">
{/* Conditional render inside Dialog.Panel based on isLoading and isSuccess */}
<>
{isLoading ? (
    <div className="spinner-container">
      <div className="spinner" />
    </div>
  ) : isSuccess ? (
    <div className="flex flex-col items-center justify-center">
      {/* <CheckCircleIcon className="h-16 w-16 text-green-600 checkmark" aria-hidden="true" /> */}
      <p className="text-lg">Success</p>
    </div>
  ) : (
    <>
      <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
        {selectedProject.name}
      </Dialog.Title>
      <div className="mt-2">
        <p className="text-sm text-gray-500">{selectedProject.description}</p>
        <p className="mt-4 text-sm text-gray-600">Customer: {selectedProject.customer}</p>
        <p className="mt-2 text-sm text-gray-600">Amount: {selectedProject.amount}</p>
        <p className="mt-2 text-sm text-gray-600">Timeline: {selectedProject.timeline}</p>
        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-900">Freelancers Payments:</h4>
          <ul className="mt-2">
            {selectedProject.freelancers.map(freelancer => (
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
</>
</div>
</div>

                            
                          
                          <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                          <button
  type="button"
  className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:col-start-2 sm:text-sm"
  onClick={handleAcceptClick} // Updated
>
  Accept
</button>
                            <button
                              type="button"
                              className="mt-3 inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                              onClick={() => setSelectedProject(null)}
                            >
                              Deny
                            </button>
                          </div>
                        </Dialog.Panel>
                      </Transition.Child>
                    </div>
                  </div>
                </Dialog>
              </Transition.Root>
            )}
          </main>
        </div>
      </div>
    </>
  )
}