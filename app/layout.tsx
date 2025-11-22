import type { Metadata } from "next";
import "./globals.css";


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
        {children}
      </body>
    </html>
  );
}
