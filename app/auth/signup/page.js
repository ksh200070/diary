"use client";

import { useState } from "react";

export default function Register() {
  const [email, setEmail] = useState("");
  const [checkedEmail, setCheckedEmail] = useState(false);

  const checkEmail = async () => {
    const res = await fetch(`/api/auth/check/${email}`, {
      method: "POST",
    });

    const result = await res.json();
    if (result.error) {
      window.alert(result.error);
    } else {
      window.alert("해당 이메일 사용이 가능합니다.");
      setCheckedEmail(true);
    }
  };

  return (
    <div className="page-container">
      <form action="/api/auth/signup" method="POST">
        <div className="login-box">
          <h1>회원가입</h1>
          <div className="login-inputs">
            <section className="login-id">
              <div className="input-box">
                <input
                  name="name"
                  type="text"
                  placeholder="이름을 입력해주세요"
                />
                <img src="/icon-user.png" className="input-icon" alt="" />
              </div>
            </section>

            <section className="login-id">
              <div className="check-email">
                <div className="input-box">
                  <input
                    name="email"
                    type="text"
                    placeholder="이메일"
                    defaultValue={email}
                    onChange={(e) => setEmail(e.target.value)}
                    readOnly={checkedEmail}
                  />
                  <img src="/icon-email.png" className="input-icon" alt="" />
                  {!checkedEmail ? (
                    <button
                      className="input-check-btn"
                      type="button"
                      onClick={checkEmail}
                    >
                      중복확인
                    </button>
                  ) : (
                    <button
                      className="input-check-btn"
                      type="button"
                      disabled={true}
                    >
                      확인완료
                    </button>
                  )}
                </div>
              </div>
            </section>
            <section>
              <div className="input-box">
                <input name="password" type="text" placeholder="비밀번호" />
                <img src="/icon-password.png" className="input-icon" alt="" />
              </div>
            </section>
          </div>

          <div className="login-actions">
            <button type="submit" disabled={!checkedEmail}>
              요청
            </button>
            <span>{checkedEmail}</span>
          </div>
        </div>
      </form>
    </div>
  );
}

// todo : form required 값 체크하기. 인풋 비어있으면 button disabled 되도록
// todo : email 유효성 체크
//todo : middleware아마도 사용해야할듯. 회원가입 완료 후, 자동 리다이렉트되어야하기때문. 지금은 form태그로 응답을 어디에서 처리해야할지 감이 안잠힙
