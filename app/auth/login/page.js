"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

export default function Login() {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [showPw, setShowPw] = useState(false);

  const handleSubmit = async () => {
    const result = await signIn("credentials", {
      email: id,
      password: pw,
      redirect: true,
      callbackUrl: "/",
    });
  };

  return (
    <div className="page-container">
      <div className="login-box">
        <h1>로그인</h1>
        <div className="login-inputs">
          <section className="login-id">
            <div className="input-box">
              <input
                name="id"
                type={"text"}
                defaultValue={id}
                onChange={(e) => setId(e.target.value)}
                placeholder="이메일을 입력해주세요"
              />
              <img src="/icon-email.png" className="input-icon" alt="" />
            </div>
          </section>
          <section className="login-pw">
            <div className="input-box">
              <input
                name="pw"
                type={showPw ? "text" : "password"}
                defaultValue={pw}
                onChange={(e) => setPw(e.target.value)}
                placeholder="비밀번호를 입력해주세요"
              />
              <div>
                {showPw ? (
                  <img
                    src="/icon-pw-hide.png"
                    className="pw-icon"
                    onClick={() => setShowPw((prev) => !prev)}
                  />
                ) : (
                  <img
                    src="/icon-pw-hide.png"
                    className="pw-icon"
                    onClick={() => setShowPw((prev) => !prev)}
                  />
                )}
              </div>
              <img src="/icon-password.png" className="input-icon" alt="" />
            </div>
          </section>
        </div>

        <div className="login-actions">
          <button disabled={!id.length || !pw.length} onClick={handleSubmit}>
            로그인하기
          </button>
          <span className="signup">회원가입하기</span>
        </div>
      </div>
    </div>
  );
}
