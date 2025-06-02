import type { Metadata } from 'next';
import { League_Spartan } from 'next/font/google';
import { ThemeProvider } from '~/components/layout/ThemeProvider';
import { Navbar } from '~/components/layout/Navbar';
import { Background } from '~/components/layout/Background';
import './globals.css';

const main = League_Spartan({
  variable: '--font-main',
  display: 'swap',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'qkeiran',
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
  metadataBase: new URL('https://keiran.cc'),
  alternates: {
    canonical: '/',
    languages: {
      en: '/en',
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ key: string; children: React.ReactNode }>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={`${main.variable} relative min-h-screen antialiased`}>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
          <Navbar />
          <Background />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
