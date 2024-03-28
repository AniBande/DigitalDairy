
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

        transactions = await Transaction.find();

        return NextResponse.json({
            transactions,
            success: true
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
