"use client";

import { LogoutButton } from "@/components/auth/logout-button";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/use-current-user";
import { signOut } from "next-auth/react";
import React from "react";

const Settings = () => {
  const user = useCurrentUser();

  return (
    <>
      {/* <h1 className="font-bold text-2xl">Settings Page</h1> */}
      <div className="bg-white p-10 rounded-xl">
        <LogoutButton>Sign Out</LogoutButton>
      </div>
    </>
  );
};

export default Settings;
