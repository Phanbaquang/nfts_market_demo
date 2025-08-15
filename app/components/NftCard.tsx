"use client";
import { NftItem } from "@/types/nft";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { toggleFavorite } from "@/redux/slices/favoritesSlice";

export default function NftCard({ nft }: { nft: NftItem }) {
  const dispatch = useDispatch();
  const favIds = useSelector((s: RootState) => s.favorites.ids);
  const isFav = favIds.includes(nft.id);

  return (
    <div className="rounded-2xl border p-3 flex flex-col gap-3 bg-white">
      <Link href={`/nft/${nft.id}`} className="block">
        <img
          src={nft.image}
          alt={nft.name}
          className="w-full aspect-square object-cover rounded-xl"
        />
      </Link>
      <div className="flex items-start justify-between">
        <div>
          <div className="font-semibold">{nft.name}</div>
          <div className="text-sm opacity-70">{nft.price} ETH</div>
          <div
            className={`text-xs ${
              nft.status === "sold" ? "text-red-500" : "text-green-600"
            }`}
          >
            {nft.status}
          </div>
        </div>
        <button
          onClick={() => dispatch(toggleFavorite(nft.id))}
          className={`rounded-xl px-3 py-2 border ${
            isFav ? "bg-black text-white" : ""
          }`}
        >
          {isFav ? "★" : "☆"}
        </button>
      </div>
    </div>
  );
}
