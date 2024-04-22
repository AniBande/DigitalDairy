"use client";
import Link from "next/link";

import React, { useState, useEffect } from "react";


import axios from "axios";
import { toast } from "react-hot-toast";
import RecentT from "./RecentT";
import router from "next/router";




export default function FarmerPage() {

    const [totalMilkQuantity, setTotalMilkQuantity] = useState(0);
    const [totalCost, setTotalCost] = useState(0);
    const [remainingCost, setremeiningCost] = useState(0);
    const [remainingLitres, setremainingLitres] = useState(0);

   



    const completeHistory = async () => {
        try {
            console.log("complete History is getting fetched.....");
            router.push("/Hist");
        } catch (error) {
            console.error("Error redirecting to completeHistory:", error);
            toast.error("Error redirecting to completeHistory. Please try again.");
        }
    };


    const fetchTotalData = async () => {
        try {
            const response = await axios.get("/api/users/farmer");
            setTotalMilkQuantity(response.data.totalLitres);
            setTotalCost(response.data.totalCost);
            setremainingLitres(response.data.remainingLitres);
            setremeiningCost(response.data.remainingCost);

        } catch (error: any) {
            console.error("Error fetching total data:", error.message);
        }
    };

    // Fetch total data on component mount
    useEffect(() => {
        fetchTotalData();
    }, []);

    // JSX structure
    return (
        <div className="flex flex-col min-h-screen items-center justify-center px-6 py-12 lg:px-8 bg-white">
            {/* Background image */}
            <img
                src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh4L62TJLiHl0jQD4r2v9AkKStJdZ-bXUuBTd80hevHbW84W-Vc2SeVlHWQ3aPfkCQnWxAyvQSn_DVRJsmbLQr7hAa61AC72ACxwZkhi3C6SDYwOfaJJZZOTbkgA04ubkNgRZDyWNC9AQ2t0mLWFncHp0agkrfUgjC4GVmnQwRx1lomc4HC_Hmy68GC_g/d/190822-FARM-LANDSCAPE-2@2x.png"
                alt="bg-image"
                className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Content */}

            <div className="flex items-center justify-center">
                <div className="flex flex-col items-center justify-center max-w-sm rounded-lg shadow-lg p-8 relative opacity-90 backdrop-filter border border-gray-900 backdrop-blur-lg">
                    <h1 className="text-white text-2xl mb-4">Total Milk Data</h1>
                    <hr className="w-full border-gray-200 mb-4" />

                    <div className="flex justify-between w-full mb-4">
                        <div className="p-4 bg-blue-500 mx-14 rounded-lg ml-4">
                            <p className="text-white mb-2">Total Cost of Milk:</p>
                            <p className="text-white"> Rs {totalCost} </p>
                        </div>
                        <div className="p-4 bg-blue-500 rounded-lg mr-4">
                            <p className="text-white mb-2">Total Milk Quantity:</p>
                            <p className="text-white">{totalMilkQuantity} Litres</p>
                        </div>
                    </div>

                    <div className="flex justify-between w-full mb-4">
                        <div className="p-4 bg-blue-500 rounded-lg mr-4">
                            <p className="text-white mb-2">Total Pending Amount</p>
                            <p className="text-white">Rs {remainingCost}</p>
                        </div>
                        <div className="p-4 bg-blue-500 rounded-lg ml-4">
                            <p className="text-white mb-2">Total Pending Milk</p>
                            <p className="text-white">{remainingLitres} </p>
                        </div>
                    </div>

                </div>
            </div>

            <br />

            <div className="flex flex-col z-10 rounded-lg shadow-lg p-8 relative opacity-90 backdrop-filter border border-gray-900 backdrop-blur-lg">
                <RecentT />
                <button onClick={completeHistory} className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">History</button>

            </div>


        </div>
    );
}