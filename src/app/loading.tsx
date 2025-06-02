'use client';

import { motion } from 'motion/react';
import { FiLoader } from 'react-icons/fi';

export default function Loading() {
  return (
    <div className='bg-background flex h-screen w-full items-center justify-center'>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 1,
          ease: 'linear',
        }}
        style={{ display: 'inline-block' }}
      >
        <FiLoader className='text-primary h-12 w-12' />
      </motion.div>
    </div>
  );
}
