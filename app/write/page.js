"use client";

import { useState } from "react";

export default function Write() {
  const [title, setTitle] = useState("");

  return (
    <div className="page-container">
      <div className="form-container">
        <h2>글 작성</h2>
        <form action="api/content" method="POST">
          <input
            type="text"
            defaultValue={title}
            onChange={(e) => setTitle(e.target.value)}
            name="title"
            placeholder="제목"
          />
          <textarea type="text" name="content" placeholder="내용" />
          <button disabled={!title} type="submit">
            발행
          </button>
        </form>
      </div>
    </div>
  );
}
