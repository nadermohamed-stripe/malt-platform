"use client"
import { Fragment, useState, useEffect } from 'react'
import { Dialog, Menu, Transition } from '@headlessui/react'
import { ArrowDownCircleIcon, ArrowPathIcon, ArrowUpCircleIcon } from '@heroicons/react/20/solid'
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
import Dialogg from '../../components/Dialogg'

const navigation = [
  { name: 'Dashboard', href: '#', icon: HomeIcon, current: true },
  { name: 'Inbox', href: '#', icon: ClockIcon, current: false },
  { name: 'Enhance My Profile', href: '#', icon: ScaleIcon, current: false },
  { name: 'Manage My Projects', href: '#', icon: CreditCardIcon, current: false },
  { name: 'Invoices & Payments', href: '#', icon: UserGroupIcon, current: false },
]
const secondaryNavigation = [
  { name: 'My Business', href: '#', icon: CogIcon },
  { name: 'Resources', href: '#', icon: QuestionMarkCircleIcon },
  { name: 'My settings', href: '#', icon: ShieldCheckIcon },
]

const days = [
  {
    date: 'Project 1',
    dateTime: '2023-03-22',
    transactions: [
      {
        id: 1,
        invoiceNumber: '00012',
        href: '#',
        amount: '$7,600.00 USD',
        tax: '$500.00',
        status: 'Paid',
        client: 'Reform',
        description: 'Website redesign',
        icon: ArrowUpCircleIcon,
      },
      {
        id: 2,
        invoiceNumber: '00011',
        href: '#',
        amount: '$10,000.00 USD',
        status: 'Upcoming',
        client: 'Factoring',
        description: 'Payment Partner',
        icon: ArrowDownCircleIcon,
      },
      {
        id: 3,
        invoiceNumber: '00009',
        href: '#',
        amount: '$2,000.00 USD',
        tax: '$130.00',
        status: 'Overdue',
        client: 'Tuple',
        description: 'Logo design',
        icon: ArrowPathIcon,
      },
    ],
  },
  {
    date: 'Project 2',
    dateTime: '2023-03-21',
    transactions: [
      {
        id: 4,
        invoiceNumber: '00010',
        href: '#',
        amount: '$14,000.00 USD',
        tax: '$900.00',
        status: 'Paid',
        client: 'SavvyCal',
        description: 'Website redesign',
        icon: ArrowUpCircleIcon,
      },
      {
        id: 5,
        invoiceNumber: '00011',
        href: '#',
        amount: '$10,000.00 USD',
        status: 'Upcoming',
        client: 'Xavier',
        description: 'Website redesign',
        icon: ArrowDownCircleIcon,
      },
    ],
  },
]

