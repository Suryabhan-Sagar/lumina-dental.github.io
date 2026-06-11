import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { ScrollProgress } from '../ui/ScrollProgress';

export function Layout() {
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      <ScrollProgress />
      <Header />
      {/* 
        Add padding top to account for fixed header. 
        Adjust the value based on your header's height if needed.
        Currently giving it pt-20 (80px) or pt-24 (96px)
      */}
      <main className="flex-grow pt-20 flex flex-col">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
