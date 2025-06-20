import Footer from "@/components/shared/Footer";
import "../globals.css";

export default function WelcomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark:bg-black bg-white">
      <body className="min-h-screen flex flex-col dark:bg-black bg-white">
        <div className="flex-1 flex flex-col">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
