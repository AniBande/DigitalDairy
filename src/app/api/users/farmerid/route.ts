import { NextRequest, NextResponse } from "next/server";
import User from "@/models/usermodel";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function GET(request: NextRequest) {
  try {
    // console.log("username");
    const searchParams = request.nextUrl.searchParams
    const username = searchParams.get('username')
    // console.log(username);
    const user = await User.findOne({ username }).select("-password");

    return NextResponse.json({
      mesaaage: "User found",
      data: user,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
