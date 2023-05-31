export default function write() {
  return (
    <div className="p-20">
      <h3>글 작성</h3>
      <form action="api/post/new" method="POST">
        <input name="title" placeholder="글 제목 작성" />
        <input name="content" placeholder="글 내용 작성" />
        <button type="submit">저장</button>
      </form>

      {/* <form action="/api/test" method="POST">
        <button type="submit">POST 버튼</button>
      </form>
      <form action="/api/test" method="GET">
        <button type="submit">GET 버튼</button>
      </form> */}
    </div>
  );
}
