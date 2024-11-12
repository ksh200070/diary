import { connectDB } from "/util/database";

// export const revalidate = 60;

export default async function Home() {
  // const client = await connectDB;
  // const db = client.db("forum");
  // let result = await db.collection("post").find().toArray();

  // await fetch("/URL", { next: "revalidate:60" });
  return (
    <div
      style={{
        flexGrow: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        lineHeight: "1.5",
        textAlign: "center",
      }}
    >
      <img
        src="/img-bg-gosohan.jpg"
        alt=""
        style={{ width: "60%", borderRadius: "8px" }}
      />
      <h3>지금 여러분은 승현이의 일기장 사이트를 구경하고 있습니다~</h3>
      <span>
        위에 List 메뉴에는 예시가 있으니 구경해보고 글도 작성해보세요 ^-^
      </span>
      <span>아차차! 글을 작성하려면 회원가입이 필수랍니다.</span>
      <span>가입하고 글 작성해서 공유해보아요</span>
    </div>
  );
}
