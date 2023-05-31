export default function join() {
  return (
    <div>
      <h2>회원가입</h2>
      <form action="/api/join/newJoin" method="POST">
        <input name="id" id="id" type="text" placeholder="아이디 입력" />
        <input name="pw" id="pw" type="password" placeholder="비밀번호 입력" />
        <button type="submit">회원가입</button>
      </form>
    </div>
  );
}
