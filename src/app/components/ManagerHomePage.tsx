"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import RecentTransactions from "./RecentTransactions";
import { Profile } from "./Profile";
import { EditTransaction } from "./EditTransaction";
//import { PendingTransactions } from "./PendingTransactions"
import PendingTransactions from "./PendingTransactions";
import { TransactionBox } from "./TransactionBox";


export default function managerHomePage() {
  const [transaction, setTransaction] = React.useState({
    farmerId: "",
    managerId: "",
    quantity: "",
    fat: "",
    snf: "",
    cost: "",
    paymentStatus: "Pending",
  });

  const [snfFatRates, setsnfFatRates] = useState([
    // Example rates for demonstration purposes
    [10, 12, 14, 16],
    [11, 13, 15, 17],
    [12, 14, 16, 18],
    [13, 15, 17, 19],
  ]);


  const calculateAmount = () => {
    const { snf, fat, quantity } = transaction;
    const rate = snfFatRates[Number(snf) - 1][Number(fat) - 1]; // Adjust indices since array is 0-based
    const amount = rate * Number(quantity); // Convert quantity to number
    setTransaction({ ...transaction, cost: amount.toString() }); // Convert amount back to string
  };


  // const [buttonDisabled, setButtonDisabled] = React.useState(false);
  // const [loading, setLoading] = React.useState(false);

  const onPay = async () => {
    try {
      // setLoading(true);
      const response = await axios.post("/api/users/managerHome", transaction);
      console.log("transaction success", response.data);
      toast.success("transaction success");
      // router.push("/profile");
    } catch (error: any) {
      console.log("transaction failed", error.message);
      toast.error(error.message);
    } //finally{
    // // setLoading(false);
    // }
  };

  const getUserDetails = async () => {
    try {
      const res = await axios.get("/api/users/me");
      setTransaction({ ...transaction, managerId: res.data.data._id });
    } catch (error) {
      console.error("Error fetching user details:", error);
      toast.error("Error fetching user details. Please try again.");
    }
  };

  const handleFarmerUsernameChange = async (username: String) => {
    try {
      const response = await axios.get(
        `/api/users/farmerid?username=${username}`
      );
      setTransaction({ ...transaction, farmerId: response.data.data._id });
    } catch (error) {
      console.error("Error fetching farmer ID:", error);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);


  return (
    <div className="flex flex-row">
      <div>
        <TransactionBox/>
        <RecentTransactions />
        <Profile />
       
      </div>
      <div>
      <PendingTransactions/>
     
      </div>
    </div>
  );
}
