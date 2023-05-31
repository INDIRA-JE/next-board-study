export default function SignUp() {
  return (
    <div>
      <h2>로그인</h2>
      <form action="/api/login/signup" method="POST">
        <input name="signup_id" id="id" type="text" placeholder="아이디 입력" />
        <input
          name="signup_pw"
          id="pw"
          type="password"
          placeholder="비밀버호 입력"
        />
        <button type="submit">로그인</button>
      </form>
    </div>
  );
}
