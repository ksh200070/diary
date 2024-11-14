import { connectDB } from "@/util/database";
import { NextResponse } from "next/server";

export async function POST(request, { params }) {
  const email = (await params).email;
  const db = (await connectDB).db("forum");

  try {
    const isExist = await db.collection("user_cred").findOne({ email: email });

    if (isExist) {
      return NextResponse.json(
        { error: "해당 이메일로 가입한 유저가 존재합니다." },
        { status: 404 }
      );
    }
  } catch (error) {
    console.log(error);
    return Response.error(error);
  }

  return NextResponse.json({});
}
