import * as React from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import HeaderBar from "./HeaderBar";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="h-screen w-full flex flex-row bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 overflow-hidden">
      <Navbar />
      <div className="h-screen flex-1 min-w-0 flex flex-col overflow-hidden">
        <HeaderBar />
        <div className="flex-1 overflow-y-auto flex flex-col">
          <main className="flex-1 w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
}
