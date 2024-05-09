"use client";
import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

export default function FormButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      disabled={pending ? true : false}
      className="flex items-center gap-2"
    >
      Submit
      {pending && <Loader2 size={18} className="animate-spin" />}
    </Button>
  );
}
