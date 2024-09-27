import Link from "next/link";
import { Icons } from "./Icons";
import { buttonVariants } from "./ui/Button";

const Navbar = () => {
  return (
    <div className="fixed top-0 inset-x-0 h-fit bg-zinc-100 border-b border-zinc-300 z-[10] p-2">
      <div className="container flex max-w-7xl h-full mx-auto items-center justify-between gap-2">
        {/* <Logo /> */}
        <Link href={"/"} className="flex gap-2 items-center">
          <Icons.logo className="w-10 h-10 sm:h-6 sm:w-6" />
          <p className="hidden text-zinx-700 text-lg font-medium md:flex">
            Breadit
          </p>
        </Link>

        {/* SearchBar  */}

        <Link href={"/sign-in"} className={buttonVariants()}>
          Sign In
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
