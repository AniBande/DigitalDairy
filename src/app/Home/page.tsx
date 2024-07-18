"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { ManagerPage } from "../components/ManagerPage";
import FarmerPage from "../components/FarmerPage";
import { Navbar } from "../components/Navbar";


export default function HomePage() {
  const [role, setRole] = useState(null);

  const getUserDetails = async () => {
    try {
      const res = await axios.get("/api/users/me");
      setRole(res.data.data.role);
    } catch (error) {
      console.error("Error fetching user details:", error);
      // toast.error("Error fetching user details. Please try again.");
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
        role !== 'farmer' ? <ManagerPage/> : <FarmerPage/>
      }
    </div>
  );
}
