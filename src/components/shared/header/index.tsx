"use client"; // Required for useState and event handlers

import { useState } from 'react';
import { APP_NAME } from '@/lib/constants'
import Image from 'next/image'
import Link from 'next/link'
import Menu from './menu'
import { Button } from '@/components/ui/button'
import { MenuIcon, XIcon } from 'lucide-react' // XIcon for close state
import data from '@/lib/data'
import Search from './search'

export default function Header() {
  const [isMobileSubMenuOpen, setIsMobileSubMenuOpen] = useState(false);

  return (
    <header className='bg-black  text-white'>
      <div className='px-2'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center'>
            <Link
              href='/'
              className='flex items-center header-button font-extrabold text-2xl m-1 gap-2'
            >
              <Image
                src='/assets/icons/logo.png'
                width={60}
                height={60}
                alt={`${APP_NAME} logo`}
              />
              <div className='hidden lg:block'>
                {APP_NAME}
              </div>
            </Link>
          </div>
          <div className='hidden lg:block flex-1 max-w-xl'>
            <Search />
          </div>
          <Menu />
        </div>
        <div className='lg:hidden block py-2'>
          <Search />
        </div>
      </div>

      {/* Secondary navigation bar - This is the modified section */}
      <div className='bg-gray-800 mb-[1px]'> {/* Outer container for this sub-nav, maintaining mb-[1px] */}
        <div className='flex items-center px-3 py-2'> {/* py-2 for consistent bar height */}
          <Button
            variant='ghost'
            className='header-button flex items-center gap-1 text-base [&_svg]:size-6'
            onClick={() => setIsMobileSubMenuOpen(!isMobileSubMenuOpen)}
            aria-expanded={isMobileSubMenuOpen}
            aria-controls="mobile-submenu-content"
          >
            <span className="lg:hidden"> {/* Icon only for mobile toggle indication */}
              {isMobileSubMenuOpen ? <XIcon /> : <MenuIcon />}
            </span>
            <div className="lg:hidden">
            <MenuIcon className="hidden lg:inline-flex" /> {/* Icon for desktop "All" button */}
              Menu
              </div>
          </Button>
          
          {/* Desktop: Menu items displayed inline, original styling preserved */}
          <div className='hidden lg:flex items-center flex-wrap gap-3 overflow-hidden max-h-[42px] ml-3'> {/* Added ml-3 for spacing */}
            {data.headerMenus.map((menu) => (
              <Link
                href={menu.href}
                key={menu.href}
                className='header-button p-2' // Original padding and class
              >
                {menu.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile: Dropdown menu items, shown when isMobileSubMenuOpen is true */}
        {isMobileSubMenuOpen && (
          <div id="mobile-submenu-content" className='lg:hidden px-3 pb-3 flex flex-col gap-1'> {/* Styling for dropdown list */}
            {data.headerMenus.map((menu) => (
              <Link
                href={menu.href}
                key={menu.href}
                className='header-button p-2 block w-full hover:bg-gray-700 rounded text-left' // Make links full-width and styled for dropdown
                onClick={() => setIsMobileSubMenuOpen(false)} // Optional: close menu on item click
              >
                {menu.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  )
}