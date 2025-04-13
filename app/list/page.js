"use client";

import { useSession } from "next-auth/react";
import ListItem from "./ListItem";
import { useRef } from "react";

export default function List() {
  const scrollBox = useRef();
  const { data: session } = useSession();

  const handleScroll = () => {
    scrollBox.current.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="list-bg" ref={scrollBox}>
      <ListItem userId={session && session.user._id} />

      <div className="icon-container">
        <img
          onClick={handleScroll}
          className="icon icon-scroll-top"
          src="/icon-scroll-top.png"
          alt="icon-scroll-top"
        />
      </div>
    </div>
  );
}
