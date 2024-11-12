"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useState } from "react";

export default function ListItem({ userEmail }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(`/api/content`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setPosts(data);
      });
  }, [posts.length]);

  return (
    <>
      {posts.map((item, i) => (
        // <ListItem item={item} key={i} />

        <div className="list-item" key={i}>
          <div className="list-item-title">
            <Link prefetch={false} href={`/detail/${item._id}`}>
              <h4>{item.title}</h4>
            </Link>
            <div className="button-pannel">
              {/* <span className="date">{item.createdDate}</span> */}
              {item.author && item.author === userEmail ? (
                <>
                  <Link href={`/edit/${item._id}`}>
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
                    <img src="/icon-trash.png" alt="" className="icon-trash" />
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
          <p>{item.content}</p>
        </div>
      ))}
    </>
  );
}
