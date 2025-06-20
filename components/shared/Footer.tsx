export default function Footer() {
  return (
    <footer className="w-full py-4 text-center text-gray-400 text-sm bg-black dark:bg-transparent dark:text-gray-500">
      &copy; {new Date().getFullYear()} MonDo. All rights reserved.
    </footer>
  );
}
