import Link from 'next/link';

export default function Home() {
    return (
        <main className="max-w-3xl mx-auto p-6 space-y-3">
            <h1 className="text-2xl font-semibold">Plant Whisperer</h1>
            <p>Discover plants by sunlight and watering needs.</p>
            <Link href="/plants" className="text-blue-600 underline">Start browsing →</Link>
        </main>
    );
}
