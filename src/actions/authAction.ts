"use server";
import { Connection } from "@/config/db";
import User from "@/models/user";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { defaultSession, SessionData, sessionOptions } from "@/lib/types";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { resolve } from "path";

export const getSession = async () => {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);
  if (!session?.isLogedIn) {
    session.isLogedIn = defaultSession?.isLogedIn;
  }
  return session;
};

export const createUser = async (state: any, formData: FormData) => {
  await Connection();

  const username = formData.get("username") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const user = await User.findOne({ email: email });

  if (user) {
    return { message: "user already exist", success: false };
  }

  let pass = bcrypt.hashSync(password);

  await User.create({
    username,
    email,
    password: pass,
  });

  revalidatePath("/");
  redirect("/login");
  return { message: "account has been created successfully", success: true };
};

export const login = async (state: any, formData: FormData) => {
  await Connection();
  const session = await getSession();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const user = await User.findOne({ email: email });

  if (!user) {
    return { message: "invalid credentials", success: false };
  }

  let pass = bcrypt.compare(password, user?.password);

  if (!pass) {
    return { message: "invalid credentials", success: false };
  }

  session.userId = user._id;
  session.email = user.email;
  session.image = user?.image;
  session.username = user?.username;
  session.isLogedIn = true;

  await session.save();
  redirect("/dashboard");
  return { message: "login successfully", success: true };
};

export const logout = async () => {
  const session = await getSession();

  session.destroy();
  redirect("/");
};
