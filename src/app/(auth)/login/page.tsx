import { getSession } from "@/actions/authAction";
import LoginForm from "@/components/forms/LoginForm";
import { Metadata } from "next";

import Link from "next/link";
import { redirect } from "next/navigation";
export const generateMetadata: Metadata = {
  title: "login your account",
  description: "once you login you can make changes to everywhere",
};
export default async function page() {
  const session = await getSession();
  if (session.isLogedIn === true) {
    return redirect("/dashboard");
  }
  return (
    <div
      className="min-h-screen w-full p-5 flex flex-col justify-center items-center"
      style={{
        backgroundImage:
          'url("https://cdn.pixabay.com/photo/2017/10/10/21/47/laptop-2838921_1280.jpg")',
        objectFit: "cover",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="lg:w-[30%] md:w-[65%] w-[90%] bg-white p-5 m-auto shadow">
        <div className="text-center mb-2">
          <h1 className="font-normal text-3xl">Login</h1>
        </div>
        <LoginForm />
        <div className="my-2 text-center">
          <p className="text-sm">
            already have an account?
            <Link className="text-blue-700 underline" href={"/"}>
              create account
            </Link>
          </p>
        </div>
        <div className="text-center my-2 ">
          <span className="text-gray-400 font-medium">OR</span>
        </div>
        <div className="flex justify-center items-center gap-3"></div>
      </div>
    </div>
  );
}
