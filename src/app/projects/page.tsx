import { ProjectsClient } from 'cum/components/pages/ProjectsClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects | qkeiran',
  description: 'i eat glue',
  openGraph: {
    title: 'qkeiran',
    description: 'i eat glue',
    url: 'https://keiran.cc',
    siteName: 'qkeiran',
    images: [
      {
        url: 'https://keiran.cc/meta/og.png',
        width: 400,
        height: 200,
        alt: 'qkeiran',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'qkeiran',
    description: 'i eat glue',
    images: ['https://keiran.cc/og.png'],
    site: '@keiranjs',
    creator: '@keiranjs',
  },
};

export default function Projects() {
  return <ProjectsClient />;
}
