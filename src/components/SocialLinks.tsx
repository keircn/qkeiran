import { motion } from 'motion/react';
import { CgNpm } from 'react-icons/cg';
import { FaGithub, FaTwitter, FaDiscord } from 'react-icons/fa6';
import { SiKofi } from 'react-icons/si';

type SocialPlatform = 'github' | 'twitter' | 'discord' | 'ko-fi' | 'npm';

const platformIcons: Record<SocialPlatform, React.ElementType> = {
  github: FaGithub,
  twitter: FaTwitter,
  discord: FaDiscord,
  'ko-fi': SiKofi,
  npm: CgNpm,
};

export function SocialLinks(icons: Record<SocialPlatform, string>) {
  const socialMediaEntries = Object.entries(icons) as [
    SocialPlatform,
    string,
  ][];

  const initialDelay = 0.3;
  const staggerDelay = 0.15;

  return (
    <div className='flex space-x-4'>
      {socialMediaEntries.map(([platform, url], index) => {
        const IconComponent = platformIcons[platform];
        return (
          <motion.a
            key={platform}
            href={url}
            target='_blank'
            rel='noopener noreferrer'
            className='text-muted-foreground hover:text-primary transition-colors duration-200'
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.5,
                delay: initialDelay + index * staggerDelay,
              },
            }}
            whileHover={{ scale: 1.05, rotate: 6 }}
            aria-label={`Link to ${platform}`}
          >
            {IconComponent ? <IconComponent size={24} /> : platform}
          </motion.a>
        );
      })}
    </div>
  );
}
