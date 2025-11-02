import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Plant Whisperer', description: 'Find plants by care needs' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body className="min-h-dvh bg-white text-gray-900">{children}</body>
        </html>
    );
}

