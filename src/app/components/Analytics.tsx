"use client";
import * as React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import router from "next/router";
import TransactionTable from "./TransactionTable";




import Link from "next/link"
import {
    Activity,
    ArrowUpRight,
    CircleUser,
    CreditCard,
    DollarSign,
    IndianRupee,
    Milk,
    LogOut,
    Menu,
    Package2,
    Search,
    Users,
} from "lucide-react"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
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
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
export default function Analytics() {

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

    // const logout = async () => {
    //     try {
    //       console.log("Hello");
    //       const res = await axios.get("/api/users/logout");
    //       console.log(res.data);
    //       toast.success("Logout successful");
    //       router.push("/login");
    //     } catch (error: any) {
    //       console.log(error.message);
    //       toast.error(error.message);
    //     }
    //   };


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


    return (
        <div className="flex min-h-screen w-full flex-col">



            {/* ************************************************************* Analytic Boxes *************************************************************************************** */}




            <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
                {/* <div className="flex justify-center items-center"> */}
                    <div className=" grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4 mx-4">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                                {/* <IndianRupee className="h-4 w-4 text-muted-foreground" /> */}
                            </CardHeader>
                            <CardContent>
                                {/* <div className="text-2xl font-bold">Rs {totalCost}</div> */}
                                <div className="text-2xl font-bold flex items-center">
                                    <IndianRupee className="h-4 w-4 mr-1" /> {totalCost}
                                </div>

                                {/* <p className="text-xs text-muted-foreground">+20.1% from last month</p> */}
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Pending Revenue</CardTitle>

                            </CardHeader>
                            <CardContent>

                                <div className="text-2xl font-bold flex items-center">
                                    <IndianRupee className="h-4 w-4 mr-1" /> {remainingCost}
                                </div>

                                {/* <p className="text-xs text-muted-foreground">+20.1% from last month</p> */}
                            </CardContent>
                        </Card>


                    </div>
               

                {/* ************************************************************ Transaction Box ******************************************************************************************* */}

                <div className="w-full">
                    <TransactionTable />
                </div>
            </main>
        </div>
    )
}