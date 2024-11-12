"use client";

import { useEffect, useState } from "react";
import Comment from "./Comment";

export default function CommentList({ session, postId }) {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getComments();
  }, [comments.length]);

  const getComments = () => {
    fetch(`http://localhost:3000/api/comment?postId=${postId}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setComments(data);
        }
      });
  };

  return (
    <div className="comment-list">
      <div className="header">
        <h3 className="title">댓글 목록</h3>
        <div className="new-comment">
          <input onChange={(e) => setComment(e.target.value)} />
          <button
            onClick={() => {
              fetch("/api/comment", {
                method: "POST",
                body: JSON.stringify({
                  comment: comment,
                  postId: postId,
                  author: session.user,
                }),
              })
                .then((res) => res.json())
                .then((data) => setComments([...comments, data]));
            }}
          >
            댓글전송
          </button>
        </div>
      </div>
      <div className="comments">
        {comments.length
          ? comments.map((comment) => (
              <Comment key={comment._id} comment={comment}></Comment>
            ))
          : "로딩중"}
      </div>
    </div>
  );
}
