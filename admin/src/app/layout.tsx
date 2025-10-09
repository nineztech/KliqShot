import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import TopNavbar from '@/components/layout/TopNavbar';
import { SidebarProvider } from '@/components/sidebar/SidebarContext';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KliqShot Admin - Dashboard",
  description: "Admin dashboard for managing KliqShot platform",
  icons: {
    icon: [
      {
        url: '/Logo_Icon.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        url: '/Logo_Icon.png',
        sizes: '16x16',
        type: 'image/png',
      },
    ],
    shortcut: '/Logo_Icon.png',
    apple: '/Logo_Icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/Logo_Icon.png" type="image/png" />
        <link rel="shortcut icon" href="/Logo_Icon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/Logo_Icon.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased mt-16`}
      >
        <SidebarProvider>
          <TopNavbar />
          {children}
        </SidebarProvider>
      </body>
    </html>
  );
}