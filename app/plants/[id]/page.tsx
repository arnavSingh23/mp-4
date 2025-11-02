'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import type { PlantDetails } from '@/types/plant';
import Link from 'next/link';

export default function PlantDetailPage() {
    const params = useParams<{ id: string }>();
    const [data, setData] = useState<PlantDetails | null>(null);
    const [err, setErr] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function load() {
            setLoading(true); setErr(null);
            try {
                const res = await fetch(`/api/plants/${params.id}`);
                const json = await res.json();
                if (!json.ok) throw new Error(json.error || 'Unknown error');
                setData(json.data);
            } catch (e: any) {
                setErr(e.message);
            } finally {
                setLoading(false);
            }
        }
        load();
    }, [params.id]);

    if (loading) return <main className="max-w-3xl mx-auto p-6">Loading…</main>;
    if (err) return <main className="max-w-3xl mx-auto p-6 text-red-600">Error: {err}</main>;
    if (!data) return <main className="max-w-3xl mx-auto p-6">No data.</main>;

    return (
        <main className="max-w-3xl mx-auto p-6 space-y-4">
            <Link href="/plants" className="text-sm text-blue-600 underline">← Back</Link>
            <h1 className="text-2xl font-semibold">{data.common_name ?? '(No common name)'} </h1>
            <p className="opacity-70">{data.scientific_name?.[0]}</p>

            {data.default_image?.medium_url && (
                <img src={data.default_image.medium_url} alt={data.common_name ?? 'Plant'} className="rounded" />
            )}

            <section className="space-y-1">
                {data.description && <p>{data.description}</p>}
                <p><b>Watering:</b> {data.watering ?? '—'}</p>
                <p><b>Sunlight:</b> {data.sunlight?.join(', ') ?? '—'}</p>
                <p><b>Care level:</b> {data.care_level ?? '—'}</p>
                {data.watering_general_benchmark?.value && (
                    <p><b>Benchmark:</b> {data.watering_general_benchmark.value} {data.watering_general_benchmark.unit ?? ''}</p>
                )}
                <p><b>Cycle:</b> {data.cycle ?? '—'}</p>
                <p><b>Also known as:</b> {data.other_name?.join(', ') ?? '—'}</p>
                <p><b>Size:</b> {data.dimension ?? '—'}</p>
            </section>
        </main>
    );
}
