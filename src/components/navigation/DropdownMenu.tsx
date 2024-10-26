import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Popover, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { calculators } from '../../data/calculators';

interface DropdownMenuProps {
  category: {
    id: string;
    name: string;
  };
  className?: string;
}

export default function DropdownMenu({ category, className = '' }: DropdownMenuProps) {
  const categoryCalculators = calculators.filter(calc => calc.category === category.id);

  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button
            className={`${className} group inline-flex items-center gap-x-1 text-sm font-medium outline-none ${
              open ? 'text-indigo-600' : 'text-gray-700 hover:text-indigo-600'
            }`}
          >
            <span>{category.name}</span>
            <ChevronDownIcon
              className={`h-4 w-4 transition ${open ? 'rotate-180 text-indigo-600' : 'text-gray-400'}`}
              aria-hidden="true"
            />
          </Popover.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute left-1/2 z-50 mt-3 w-screen max-w-xs -translate-x-1/2 transform px-2">
              <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="relative grid gap-1 bg-white p-2">
                  {categoryCalculators.map((calculator) => (
                    <Link
                      key={calculator.id}
                      to={calculator.path}
                      className="flex items-start rounded-lg p-3 hover:bg-gray-50"
                    >
                      <div className="ml-1">
                        <p className="text-sm font-medium text-gray-900">
                          {calculator.title}
                        </p>
                        <p className="text-xs text-gray-500">
                          {calculator.description}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}