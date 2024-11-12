import { connectDB } from "/util/database";
import { ObjectId } from "mongodb";
import Comment from "../../../component/Comment";
import { auth } from "@/auth";
import CommentList from "@/component/CommentList";
import LikeBtn from "../../../component/LikeBtn";

export default async function Detail(props) {
  const db = (await connectDB).db("forum");
  const postId = (await props.params).id;
  const session = await auth();
  let result = await db
    .collection("post")
    .findOne({ _id: new ObjectId(postId) });

  return (
    <div className="detail-page">
      <div className="header">
        <h2>{result.title}</h2>
        <div className="feedback">
          <LikeBtn postId={postId} userId={session && session.user._id} />
        </div>
      </div>
      <div className="detail-content">
        <div>{result.content}</div>
      </div>
      {session ? (
        <>
          <CommentList session={session} postId={postId}></CommentList>
        </>
      ) : (
        <div className="modal-container">
          <span className="modal-content">
            댓글 작성은 로그인이 필요합니다.
          </span>
        </div>
      )}
    </div>
  );
}
