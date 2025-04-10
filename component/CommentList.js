"use client";

import { useEffect, useState } from "react";
import Comment from "./Comment";
import Loader from "./loader";

export default function CommentList({ session, postId }) {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    getComments();
  }, [comments.length]);

  const getComments = () => {
    setIsFetching(true);
    fetch(`/api/comment?postId=${postId}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setComments(data);
          setIsFetching(false);
        }
      });
  };

  const clickSendBtn = () => {
    fetch("/api/comment", {
      method: "POST",
      body: JSON.stringify({
        comment: comment,
        postId: postId,
        author: session.user,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setComments([data, ...comments]);
        setComment(() => "");
      });
  };

  const enterHandler = (event) => {
    if (event.key === "Enter") {
      clickSendBtn();
    }
  };

  return (
    <div className="comment-list">
      <div className="header">
        <h3 className="title">댓글 목록</h3>
        <div className="new-comment">
          <input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            onKeyDown={(event) => enterHandler(event)}
          />
          <button onClick={() => clickSendBtn()}>댓글전송</button>
        </div>
      </div>
      <div className="comments">
        {isFetching ? (
          <Loader size="sm"></Loader>
        ) : comments.length ? (
          comments.map((comment) => (
            <Comment key={comment._id} comment={comment}></Comment>
          ))
        ) : (
          <div
            className="flex"
            style={{
              width: "100%",
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
              opacity: "0.7",
            }}
          >
            첫 마음이 담기길 기다리고 있어요.
          </div>
        )}
      </div>
    </div>
  );
}
