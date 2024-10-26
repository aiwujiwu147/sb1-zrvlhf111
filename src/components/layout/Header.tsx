import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Dialog } from '@headlessui/react';
import { Bars3Icon, XMarkIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import SearchDialog from '../search/SearchDialog';
import DropdownMenu from '../navigation/DropdownMenu';
import { categories } from '../../data/categories';
import { calculators } from '../../data/calculators';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-indigo-600">计算器中心</span>
            </Link>
          </div>

          <div className="hidden lg:flex lg:gap-x-8">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors ${
                location.pathname === '/'
                  ? 'text-indigo-600'
                  : 'text-gray-700 hover:text-indigo-600'
              }`}
            >
              首页
            </Link>
            {categories.map((category) => (
              <DropdownMenu
                key={category.id}
                category={category}
              />
            ))}
          </div>

          <div className="flex items-center gap-x-4">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="text-gray-700 hover:text-indigo-600 transition-colors p-2 rounded-full hover:bg-gray-100"
              aria-label="搜索"
            >
              <MagnifyingGlassIcon className="h-5 w-5" />
            </button>
            <button
              type="button"
              className="lg:hidden -m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="打开菜单"
            >
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </nav>

      <Dialog as="div" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <Dialog.Overlay className="fixed inset-0 bg-black/25 z-40" />
        
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link to="/" className="-m-1.5 p-1.5" onClick={() => setMobileMenuOpen(false)}>
              <span className="text-xl font-bold text-indigo-600">计算器中心</span>
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">关闭菜单</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setSearchOpen(true);
                  }}
                  className="w-full flex items-center justify-center gap-x-2 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                >
                  <MagnifyingGlassIcon className="h-5 w-5" />
                  搜索计算器
                </button>
                <Link
                  to="/"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  首页
                </Link>
                {categories.map((category) => (
                  <div key={category.id} className="py-2">
                    <div className="px-3 py-2 text-sm font-semibold text-gray-500">
                      {category.name}
                    </div>
                    <div className="space-y-1">
                      {calculators
                        .filter((calc) => calc.category === category.id)
                        .map((calculator) => (
                          <Link
                            key={calculator.id}
                            to={calculator.path}
                            className="block px-3 py-2 text-base text-gray-900 hover:bg-gray-50 hover:text-indigo-600"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {calculator.title}
                          </Link>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>

      <SearchDialog isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
}