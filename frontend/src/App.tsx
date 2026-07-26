// import React, { useState, useEffect } from 'react';
import { useState, useEffect } from "react";
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { DashboardPage } from './pages/DashboardPage';
import { InitialLoader } from './components/common/InitialLoader';

export default function App() {
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => {
    // Show splash loader on initial page load / refresh
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  if (isInitialLoading) {
    return <InitialLoader />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground antialiased selection:bg-zinc-800 selection:text-zinc-100 animate-in fade-in duration-500">
      <Header />
      <main className="flex-1">
        <DashboardPage />
      </main>
      <Footer />
    </div>
  );
}
