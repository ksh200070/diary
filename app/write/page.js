import { auth } from "@/auth";

export default async function Write() {
  const session = await auth();
  console.log(session);
  return (
    <>
      {session ? (
        <div className="form-container">
          <span className="header">글 작성</span>
          <form action="api/content" method="POST">
            <input type="text" name="title" placeholder="제목" />
            <textarea type="text" name="content" placeholder="내용" />
            <button type="submit">발행</button>
          </form>
        </div>
      ) : (
        <div className="modal-container">
          <span className="modal-content">로그인이 필요한 페이지입니다.</span>
        </div>
      )}
    </>
  );
}
