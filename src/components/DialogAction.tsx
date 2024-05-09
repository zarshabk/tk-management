"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "./ui/dialog";

export default function DialogAction({ open, type, children, handleClose }) {
  return (
    <Dialog open={open} modal={handleClose}>
      <h2 className="text-lg">{type}</h2>
      <DialogContent>
        <DialogDescription>{children}</DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
