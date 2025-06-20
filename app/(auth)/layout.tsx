import { ClerkProvider, SignedIn, SignedOut, SignInButton } from '@clerk/nextjs';
import { Inter } from 'next/font/google'
import '../globals.css';

export const metadata = {
  title: 'MonDo',
  description: 'A Next.js 15 MonDo Application',
};

const inter = Inter({ subsets: ['latin'] });
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} bg-dark-1 flex justify-center items-center min-h-screen`}>
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
          </SignedIn>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}




