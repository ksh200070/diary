import { auth } from "@/auth";
import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export async function DELETE(request, { params }) {
  const session = await auth();

  if (session) {
    const id = (await params).id;

    if (!id) return Response.json({ message: "아이디가 전달되지 않았습니다." });

    try {
      const db = (await connectDB).db("forum");

      const findItem = await db
        .collection("post")
        .findOne({ _id: new ObjectId(id) });

      // 삭제 권한 : 관리자 혹은 본인이 작성한 글인 경우
      if (
        session.user.role === "Admin" ||
        findItem.author === session.user.email
      ) {
        let result = await db
          .collection("post")
          .deleteOne({ _id: new ObjectId(id) });

        return Response.json(result);
      } else {
        return Response.json({
          message: "본인이 작성한 글만 삭제할 수 있습니다.",
          status: 404,
        });
      }
    } catch (error) {
      console.log(error);
      return Response.error(error);
    }
  }
}
