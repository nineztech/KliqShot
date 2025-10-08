import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/AuthContext";
 

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KliqShot - Shop with Confidence",
  description: "Discover amazing products from verified sellers. Shop with confidence and get the best deals on everything you need.",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
