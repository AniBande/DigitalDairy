"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

interface Transaction {
    quantity: number;
    cost: number;
    paymentStatus: string;
    createdAt: string; 
    farmerId: string; 
    userId: string; 
}

export default function RecentTransactions() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [batchSize, setBatchSize] = useState<number>(3);
    const [displayedTransactions, setDisplayedTransactions] = useState<number>(3);
    const [filterOption, setFilterOption] = useState<string>("all");
    const [farmerId, setfarmerId] = useState<string>(""); 
    const [userId, setuserId] = useState<String>("ID");
    const [userRole, setuserRole] = useState("nothing");
    // const [userId,setuserId] = useState<String>();
    //{ userRole, userId }: { userRole: string; userId: string }


    const getUserDetails = async () => {
        try {
            const res = await axios.get("/api/users/me");
            console.log(res.data);

            setuserId(res.data.data._id);
            console.log(userId);
            setuserRole(res.data.data.role);
            console.log(userRole);
            //setuserId(id);
            //console.log(userId);
        } catch (error) {
            console.error("Error fetching user details:", error);
            toast.error("Error fetching user details. Please try again.");
        }
    };

    useEffect(() => {
        getUserDetails();
    }, []);


    const fetchTransactions = async () => {
        try {
            setLoading(true);
            let apiUrl = `/api/users/Hist`;
            
            console.log(userId);
            console.log(userRole);
            console.log(farmerId);

            if (userRole === "manager") {
                apiUrl += `?userId=${userId}&farmerId=${farmerId}&userRole=${userRole}`;
              

            }
            else {
                apiUrl += `?userId=${userId}&userRole=${userRole}`;
            }
            console.log("api calling");
            console.log(apiUrl);
            const response = await axios.get(apiUrl);
            console.log("api called");

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
    }, [farmerId, userRole, userId]);

    //   useEffect(() => {
    //     fetchTransactions();
    // }, []);


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

    const handleFarmerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setfarmerId(event.target.value);
    };

    return (
        <div className="container">
           
            <div>
                {userRole === "manager" && (
                    <div>
                        <label htmlFor="farmerId">Enter Farmer's ID:</label>
                        <input className="mx-4" type="text" id="farmerId" value={farmerId} onChange={handleFarmerChange} />
                        {/* <button onClick={fetchTransactions} >fetch</button> */}
                    </div>

                )}

                <button onClick={fetchTransactions} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">fetch</button>


                <div className="flex flex-row">
                <h2>Transaction List</h2>

                    <label htmlFor="filter" className="mx-5">Filter:</label>
                    <select id="filter" value={filterOption} onChange={handleFilterChange}  className="border border-black border-2" >
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
                                    <div className="mr-4 flex flex-row">
                                        <p className="font-bold">Payment Status:</p>
                                        <p className={`ml-2 ${transaction.paymentStatus === 'Done' ? 'bg-green-500' : 'bg-yellow-500'}`}>
                                            {transaction.paymentStatus}
                                        </p>
                                    </div>
                                    <div className="mr-4 flex flex-row">
                                        <p className="font-bold">Created At:</p>
                                        <p>{transaction.createdAt}</p>    
                                    </div>
                                    {/* Display farmerId and userId if needed */}
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
