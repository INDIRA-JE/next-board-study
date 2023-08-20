export default function Register() {
  return (
    <div>
      <h3>회원 가입</h3>
      <form method="POST" action="/api/auth/signup">
        <input name="name" type="text" placeholder="이름" />
        <input name="email" type="text" placeholder="이메일" />
        <input name="password" type="password" placeholder="비번" />
        <button type="submit">id/pw 가입요청</button>
      </form>
    </div>
  );
}
