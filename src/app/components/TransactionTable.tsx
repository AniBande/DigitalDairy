"use client";

import React, { useEffect, useState } from "react";

import axios from "axios";
import { toast } from "react-hot-toast";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Transaction {
  farmerId: string;
  quantity: number;
  cost: number;
  paymentStatus: string;
  createdAt: string;
}

export default function TransactionTable() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [batchSize, setBatchSize] = useState<number>(5);
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

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <Card className="xl:col-span-2">
            <CardHeader className="flex flex-row items-center">
              <div className="grid gap-2">
                <CardTitle>Transactions</CardTitle>
                <CardDescription>
                  Recent transactions from your store.
                </CardDescription>
              </div>
              <Button asChild size="sm" className="ml-auto gap-1">
                <Link href="/History">
                  View All
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>

            <CardContent>
              <div className="w-full rounded-lg border">
                <div className="rounded-lg  border">
                  <div className="h-[626px] relative overflow-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="">Date & Time</TableHead>
                          <TableHead className="">Quantity</TableHead>
                          <TableHead className="">Cost</TableHead>
                          <TableHead className="">PaymentStatus</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {transactions
                          .map((transaction, index) => (
                            <TableRow key={index}>
                              <TableCell>
                                {new Date(
                                  transaction.createdAt
                                ).toLocaleString()}
                              </TableCell>

                              <TableCell className="">
                                {transaction.quantity}
                              </TableCell>

                              <TableCell className="">
                                <Badge className="" variant="outline">
                                  {transaction.paymentStatus}
                                </Badge>
                              </TableCell>

                              <TableCell className="">
                                Rs {transaction.cost}
                              </TableCell>

                              {/* <TableCell className="text-right">$250.00</TableCell> */}
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}
