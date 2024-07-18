"use client";
import React, { useEffect, useState ,forwardRef} from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { RotateCcw } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Transaction {
  quantity: number;
  cost: number;
  paymentStatus: string;
  farmerName: string;
}

interface RecentTransactionsProps {
  onPay: () => void;
}

const TableDemo = forwardRef<HTMLButtonElement, RecentTransactionsProps>(
  ({ onPay }, ref) => {

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [id, setid] = useState<String>("ID");

  const getUserDetails = async () => {
    try {
      const res = await axios.get("/api/users/me");
      // console.log("01");
      // console.log(res.data);
      setid(res.data.data._id);
    } catch (error) {
      console.error("Error fetching user details:", error);
      // toast.error("Error fetching user details. Please try again.");
    }
  };

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/users/recentTransaction`);
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

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div className="w-full rounded-lg border">

      <Card>
        <CardHeader className="flex flex-row justify-between">
          <div >
            <CardTitle>Recent Transactions</CardTitle>

            <CardDescription className="mt-2">A list of your recent Transactions.</CardDescription>
          </div>
          <button onClick={fetchTransactions} ref={ref}> <RotateCcw /> </button>
        </CardHeader>
        <CardContent className="grid gap-8">

          <Table>
            <TableCaption></TableCaption>
            <div className="max-h-[450px] overflow-auto">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Name</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Cost</TableHead>
                  <TableHead className="text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
            </div>

            <div className="max-h-[450px] overflow-auto ">
              <TableBody>
                {transactions.map((transaction, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      {transaction.farmerName}
                    </TableCell>
                    <TableCell>{transaction.quantity}</TableCell>
                    <TableCell>{transaction.cost}</TableCell>
                    <TableCell className="text-right">
                    <Badge variant={transaction.paymentStatus === 'Done' ? 'green' : transaction.paymentStatus === 'Pending' ? 'yellow' : 'default'}>
                                        {transaction.paymentStatus}
                                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </div>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
);

TableDemo.displayName = "TableDemo";

export default TableDemo;


