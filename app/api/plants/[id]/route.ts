import { NextResponse } from "next/server";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_req: Request, ctx: Ctx) {
    const { id } = await ctx.params;

    const key = process.env.PERENUAL_API_KEY;
    const base = process.env.PERENUAL_BASE ?? "https://perenual.com/api";
    if (!key) {
        return NextResponse.json({ ok: false, error: "Server missing PERENUAL_API_KEY" }, { status: 500 });
    }

    const url = new URL(`${base}/species/details/${encodeURIComponent(id)}`);
    url.searchParams.set("key", key);

    try {
        const res = await fetch(url.toString(), { cache: "no-store" });
        if (!res.ok) {
            const text = await res.text();
            return NextResponse.json({ ok: false, error: `Upstream ${res.status}: ${text}` }, { status: 502 });
        }
        const data = await res.json();
        return NextResponse.json({ ok: true, data }, { status: 200 });
    } catch (err: any) {
        return NextResponse.json({ ok: false, error: err?.message ?? "Unknown error" }, { status: 500 });
    }
}

