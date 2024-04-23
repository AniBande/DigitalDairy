"use client";

import React, { useEffect, useState } from "react";

import axios from "axios";
import { toast } from "react-hot-toast";



import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"


interface Transaction {
    farmerId: string;
    quantity: number;
    cost: number;
    paymentStatus: string;
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

    // useEffect(() => {
    //     fetchTransactions();
    // }, []);

    const handleLoadMore = () => {
        setDisplayedTransactions((prev) => prev + batchSize);
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
                                <Link href="#">
                                    View All
                                    <ArrowUpRight className="h-4 w-4" />
                                </Link>
                            </Button>
                        </CardHeader>


                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        {/* <TableHead>Customer</TableHead> */}
                                        <TableHead className="">FarmerId</TableHead>
                                        <TableHead className="">Quantity</TableHead>
                                        <TableHead className="">Cost</TableHead>
                                        <TableHead className="">PaymentStatus</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <div className="max-h-[200px] overflow-y-auto">
                                        <ul>
                                            {transactions.slice(0, displayedTransactions).map((transaction, index) => (
                                                <li key={index} className="flex flex-row items-center mb-4">


                                                    <TableRow>

                                                        <TableCell>
                                                            <div className="">{transaction.farmerId}</div>
                                                            {/* <div className="hidden text-sm text-muted-foreground md:inline">
                                                                liam@example.com
                                                            </div> */}
                                                        </TableCell>

                                                        <TableCell className="">{transaction.quantity}</TableCell>

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



                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </TableBody>

                            </Table>
                        </CardContent>
                    </Card>

                    {displayedTransactions < transactions.length && (
                        // <button onClick={handleLoadMore} className='bg-blue-500'>More</button>
                        <button onClick={handleLoadMore} className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">More</button>
                    )}

                </div>


            )}

        </>
    )
}
