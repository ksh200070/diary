import { connectDB } from "@/util/database";
import bcrypt from "bcrypt";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function POST(request, { params }) {
  const db = (await connectDB).db("forum");
  const formData = await request.formData();
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");

  // Check necessary value exist well.
  if (!name || !email || !password) {
    return Response.json({ error: "필드를 모두 채워주세요" }, { status: 404 });
  } else {
    try {
      const hashPassword = await bcrypt.hash(password, 10);

      await db
        .collection("user_cred")
        .insertOne({ name: name, email: email, password: hashPassword });

      return NextResponse.json({ email: email });
    } catch (error) {
      return Response.error(error);
    }
  }
}
