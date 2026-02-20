import type { Metadata } from "next";
import { Inter, Nunito} from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const geistSans = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap"
});

const geistMono = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  display: "swap"
});

export const metadata: Metadata = {
  title: "Zafiro",
  description: "Planea fácil, vive ligero",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
    </ClerkProvider>
  );
}
