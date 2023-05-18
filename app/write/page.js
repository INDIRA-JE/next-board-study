export default function Write() {
  return (
    <div>
      <h3>글 작성</h3>
      <form action="/api/test" method="POST">
        <button type="submit">POST 버튼</button>
      </form>
      <form action="/api/test" method="GET">
        <button type="submit">GET 버튼</button>
      </form>
    </div>
  );
}
