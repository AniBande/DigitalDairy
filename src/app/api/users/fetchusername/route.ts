import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/usermodel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(request: NextRequest) {
    try {

        const reqBody = await request.json()
        const {fid} = reqBody;
        // console.log(reqBody);

        const user = await User.findOne({_id: fid}).select("-password");
        const username = await user.username
        return NextResponse.json({
            mesaaage: "User found",
            data: username
        })
    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 400});
    }
}
