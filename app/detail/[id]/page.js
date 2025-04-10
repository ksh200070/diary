import { connectDB } from "/util/database";
import { ObjectId } from "mongodb";
import Comment from "@/component/Comment";
import { auth } from "@/auth";
import CommentList from "@/component/CommentList";
import LikeBtn from "@/component/LikeBtn";

export default async function Detail(props) {
  const db = (await connectDB).db("forum");
  const postId = (await props.params).id;
  const session = await auth();
  let result = await db
    .collection("post")
    .findOne({ _id: new ObjectId(postId) });

  const formatDate = (date) => {
    if (date) {
      const now = new Date();
      const target = new Date(date);
      const diffTime = now - target;
      const diffHours = Math.floor(diffTime / (1000 * 60 * 60));

      if (diffHours >= 24) {
        return target.toLocaleDateString("ko-KR");
      } else if (diffHours < 1) {
        const diffMinutes = Math.floor(diffTime / (1000 * 60));

        return !diffMinutes ? "방금 전" : `${diffMinutes}분 전`;
      } else {
        return `${diffHours}시간 전`;
      }
    }
  };

  return (
    <div className="detail-page">
      <div className="flex author" style={{ gap: "8px" }}>
        <span>{result.user.name}</span>
        <span style={{ color: "#919191" }}>
          {formatDate(result.createdDate)}
        </span>
      </div>
      <div className="header">
        <h2 className="title" style={{ margin: "0.4rem 0" }}>
          {result.title}
        </h2>
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
