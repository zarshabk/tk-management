"use client";
import { useFormState } from "react-dom";
import FormButton from "../FormButton";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { createUser } from "@/actions/authAction";
import { useRef } from "react";
import toast from "react-hot-toast";

export default function RegisterForm() {
  const [state, action] = useFormState(createUser, null);
  const ref = useRef(null);

  if (state?.success == false) {
    toast.error(toast?.message);
  } else {
    toast.success(toast?.message);
  }
  return (
    <form action={action} ref={ref} className="w-full space-y-3 ">
      <div className="flex gap-2 flex-col">
        <Label>Username</Label>
        <Input type="text" name="username" />
      </div>
      <div className="flex gap-2 flex-col">
        <Label>Email</Label>
        <Input type="email" name="email" />
      </div>
      <div className="flex gap-2 flex-col">
        <Label>Password</Label>
        <Input type="password" name="password" />
      </div>
      <div className="mt-2">
        <FormButton />
      </div>
    </form>
  );
}
