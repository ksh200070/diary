"use client";

import Link from "next/link";

export default function ListItem({ item }) {
  return (
    <div className="list-item">
      <div className="list-item-title">
        <Link prefetch={false} href={`/detail/${item._id}`}>
          <h4>{item.title}</h4>
        </Link>
        <div className="button-pannel">
          {/* <span className="date">{item.createdDate}</span> */}
          <Link href={`/edit/${item._id}`}>
            <img src="/icon-pencil.png" alt="edit" className="icon-pencil" />
          </Link>

          {/* {session.user.email === item.author ? ( */}
          <div
            onClick={(e) => {
              fetch(`${process.env.NEXTAUTH_URL}/api/content/${item._id}`, {
                method: "DELETE",
              })
                .then((res) => res.json())
                .then((result) => {
                  if (result.status === 404) {
                    window.alert("본인이 작성한 글만 삭제할 수 있습니다.");
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
          {/* ) : (
            <></>
          )} */}
        </div>
      </div>
      <p>{item.content}</p>
    </div>
  );
}
