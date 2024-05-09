import { Loader2 } from "lucide-react";

export default function loading() {
  return (
    <div className="min-h-[80vh] flex justify-center items-center">
      <Loader2 size={60} className="animate-spin" />
    </div>
  );
}
