import Link from "next/link";
import Logout from "../forms/Logout";
import ModeToggle from "../UseTheme";

export default function Header() {
  return (
    <header className="h-[70px] shadow dark:bg-slate-900 flex justify-between items-center px-5">
      <Link href={"/dashboard"}>
        {" "}
        <h1 className="text-xl font-bold">Dashboard</h1>
      </Link>
      <div className="flex gap-3 items-center space-x-3">
        <Logout />
        {/* <div className="h-[50px] w-[50px] rounded-full">
          <img
            className="w-full h-full object-cover rounded-full"
            src="https://static.vecteezy.com/system/resources/thumbnails/002/002/403/small/man-with-beard-avatar-character-isolated-icon-free-vector.jpg"
            alt=""
          />
  </div>*/}
        <ModeToggle />
      </div>
    </header>
  );
}
