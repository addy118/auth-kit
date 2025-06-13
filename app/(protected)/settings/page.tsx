import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import React from "react";

const Settings = async () => {
  const session = await auth();
  return (
    <>
      <h1 className="font-bold text-2xl">Settings Page</h1>
      <div>{JSON.stringify(session)}</div>
      <form action={async () => {
        "use server";
        await signOut();
      }}>
        <Button type="submit">
          Sign Out
        </Button>
      </form>
    </>
  );
};

export default Settings;
