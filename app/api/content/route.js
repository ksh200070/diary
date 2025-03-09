import { ObjectId } from "mongodb";
import { connectDB } from "/util/database";
import { auth } from "@/auth";

export async function GET(request, { params }) {
  const db = (await connectDB).db("forum");
  const session = await auth();
  const isMypage = JSON.parse(request.nextUrl.searchParams.get("isMypage"));

  try {
    const result = await db
      .collection("post")
      .find(isMypage ? { "user.id": session.user._id } : {})
      .toArray();
    return Response.json(result);
  } catch (error) {
    console.log(error);
    return Response.error(error);
  }
}

export async function POST(request) {
  const db = (await connectDB).db("forum");
  const session = await auth();

  // Check writer's email
  if (!session) {
    return Response.json(
      { message: "user 이메일이 없습니다." },
      { status: 404 }
    );
  }

  const formData = await request.formData();
  const title = formData.get("title");
  const content = formData.get("content");
  const id = formData.get("_id");

  // Check necessary value exist well.
  if (!title) {
    return Response.json(
      { message: "제목을 입력하지 않았습니다." },
      { status: 404 }
    );
  } else if (!content) {
    return Response.json(
      { message: "내용을 입력하지 않았습니다." },
      { status: 404 }
    );
  } else if (!id) {
    // create new content
    try {
      const updateInfo = {
        title: title,
        content: content,
        user: {
          id: session.user._id,
          email: session.user.email,
          name: session.user.name,
        },
        createdDate: new Date(),
      };
      let result = await db.collection("post").insertOne(updateInfo);
    } catch (error) {
      return Response.error(error);
    }

    return Response.redirect(`${process.env.NEXTAUTH_URL}/list`, 301);
  } else {
    // edit original content
    try {
      let result = await db.collection("post").updateOne(
        { _id: new ObjectId(id) },
        {
          $set: {
            title: title,
            content: content,
            updatedDate: new Date(),
          },
        }
      );
    } catch (error) {
      return Response.error(error);
    }

    return Response.redirect(`${process.env.NEXTAUTH_URL}/list`, 301);
  }
}
