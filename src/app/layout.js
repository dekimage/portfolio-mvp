// import { ThemeProvider } from "next-themes";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Dejan Gavrilovic",
  description: "portfolio app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* <style>.
          @import
          url(`https://fonts.googleapis.com/css2?family=IBM+Plex+Serif:ital,wght@0,200;0,400;0,600;1,200;1,400;1,600&family=Quicksand:wght@400;500;700&family=Teko:wght@400;500&display=swap`);
        </style> */}
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system">
          {/* <Navbar /> */}
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
