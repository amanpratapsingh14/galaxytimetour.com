"use client";

import { lazy, Suspense } from "react";

import "node_modules/react-modal-video/css/modal-video.css";
import "../styles/index.css";


// Lazy load components
const Header = lazy(() => import("@/components/Header"));
const Footer = lazy(() => import("@/components/Footer"));
const ScrollToTop = lazy(() => import("@/components/ScrollToTop"));
const Providers = lazy(() => import("./providers"));

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <link rel="icon" href="/favicon_io/favicon.ico" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon_io/favicon-32x32.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/favicon_io/apple-touch-icon" />
      <head />

      <body className={`bg-[#FCFCFC] dark:bg-black `}>
        <Suspense fallback={<div>Loading...</div>}>
          <Providers>
            <Header />
            {children}
            <Footer />
            <ScrollToTop />
          </Providers>
        </Suspense>
      </body>
    </html>
  );
}
