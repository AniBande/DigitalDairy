
import { connect } from "@/dbConfig/dbConfig";
import Transaction from "@/models/transaction";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(request: NextRequest) {
    try {
        // Fetch all transactions
        const transactions = await Transaction.find();

        let totalCost = 0;
        let remainingCost = 0;
        let totalLitres = 0;
        let remainingLitres = 0;

        // Calculate total cost and total litres
        transactions.forEach(transaction => {
                // Calculate cost and litres for transactions with paymentStatus "Done".
            if (transaction.paymentStatus === "Done") {
                totalCost += transaction.cost;
                totalLitres += transaction.quantity;
            } else if (transaction.paymentStatus === "Pending") {
                // Calculate remaining cost and litres for transactions with paymentStatus "Pending"
                remainingCost += transaction.cost;
                remainingLitres += transaction.quantity;
            }
        });

        return NextResponse.json({
            totalCost,
            remainingCost,
            totalLitres,
            remainingLitres,
            success: true
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
