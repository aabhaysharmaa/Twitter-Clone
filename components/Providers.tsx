"use client";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import React from "react";
interface ProvidersProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider>
      <Toaster />
      {children}
    </SessionProvider>
  );
}
