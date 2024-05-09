import { getSession } from "@/actions/authAction";
import {
  fetchTasks,
  taskAnalytics,
  taskByDate,
  userTaskAnaytics,
} from "@/actions/taskActions";
import BarChart from "@/components/charts/BarChart";
import LineChart from "@/components/charts/LineChart";
import Pagination from "@/components/common/Pagination";
import DialogAction from "@/components/DialogAction";
import Loader from "@/components/Loader";
import Search from "@/components/Search";
import TaskModal from "@/components/TaskModal";
import Tasks from "@/components/Tasks";
import { Input } from "@/components/ui/input";
import { Connection } from "@/config/db";
import Task from "@/models/task";
import { MoveLeftIcon, MoveRight, Plus } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export const generatemetadata: Metadata = {
  title: "Home",
  description: "once you login you can make changes to everywhere",
};

export default async function page({ searchParams }) {
  await Connection();
  const session = await getSession();
  if (session.isLogedIn === false) {
    return redirect("/");
  }
  const completed: Number = await Task.countDocuments({
    user: session?.userId,
    status: "completed",
  });

  const pending: Number = await Task.countDocuments({
    user: session?.userId,
    status: "created",
  });

  const total: Number = await Task.countDocuments({
    user: session?.userId,
  });

  const query = searchParams?.query || "";
  const page = searchParams?.page || 1;
  const { tasks, count } = await fetchTasks(query, page);
  const totalTasks: any = await Task.countDocuments({ user: session?.userId });

  const userByTasks = await taskAnalytics();
  const byDate = await taskByDate();

  const userTasks = await userTaskAnaytics();
  console.log("task by each user", userByTasks);
  console.log("task by each user e,mail", byDate);

  console.log("my task analytics", userTasks);
  return (
    <div className="w-full dark:bg-transparent">
      <div className="flex justify-between items-center">
        <div className="p-5 shadow lg:w-1/3 md:w-1/3 w-full h-fit bg-cyan-600 dark:bg-slate-900 rounded-md ">
          <h2 className="text-4xl flex gap-3">
            <span className="font-bold">Welcome</span>
            {session.username}
          </h2>
          <span className="text-md text-gray-600">{session?.email}</span>
        </div>
        <div>
          <TaskModal />
        </div>
      </div>
      <div className="my-5">
        <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-4">
          <div className="p-5 bg-green-500 text-white  shadow flex items-center rounded-md justify-between">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Antu_task-complete.svg/1024px-Antu_task-complete.svg.png"
              className="h-[80px] w-[80px] "
              alt=""
            />
            <div className="flex flex-col items-center gap-3">
              <h3 className="text-xl font-[300]">Task Completed</h3>
              <h6 className="text-3xl font-bold">{completed}</h6>
            </div>
          </div>
          <div className="p-5 bg-purple-500 text-white shadow flex items-center rounded-md justify-between">
            <img
              src="https://png.pngtree.com/png-vector/20230509/ourmid/pngtree-completed-task-flat-icon-vector-png-image_7092568.png"
              className="h-[80px] w-[80px] "
              alt=""
            />
            <div className="flex flex-col items-center gap-3">
              <h3 className="text-xl font-[300]">Total Tasks</h3>
              <Suspense fallback={<h3>Loading...</h3>}>
                <h6 className="text-3xl font-bold">{total}</h6>
              </Suspense>
            </div>
          </div>
          <div className="p-5 bg-blue-500 text-white  shadow rounded-md flex items-center justify-between">
            <img
              src="https://www.iconpacks.net/icons/2/free-time-icon-3487-thumb.png"
              className="h-[80px] w-[80px] "
              alt=""
            />
            <div className="flex flex-col items-center gap-3">
              <h3 className="text-xl font-[300]">Task Pending</h3>
              <h6 className="text-3xl font-bold">{pending}</h6>
            </div>
          </div>
          <div className="p-5 bg-yellow-400 shadow rounded-md flex items-center justify-between">
            <img
              src="https://cdn-icons-png.freepik.com/512/12179/12179148.png"
              className="h-[80px] w-[80px] "
              alt=""
            />
            <div className="flex flex-col items-center gap-3">
              <h3 className="text-xl font-[300]">Total Expired</h3>
              <h6 className="text-3xl font-bold">{5}</h6>
            </div>
          </div>
        </div>
      </div>
      <div className="my-5 p-5  border lg:w-full md:w-full w-full overflow-x-scroll lg:overflow-hidden md:overflow-hidden shrink-0 ">
        <div className="flex gap-2 mb-5 justify-between w-full shrink-0 items-center">
          <div className="">
            <Search placeholder={"Search task"} />
          </div>
          <div className="flex shrink-0 gap-2">
            <Link
              href={"#"}
              className="rounded-md border p-2 px-5 border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
            >
              Export to Csv
            </Link>
            <Link
              href={"#"}
              className="rounded-md border p-2 px-5 border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
            >
              Export to Pdf
            </Link>
          </div>
        </div>
        <Suspense fallback={<Loader />}>
          <Tasks tasks={tasks} />
        </Suspense>
        <div className="py-2 flex justify-between items-center">
          <Pagination count={count} />
          <div className="flex gap-2">
            <h5>12 out of {tasks?.length}</h5>
          </div>
        </div>
      </div>
      <div className="">
        <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 gap-5">
          <div className="shadow p-2 dark:bg-gray-900 min-h-[350px]">
            <LineChart />
          </div>
          <div className="shadow p-2 dark:bg-gray-900 min-h-[350px]">
            <BarChart byDate={byDate} />
          </div>
        </div>
      </div>
    </div>
  );
}
