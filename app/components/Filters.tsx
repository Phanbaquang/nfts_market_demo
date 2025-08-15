"use client";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setFilters, resetFilters } from "@/redux/slices/nftsSlice";

export default function Filters() {
  const dispatch = useDispatch();
  const { filters } = useSelector((s: RootState) => s.nfts);

  return (
    <div className="flex flex-wrap gap-3 items-center">
      <input type="number" placeholder="Min price" className="border rounded-xl px-3 py-2 bg-white"
        value={filters?.min ?? ""}
        onChange={(e) => dispatch(setFilters({ ...(filters||{}), min: Number(e.target.value || 0) }))} />
      <input type="number" placeholder="Max price" className="border rounded-xl px-3 py-2 bg-white"
        value={filters?.max ?? ""}
        onChange={(e) => dispatch(setFilters({ ...(filters||{}), max: Number(e.target.value || 0) }))} />
      <select className="border rounded-xl px-3 py-2 bg-white"
        value={filters?.status ?? ""}
        onChange={(e) => dispatch(setFilters({ ...(filters||{}), status: (e.target.value || undefined) as any }))}>
        <option value="">All status</option>
        <option value="available">Available</option>
        <option value="sold">Sold</option>
      </select>
      <button className="ml-auto rounded-xl border px-4 py-2" onClick={() => dispatch(resetFilters())}>Reset</button>
    </div>
  );
}
