'use client';

import { motion } from 'motion/react';
import { SocialLinks } from 'cum/components/SocialLinks';
import Image from 'next/image';
import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from 'cum/components/ui/card';
import { ImagePopup } from '../ImagePopup';

export function HomeClient() {
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const avatarUrl = 'https://avatars.githubusercontent.com/u/159267417?v=4';

  return (
    <main className='flex min-h-[90vh] flex-col items-center justify-center p-4 md:p-24'>
      <motion.div
        className='w-full max-w-xl'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card className='border-card-foreground/20 bg-card w-full rounded shadow'>
          <CardHeader className='items-center pt-8 pb-4'>
            <CardTitle className='flex justify-center text-6xl'>
              {'Keiran'.split('').map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.2 + index * 0.05,
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </CardTitle>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <CardDescription className='text-muted-foreground text-center text-lg'>
                Where good code goes to die
              </CardDescription>
            </motion.div>

            <motion.div
              className='mt-4 mb-4 flex justify-center'
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <motion.img
                src={avatarUrl}
                alt='Profile Picture'
                width={128}
                height={128}
                className='rounded-full cursor-pointer'
                onClick={() => setIsImagePopupOpen(true)}
                initial={{ scale: 1 }}
                whileHover={{
                  scale: 1.05,
                }}
                whileTap={{
                  scale: 0.95,
                }}
                transition={{ 
                  type: "spring",
                  stiffness: 300,
                  damping: 20
                }}
              />
            </motion.div>
          </CardHeader>
          <CardContent className='pt-2 pb-4'>
            <div className='flex justify-center'>
              <SocialLinks
                github='https://github.com/q4ow'
                twitter='https://twitter.com/keiranjs'
                discord='https://discord.com/users/1230319937155760131'
                ko-fi='https://ko-fi.com/qkeiran'
                npm='https://www.npmjs.com/~q4ow'
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <ImagePopup
        isOpen={isImagePopupOpen}
        onClose={() => setIsImagePopupOpen(false)}
        imageUrl={avatarUrl}
        imageAlt="Keiran's Profile Picture"
      />
    </main>
  );
}
