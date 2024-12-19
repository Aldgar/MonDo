
import { ClerkProvider } from '@clerk/nextjs';
import { Inter } from 'next/font/google';
import '../globals.css';
import Topbar from '@/components/shared/Topbar';
import LeftSidebar from '@/components/shared/LeftSidebar';
import Bottumbar from '@/components/shared/Bottumbar';
import RightSidebar from '@/components/shared/RighSidebar';

export const metadata = {
  title: 'MonDo',
  description: 'A Next.js 15 MonDo Application',
};

const inter = Inter({ subsets: ['latin'] });
export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <Topbar />
          <main className='flex flex-row'>
            <LeftSidebar />
            <section className='main-container'>
              <div className='w-full max-w-4xl'>
                {children}
              </div>
            </section>
            <div className='bg-dark-2'>
            <RightSidebar/>
            </div>
          </main>
          <Bottumbar/>
        </body>
      </html>
    </ClerkProvider>
  );
}



