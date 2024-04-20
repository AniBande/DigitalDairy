"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
//import {useRouter} from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import router from "next/router";

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
      <h1 className="text-white text-2xl mb-4">Transaction History</h1>
      <hr className="w-full border-gray-200 mb-4" />
      <div>
        {/* <h2>Transaction List</h2> */}

        {/* <button onClick={getUserDetails}>kunal</button>
        <button onClick={fetchTransactions}>aniket</button> */}

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div>
            <div className="max-h-[200px] overflow-y-auto">
              <ul>
                {transactions.slice(0, displayedTransactions).map((transaction, index) => (
                  <li key={index} className="flex flex-row items-center mb-4">
                    <p className="mr-4">{index + 1}</p>
                    <div className="mr-4 flex flex-row">
                      <p className="font-bold">Quantity:</p>
                      <p>{transaction.quantity}</p>
                    </div>
                    <div className="mr-4 flex flex-row">
                      <p className="font-bold">Cost:</p>
                      <p>{transaction.cost}</p>
                    </div>
                    <div className="flex flex-row">
                      <p className="font-bold">Payment Status:</p>
                      <p className={`ml-2 ${transaction.paymentStatus === 'Done' ? 'bg-green-500' : 'bg-yellow-500'}`}>
                        {transaction.paymentStatus}
                      </p>
                    </div>

                  </li>
                ))}
              </ul>
            </div>
            {displayedTransactions < transactions.length && (
             // <button onClick={handleLoadMore} className='bg-blue-500'>More</button>
             <button onClick={handleLoadMore} className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">More</button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
