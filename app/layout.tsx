import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "../components/AuthProvider";
import { Navbar } from "../components/Navbar";

export const metadata: Metadata = {
  title: "SEICHO InfoFi",
  description: "On-chain InfoFi campaigns and social leaderboards for SEICHO"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="bg-grid">
          <div className="bg-gradient" />
          <AuthProvider>
            <Navbar />
            <main className="main">{children}</main>
          </AuthProvider>
        </div>
      </body>
    </html>
  );
}
