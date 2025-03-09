"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useState } from "react";
import Loader from "../../component/loader";

export default function ListItem({ userId }) {
  const [posts, setPosts] = useState([]);
  const path = usePathname();

  useEffect(() => {
    fetch(`/api/content?isMypage=${path === "/mypage"}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
      });
  }, [posts.length]);

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
        return `${diffMinutes}분 전`;
      } else {
        return `${diffHours}시간 전`;
      }
    }
  };

  return (
    <section className="post-list">
      {posts.length
        ? posts.map((item, i) => (
            <div className="post-item" key={i}>
              <div className="flex author" style={{ gap: "8px" }}>
                <span style={{ color: "#919191" }}>
                  {formatDate(item.createdDate)}
                </span>
                <span>{item.user?.name}</span>
              </div>
              <div className="post-item-title">
                <Link prefetch={false} href={`/detail/${item._id}`}>
                  <h4>{item.title}</h4>
                </Link>
                <div className="button-pannel">
                  {path === "/mypage" && (
                    <>
                      <Link href={`/edit/${item._id}`} legacyBehavior>
                        <img
                          src="/icon-pencil.png"
                          alt="edit"
                          className="icon-pencil"
                        />
                      </Link>
                      <div
                        onClick={(e) => {
                          fetch(`/api/content/${item._id}`, {
                            method: "DELETE",
                          })
                            .then((res) => res.json())
                            .then((result) => {
                              if (result.status === 404) {
                                window.alert(
                                  "본인이 작성한 글만 삭제할 수 있습니다."
                                );
                              } else {
                                e.target.parentElement.parentElement.parentElement.parentElement.style.opacity = 0;
                                setTimeout(() => {
                                  e.target.parentElement.parentElement.parentElement.parentElement.style.display =
                                    "none";
                                }, 1000);
                              }
                            });
                        }}
                      >
                        <img
                          src="/icon-trash.png"
                          alt=""
                          className="icon-trash"
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>
              <Link prefetch={false} href={`/detail/${item._id}`}>
                <p>{item.content}</p>
              </Link>
            </div>
          ))
        : posts.length !== 0 && <Loader></Loader>}

      <div className="footer"></div>
    </section>
  );
}
