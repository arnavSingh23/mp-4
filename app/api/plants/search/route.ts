import {NextResponse} from 'next/server';

export async function GET(req: Request) {
    const {searchParams} = new URL(req.url);
    const q = searchParams.get('q') ?? '';
    const sunlight = searchParams.get('sunlight') ?? '';
    const watering = searchParams.get('watering') ?? '';
    const page = searchParams.get('page') ?? '1';

    const key = process.env.PERENUAL_API_KEY!;
    const base = process.env.PERENUAL_BASE!;
    const url = `${base}/species-list?key=${key}&q=${encodeURIComponent(q)}&page=${page}` + (sunlight ? `&sunlight=${encodeURIComponent(sunlight)}` : '') + (watering ? `&watering=${encodeURIComponent(watering)}` : '');

    try {
        const res = await fetch(url, {cache: 'no-store'});
        if (!res.ok) {
            const text = await res.text();
            return NextResponse.json({ok: false, error: `Upstream ${res.status}: ${text}`}, {status: 502});
        }
        const data = await res.json();
        return NextResponse.json({ok: true, data});
    } catch (err: any) {
        return NextResponse.json({ok: false, error: err.message}, {status: 500});
    }
}
