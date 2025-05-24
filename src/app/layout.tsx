import type { Metadata } from 'next';
import { League_Spartan } from 'next/font/google';
import { ThemeProvider } from 'cum/components/layout/ThemeProvider';
import { Navbar } from 'cum/components/layout/Navbar';
import { Background } from 'cum/components/layout/Background';
import './globals.css';

const main = League_Spartan({
  variable: '--font-main',
  display: 'swap',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'qkeiran',
  description: 'powered by nextjs',
};

export default function RootLayout({
  children,
}: Readonly<{ key: string; children: React.ReactNode; }>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={`${main.variable} relative min-h-screen antialiased`}>
        <ThemeProvider attribute='class' defaultTheme='light' enableSystem>
          <Navbar />
          <Background />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
