import { Fragment, useState, useEffect } from 'react';
import { Dialog, Combobox, Transition } from '@headlessui/react';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { calculators } from '../../data/calculators';
import { motion, AnimatePresence } from 'framer-motion';

interface SearchDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchDialog({ isOpen, onClose }: SearchDialogProps) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const filteredCalculators = query === ''
    ? []
    : calculators.filter((calculator) => {
        const searchContent = `${calculator.title} ${calculator.description}`.toLowerCase();
        return searchContent.includes(query.toLowerCase());
      });

  useEffect(() => {
    if (isOpen) {
      setQuery('');
    }
  }, [isOpen]);

  const handleSelect = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500/75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto p-4 sm:p-6 md:p-20">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="mx-auto max-w-2xl transform rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition-all">
              <Combobox onChange={(path: string) => handleSelect(path)}>
                <div className="relative">
                  <MagnifyingGlassIcon
                    className="pointer-events-none absolute left-4 top-3.5 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  <Combobox.Input
                    className="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
                    placeholder="搜索计算器..."
                    onChange={(event) => setQuery(event.target.value)}
                  />
                </div>

                <Transition
                  enter="transition duration-100 ease-out"
                  enterFrom="transform scale-95 opacity-0"
                  enterTo="transform scale-100 opacity-100"
                  leave="transition duration-75 ease-out"
                  leaveFrom="transform scale-100 opacity-100"
                  leaveTo="transform scale-95 opacity-0"
                >
                  {filteredCalculators.length > 0 && (
                    <Combobox.Options static className="max-h-96 scroll-py-3 overflow-y-auto p-3">
                      {filteredCalculators.map((calculator) => (
                        <Combobox.Option
                          key={calculator.id}
                          value={calculator.path}
                          className={({ active }) =>
                            `cursor-pointer select-none rounded-xl p-3 ${
                              active ? 'bg-gray-100' : ''
                            }`
                          }
                        >
                          {({ active }) => (
                            <div className="flex flex-col">
                              <span className={`font-medium ${active ? 'text-indigo-600' : 'text-gray-900'}`}>
                                {calculator.title}
                              </span>
                              <span className="text-sm text-gray-500">
                                {calculator.description}
                              </span>
                            </div>
                          )}
                        </Combobox.Option>
                      ))}
                    </Combobox.Options>
                  )}

                  {query !== '' && filteredCalculators.length === 0 && (
                    <div className="px-6 py-14 text-center text-sm sm:px-14">
                      <MagnifyingGlassIcon
                        className="mx-auto h-6 w-6 text-gray-400"
                        aria-hidden="true"
                      />
                      <p className="mt-4 font-semibold text-gray-900">未找到计算器</p>
                      <p className="mt-2 text-gray-500">
                        没有找到与"{query}"相关的计算器，请尝试其他关键词。
                      </p>
                    </div>
                  )}
                </Transition>
              </Combobox>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}