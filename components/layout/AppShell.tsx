"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');

  return (
    <div className="flex flex-col min-h-screen">
      {!isAdminRoute && <Header />}
      <main className={`flex-1 w-full overflow-hidden ${!isAdminRoute ? 'mt-16' : ''}`}>
        {children}
      </main>
      {!isAdminRoute && <Footer />}
    </div>
  );
}
