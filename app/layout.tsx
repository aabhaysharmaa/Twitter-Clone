import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/Providers";
import SideBar from "@/components/SideBar";
import FollowBar from "@/components/followBar";

export const metadata: Metadata = {
  title: "Twitter",
  description: "twitter Clone",
  icons : "/x.png"
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
          <main className='
		 h-screen bg-black'>
            <div className="container h-full mx-auto xl:px-30  max-w-6xl">
              <div className=" grid grid-cols-4 h-full">
                <SideBar />
                <div className="col-span-3 lg:col-span-2 border-x border-neutral-800">
                  {children}
                </div>
                <FollowBar />
              </div>
            </div>
          </main>
        </Providers>
      </body>
    </html>
  );
}
