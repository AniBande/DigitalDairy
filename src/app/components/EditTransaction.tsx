"use client";
import React, { useState, useRef } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DialogClose } from "@radix-ui/react-dialog";
import { EditIcon } from "lucide-react";

interface EditTransactionProps {
  trans: {
    _id: string;
    farmerId: string;
    farmerName: string;
    quantity: number;
    cost: number;
    paymentStatus: string;
  };
  onPay: () => void;
}

export function EditTransaction({ trans, onPay }: EditTransactionProps) {
  const dialogCloseRef = useRef<HTMLButtonElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  const pay = async () => {
    try {
      setIsLoading(true);
      const res = await axios.post("/api/users/editTransaction", trans);
      toast.success("Transaction updated successfully");
      dialogCloseRef.current?.click();
      onPay();
    } catch (error: any) {
      console.error("Error updating Transaction:", error);
      // toast.error(error.response.data.error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button>
          <EditIcon />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogClose ref={dialogCloseRef} />
          <DialogTitle>Edit Transaction</DialogTitle>
          <DialogDescription>
            {`Make changes in the Transaction here. Click pay to change status to "Done".`}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="Name" className="text-right">
              ID
            </Label>
            <Input
              id="Name"
              defaultValue={trans.farmerName}
              className="col-span-3"
              disabled
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="Quantity" className="text-right">
              Quantity
            </Label>
            <Input
              id="Quantity"
              defaultValue={trans.quantity}
              className="col-span-3"
              disabled
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="Cost" className="text-right">
              Cost
            </Label>
            <Input
              id="Cost"
              defaultValue={trans.cost}
              className="col-span-3"
              disabled
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="PaymentStatus" className="text-right">
              Payment Status
            </Label>
            <Input
              id="PaymentStatus"
              defaultValue={trans.paymentStatus}
              className="col-span-3"
              disabled
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            style={{ minWidth: "120px", minHeight: "40px", color: "white" }}
            onClick={pay}
          >
            {isLoading ? (
              <div className="w-5 h-5 border-t-2 border-b-2 rounded-full animate-spin" />
            ) : (
              "Pay"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}