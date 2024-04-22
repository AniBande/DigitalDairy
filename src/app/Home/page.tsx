"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import FarmerHomePage from "@/app/components/FarmerHomePage";
import ManagerHomePage from "@/app/components/ManagerHomePage";
import Farmer from "@/app/components/Farmer"

export default function HomePage() {
  const router = useRouter();
  const [role, setRole] = useState(null);

  const getUserDetails = async () => {
    try {
      const res = await axios.get("/api/users/me");
      console.log(res.data);
      setRole(res.data.data.role);
    } catch (error) {
      console.error("Error fetching user details:", error);
      toast.error("Error fetching user details. Please try again.");
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  if (role === null) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {
        role === 'farmer' ? <Farmer/> : <ManagerHomePage/>
      }
    </div>
  );
}
