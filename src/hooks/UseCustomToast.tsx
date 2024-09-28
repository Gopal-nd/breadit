import Link from "next/link";
import { toast } from "./use-toast";
import { buttonVariants } from "@/components/ui/Button";

export const useCustomToast = () => {
  const loginToast = () => {
    const { dismiss } = toast({
      title: "Login Required",
      description: "Please login to do this action",
      variant: "destructive",
      action: (
        <Link
          className={buttonVariants({ variant: "outline" })}
          onClick={() => dismiss()}
          href="/sign-in"
        >
          Login
        </Link>
      ),
    });
  };


  return {
    loginToast}
};
