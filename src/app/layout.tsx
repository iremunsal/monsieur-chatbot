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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans text-gray-900 antialiased">{children}</body>
    </html>
  );
}
