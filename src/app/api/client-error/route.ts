export const runtime = "nodejs";

const clip = (v: unknown, n: number) => (typeof v === "string" ? v.slice(0, n) : "");

export async function POST(request: Request) {
  try {
    const text = (await request.text()).slice(0, 4000);
    const body = JSON.parse(text) as Record<string, unknown>;
    console.error(
      "[client-error]",
      JSON.stringify({
        name: clip(body.name, 100),
        message: clip(body.message, 500),
        stack: clip(body.stack, 1500),
        ua: clip(body.ua, 300),
        url: clip(body.url, 200),
        country: request.headers.get("x-vercel-ip-country"),
      }),
    );
  } catch {
    // ignore malformed reports
  }
  return new Response(null, { status: 204 });
}
