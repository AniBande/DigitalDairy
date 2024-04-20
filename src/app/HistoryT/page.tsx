"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

interface Transaction {
    quantity: number;
    cost: number;
    paymentStatus: string;
    createdAt: string; // Add createdAt field to the interface
}

export default function RecentTransactions() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [batchSize, setBatchSize] = useState<number>(3);
    const [displayedTransactions, setDisplayedTransactions] = useState<number>(3);
    const [filterOption, setFilterOption] = useState<string>("all"); // Default filter option

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

    const filterTransactions = () => {
        const today = new Date();
        const filteredTransactions = transactions.filter((transaction) => {
            const transactionDate = new Date(transaction.createdAt);
            switch (filterOption) {
                case "today":
                    return transactionDate.toDateString() === today.toDateString();
                case "week":
                    const startOfWeek = new Date(today);
                    startOfWeek.setDate(today.getDate() - today.getDay());
                    return transactionDate >= startOfWeek;
                case "month":
                    return transactionDate.getMonth() === today.getMonth() && transactionDate.getFullYear() === today.getFullYear();
                default:
                    return true;
            }
        });
        return filteredTransactions;
    };

    const handleLoadMore = () => {
        setDisplayedTransactions((prev) => prev + batchSize);
    };

    const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setFilterOption(event.target.value);
    };

    return (
        <div className="container">
            <h1>Transactions</h1>
            <div>
                <h2>Transaction List</h2>
                <div>
                    <label htmlFor="filter">Filter:</label>
                    <select id="filter" value={filterOption} onChange={handleFilterChange}>
                        <option value="all">All</option>
                        <option value="today">Today</option>
                        <option value="week">This Week</option>
                        <option value="month">This Month</option>
                    </select>
                </div>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <div>
                        <ul>
                            {filterTransactions().slice(0, displayedTransactions).map((transaction, index) => (
                                <li key={index}>
                                    <p>Quantity: {transaction.quantity}</p>
                                    <p>Cost: {transaction.cost}</p>
                                    <p>Payment Status: {transaction.paymentStatus}</p>
                                    <p>Created At: {transaction.createdAt}</p> {/* Display createdAt */}
                                </li>
                            ))}
                        </ul>
                        {displayedTransactions < filterTransactions().length && (
                            <button onClick={handleLoadMore}>More</button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
