import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FutureUI Generator",
  description: "Générateur d'interfaces utilisateur futuristes avec IA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
