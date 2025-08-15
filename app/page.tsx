'use client';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { setItems, setLoading, setError } from '@/redux/slices/nftsSlice';
import NftCard from './components/NftCard';
import SearchBar from './components/SearchBar';
import Filters from './components/Filters';

export default function HomePage() {
  const dispatch = useDispatch();
  const { items, loading, error, search, filters } = useSelector((s: RootState) => s.nfts);

  useEffect(() => {
    let canceled = false;
    (async () => {
      dispatch(setLoading(true));
      try {
        const res = await fetch('/api/nfts');
        const json = await res.json();
        if (!canceled) dispatch(setItems(json.items || []));
      } catch (e: any) {
        if (!canceled) dispatch(setError(e?.message || 'Failed to load NFTs'));
      } finally {
        if (!canceled) dispatch(setLoading(false));
      }
    })();
    return () => { canceled = true; }
  }, [dispatch]);

  const filtered = items.filter((it) => {
    const nameOk = it.name.toLowerCase().includes((search||'').toLowerCase());
    const price = Number(it.price);
    const minOk = !filters?.min || price >= Number(filters?.min || 0);
    const maxOk = !filters?.max || price <= Number(filters?.max || Number.MAX_SAFE_INTEGER);
    const statusOk = !filters?.status || it.status === filters?.status;
    return nameOk && minOk && maxOk && statusOk;
  });

  if (loading) return <div className="py-20 text-center">Loading NFTs...</div>;
  if (error) return <div className="py-20 text-center text-red-600">{error}</div>;

  return (
    <div className="grid gap-4">
      <SearchBar />
      <Filters />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map((it) => <NftCard key={it.id} nft={it} />)}
      </div>
    </div>
  );
}
