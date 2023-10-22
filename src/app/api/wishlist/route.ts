import { db } from "@/db/script";

export async function GET() {
  const product = await db.wishlist.findMany();
  return new Response(JSON.stringify(product), {
    headers: { "content-type": "application/json" },
  });
}

export async function POST(request: Request) {
  const data = await request.json();
  if (!data) {
    return new Response("Request body is required", { status: 400 });
  }
  const product = await db.wishlist.create({
    data,
  });
  return new Response(JSON.stringify(product), {
    headers: { "content-type": "application/json" },
  });
}
