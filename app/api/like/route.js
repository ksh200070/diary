import { connectDB } from "@/util/database";
import { NextResponse } from "next/server";

let db = (await connectDB).db("forum");

export async function GET(request, { params }) {
  const postId = request.nextUrl.searchParams.get("postId");
  const userId = request.nextUrl.searchParams.get("userId");

  try {
    const result = await db
      .collection("like")
      .find({ postId: postId })
      .toArray();

    const isExist = result.find((v) => v.userId === userId);

    return NextResponse.json({
      count: result.length,
      isLiked: isExist ? isExist.isLiked : false,
      likedId: isExist ? isExist._id : null,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.error();
  }
}

export async function POST(request, { params }) {
  const postId = request.nextUrl.searchParams.get("postId");
  const userId = request.nextUrl.searchParams.get("userId");
  const likedId = request.nextUrl.searchParams.get("likedId");
  const isLiked = request.nextUrl.searchParams.get("isLiked");

  try {
    const item = await db
      .collection("like")
      .find({ postId: postId, userId: userId })
      .toArray();

    if (item.length) {
      await db.collection("like").updateOne(
        { postId: postId, userId: userId },
        {
          $set: {
            isLiked: JSON.parse(isLiked),
          },
        }
      );
    } else {
      await db.collection("like").insertOne({
        postId: postId,
        userId: userId,
        isLiked: JSON.parse(isLiked),
      });
    }

    return NextResponse.json({});
  } catch (error) {
    console.log(error);
    return NextResponse.error();
  }
}
