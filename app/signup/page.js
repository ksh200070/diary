export default function SingUP() {
  return (
    <div className="form-container">
      <h1>회원가입</h1>
      <form action="api/signup" method="POST">
        <input type="text" name="id" placeholder="아이디" />
        <input type="text" name="password" placeholder="비밀번호" />
        <button type="submit">완료</button>
      </form>
    </div>
  );
}
