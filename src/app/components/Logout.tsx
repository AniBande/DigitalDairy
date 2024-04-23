"use client";
import axios from "axios";
import React from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export default function Logout() {
  const router = useRouter();

  const logout = async () => {
    try {
      const res = await axios.get("/api/users/logout");
      toast.success("Logout successful");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  return (
    <div>
      <button
        onClick={logout}
        className="cursor-pointer font-semibold flex flex-row gap-3"
      >
        <span>Logout</span>
        <LogOut/>
      </button>
    </div>
  );
}
