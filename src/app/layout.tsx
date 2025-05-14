import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { APP_DESCRIPTION, APP_NAME, APP_SLOGAN } from '@/lib/constants'


import "./globals.css";


const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})


export const metadata: Metadata = {
  title: {
    template: `%s | ${APP_NAME}`,
    default: `${APP_NAME}. ${APP_SLOGAN}`,
  },
  description: APP_DESCRIPTION,
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className}  mx-auto antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
