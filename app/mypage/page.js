import { auth } from "@/auth";
import LogoutBtn from "../../component/LogoutBtn";
import ListItem from "../list/ListItem";

export default async function Mypage() {
  const session = await auth();

  return (
    <>
      <div className="list-bg my-page">
        <ListItem userId={session && session.user._id}>
          <div className="header-area">
            <h2 className="title">{session.user.name}님의 글</h2>
            <div className="nav-buttons">
              <LogoutBtn />
            </div>
          </div>
        </ListItem>
      </div>
    </>
  );
}
