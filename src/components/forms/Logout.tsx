"use client";
import { logout } from "@/actions/authAction";
import FormButton from "../FormButton";
import { Loader2, LogOut } from "lucide-react";
import { useFormStatus } from "react-dom";

export default function Logout() {
  const { pending } = useFormStatus();
  return (
    <form action={logout}>
      <button className="flex gap-1 items-center p-2 border px-5 rounded-md hover:bg-red-500">
        <LogOut size={16} />
        logout
        {pending && <Loader2 size={16} className="animate-spin" />}
      </button>
    </form>
  );
}
