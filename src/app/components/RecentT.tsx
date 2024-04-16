"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

interface Transaction {
  quantity: number;
  cost: number;
  paymentStatus: string;
}

export default function RecentTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [batchSize, setBatchSize] = useState<number>(3);
  const [displayedTransactions, setDisplayedTransactions] = useState<number>(3);
  const [id, setid] = useState<String>("ID");

  const getUserDetails = async () => {
    try {
      const res = await axios.get("/api/users/me");
      console.log("01");
      console.log(res.data);
      setid(res.data.data._id);
    } catch (error) {
      console.error("Error fetching user details:", error);
      toast.error("Error fetching user details. Please try again.");
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  useEffect(() => {
    fetchTransactions();
  }, [id]);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/users/recentT?id=${id}`);
      console.log("response got");
      setTransactions(response.data.transactions);
    } catch (error: any) {
      console.error("Error fetching transactions:", error.message);
      toast.error("Error fetching transactions");
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //     fetchTransactions();
  // }, []);

  const handleLoadMore = () => {
    setDisplayedTransactions((prev) => prev + batchSize);
  };

  return (
    <div className="container">
      <h1>Transactions</h1>
      <div>
        <h2>Transaction List</h2>

        <button onClick={getUserDetails}>kunal</button>
        <button onClick={fetchTransactions}>aniket</button>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div>
            <ul>
              {transactions
                .slice(0, displayedTransactions)
                .map((transaction, index) => (
                  <li key={index}>
                    <p>Quantity: {transaction.quantity}</p>
                    <p>Cost: {transaction.cost}</p>
                    <p>Payment Status: {transaction.paymentStatus}</p>
                  </li>
                ))}
            </ul>
            {displayedTransactions < transactions.length && (
              <button onClick={handleLoadMore}>More</button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
