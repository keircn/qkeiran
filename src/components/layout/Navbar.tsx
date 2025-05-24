'use client';

import * as React from 'react';
import { memo } from 'react';
import Link from 'next/link';
import { cn } from 'cum/lib/utils';
import { FaHome, FaInfoCircle, FaEnvelope } from 'react-icons/fa';
import { motion } from 'motion/react';

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from 'cum/components/ui/navigation-menu';
import { ModeToggle } from 'cum/components/layout/ThemeToggle';
import Image from 'next/image';

const ListItem = React.forwardRef<
  React.ComponentRef<'a'>,
  Omit<React.ComponentPropsWithoutRef<'a'>, 'href'> & {
    href: string;
    icon?: React.ElementType;
  }
>(({ className, title, children, icon: Icon, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block space-y-1 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none',
            className
          )}
          {...props}
        >
          <div className='flex items-center text-sm leading-none font-medium'>
            {Icon && (
              <Icon className='mr-2 h-4 w-4 flex-shrink-0' aria-hidden='true' />
            )}
            {title}
          </div>
          <p className='text-muted-foreground line-clamp-2 text-sm leading-snug'>
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = 'ListItem';

const NavbarComponent: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
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

          <NavigationMenu className='hidden items-center pb-2'>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href='/'
                    className={
                      navigationMenuTriggerStyle() + ' transition-colors'
                    }
                  >
                    <FaHome className='mr-2 h-4 w-4' />
                    Home
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href='/about'
                    className={
                      navigationMenuTriggerStyle() + ' transition-colors'
                    }
                  >
                    <FaInfoCircle className='mr-2 h-4 w-4' />
                    About
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href='/contact'
                    className={
                      navigationMenuTriggerStyle() + ' transition-colors'
                    }
                  >
                    <FaEnvelope className='mr-2 h-4 w-4' />
                    Contact
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <div className='flex flex-1 items-center justify-end space-x-2 md:space-x-4'>
            <ModeToggle />
          </div>
        </div>
      </header>
    </motion.div>
  );
};

export const Navbar = memo(NavbarComponent);
Navbar.displayName = 'Navbar';
