'use client';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import NftCard from '../components/NftCard';

export default function FavoritesPage() {
  const ids = useSelector((s: RootState) => s.favorites.ids);
  const items = useSelector((s: RootState) => s.nfts.items);
  const favs = items.filter(i => ids.includes(i.id));

  return (
    <div className="grid gap-4">
      <h1 className="text-2xl font-bold">Favorites</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {favs.map((nft) => <NftCard key={nft.id} nft={nft} />)}
      </div>
    </div>
  );
}
