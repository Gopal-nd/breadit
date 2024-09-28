'use client'
import { User } from "next-auth";
import { FC } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem } from "./ui/dropdown-menu";
import UserAvatarProps from "./UserAvatarProps";
import { DropdownMenuSeparator, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import Link from "next/link";
import { signOut } from "next-auth/react";
interface UserAccounNavProps {
  user: Pick<User, "id" | "email" | "name" | "image">;
}

const UserAccounNav: FC<UserAccounNavProps> = ({ user }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatarProps
          user={{ name: user.name || null, image: user.image || null }}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white" align="end">
        <div className="flex p-2 items-center justify-start gap-2">
            <div className="flex flex-col space-y-1 leading-none">
                {user.name && <p className="font-medium">{user.name}</p>}
                {user.email&& <p className="w-[200px] text-sm text-zinc-700">
                    {user.email}
                </p>}
            </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href={`/feed`}>Feed</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={`/r/create`}>Create Community</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={`/settings`}>Settings</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={(event)=>{
            event.preventDefault()
            signOut({
                callbackUrl: `${window.location.origin}/sign-in`
            })
        }} className="cursor-pointer">
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAccounNav;
