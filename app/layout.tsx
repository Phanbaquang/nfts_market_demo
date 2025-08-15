import "./globals.css";
import type { Metadata } from "next";
import { Providers } from "./providers";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "NFT Marketplace",
  description: "Simulated NFT marketplace (Next.js + TypeScript)",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Navbar />
          <main className="max-w-7xl mx-auto p-4">{children}</main>
          <Toaster position="top-right" reverseOrder={false} />
        </Providers>
      </body>
    </html>
  );
}
