"use server";
import { Connection } from "@/config/db";
import { getSession } from "./authAction";
import { revalidatePath } from "next/cache";
import fs from "fs";
import Task from "@/models/task";
import { connect } from "http2";
import PdfKit from "pdfkit";

export const createTask = async (state: any, formData: FormData) => {
  await Connection();
  const session = await getSession();
  const title = formData.get("title") as string;

  const deadline = formData.get("deadline") as string;

  const desc = formData.get("desc") as string;

  if (!title || !deadline || !desc) {
    return { success: false, message: "All fields are required" };
  }

  await Task.create({
    title,
    desc,
    deadline,
    user: session?.userId,
  });

  revalidatePath("/dashboard");
  return { success: true, message: "task has been created" };
};

export const fetchTasks = async (q: string, page: Number) => {
  await Connection();

  const session = await getSession();

  const LIMIT = 5;
  const regex = new RegExp(q, "i");
  const count: Number = await Task.find({
    user: session?.userId,
    title: { $regex: regex },
  }).count();
  const tasks: any = await Task.find({
    user: session?.userId,
    title: { $regex: regex },
  })
    .sort({
      createdAt: -1,
    })
    .skip((page - 1) * LIMIT)
    .limit(LIMIT);

  return { tasks, count };
};

export const deleteTask = async (id: string) => {
  await Connection();

  await Task.findByIdAndDelete({ _id: id });

  revalidatePath("/dashboard");
};

export const CompleteTask = async (id: string) => {
  await Connection();

  const t = await Task.findById({ _id: id });

  if (t.status !== "completed") {
    t.status = "completed";
  }

  t.save();

  revalidatePath("/dashboard");
};

export const generateExcelFile = async () => {
  const session = await getSession();
  // const filename = `${
  //   session?.username + "" + session?.userId + "" + new Date()
  // }`;
  const writeStream = fs.createWriteStream("zarshab.xls");

  var header = "Sl No" + "\t" + " Age" + "\t" + "Name" + "\n";
  var row1 = "0" + "\t" + " 21" + "\t" + "Rob" + "\n";
  var row2 = "1" + "\t" + " 22" + "\t" + "bob" + "\n";

  writeStream.write(header);
  writeStream.write(row1);
  writeStream.write(row2);

  writeStream.close();

  // const tasks = await Task.find({ user: session.userId });

  // var header =
  //   "Sl No" + "\t" + " title " + "\t" + "created at" + "status" + "\n";

  // var row = "";
  // stream.write(header);

  // for (var i = 0; i < tasks.length; i++) {
  //   row = `${tasks[i]?._id}+"\t"+${tasks[i].title}+"\t"+${new Date(
  //     tasks[i]?.createdAt
  //   ).toDateString()}+""+${tasks[i]?.status}+"\n"`;
  //   stream.write(row);
  // }
  // stream.close();
};

export const saveToPdf = async () => {
  const session = await getSession();
  await Connection();

  const task = await Task.find({ user: session?.userId });
  const doc = new PdfKit();
  const outputStream = fs.createWriteStream("output.pdf");
  doc.pipe(outputStream);

  // Define your data
  const data = {
    name: "John Doe",
    age: 30,
    email: "john.doe@example.com",
  };

  // Write data to the PDF
  doc.fontSize(12).text(`Name: ${data.name}`, 50, 50);
  doc.fontSize(12).text(`Age: ${data.age}`, 50, 70);
  doc.fontSize(12).text(`Email: ${data.email}`, 50, 90);

  // Finalize the PDF and close the stream
  doc.end();
  outputStream.on("finish", () => {
    console.log("PDF created successfully");
  });
};

//for admin
export const taskAnalytics = async () => {
  await Connection();
  const session = await getSession();

  const tasks = await Task.aggregate([
    {
      $group: {
        _id: "$user",
        count: {
          $sum: 1,
        },
      },
    },
  ]);

  return tasks;
};

//task by date created
export const taskByDate = async () => {
  await Connection();
  const session = await getSession();

  const tasks = await Task.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $unwind: "$user",
    },
    {
      $project: {
        year: { $year: "$createdAt" }, // Extract year from createdAt field
        month: { $month: "$createdAt" }, // Extract month from createdAt field
        day: { $dayOfMonth: "$createdAt" }, // Extract day from createdAt field
        "user.email": 1,
      },
    },
    {
      $group: {
        _id: {
          user: "$user.email",
          year: "$year",
          month: "$month",
          day: "$day",
        }, // Group by year, month, and day
        count: { $sum: 1 }, // Count the number of tasks for each date
      },
    },
    {
      $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 }, // Sort the results by date
    },
  ]);
  revalidatePath("/dashboard");
  return tasks;
};

export const userTaskAnaytics = async () => {
  await Connection();
  const session = await getSession();

  const tasks = await Task.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $unwind: "$user",
    },
    {
      $match: {
        user: session?.userId,
      },
    },
    {
      $project: {
        year: { $year: "$createdAt" }, // Extract year from createdAt field
        month: { $month: "$createdAt" }, // Extract month from createdAt field
        day: { $dayOfMonth: "$createdAt" }, // Extract day from createdAt field
      },
    },
    {
      $group: {
        _id: {
          year: "$year",
          month: "$month",
          day: "$day",
        }, // Group by year, month, and day
        count: { $sum: 1 }, // Count the number of tasks for each date
      },
    },
    {
      $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 }, // Sort the results by date
    },
  ]);
  return tasks;
};
