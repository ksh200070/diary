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
    <div className="form-container">
      <h2>회원가입</h2>
      <form action="/api/auth/signup" method="POST">
        <input name="name" type="text" placeholder="이름" />
        <div className="check-email">
          <input
            name="email"
            type="text"
            placeholder="이메일"
            defaultValue={email}
            onChange={(e) => setEmail(e.target.value)}
            readOnly={checkedEmail}
          />
          {!checkedEmail ? (
            <button type="button" onClick={checkEmail}>
              중복확인
            </button>
          ) : (
            <button type="button" disabled={true}>
              확인완료
            </button>
          )}
        </div>
        <input name="password" type="text" placeholder="비밀번호" />
        <button type="submit" disabled={!checkedEmail}>
          요청
        </button>
      </form>
      <span>{checkedEmail}</span>
    </div>
  );
}

// todo : form required 값 체크하기. 인풋 비어있으면 button disabled 되도록
// todo : email 유효성 체크
//todo : middleware아마도 사용해야할듯. 회원가입 완료 후, 자동 리다이렉트되어야하기때문. 지금은 form태그로 응답을 어디에서 처리해야할지 감이 안잠힙
