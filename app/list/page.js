"use client";

import ListItem from "./ListItem";
import { useEffect } from "react";
import { useState } from "react";

export default function List() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(`s/api/content`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, [posts.length]);

  return (
    <div className="list-bg">
      {posts.map((item, i) => (
        <ListItem item={item} key={i} />
      ))}
    </div>
  );
}
