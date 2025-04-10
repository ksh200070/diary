"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useState } from "react";
import Loader from "../../component/loader";

export default function ListItem({ userId, children }) {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const path = usePathname();

  useEffect(() => {
    if (!searchText.length) {
      setIsFetching(true);
      fetch(`/api/content?isMypage=${path === "/mypage"}`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          setPosts(data);
          setIsFetching(false);
        });
    }
  }, [posts.length]);

  const enterHandler = (event) => {
    if (event.key === "Enter") {
      setIsFetching(true);
      fetch(
        `/api/content?isMypage=${path === "/mypage"}&keyword=${searchText}`,
        {
          method: "GET",
        }
      )
        .then((res) => res.json())
        .then((data) => {
          setPosts(data);
          setIsFetching(false);
        });
    }
  };

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

  const handleDelete = (e, id) => {
    fetch(`/api/content/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.status === 404) {
          window.alert("본인이 작성한 글만 삭제할 수 있습니다.");
        } else {
          const target = e.currentTarget.closest(".post-item"); // 부모 요소 선택
          if (target) {
            target.style.opacity = "0";
            setTimeout(() => {
              target.style.display = "none";
            }, 1000);
          }
        }
      });
  };

  return (
    <>
      {isFetching ? (
        <Loader></Loader>
      ) : (
        <div className="view-container">
          <div className="search-container">
            <div className="search-area">
              <input
                type="text"
                placeholder="검색어 입력"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyDown={enterHandler}
              />
              <img
                src="/icon-search.png"
                className="icon icon-search"
                alt="search-icon"
              />
            </div>
          </div>

          {children}
          <section className="post-list">
            {posts.length ? (
              posts.map((item, i) => (
                <div className="post-item" key={i}>
                  <div className="flex author" style={{ gap: "8px" }}>
                    <span style={{ color: "#919191" }}>
                      {formatDate(item.createdDate)}
                    </span>
                    <span>{item.user?.name}</span>
                  </div>
                  <div className="post-item-title">
                    <Link href={`/detail/${item._id}`}>
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
                          <div onClick={(e) => handleDelete(e, item._id)}>
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
                  <Link href={`/detail/${item._id}`}>
                    <p>{item.content}</p>
                  </Link>
                </div>
              ))
            ) : (
              <span className="empty-message">검색 결과가 없습니다.</span>
            )}
            <div className="footer"></div>
          </section>
        </div>
      )}
    </>
  );
}
