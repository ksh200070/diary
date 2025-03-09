import Link from "next/link";

export default function SignupBtn() {
  return (
    <Link href={"/auth/signup"} className="nav-button">
      회원가입
    </Link>
  );
}
