'use client';

import { useRef, useState, useEffect } from 'react';
import { memo } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { FaCode } from 'react-icons/fa';
import { usePathname } from 'next/navigation';

import { ModeToggle } from 'cum/components/layout/ThemeToggle';
import Image from 'next/image';

function NavbarComponent() {
  const [shouldAnimate, setShouldAnimate] = useState(true);
  const pathname = usePathname();
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
    } else {
      setShouldAnimate(false);
    }
  }, [pathname]);

  return (
    <motion.div
      initial={shouldAnimate ? { opacity: 0, y: -20 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      <header className='border-border/40 bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur'>
        <div className='container flex h-14 max-w-screen-2xl items-center px-4 md:px-6'>
          <Link href='/' className='mr-6 flex items-center space-x-2'>
            <Image
              src='https://avatars.githubusercontent.com/u/159267417?v=4'
              alt='pfp'
              width={32}
              height={32}
              className='h-8 w-8 rounded-xl'
            />
          </Link>

          <nav className='hidden items-center space-x-6 md:flex'>
            <Link
              href='/projects'
              className='text-foreground/80 hover:text-foreground hover:bg-primary/10 flex items-center rounded p-2 px-4 text-sm font-medium transition-colors'
            >
              <FaCode className='mr-2 h-4 w-4' />
              Projects
            </Link>
          </nav>

          <div className='flex flex-1 items-center justify-end space-x-2 md:space-x-4'>
            <ModeToggle />
          </div>
        </div>
      </header>
    </motion.div>
  );
}

export const Navbar = memo(NavbarComponent);
Navbar.displayName = 'Navbar';
