"use client";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { Input } from "./ui/input";
import { useDebouncedCallback } from "use-debounce";
export default function Search({ placeholder }) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const path = usePathname();

  console.log("path", path);

  console.log("search params", searchParams);

  const handleChange = useDebouncedCallback((e: any) => {
    const params = new URLSearchParams(searchParams);
    if (e.target.value) {
      e.target.value?.length > 2 && params.set("query", e.target.value);
    } else {
      params.delete("query");
    }

    replace(`${path}?${params}`);
  }, 50);

  return (
    <Input
      placeholder={placeholder}
      className="w-full"
      onChange={handleChange}
    />
  );
}
