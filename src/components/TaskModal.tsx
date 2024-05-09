"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import FormButton from "./FormButton";
import { useFormState } from "react-dom";
import { createTailwindMerge } from "tailwind-merge";
import { createTask } from "@/actions/taskActions";
import toast from "react-hot-toast";
import { useRef, useState } from "react";
import { redirect, useRouter } from "next/navigation";

export default function TaskModal() {
  const [state, action] = useFormState(createTask, null);
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const router = useRouter();
  if (state) {
    if (state.success) {
      ref?.current?.reset();
      toast.success(state?.message);

      // redirect("/dashboard");
      //router.push("/dashboard");
    } else if (state.success === false) {
      toast.error(state?.message);
    } else {
      return;
    }
  }

  const handleChange = (e: any) => {
    setOpen(e);
  };
  return (
    <Dialog onOpenChange={handleChange}>
      <DialogTrigger className="border-green-500 border p-2 rounded-full hover:bg-green-500">
        <Plus size={25} />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create new Task</DialogTitle>
        </DialogHeader>
        <form ref={ref} action={action} className="flex flex-col gap-2">
          <div className="space-y-2">
            <Label>Title</Label>
            <Input type="text" name="title" />
          </div>
          <div className="space-y-2">
            <Label>Deadline Date</Label>
            <Input type="date" name="deadline" />
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea name="desc"></Textarea>
          </div>
          <div className="">
            <FormButton />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
