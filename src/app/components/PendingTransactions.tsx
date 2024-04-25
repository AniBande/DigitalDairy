"use client";

import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { EditTransaction } from './EditTransaction';




// import { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit2Icon, EditIcon } from 'lucide-react';

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
  // const [transactions, setTransactions] = useState<Transaction[]>([]);

 // const [editingTransaction, setEditingTransaction] = useState(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [batchSize, setBatchSize] = useState<number>(5);
  const [displayedTransactions, setDisplayedTransactions] = useState<number>(10);
  const [id, setid] = useState<String>("ID");

  const handleEditTransaction = () => {
    toast.success("edit successful");

    // for now we have only showcased a toast msg....addition of functionality is remaining
    // Handle edit functionality here
    // <EditTransaction trans={Transaction}/>
    // console.log("Editing transaction:", Transaction);
    console.log("Editing transaction:");

    //setEditingTransaction();
  };

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


  useEffect(() => {
    getUserDetails();
  }, []);

  useEffect(() => {
    fetchTransactions();
  }, [id]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pending Transactions</CardTitle>
        <button onClick={fetchTransactions}><Edit2Icon/></button>
      </CardHeader>
      <CardContent className="grid gap-8">
       
      {transactions.slice(0, displayedTransactions).map((transaction, index) => (
          <div key={index} className="flex items-center gap-4">
            <EditTransaction trans={transaction}/>
            <div className="grid gap-1">
              <p className="text-sm font-medium leading-none">{transaction.farmerId}</p>
              {/* <p className="text-sm text-muted-foreground">Transaction Date: {transaction.transactionDate}</p> */}
              <p className="text-sm text-muted-foreground">Transaction Date:</p>
            </div>
            <div className="ml-auto font-medium">Rs {transaction.cost}</div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
