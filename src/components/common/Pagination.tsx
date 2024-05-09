"use client";
import { MoveLeftIcon, MoveRight } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface Props {
  count: Number;
}

export default function Pagination({ count }: Props) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  const page: Number = searchParams.get("page") || 1;
  const params = new URLSearchParams(searchParams);

  const ITEM_PER_PAGE = 2;
  const hasPrev = ITEM_PER_PAGE * (parseInt(page) - 1) > 0;
  const hasNext = ITEM_PER_PAGE * (parseInt(page) - 1) + ITEM_PER_PAGE < 6;

  const handlePage = (type: string) => {
    type === "prev"
      ? params.set("page", parseInt(page) - 1)
      : params.set("page", parseInt(page) + 1);

    replace(`${pathname}?${params}`);
  };
  return (
    <div className="flex gap-2">
      <button
        disabled={!hasPrev}
        onClick={() => handlePage("prev")}
        className={`border p-2 px-10 rounded-md ${
          hasPrev ? "bg-green-500 hover:bg-green-700" : "bg-gray-400 text-black"
        } hover:bg:green-600`}
      >
        <MoveLeftIcon size={16} />
      </button>
      <button
        disabled={!hasNext}
        onClick={() => handlePage("next")}
        className={`border p-2 px-10 rounded-md ${
          hasNext ? "bg-green-500 hover:bg-green-700" : "bg-gray-400 text-black"
        } hover:bg:green-600`}
      >
        <MoveRight size={16} />
      </button>
    </div>
  );
}
