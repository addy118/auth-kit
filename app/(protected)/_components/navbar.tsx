"use client";

import { UserButton } from "@/components/auth/user-button";
import React from "react";

export const Navbar = () => {
  return (
    <nav className="bg-secondary flex justify-between items-center p-4 w-[600px] shadow-sm">
      <UserButton />
    </nav>
  );
};
