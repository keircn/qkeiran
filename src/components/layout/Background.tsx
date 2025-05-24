'use client';

import bg from 'cum/assets/bg.svg';

export function Background() {
  return (
    <div
      className='fixed inset-0 -z-10 invert dark:invert-0'
      style={{
        backgroundImage: `url(${bg.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    />
  );
}
