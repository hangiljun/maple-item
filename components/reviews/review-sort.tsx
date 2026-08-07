"use client";
import { useRouter, useSearchParams } from "next/navigation";

export function ReviewSort() {
  const router = useRouter();
  const sp = useSearchParams();
  const current = sp.get("sort") || "latest";
  return (
    <select
      defaultValue={current}
      onChange={(e) => {
        const p = new URLSearchParams(Array.from(sp.entries()));
        p.set("sort", e.target.value);
        p.delete("page");
        router.push(`/reviews?${p.toString()}`);
      }}
    >
      <option value="latest">최신순</option>
      <option value="likes">추천순</option>
    </select>
  );
}
