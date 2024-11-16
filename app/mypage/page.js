import { auth } from "@/auth";
import LogoutBtn from "../../component/LogoutBtn";
import ListItem from "../list/ListItem";

export default async function Mypage() {
  const session = await auth();

  return (
    <>
      <div className="list-bg my-page">
        <div className="header">
          <img
            src="/icon-doodle-jump.png"
            alt=""
            className="icon-doodle-jump"
          />

          <h2 className="title">{session.user.name}님의 글</h2>
          <div className="nav-buttons">
            <LogoutBtn />
          </div>
        </div>
        <ListItem userId={session && session.user._id}></ListItem>
      </div>
    </>
  );
}
