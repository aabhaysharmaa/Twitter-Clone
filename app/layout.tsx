import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/Providers";
export const metadata: Metadata = {
  title: "Twitter",
  description: "X clone",
  icons: "/x.png"
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`  antialiased`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
