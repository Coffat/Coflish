import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Coflish — Tự Học IELTS 7.0 Cùng AI',
  description: 'Nền tảng tự học IELTS thông minh với Spaced Repetition (SM-2), chấm điểm Writing & Speaking và sổ lỗi sai thông minh.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className="antialiased selection:bg-emerald-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
