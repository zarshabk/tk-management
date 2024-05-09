import { Loader2 } from "lucide-react";

export default function Loader() {
  return (
    <div className="flex h-24 justify-center w-full items-center">
      <Loader2 size={30} className="animate-spin" />
    </div>
  );
}
