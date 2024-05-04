"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Dashboard } from "../components/DashBoard";
import Analytics from "../components/Analytics";
import { Navbar } from "../components/Navbar";


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
      <Navbar/>
      {
        role !== 'farmer' ? <Dashboard/> : <Analytics/>
      }
    </div>
  );
}
