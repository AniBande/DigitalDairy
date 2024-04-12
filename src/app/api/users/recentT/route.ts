
import { connect } from "@/dbConfig/dbConfig";
import Transaction from "@/models/transaction";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(request: NextRequest) {
    try {
       
        const url = new URL(request.url);
        const id = url.searchParams.get('id');

     

        const transactions = await Transaction.find({ farmerId: id });
            console.log("farmer transactions found");
            console.log(transactions);
        return NextResponse.json({
            transactions,
            success: true
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
