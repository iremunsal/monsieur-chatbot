import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Monsieur Chatbot - Fransızca Pratik",
  description: "Fransızca konuşma pratiği yapabileceğiniz interaktif chatbot",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="bg-gray-50 text-gray-900 antialiased">{children}</body>
    </html>
  );
}
