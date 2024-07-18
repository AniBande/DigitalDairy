"use client";
import * as React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import TransactionTable from "./TransactionTable";
import { IndianRupee } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function FarmerPage() {
  const [totalMilkQuantity, setTotalMilkQuantity] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [remainingCost, setremeiningCost] = useState(0);
  const [remainingLitres, setremainingLitres] = useState(0);

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
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className=" grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4 mx-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold flex items-center">
                <IndianRupee className="h-4 w-4 mr-1" /> {totalCost}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Pending Revenue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold flex items-center">
                <IndianRupee className="h-4 w-4 mr-1" /> {remainingCost}
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="w-full">
          <TransactionTable />
        </div>
      </main>
    </div>
  );
}
