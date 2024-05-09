import { getSession } from "@/actions/authAction";
import RegisterForm from "@/components/forms/RegisterForm";
import { url } from "inspector";
import { Divide, DivideCircle, GoalIcon } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

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
          <h1 className="font-normal text-3xl">Get Register</h1>
        </div>
        <RegisterForm />
        <div className="my-2 text-center">
          <p className="text-sm">
            already have an account?
            <Link className="text-blue-700 underline" href={"/login"}>
              login
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
