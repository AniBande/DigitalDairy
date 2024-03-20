"use client";
import Link from "next/link";
import React, {useEffect} from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";





export default function LoginPage() {
    const router = useRouter();
    const [transaction, setTransaction] = React.useState({
        farmerId: "",
        managerId:"",
        quantity: "",
        fat: "",
        snf: "",
        cost: "",
        paymentStatus: "Pending",
       
    })
   // const [buttonDisabled, setButtonDisabled] = React.useState(false);
    // const [loading, setLoading] = React.useState(false);


    const onPay = async () => {
        try {
            // setLoading(true);
            const response = await axios.post("/api/users/Home", transaction);
            console.log("transaction success", response.data);
            toast.success("transaction success");
            router.push("/profile");
        } catch (error:any) {
            console.log("transaction failed", error.message);
            toast.error(error.message);
         } //finally{
        // // setLoading(false);
        // }
    }

    // useEffect(() => {
    //     if(user.email.length > 0 && user.password.length > 0) {
    //         setButtonDisabled(false);
    //     } else{
    //         setButtonDisabled(true);
    //     }
    // }, [user]);

    return (
    <div className="container">
    <h1>Welcome, Dairy Manager</h1>
    <div>
  <h2>Select Farmer:</h2>
  <select className="cursor-pointer text-blue-600 hover:underline">
    
    <option value="farmer1">Farmer 1</option>
    <option value="farmer2">Farmer 2</option>
    <option value="farmer3">Farmer 3</option>
    <option value="farmer4">Farmer 4</option>
    <option value="farmer5">Farmer 5</option>
    
  </select>
</div>

    <div className="mt-4">
      <h2>Enter Milk Details:</h2>
      <div className="input-field">
        <label htmlFor="quantity">Quantity:</label>
        <input type="number" id="quantity" name="quantity" placeholder="Enter quantity"
         value={transaction.quantity}
         onChange={(e) => setTransaction({...transaction, quantity:e.target.value})}
        required/>
      </div>
      <div className="input-field">
        <label htmlFor="fat">Fat:</label>
        <input type="number" id="fat" name="fat" placeholder="Enter fat content" 
        value={transaction.fat}
        onChange={(e) => setTransaction({...transaction, fat:e.target.value})}
        required/>
      </div>
      <div className="input-field">
        <label htmlFor="snf">SNF:</label>
        <input type="number" id="snf" name="snf" placeholder="Enter SNF content" 
        value={transaction.snf}
        onChange={(e) => setTransaction({...transaction, snf:e.target.value})}
        required/>
      </div>
      <div className="input-field">
        <label htmlFor="amount">Amount:</label>
        <input type="number" id="amount" name="amount" placeholder="Enter amount" 
        value={transaction.cost}
        onChange={(e) => setTransaction({...transaction, cost :e.target.value})}
        required/>
      </div>
      <div className="input-field">
        <label htmlFor="paymentStatus">Payment Status:</label>
        <select id="paymentStatus" name="paymentStatus" 
        value={transaction.paymentStatus}
        onChange={(e) => setTransaction({...transaction, paymentStatus:e.target.value})}
        required>
          <option value="Done">Done</option>
          <option value="Pending">Pending</option>
        </select>
      </div>
      <button
                onClick={onPay}
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 bg-white text-black w-full hover:bg-blue-500"
            >
              Pay  {/* {buttonDisabled ? "Enter Details" : "Pay"} */}
            </button>
    </div>
  </div>
    )

}