import { connect } from "@/dbConfig/dbConfig";
import Transaction from "@/models/transaction";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(request: NextRequest) {
    try {
        const url = new URL(request.url);
        const userRole = url.searchParams.get('userRole');
        let userId, farmerId; 

        if (userRole === "manager") {
            const userId = url.searchParams.get('userId');
            const farmerId = url.searchParams.get('farmerId');

            if (!userId ) {
                throw new Error(" 'id' parameter is required.");
            }

           // let transactions = await Transaction.find({ managerId: userId }).sort({ createdAt: -1});
           let transactions;
            if(farmerId === ""){
                transactions = await Transaction.find({ managerId: userId }).sort({ createdAt: -1});
            }
            else{
                 transactions = await Transaction.find({ managerId: userId, farmerId: farmerId }).sort({ createdAt: -1});
            }
            


            if (!transactions) {
                console.log("No transactions found");
                return NextResponse.json({ message: "No transactions found", success: false });
            }

            console.log("manager-Farmer transactions found");
            console.log(transactions);

            return NextResponse.json({
                transactions,
                success: true
            });
        }
        else {

            const userId = url.searchParams.get('userId');

            if (!userId) {
                throw new Error("farmerId' parameter is required.");
            }

            const transactions = await Transaction.find({ farmerId: userId }).sort({ createdAt: -1});

            if (!transactions) {
                console.log("No transactions found");
                return NextResponse.json({ message: "No transactions found", success: false });
            }

            console.log("Farmer transactions found");
            console.log(transactions);

            return NextResponse.json({
                transactions,
                success: true
            });
        }


    } catch (error: any) {
        console.error("Error retrieving transactions:", error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
