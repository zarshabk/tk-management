"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CheckCheckIcon, Delete, Edit, View } from "lucide-react";
import TableButton from "./common/TableButton";
import DialogAction from "./DialogAction";
import { useState } from "react";
import {
  CompleteTask,
  deleteTask,
  generateExcelFile,
  saveToPdf,
} from "@/actions/taskActions";
import FormButton from "./FormButton";
import { Span } from "next/dist/trace";

export default function Tasks({ tasks }) {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(null);
  const [type, setType] = useState(null);

  const handleShow = (id, type) => {
    setOpen(true);
    setType(type);
    setId(id);
  };

  const handleClose = () => {
    setOpen(false);
    setType(null);
    setId(null);
  };
  return (
    <>
      <Table>
        {tasks.length < 1 && (
          <TableCaption>You have no Tasks added</TableCaption>
        )}
        <TableHeader>
          <TableRow>
            <TableHead>id</TableHead>
            <TableHead>title</TableHead>
            <TableHead>Created at</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Till Date</TableHead>
            <TableHead className="">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((t, i) => {
            return (
              <TableRow key={i}>
                <TableCell className="font-medium">{t._id}</TableCell>
                <TableCell>{t?.title}</TableCell>
                <TableCell>{new Date(t?.createdAt).toDateString()}</TableCell>
                <TableCell>
                  {t.status === "completed" ? (
                    <span className="py-1 px-4 bg-green-200 text-green-600 font-semibold rounded-[30px]">
                      completed
                    </span>
                  ) : (
                    <span className="py-1 px-4 bg-red-200 text-red-600 font-semibold rounded-[30px]">
                      Pending
                    </span>
                  )}
                </TableCell>
                <TableCell>{new Date(t?.deadline).toDateString()}</TableCell>
                <TableCell className="text-right flex gap-2 items-center">
                  <div className="flex gap-2 items-center">
                    <button
                      onClick={saveToPdf}
                      className="p-2 border border-green-500 text-green-500 rounded-md hover:bg-green-500 hover:text-white"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleShow(t._id, "delete")}
                      className=" p-2 border border-red-500 text-red-500 rounded-md hover:bg-red-500 hover:text-white"
                    >
                      <Delete size={18} />
                    </button>
                    <button
                      disabled={t?.status === "completed"}
                      onClick={() => handleShow(t._id, "complete")}
                      className={` p-2 border ${
                        t.status !== "completed"
                          ? " hover:bg-green-500 text-green-500  hover:text-white border-green-500"
                          : "bg-transparent border-gray-400"
                      }  flex items-center gap-2 rounded-md `}
                    >
                      <CheckCheckIcon size={18} />
                      mark complete
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      <DialogAction type={type} open={open} handleClose={handleClose}>
        {type === "delete"
          ? "Are You Sure You want to Delete this task"
          : "Are you sure you want to complte this task"}
        <div className="my-2 mt-8 flex gap-2">
          {type === "delete" ? (
            <button
              onClick={() => {
                deleteTask(id);
                setTimeout(() => {
                  handleClose();
                }, 1000);
              }}
              className="p-2 border bg-red-600 rounded-sm text-white"
            >
              Yes Delete
            </button>
          ) : (
            <form
              action={async () => {
                await CompleteTask(id);

                handleClose();
              }}
            >
              <FormButton />
            </form>
          )}
          <button
            onClick={handleClose}
            className="p-2 border bg-green-600 rounded-sm text-white"
          >
            Cancel
          </button>
        </div>
      </DialogAction>
    </>
  );
}
