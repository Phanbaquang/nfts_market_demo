"use client";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import BuyNftButton from "@/app/components/BuyNFTButton";

export default function NftDetailPage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const item = useSelector((s: RootState) =>
    s.nfts.items.find((x) => x.id === id)
  );

  if (!item) return <div className="p-8">Loading NFT…</div>;

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={item.image} alt={item.name} className="w-full rounded-2xl" />
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">{item.name}</h1>
        <p className="opacity-80">{item.description || "No description"}</p>
        <div className="text-xl">
          Price: <b>{item.price} ETH</b>
        </div>
        {/* <BuyNftButton price={item.price} /> */}
        
        {item.status === "sold" ? (
          <button
            disabled
            className="w-full px-4 py-2 rounded-lg bg-gray-400 text-white font-semibold cursor-not-allowed"
          >
            Đã bán hết
          </button>
        ) : (
          <BuyNftButton price={item.price} />
        )}
      </div>
    </div>
  );
}