const statuses = {
    Paid: 'text-green-700 bg-green-50 ring-green-600/20',
    Upcoming: 'text-gray-600 bg-gray-50 ring-gray-500/10',
    Overdue: 'text-red-700 bg-red-50 ring-red-600/10',
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const handleAddMoney = async () => {
  try {
    const response = await fetch('/api/loreal-pays-freelancers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    // You can add any additional logic here, such as displaying a success message or updating the UI
    console.log('Money added successfully!');
  } catch (error) {
    console.error('Error adding money:', error);
  }
};

export default function Invoices() {
 const [filteredStatus, setFilteredStatus] = useState(null);
 const [accountBalance, setAccountBalance] = useState(null);

 useEffect(() => {
  const fetchAccountBalance = async () => {
    try {
      const response = await fetch('/api/get-amounts-loreal');
      const data = await response.json();
      setAccountBalance(data.amount);
    } catch (error) {
      console.error('Error fetching account balance:', error);
    }
  };
  fetchAccountBalance();
}, []);

 const setFilter = (status) => {
   setFilteredStatus(status);
 }

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false); // Added line

  // Removed lines about setIsSendingMoney, setIsMoneySent etc...

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
                  <nav className="mt-5 h-full flex-shrink-0 divide-y divide-cyan-800 overflow-y-auto">
                    <div className="space-y-1 px-2">
                      {navigation.map((item) => (
                        <a key={item.name} href={item.href} className={classNames(
                            item.current ? 'bg-rose-800 text-white' : 'text-cyan-100 hover:bg-rose-600 hover:text-white',
                            'group flex items-center rounded-md px-2 py-2 text-base font-medium') }
                            aria-current={item.current ? 'page' : undefined}>
                          <item.icon className="mr-4 h-6 w-6 flex-shrink-0 text-cyan-200" aria-hidden="true" />
                          {item.name}
                        </a>
                      ))}
                    </div>
                    <div className="mt-6 pt-6">
                      <div className="space-y-1 px-2">
                        {secondaryNavigation.map((item) => (
                          <a key={item.name} href={item.href} 
                            className="group flex items-center rounded-md px-2 py-2 text-base font-medium text-cyan-100 hover:bg-cyan-600 hover:text-white">
                            <item.icon className="mr-4 h-6 w-6 text-cyan-200" aria-hidden="true" />
                            {item.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  </nav>
                </Dialog.Panel>
              </Transition.Child>
              <div className="w-14 flex-shrink-0" aria-hidden="true"></div>
            </div>
          </Dialog>
        </Transition.Root>

        <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
          <div className="flex flex-grow flex-col overflow-y-auto bg-white shadow-lg pb-4 pt-5">
            <div className="flex flex-shrink-0 items-center px-4">
              <img
                className="h-8 w-auto"
                src='./malt-logo-red.svg'
                alt="Easywire logo"
              />
            </div>
            <nav className="mt-5 flex flex-1 flex-col divide-y divide-gray-200 overflow-y-auto">
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
                        src="./loreal.png"
                        alt=""
                      />
                      <span className="ml-3 hidden text-sm font-medium text-gray-700 lg:block">
                        <span className="sr-only">Open user menu for </span>L&apos;Oreal
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
            <div className="bg-white shadow">
              <div className="px-4 sm:px-6 lg:mx-auto lg:max-w-6xl lg:px-8">
                <div className="py-6 md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center">
                      <img
                        className="hidden h-16 w-16 rounded-full sm:block"
                        src="./loreal.png"
                        alt=""
                      />
                      <div>
                        <div className="flex items-center">
                          <img
                            className="h-16 w-16 rounded-full sm:hidden"
                            src="./loreal"
                            alt=""
                          />
                          <h1 className="ml-3 text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:leading-9">
                            L&apos;Oreal {accountBalance ? `€${accountBalance/100}` : 'Loading...'}
                          </h1>
                        </div>
                        <dl className="mt-6 flex flex-col sm:ml-3 sm:mt-1 sm:flex-row sm:flex-wrap">
                          <dt className="sr-only">Company</dt>
                          <dd className="flex items-center text-sm font-medium capitalize text-gray-500 sm:mr-6">
                            <BuildingOfficeIcon
                              className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                              aria-hidden="true"
                            />
                            41 Rue Martre, 92117 Clichy, France
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
                            VBAN: IT1234567890123456789012345
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 flex space-x-3 md:ml-4 md:mt-0">
                    <button
                      type="button"
                      className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                      onClick={handleAddMoney}
                    >
                      Add money
                    </button>
                    <button
                      type="button"
                      className="inline-flex items-center rounded-md bg-rose-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
                      onClick={() => setDialogOpen(true)} 
                    >
                      Send money
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8">
                    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center">
                          <h2 className="mx-auto max-w-2xl text-base font-semibold leading-6 text-gray-900 lg:max-w-none">
                            Recent activity
                          </h2>
                          <h2 className="mx-auto max-w-2xl text-base font-semibold leading-6 text-gray-900 lg:max-w-none" href="#" onClick={() => setFilter("Overdue")}>Overdue</h2>
                          <h2 className="mx-auto max-w-2xl text-base font-semibold leading-6 text-gray-900 lg:max-w-none" href="#" onClick={() => setFilter("Paid")}>Paid</h2>
                          <h2 className="mx-auto max-w-2xl text-base font-semibold leading-6 text-gray-900 lg:max-w-none" href="#" onClick={() => setFilter("Upcoming")}>Upcoming</h2>
                        </div>
                    </div>

                    <div className="mt-6 overflow-hidden border-t border-gray-100">
                      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
                          <table className="w-full text-left">
                            <thead className="sr-only">
                              <tr>
                                <th>Amount</th>
                                <th className="hidden sm:table-cell">Client</th>
                                <th>More details</th>
                              </tr>
                            </thead>
                            <tbody>
                              {days.map((day) => (
                                <Fragment key={day.dateTime}>
                                  <tr className="text-sm leading-6 text-gray-900">
                                    <th scope="colgroup" colSpan={3} className="relative isolate py-2 font-semibold">
                                      <time dateTime={day.dateTime}>{day.date}</time>
                                      <div className="absolute inset-y-0 right-full -z-10 w-screen border-b border-gray-200 bg-gray-50" />
                                      <div className="absolute inset-y-0 left-0 -z-10 w-screen border-b border-gray-200 bg-gray-50" />
                                    </th>
                                  </tr>
                                  {day.transactions.map((transaction) => (
                                    transaction.status === filteredStatus || !filteredStatus ?
                                    <tr key={transaction.id}>
                                    <td className="relative py-5 pr-6">
                                      <div className="flex gap-x-6">
                                        <transaction.icon
                                          className="hidden h-6 w-5 flex-none text-gray-400 sm:block"
                                          aria-hidden="true"
                                        />
                                        <div className="flex-auto">
                                          <div className="flex items-start gap-x-3">
                                            <div className="text-sm font-medium leading-6 text-gray-900">{transaction.amount}</div>
                                            <div
                                              className={classNames(
                                                statuses[transaction.status],
                                                'rounded-md py-1 px-2 text-xs font-medium ring-1 ring-inset'
                                              )}
                                            >
                                              {transaction.status}
                                            </div>
                                          </div>
                                          {transaction.tax ? (
                                            <div className="mt-1 text-xs leading-5 text-gray-500">{transaction.tax} tax</div>
                                          ) : null}
                                        </div>
                                      </div>
                                      <div className="absolute bottom-0 right-full h-px w-screen bg-gray-100" />
                                      <div className="absolute bottom-0 left-0 h-px w-screen bg-gray-100" />
                                    </td>
                                    <td className="hidden py-5 pr-6 sm:table-cell">
                                      <div className="text-sm leading-6 text-gray-900">{transaction.client}</div>
                                      <div className="mt-1 text-xs leading-5 text-gray-500">{transaction.description}</div>
                                    </td>
                                    <td className="py-5 text-right">
                                      <div className="flex justify-end">
                                        <a
                                          href={transaction.href}
                                          className="text-sm font-medium leading-6 text-rose-600 hover:text-rose-500"
                                        >
                                          View<span className="hidden sm:inline"> transaction</span>
                                          <span className="sr-only">
                                            , invoice #{transaction.invoiceNumber}, {transaction.client}
                                          </span>
                                        </a>
                                      </div>
                                      <div className="mt-1 text-xs leading-5 text-gray-500">
                                        Invoice <span className="text-gray-900">#{transaction.invoiceNumber}</span>
                                      </div>
                                    </td>
                                  </tr>
                                  :
                                  null
                              ))}
                            </Fragment>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
        </main>
      </div>
    </div>
{/* Dialog for confirming send money action */}
<Dialogg isOpen={dialogOpen} setIsOpen={setDialogOpen} /> 
  </>
);
}