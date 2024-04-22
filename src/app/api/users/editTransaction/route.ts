import { connect } from "@/dbConfig/dbConfig";
import Transaction from "@/models/transaction";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { _id, farmerId, quantity, cost, paymentStatus } = reqBody;

    console.log(_id);
    console.log(farmerId);
    console.log(quantity);
    console.log(cost);
    console.log(paymentStatus);

    // Find the transaction with the given parameters
    const transaction = await Transaction.findOne({ _id:_id});

    // If transaction not found, return error
    if (!transaction) {
      return NextResponse.json({ error: "Transaction not found" }, { status: 404 });
    }

    // Update the paymentStatus to "done"
    transaction.paymentStatus = "Done";

    // Save the updated transaction
    await transaction.save();

    return NextResponse.json({
      message: "Transaction updated successfully",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}