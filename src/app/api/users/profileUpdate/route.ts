import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/usermodel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, newUsername, contactNumber, name, upiID } = reqBody;

    const user = await User.findOne({ username });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (newUsername && user.username !== newUsername) {
      const existingUser = await User.findOne({ username: newUsername });
      if (existingUser) {
        return NextResponse.json({ error: "Username already exists" }, { status: 400 });
      }
      user.username = newUsername;
    }
    if (contactNumber && user.contactNumber !== contactNumber) {
      user.contactNumber = contactNumber;
    }
    if (name && user.name !== name) {
      user.name = name;
    }
    if (upiID && user.upiID !== upiID) {
      user.upiID = upiID;
    }

    await user.save();
    return NextResponse.json({
      message: "Profile updated successfully",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
