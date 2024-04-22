"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
//import {useRouter} from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import router from "next/router";
import { EditTransaction } from "./EditTransaction"

interface Transaction {
  _id: string; 
  farmerId: string;
  quantity: number;
  cost: number;
  paymentStatus: string;
}

// Define the interface for the Transaction object
interface trans {
  // ID: string;
  // Quantity: number;
  // Cost: number;
  // PaymentStatus: string;
  _id: string; 
  managerId: string;
  farmerId: string;
  quantity: number;
  cost: number;
  paymentStatus: string;
}

export default function PendingTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [batchSize, setBatchSize] = useState<number>(3);
  const [displayedTransactions, setDisplayedTransactions] = useState<number>(3);
  const [id, setid] = useState<String>("ID");

  const getUserDetails = async () => {
    try {
      const res = await axios.get("/api/users/me");

      console.log(res.data);
      setid(res.data.data._id);
      console.log(id);
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
      const response = await axios.get(`/api/users/PendingTransactions?id=${id}`);
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
      <h1 className="text-black text-2xl mb-4">Pending Transaction History</h1>
      <button onClick={fetchTransactions} className="flex items-center px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-indigo-600 rounded-lg hover:bg-indigo-500 focus:outline-none focus:ring focus:ring-indigo-300 focus:ring-opacity-80">
        <svg className="w-5 h-5 mx-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd" />
        </svg>

        <span className="mx-1">Refresh</span>
      </button>
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
                      <p className="font-bold">ID:</p>
                      <p>{transaction.farmerId}</p>
                    </div>
                    <div className="mr-4 flex flex-row">
                      <p className="font-bold">Quantity:</p>
                      <p>{transaction.quantity}</p>
                    </div>
                    <div className="mr-4 flex flex-row">
                      <p className="font-bold">Cost:</p>
                      <p>{transaction.cost}</p>
                    </div>
                    <div className="mr--4 flex flex-row">
                      <p className="font-bold">Payment Status:</p>
                      <p className={`ml-2 ${transaction.paymentStatus === 'Done' ? 'bg-green-500' : 'bg-yellow-500'}`}>
                        {transaction.paymentStatus}
                      </p>
                    </div>
                    <div className="flex flex-row">
                      <EditTransaction trans={transaction}/>
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
