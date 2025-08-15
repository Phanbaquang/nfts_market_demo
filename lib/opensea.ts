import { NftItem } from '@/types/nft';

export async function fetchNftsFromOpenSea(): Promise<NftItem[]> {
  try {
    const res = await fetch('https://api.opensea.io/api/v1/assets?order_direction=desc&limit=10', {
      headers: {
        'Accept': 'application/json',
        'X-API-KEY': process.env.NEXT_PUBLIC_OPENSEA_API_KEY || '',
      },
      // Next.js edge can complain without this in serverless context
      cache: 'no-store',
    });

    const data = await res.json();
    if (!data?.assets) return mockNfts();
    return data.assets.map((asset: any) => ({
      id: String(asset.id),
      name: asset.name || 'Unnamed NFT',
      image: asset.image_url || '/placeholder.png',
      description: asset.description || '',
      price: 0.01,
      status: 'available',
      owner: asset.owner?.address || '',
    }));
  } catch {
    return mockNfts();
  }
}

export function mockNfts(): NftItem[] {
  return Array.from({ length: 12 }).map((_, i) => ({
    id: `mock-${i+1}`,
    name: `Mock NFT #${i+1}`,
    image: `https://picsum.photos/seed/nft-${i+1}/600/600`,
    description: 'Mocked NFT for development',
    price: Number((0.01 + i * 0.002).toFixed(3)),
    status: i % 5 === 0 ? 'sold' : 'available',
  }));
}
