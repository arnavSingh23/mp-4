'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import type { PlantListItem } from '@/types/plant';

export default function PlantsPage() {
    const [q, setQ] = useState('');
    const [sunlight, setSunlight] = useState('');
    const [watering, setWatering] = useState('');
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState<string | null>(null);
    const [items, setItems] = useState<PlantListItem[]>([]);

    async function runSearch() {
        setLoading(true); setErr(null);
        try {
            const params = new URLSearchParams();
            if (q) params.set('q', q);
            if (sunlight) params.set('sunlight', sunlight);
            if (watering) params.set('watering', watering);

            const res = await fetch(`/api/plants/search?${params.toString()}`);
            const json = await res.json();
            if (!json.ok) throw new Error(json.error || 'Unknown error');
            setItems(json.data?.data ?? []);
        } catch (e: any) {
            setErr(e.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => { runSearch(); }, []);

    return (
        <main className="max-w-4xl mx-auto p-6 space-y-4">
            <h1 className="text-2xl font-semibold">Plant Whisperer</h1>
            <form
                onSubmit={(e) => { e.preventDefault(); runSearch(); }}
                className="flex flex-wrap gap-2"
            >
                <input
                    value={q} onChange={(e) => setQ(e.target.value)}
                    placeholder="Search plants (e.g., aloe, fern)"
                    className="border rounded px-3 py-2 flex-1 min-w-56"
                />
                <select value={sunlight} onChange={(e) => setSunlight(e.target.value)} className="border rounded px-3 py-2">
                    <option value="">Sunlight</option>
                    <option value="full_sun">Full Sun</option>
                    <option value="partial_sun">Partial Sun</option>
                    <option value="shade">Shade</option>
                </select>
                <select value={watering} onChange={(e) => setWatering(e.target.value)} className="border rounded px-3 py-2">
                    <option value="">Watering</option>
                    <option value="minimum">Minimum</option>
                    <option value="average">Average</option>
                    <option value="frequent">Frequent</option>
                </select>
                <button className="border rounded px-4 py-2">Search</button>
            </form>

            {loading && <p>Loading…</p>}
            {err && <p className="text-red-600">Error: {err}</p>}

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {items.map(p => (
                    <li key={p.id} className="border rounded p-3">
                        <div className="flex gap-3">
                            {p.default_image?.thumbnail && (
                                <img
                                    src={p.default_image.thumbnail}
                                    alt={p.common_name ?? 'Plant'}
                                    className="w-20 h-20 object-cover rounded"
                                />
                            )}
                            <div>
                                <h2 className="font-medium">{p.common_name ?? '(No common name)'}</h2>
                                <p className="text-sm opacity-70">{p.scientific_name?.[0]}</p>
                                <Link href={`/plants/${p.id}`} className="text-blue-600 underline text-sm">Details</Link>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </main>
    );
}

