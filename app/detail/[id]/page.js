import { connectDB } from "/util/database";
import { ObjectId } from "mongodb";

export default async function Detail(props) {
  const db = (await connectDB).db("forum");
  let result = await db
    .collection("post")
    .findOne({ _id: new ObjectId(props.params.id) });

  return (
    <div className="detail-page">
      <h2>{result.title}</h2>
      <div className="detail-content">
        <div>{result.content}</div>
      </div>
    </div>
  );
}
