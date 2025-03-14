import Link from "next/link";

export default function SignupBtn() {
  return (
    <Link href={"/auth/signup"}>
      <button className="nav-button">회원가입</button>
    </Link>
  );
}
