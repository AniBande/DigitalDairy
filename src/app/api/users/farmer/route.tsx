
import { connect } from "@/dbConfig/dbConfig";
import Transaction from "@/models/transaction";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(request: NextRequest) {
    try {
        // Fetch all transactions
        const transactions = await Transaction.find();

        let totalCost = 0;
        let totalLitres = 0;

        // Calculate total cost and total litres
        transactions.forEach(transaction => {
            totalCost += transaction.cost;
            totalLitres += transaction.quantity;
        });

        return NextResponse.json({
            totalCost,
            totalLitres,
            success: true
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
