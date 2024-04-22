
import { connect } from "@/dbConfig/dbConfig";
import Transaction from "@/models/transaction";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(request: NextRequest) {
    try {
        // const url = new URL(request.url);
        // const cost = url.searchParams.get('cost');
        // const id = url.searchParams.get('id');

        let transactions;

        // if (cost) {
        //     // Fetch transactions with cost greater than the provided cost
        //     transactions = await Transaction.find({ cost: { $gt: parseFloat(cost) } });
        // } else {
        //     // Fetch all transactions if cost is not provided
        //     transactions = await Transaction.find();
        // }

        transactions = await Transaction.find().sort({ createdAt: -1 });
         // Find transactions for the given farmer ID in descending order of creation date
        // const transactions = await Transaction.find({ farmerId: id }).sort({ createdAt: -1 });

        
        return NextResponse.json({
            transactions,
            success: true
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
