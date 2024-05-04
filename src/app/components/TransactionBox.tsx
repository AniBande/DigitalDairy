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
import { FarmerInput } from "./FarmerInput";
import { PaymentStatus } from "./PaymentStatus";

interface TransactionBoxProps {
  onTransactionCreated: () => void;
}


export function TransactionBox({ onTransactionCreated }: TransactionBoxProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [transaction, setTransaction] = React.useState({
    farmerId: "",
    managerId: "",
    quantity: "",
    fat: "",
    snf: "",
    cost: "",
    paymentStatus: "Pending",
  });
  const [paymentStatus, setPaymentStatus] = useState("Pending");
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const [snfFatRates, setsnfFatRates] = useState([
    // Example rates for demonstration purposes
    [10, 12, 14, 16],
    [11, 13, 15, 17],
    [12, 14, 16, 18],
    [13, 15, 17, 19],
  ]);

  const calculateAmount = () => {
    const { snf, fat, quantity } = transaction;
    const rate = snfFatRates[Number(snf) - 1][Number(fat) - 1]; // Adjust indices since array is 0-based
    const amount = rate * Number(quantity); // Convert quantity to number
    setTransaction({ ...transaction, cost: amount.toString() }); // Convert amount back to string
  };

  const onPay = async () => {
    try {
      setIsLoading(true);
      if (!check()) return;
      const response = await axios.post("/api/users/managerHome", transaction);
      console.log("transaction success", response.data);
      toast.success("transaction success");
      setTransaction({
        ... transaction, 
        farmerId: "",
        quantity: "",
        fat: "",
        snf: "",
        cost: "",
        paymentStatus: "Pending",
      });
      setPaymentStatus("Pending");
      onTransactionCreated();
    } catch (error: any) {
      console.log("transaction failed", error.message);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const check = () => {
    if(transaction.snf){
      if(transaction.snf !== "1" && transaction.snf !== "2" && transaction.snf !== "3" && transaction.snf !== "4"){
        return false;
      }
    }
    if(transaction.fat){
      if(transaction.fat !== "1" && transaction.fat !== "2" && transaction.fat !== "3" && transaction.fat !== "4"){
        return false;
      }
    }
    return true;
  }

  const getUserDetails = async () => {
    try {
      const res = await axios.get("/api/users/me");
      setTransaction({ ...transaction, managerId: res.data.data._id });
    } catch (error) {
      console.error("Error fetching user details:", error);
      toast.error("Error fetching user details. Please try again.");
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  useEffect(() => {
    if(transaction.cost) setButtonDisabled(false);
    else setButtonDisabled(true);
  }, [transaction.cost]);

  useEffect(() => {
    if (transaction.snf) {
      if (transaction.snf !== "1" && transaction.snf !== "2" && transaction.snf !== "3" && transaction.snf !== "4") {
        toast.error("Please enter valid snf value (1, 2, 3, 4)");
      }
    }
  }, [transaction.snf]);
  
  useEffect(() => {
    if(transaction.fat){
      if(transaction.fat !== "1" && transaction.fat !== "2" && transaction.fat !== "3" && transaction.fat !== "4"){
        toast.error("Please enter valid fat value (1, 2, 3, 4)");
      }
    }
  }, [transaction.fat]);

  useEffect(() => {
    if (transaction.quantity && transaction.fat && transaction.snf && check()) {
      calculateAmount();
    } else {
      // If any of the fields is empty, keep the cost as it is
      setTransaction({ ...transaction, cost: "" });
    }
  }, [transaction.quantity, transaction.fat, transaction.snf]);

  const handleFarmerSelect = async (username: String) => {
    if(username === "") {
      setTransaction({ ...transaction, farmerId: "" });
      return;
    }
    try {
      const response = await axios.get(
        `/api/users/farmerid?username=${username}`
      );
      setTransaction({ ...transaction, farmerId: response.data.data._id });
    } catch (error) {
      console.error("Error fetching farmer ID:", error);
    }
  };

  const handlePaymentStatusSelect = async (paymentStatus: string) => {
    try {
      setTransaction({ ...transaction, paymentStatus: paymentStatus });
      setPaymentStatus(paymentStatus);
      // console.log("Updated payment status:", paymentStatus);
    } catch (error) {
      console.error("Error setting payment status:", error);
    }
  };

  return (
    <Card className="w-[450px]">
      <CardHeader>
        <CardTitle>Make Transaction</CardTitle>
        <CardDescription>Make Transaction with any farmer.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <FarmerInput onFarmerSelect={handleFarmerSelect} />
              {/* <FarmerInput/> */}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="quantity">Quntity</Label>
              <Input
                id="quantity"
                placeholder="Enter quntity"
                type="number"
                name="quantity"
                value={transaction.quantity}
                onChange={(e) =>
                  setTransaction({ ...transaction, quantity: e.target.value })
                }
                required
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="fat">Fat</Label>
              <Input
                id="fat"
                placeholder="Enter fat"
                type="number"
                name="fat"
                value={transaction.fat}
                onChange={(e) =>
                  setTransaction({ ...transaction, fat: e.target.value })
                }
                required
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="snf">SNF</Label>
              <Input
                id="snf"
                placeholder="Enter SNF"
                type="number"
                name="snf"
                value={transaction.snf}
                onChange={(e) =>
                  setTransaction({ ...transaction, snf: e.target.value })
                }
                required
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="cost">Cost</Label>
              <Input
                id="cost"
                placeholder="Cost"
                type="number"
                name="cost"
                value={transaction.cost}
                readOnly
                required
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Payment Status</Label>
              <PaymentStatus onPaymentStatusSelect={handlePaymentStatusSelect} />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex flex-row-reverse">
        <Button
          type="submit"
          style={{ minWidth: "120px", minHeight: "40px" }}
          onClick={onPay}
          disabled={buttonDisabled}
        >
          {isLoading ? (
            <div className="w-5 h-5 border-t-2 border-b-2  rounded-full animate-spin" />
          ) : (paymentStatus === "Done" ? (
            "Pay"
          ) : (
            "Save Transaction"
          ))}
        </Button>
      </CardFooter>
    </Card>
  );
}
