import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

let db = (await connectDB).db("forum");

export async function POST(request, { params }) {
  const body = await request.json();
  try {
    const data = { ...body, createdDate: new Date(), modifiedDate: new Date() };
    await db.collection("comment").insertOne(data);

    return NextResponse.json(data);
  } catch (error) {
    console.log(error);
    return NextResponse.error();
  }
}

export async function GET(request, { params }) {
  const postId = request.nextUrl.searchParams.get("postId");

  try {
    const result = await db
      .collection("comment")
      .find({ postId: postId })
      .toArray();
    result.sort((a, b) => b.createdDate - a.createdDate);
    return NextResponse.json(result);
  } catch (error) {
    console.log(error);
    return NextResponse.error();
  }
}
