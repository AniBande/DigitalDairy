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

    const fetchTransactions = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`/api/users/recentTransaction`);
            setTransactions(response.data.transactions);
        } catch (error: any) {
            console.error("Error fetching transactions:", error.message);
            toast.error("Error fetching transactions");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTransactions();
    }, []);

    const handleLoadMore = () => {
        setDisplayedTransactions((prev) => prev + batchSize);
    };

    return (
        <div className="container">
            <h1>Transactions</h1>

            <button onClick={fetchTransactions} className="bg-blue-500">Refresh</button>

            <div>
                <h2>Transaction List</h2>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <div>
                        <ul>
                            {transactions.slice(0, displayedTransactions).map((transaction, index) => (
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
