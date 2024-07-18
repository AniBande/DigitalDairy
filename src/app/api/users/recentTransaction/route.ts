import { connect } from "@/dbConfig/dbConfig";
import Transaction from "@/models/transaction";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(request: NextRequest) {
  try {
    let transactions;
    transactions = await Transaction.find().sort({ createdAt: -1 });

    return NextResponse.json({
      transactions,
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
