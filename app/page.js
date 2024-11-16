import { connectDB } from "/util/database";

// export const revalidate = 60;

export default async function Home() {
  // const client = await connectDB;
  // const db = client.db("forum");
  // let result = await db.collection("post").find().toArray();

  // await fetch("/URL", { next: "revalidate:60" });
  return (
    <div className="home-page">
      <span className="welcome">WELCOME ! </span>
      <img src="/icon-doodle-jump.png" alt="" className="icon-doodle-jump" />
      <div className="descriptions">
        <span className="description">현재는 베타 서비스 운영 중 입니다.</span>
        <span className="description"> 자유롭게 이용해주세요</span>
      </div>
    </div>
  );
}
