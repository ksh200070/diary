"use client";
import { useEffect, useState } from "react";

export default function LikeBtn({ postId, userId }) {
  const [count, setCount] = useState(0);
  const [likedId, setLikedId] = useState(null);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    fetch(`/api/like?postId=${postId}&userId=${userId}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        
        setCount(data.count);
        setLikedId(data.likedId);
        setIsLiked(data.isLiked);
      });
  }, [count.length]);

  return (
    <button
      onClick={() => {
        setIsLiked(() => !isLiked);
        fetch(
          `/api/like?postId=${postId}&userId=${userId}&likedId=${likedId}&isLiked=${!isLiked}`,
          {
            method: "POST",
            body: JSON.stringify({
              postId: postId,
              userId: userId,
            }),
          }
        )
          .then((res) => res.json())
          .then((data) => {
            if (data) {
              if (isLiked) {
                setCount(() => count - 1);
              } else {
                setCount(() => count + 1);
              }
            }
          });
      }}
      className={`like-button ${isLiked && "selected"}`}
    >
      <span>좋아요 {count}</span>
    </button>
  );
}
