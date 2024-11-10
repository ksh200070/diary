import { connectDB } from "/util/database";

export default async function handler(request, response) {
  const db = (await connectDB).db("forum");

  if (request.method === "POST") {
    if (!request.body.id) {
      return response.status(500).json("아이디가 없습니다.");
    } else if (!request.body.password) {
      return response.status(500).json("비밀번호가 없습니다.");
    }

    const existId = await db
      .collection("user")
      .findOne({ id: request.body.id });

    if (!!existId) {
      return response.status(500).json("동일한 아이디가 존재합니다.");
    }

    try {
      let result = await db.collection("user").insertOne(request.body);
      return response.status(200).json("가입 성공!");
    } catch (error) {
      return response.status(500).json(error);
    }
  }
}
