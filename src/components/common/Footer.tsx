export default function Footer() {
  return (
    <footer className="h-[70px] px-5 shadow bg-white z-10 dark:bg-slate-800 flex items-center  w-full">
      <p className="text-md">All Right Reserved {new Date().getFullYear()}</p>
    </footer>
  );
}
