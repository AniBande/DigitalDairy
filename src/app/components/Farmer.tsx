"use client";
import Link from "next/link";
import React, {useState,useEffect} from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";





export default function FarmerPage() {

    const [totalMilkQuantity, setTotalMilkQuantity] = useState(0);
    const [totalCost, setTotalCost] = useState(0);

    
    const fetchTotalData = async () => {
        try {
            const response = await axios.get("/api/users/farmer");
            setTotalMilkQuantity(response.data.totalLitres);
            setTotalCost(response.data.totalCost);
        } catch (error:any) {
            console.error("Error fetching total data:", error.message);
        }
    };

    // Fetch total data on component mount
    useEffect(() => {
        fetchTotalData();
    }, []);

    // JSX structure
    return (
        <div className="flex min-h-screen items-center justify-center px-6 py-12 lg:px-8 bg-white">
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
    <div className="p-4 bg-blue-500 rounded-lg mr-4">
        <p className="text-white mb-2">Total Milk Quantity:</p>
        <p className="text-white">{totalMilkQuantity} Litres</p>
    </div>
    <div className="p-4 bg-blue-500 rounded-lg ml-4">
        <p className="text-white mb-2">Total Cost of Milk:</p>
        <p className="text-white"> ${totalCost} </p>
    </div>
</div>

    </div>
</div>

        </div>
    );
}