"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import RecentTransactions from "./RecentTransactions";
import { Profile } from "./Profile";
import { EditTransaction } from "./EditTransaction";
//import { PendingTransactions } from "./PendingTransactions"
import PendingTransactions from "./PendingTransactions";


export default function managerHomePage() {
  const router = useRouter();
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
        <h1>Welcome, Dairy Manager</h1>

        <div className="input-field">
          <label htmlFor="Enter_Farmer_Name">Enter Farmer Name :</label>
          <input
            type="String"
            id="Enter_Farmer_Name"
            name="Enter_Farmer_Name"
            placeholder="Enter Farmer Name"
            //value={transaction.farmerId}
            onChange={(e) => handleFarmerUsernameChange(e.target.value)}
            required
          />
        </div>

        <div className="mt-4">
          <h2>Enter Milk Details:</h2>
          <div className="input-field">
            <label htmlFor="quantity">Quantity:</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              placeholder="Enter quantity"
              value={transaction.quantity}
              onChange={(e) =>
                setTransaction({ ...transaction, quantity: e.target.value })
              }
              required
            />
          </div>
          <div className="input-field">
            <label htmlFor="fat">Fat:</label>
            <input
              type="number"
              id="fat"
              name="fat"
              placeholder="Enter fat content"
              value={transaction.fat}
              onChange={(e) =>
                setTransaction({ ...transaction, fat: e.target.value })
              }
              required
            />
          </div>
          <div className="input-field">
            <label htmlFor="snf">SNF:</label>
            <input
              type="number"
              id="snf"
              name="snf"
              placeholder="Enter SNF content"
              value={transaction.snf}
              onChange={(e) =>
                setTransaction({ ...transaction, snf: e.target.value })
              }
              required
            />
          </div>
          <div className="input-field">
            <label htmlFor="amount">Amount:</label>
            <input
              type="number"
              id="amount"
              name="amount"
              placeholder="Enter amount"
              value={transaction.cost}
              onChange={(e) =>
                calculateAmount()
              }
              required
            />
          </div>
          <div className="input-field">
            <label htmlFor="paymentStatus">Payment Status:</label>
            <select
              id="paymentStatus"
              name="paymentStatus"
              value={transaction.paymentStatus}
              onChange={(e) =>
                setTransaction({ ...transaction, paymentStatus: e.target.value })
              }
              required
            >
              <option value="Done">Done</option>
              <option value="Pending">Pending</option>
            </select>
          </div>
          <button
            onClick={onPay}
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 bg-white text-black w-full hover:bg-blue-500"
          >
            Pay {/* {buttonDisabled ? "Enter Details" : "Pay"} */}
          </button>
        </div>
      </div>
      <div>
        <RecentTransactions />
        <Profile />
       
      </div>
      <div>
      <PendingTransactions/>
     
      </div>
    </div>
  );
}
