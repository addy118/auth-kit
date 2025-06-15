"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { FaUser } from "react-icons/fa";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { useCurrentUser } from "@/hooks/use-current-user";
import { LogoutButton } from "./logout-button";
import { Globe, LogOut, Server, Settings, ShieldUser } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export const UserButton = () => {
  const user = useCurrentUser();
  const router = useRouter();
  const pathname = usePathname();
  console.log(pathname);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={user?.image || ""} />
          <AvatarFallback className="bg-black">
            <FaUser color="#fff" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-40" align="end">
        <span className="cursor-pointer" onClick={() => router.push("/admin")}>
          <DropdownMenuItem className="flex items-center justify-center gap-x-2 my-2">
            <ShieldUser size={18} /> Admin
          </DropdownMenuItem>
        </span>

        <span
          className="cursor-pointer"
          onClick={() => router.push("/settings")}
        >
          <DropdownMenuItem className="flex items-center justify-center gap-x-2 my-2">
            <Settings size={18} /> Settings
          </DropdownMenuItem>
        </span>

        <span className="cursor-pointer" onClick={() => router.push("/server")}>
          <DropdownMenuItem className="flex items-center justify-center gap-x-2 my-2">
            <Server size={18} /> Server
          </DropdownMenuItem>
        </span>

        <span className="cursor-pointer" onClick={() => router.push("/client")}>
          <DropdownMenuItem className="flex items-center justify-center gap-x-2 my-2">
            <Globe size={18} /> Client
          </DropdownMenuItem>
        </span>

        <LogoutButton>
          <DropdownMenuItem className="flex items-center justify-center gap-x-2 my-2">
            <LogOut size={18} /> Sign Out
          </DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
