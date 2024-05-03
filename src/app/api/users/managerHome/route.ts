import {connect} from "@/dbConfig/dbConfig";
import Transaction from "@/models/transaction";
import User from "@/models/usermodel";
import { NextRequest, NextResponse } from "next/server";


connect()

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json()
        const {farmerId, managerId, quantity, fat, snf, cost, paymentStatus} = reqBody;
        console.log(reqBody);

        const user = await User.findById(farmerId);
        const name = user ? user.name : null;
       
        const newTransaction = new Transaction({
            farmerId, 
            farmerName: name,
            managerId, 
            quantity, 
            fat, 
            snf, 
            cost, 
            paymentStatus
        })

        // const savedTransaction = await newTransaction.save()
        // console.log("Hello");

        try {
            // Attempt to save the transaction
            const savedTransaction = await newTransaction.save();
            console.log("Transaction saved successfully:", savedTransaction);
            // Return response with saved transaction details
        } catch (error) {
            console.error("Error saving transaction:", error);
            // Return response with error message
        }
        

        return NextResponse.json({
            message: "Transaction created successfully",
            success: true,
           // savedTransaction
        })

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}