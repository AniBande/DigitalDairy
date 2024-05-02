"use client"
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";








interface Transaction {
  quantity: number;
  cost: number;
  paymentStatus: string;
  farmerId: string;

}

interface TableDemoProps {
  onTransactionCreated: () => void;
}



export function TableDemo({ onTransactionCreated }: TableDemoProps) {
  // const [transaction, setTransaction] = useState({
  //   farmerId: "",
  //   managerId: "",
  //   quantity: "",
  //   fat: "",
  //   snf: "",
  //   cost: "",
  //   paymentStatus: "Pending",
  // });

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [batchSize, setBatchSize] = useState<number>(3);
  const [displayedTransactions, setDisplayedTransactions] = useState<number>(3);
  const [id, setid] = useState<String>("ID");


  // const getUserDetails = async () => {
  //   try {
  //     const res = await axios.get("/api/users/me");
  //     setTransaction({ ...transaction, managerId: res.data.data._id });
  //   } catch (error) {
  //     console.error("Error fetching user details:", error);
  //     toast.error("Error fetching user details. Please try again.");
  //   }
  // };

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

  // const fetchusername = async (fid: string) => {
  //   try {
  //     const response = await axios.get(`/api/users/fetchusername?id=${fid}`);
  //     return response.data.username; // Assuming the response contains the username
  //   } catch (error: any) {
  //     console.error("Error fetching username:", error.message);
  //     toast.error("Error fetching username");
  //     return ""; // Return empty string in case of error
  //   }
  // };



  useEffect(() => {
    getUserDetails();
  }, []);

  useEffect(() => {
    fetchTransactions();
  }, [id, onTransactionCreated]);



  // useEffect(() => {
  //   getUserDetails();
  // }, []);

  const fetchTransactions = async () => {
    try {
      // setLoading(true);
      const response = await axios.get(`/api/users/recentTransaction`);
      setTransactions(response.data.transactions);
    } catch (error: any) {
      console.error("Error fetching transactions:", error.message);
      toast.error("Error fetching transactions");
    } finally {
      // setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (


    <div className="w-full rounded-lg border">
      <div className="rounded-lg  border">
        <div className="h-[626px] relative overflow-auto">

          <div className="sticky top-0 flex flex-col z-50 rounded-t-lg border  bg-background px-4 md:px-6 w-full">
            <h1 className="text-2xl font-semibold leading-none tracking-tight mx-4 mt-4">Recent Transactions</h1>
            <p className="text-sm text-muted-foreground mx-4 mt-4">A list of your recent Transactions.</p>
          </div>
          <Table>
            {/* <TableCaption>A list of your recent Transactions</TableCaption> */}

            <TableHeader>

              <TableRow>
                <TableHead className="w-[100px]">Name</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Cost</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* <ScrollArea className="h-72 w-48 rounded-md border"> */}
              {/* <div className="max-h-[400px] overflow-auto"> */}
              {transactions.map((transactions, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    {/* {fetchusername(transactions.farmerId)} */}
                    Name
                  </TableCell>
                  <TableCell>{transactions.quantity}</TableCell>
                  <TableCell>{transactions.cost}</TableCell>
                  <TableCell className="text-right">
                    {transactions.paymentStatus}
                  </TableCell>
                </TableRow>
              ))}
              {/* </div> */}
              {/* </ScrollArea> */}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={3}>Total</TableCell>
                <TableCell className="text-right">$2,500.00</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </div>
    </div>
  );
}
