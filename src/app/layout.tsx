import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PetProfile — цифровой паспорт питомца",
  description:
    "Цифровой паспорт питомца, медицинская карта и напоминания о прививках и обработках.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className="min-h-screen bg-slate-950 text-slate-50 antialiased">
        <div className="mx-auto flex min-h-screen max-w-5xl flex-col px-4 py-6">
          {children}
        </div>
      </body>
    </html>
  );
}

