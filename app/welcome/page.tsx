import Image from "next/image";
import Link from "next/link";
import ThemeToggle from "@/components/shared/ThemeToggle";

export default function WelcomePage() {
  return (
    <>
      <main className="relative flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-100 px-2 overflow-hidden">
        {/* Animated, popping logo in the background */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
          <Image
            src="/KImage.png"
            alt="MonDo Logo Background"
            width={500}
            height={500}
            className="animate-pulse drop-shadow-2xl opacity-20 scale-125 md:scale-150"
            priority
          />
        </div>
        <div className="relative z-10 max-w-3xl w-full min-h-[480px] rounded-3xl shadow-xl p-14 flex flex-col items-center bg-white/80 dark:bg-black/70 backdrop-blur-md">
          <div className="w-full flex justify-end mb-10">
            <ThemeToggle />
          </div>
          <Image
            src="/KImage.png"
            alt="MonDo Logo"
            width={200}
            height={200}
            className="w-70 h-70 rounded-full shadow-lg"
          />
          <h1 className="text-heading4-bold font-extrabold text-gray-900 dark:text-white mb-2 tracking-tight">
            Welcome to <span className="text-cyan-500 text-heading2-bold">MonDo</span>
          </h1>
          <p className="text-2xl text-gray-600 dark:text-gray-300 mb-8 text-center">
            Share <span className="text-cyan-500 text-heading3-bold">Your</span> Thoughts! <span className="text-2xl" style={{ textShadow: '0 0 2px #000' }}>💭</span>
          </p>
          <div className="flex gap-4 w-full">
            <Link
              href="/sign-in"
              className="flex-1 py-3 rounded-xl bg-cyan-500 text-white font-semibold text-lg shadow-md hover:bg-cyan-500 transition text-center text-heading3-bold"
            >
              Sign In
            </Link>
            <Link
              href="/sign-up"
              className="flex-1 py-3 rounded-xl bg-white border border-cyan-500 text-cyan-500 font-semibold text-heading3-bold shadow-md hover:bg-purple-50 transition text-center"> 
              Sign Up
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
