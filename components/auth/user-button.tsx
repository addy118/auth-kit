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

  const menuItems = [
    { label: "Admin", icon: ShieldUser, path: "/admin" },
    { label: "Settings", icon: Settings, path: "/settings" },
    { label: "Server", icon: Server, path: "/server" },
    { label: "Client", icon: Globe, path: "/client" },
  ];

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

      
      <DropdownMenuContent className="w-40 rounded-xs" align="end">
        {menuItems.map(({ label, icon: Icon, path }) => (
          <span
            key={path}
            className="cursor-pointer"
            onClick={() => router.push(path)}
          >
            <DropdownMenuItem
              className={`flex items-center justify-start pl-4 gap-x-3 my-2 py-1 rounded-xs ${
                pathname === path ? "bg-gray-300" : ""
              }`}
            >
              <Icon size={18} /> {label}
            </DropdownMenuItem>
          </span>
        ))}

        <LogoutButton>
          <DropdownMenuItem className="flex items-center justify-start gap-x-3 my-2 pl-4 py-1">
            <LogOut size={18} /> Sign Out
          </DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
