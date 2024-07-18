import {connect} from "@/dbConfig/dbConfig";
import Transaction from "@/models/transaction";
import User from "@/models/usermodel";
import { NextRequest, NextResponse } from "next/server";


connect()

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json()
        const {farmerId, managerId, quantity, fat, snf, cost, paymentStatus} = reqBody;
        // console.log(reqBody);

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

        try {
            const savedTransaction = await newTransaction.save();
            // console.log("Transaction saved successfully:", savedTransaction);
        } catch (error) {
            console.error("Error saving transaction:", error);
        }
        

        return NextResponse.json({
            message: "Transaction created successfully",
            success: true,
        })

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}