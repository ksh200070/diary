import LogoutBtn from "../../component/LogoutBtn";
import ListItem from "../list/ListItem";

export default function Mypage() {
  return (
    <>
      <div className="list-bg my-page">
        <div className="nav-buttons">
          <LogoutBtn className="nav-button" />
        </div>
        <ListItem></ListItem>
      </div>
    </>
  );
}
