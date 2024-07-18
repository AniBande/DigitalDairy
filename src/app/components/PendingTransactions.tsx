"use client";

import React, { useEffect, useState, forwardRef } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { EditTransaction } from "./EditTransaction";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RotateCcw } from "lucide-react";

interface Transaction {
  _id: string;
  farmerId: string;
  farmerName: string;
  quantity: number;
  cost: number;
  paymentStatus: string;
  createdAt: string;
}

interface PendingTransactionsProps {
  onPay: () => void;
}

const PendingTransactions = forwardRef<HTMLButtonElement, PendingTransactionsProps>(
  ({ onPay }, ref) => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [displayedTransactions, setDisplayedTransactions] = useState<number>(10);
    const [id, setId] = useState<string>("ID");

    const getUserDetails = async () => {
      try {
        const res = await axios.get("/api/users/me");
        setId(res.data.data._id);
      } catch (error) {
        console.error("Error fetching user details:", error);
        // toast.error("Error fetching user details. Please try again.");
      }
    };

    const fetchTransactions = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/users/PendingTransactions?id=${id}`);
        setTransactions(response.data.transactions);
      } catch (error: any) {
        console.error("Error fetching transactions:", error.message);
        // toast.error("Error fetching transactions");
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
        <CardHeader className="flex flex-row justify-between">
          <CardTitle>Pending Transactions</CardTitle>
          <button onClick={fetchTransactions} ref={ref}>
            <RotateCcw />
          </button>
        </CardHeader>
        <CardContent className="grid gap-8">
          {transactions.slice(0, displayedTransactions).map((transaction, index) => (
            <div key={index} className="flex items-center gap-4">
              <EditTransaction trans={transaction} onPay={onPay} />
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">{transaction.farmerName}</p>
                <p className="text-sm text-muted-foreground">{new Date(transaction.createdAt).toLocaleString()}</p>
              </div>
              <div className="ml-auto font-medium">Rs {transaction.cost}</div>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }
);

PendingTransactions.displayName = "PendingTransactions";

export default PendingTransactions;