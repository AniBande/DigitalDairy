"use client";
import * as React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
//import { FarmerInput } from "./FarmerInput";
//import { PaymentStatus } from "./PaymentStatus";
import { Navbar } from "../components/Navbar";

export default function MLFrontend() {
  const [isLoading, setIsLoading] = useState(false);
  const [ML, setML] = React.useState({
    ph: "",
    temperature: "",
    taste: "",
    odor: "",
    fat: "",
    turbidity: "",
    color: "",
  });
  // const [paymentStatus, setPaymentStatus] = useState("Pending");

  //   const calculateAmount = () => {
  //     const { snf, fat, quantity } = transaction;
  //     const rate = snfFatRates[Number(snf) - 1][Number(fat) - 1]; // Adjust indices since array is 0-based
  //     const amount = rate * Number(quantity); // Convert quantity to number
  //     setTransaction({ ...transaction, cost: amount.toString() }); // Convert amount back to string
  //   };

  const onPredict = async () => {
    try {
      setIsLoading(true);
      //   toast.success("prediction success");
      //   setML({
      //     ...ML,
      //     ph: "",
      //     temperature: "",
      //     taste: "",
      //     odor: "",
      //     fat: "",
      //     turbidity: "",
      //     color: "",
      //   });
      // Call the callback function after the transaction is created
      //onTransactionCreated();
      const response = await axios.post(
        "http://localhost:5000/api/home",
        ML
      );
      console.log("Prediction Done", response.data);
      toast.success(response.data.output);
    } catch (error: any) {
      console.log("prediction failed", error.message);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  //   const getUserDetails = async () => {
  //     try {
  //       const res = await axios.get("/api/users/me");
  //       setTransaction({ ...transaction, managerId: res.data.data._id });
  //     } catch (error) {
  //       console.error("Error fetching user details:", error);
  //       toast.error("Error fetching user details. Please try again.");
  //     }
  //   };

  //   useEffect(() => {
  //     getUserDetails();
  //   }, []);

  //   useEffect(() => {
  //     if (transaction.quantity && transaction.fat && transaction.snf) {
  //       calculateAmount();
  //     } else {
  //       // If any of the fields is empty, keep the cost as it is
  //       setTransaction({ ...transaction, cost: "" });
  //     }
  //   }, [transaction.quantity, transaction.fat, transaction.snf]);

  //   const handleFarmerSelect = async (username: String) => {
  //     try {
  //       const response = await axios.get(
  //         `/api/users/farmerid?username=${username}`
  //       );
  //       setTransaction({ ...transaction, farmerId: response.data.data._id });
  //     } catch (error) {
  //       console.error("Error fetching farmer ID:", error);
  //     }
  //   };

  // const handlePaymentStatusSelect = async (paymentStatus: string) => {
  //     try {
  //         setTransaction({ ...transaction, paymentStatus: paymentStatus });
  //         setPaymentStatus(paymentStatus);
  //         console.log("Updated payment status:", paymentStatus);
  //     } catch (error) {
  //         console.error("Error setting payment status:", error);
  //     }
  // };

  return (
    <>
      <div className="flex min-h-screen w-full flex-col">
        <Navbar />
        <main className="flex flex-1 flex-col items-center justify-center gap-4 p-4 md:gap-8 md:p-8">
          {/* <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3"> */}
          <Card className="w-[450px]">
            <CardHeader>
              <CardTitle>Check Quality</CardTitle>
              <CardDescription>Check Quality of milk.</CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="PH">pH</Label>
                    <Input
                      id="PH"
                      placeholder="Enter pH"
                      type="number"
                      name="PH"
                      value={ML.ph}
                      onChange={(e) => setML({ ...ML, ph: e.target.value })}
                      required
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="Temperature">Temperature</Label>
                    <Input
                      id="Temperature"
                      placeholder="Enter Temperature"
                      type="number"
                      name="Temperature"
                      value={ML.temperature}
                      onChange={(e) =>
                        setML({ ...ML, temperature: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="Taste">Taste</Label>
                    <Input
                      id="Taste"
                      placeholder="Enter Taste"
                      type="number"
                      name="Taste"
                      value={ML.taste}
                      onChange={(e) => setML({ ...ML, taste: e.target.value })}
                      required
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="Odor">Odor</Label>
                    <Input
                      id="Odor"
                      placeholder="Enter Odor"
                      type="number"
                      name="Odor"
                      value={ML.odor}
                      onChange={(e) => setML({ ...ML, odor: e.target.value })}
                      required
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="Fat">Fat</Label>
                    <Input
                      id="Fat"
                      placeholder="Enter Fat"
                      type="number"
                      name="Fat"
                      value={ML.fat}
                      onChange={(e) => setML({ ...ML, fat: e.target.value })}
                      required
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="Turbidity">Turbidity</Label>
                    <Input
                      id="Turbidity"
                      placeholder="Enter Turbidity"
                      type="number"
                      name="Turbidity"
                      value={ML.turbidity}
                      onChange={(e) =>
                        setML({ ...ML, turbidity: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="Color">Color</Label>
                    <Input
                      id="Color"
                      placeholder="Enter Color"
                      type="number"
                      name="Color"
                      value={ML.color}
                      onChange={(e) => setML({ ...ML, color: e.target.value })}
                      required
                    />
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex flex-row-reverse">
              <Button
                type="submit"
                style={{ minWidth: "120px", minHeight: "40px" }}
                onClick={onPredict}
              >
                {isLoading ? <div className="w-5 h-5 border-t-2 border-b-2  rounded-full animate-spin" /> : "Check"}
              </Button>
            </CardFooter>
          </Card>
          {/* </div> */}
        </main>
      </div>
    </>
  );
}
