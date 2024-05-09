"use client";
import Link from "next/link";
import FormButton from "../FormButton";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useFormState } from "react-dom";
import { login } from "@/actions/authAction";
import toast from "react-hot-toast";
import { useRef } from "react";

export default function LoginForm() {
  const [state, action] = useFormState(login, {
    message: null,
    success: false,
  });
  const ref = useRef(null);
  if (state?.success === false) {
    toast.error(toast?.message);
    ref?.current?.reset();
  } else {
    toast.success(toast?.message);
  }
  return (
    <form action={action} ref={ref} className="w-full space-y-3 ">
      <div className="flex gap-2 flex-col">
        <Label>Email</Label>
        <Input type="email" name="email" />
      </div>
      <div className="flex gap-2 flex-col">
        <Label>Password</Label>
        <Input type="password" name="password" className="p-2" />
      </div>
      <div className="mt-2">
        <FormButton />
      </div>
    </form>
  );
}
