import { NextResponse } from "next/server";

export async function GET() {
  const items = Array.from({ length: 12 }).map((_, i) => ({
    id: `mock-${i + 1}`,
    name: `Mock NFT #${i + 1}`,
    image: `https://picsum.photos/seed/nft-${i + 1}/600/600`,
    description: "Mocked NFT for development",
    price: (Number(0.01 + i * 0.002) / 10).toFixed(4),
    status: i % 5 === 0 ? "sold" : "available",
  }));
  return NextResponse.json({ items });
}
