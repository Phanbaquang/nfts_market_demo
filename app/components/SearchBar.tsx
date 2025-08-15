"use client";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setSearch } from "@/redux/slices/nftsSlice";

export default function SearchBar() {
  const dispatch = useDispatch();
  const value = useSelector((s: RootState) => s.nfts.search || "");

  return (
    <input
      className="w-full rounded-2xl border px-4 py-3 outline-none bg-white"
      placeholder="Search NFTs by name..."
      value={value}
      onChange={(e) => dispatch(setSearch(e.target.value))}
    />
  );
}
