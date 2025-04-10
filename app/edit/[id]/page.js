import { connectDB } from "/util/database";
import { ObjectId } from "mongodb";

export default async function Edit(props) {
  const db = (await connectDB).db("forum");
  let result = await db
    .collection("post")
    .findOne({ _id: new ObjectId(props.params.id) });

  return (
    <div className="page-container">
      <div className="form-container">
        <h2>수정</h2>
        <form action="/api/content" method="POST">
          <input
            style={{ display: "none" }}
            name="_id"
            defaultValue={result._id.toString()}
          />
          <input name="title" placeholder="제목" defaultValue={result.title} />
          <textarea
            name="content"
            placeholder="내용"
            defaultValue={result.content}
          />
          <button type="submit">수정완료</button>
        </form>
      </div>
    </div>
  );
}
