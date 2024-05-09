"use client";
import { deleteTask } from "@/actions/taskActions";
import { CheckCheckIcon, Delete, Edit, View } from "lucide-react";
import { useState } from "react";
interface Props {
  id: String;
}
export default function TableButton({ id }: Props) {
  const [data, setData] = useState<String>("");
  const [open, setOpen] = useState(false);
  const [type, setType] = useState(null);

  const [cid, setId] = useState(null);
  console.log("id", id);
  console.log("data", data);

  const handleShow = (c_id, type) => {
    setOpen(true);
    setId(c_id);
    setType(type);
  };

  const handleclose = () => {
    setOpen(false);
    setId(null);
    setType(null);
  };

  return (
    <div className="flex gap-2 items-center">
      <button className="p-2 border border-green-500 text-green-500 rounded-md hover:bg-green-500 hover:text-white">
        <Edit size={18} />
      </button>
      <button
        onClick={() => deleteTask(id)}
        className=" p-2 border border-red-500 text-red-500 rounded-md hover:bg-red-500 hover:text-white"
      >
        <Delete size={18} />
      </button>
      <button
        onClick={() => handleShow(id, "task complete")}
        className=" p-2 border border-green-500 text-green-500 flex items-center gap-2 rounded-md hover:bg-green-500 hover:text-white"
      >
        <CheckCheckIcon size={18} />
        mark complete
      </button>
    </div>
  );
}
