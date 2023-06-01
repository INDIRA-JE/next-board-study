import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function edit(props) {
  const db = (await connectDB).db("forum");
  let result = await db
    .collection("post")
    .findOne({ _id: new ObjectId(props.params.id) });
  // .findOne() : DB에서 id값을 찾음(props를 통해서 들어오는 id값 경로 적용)
  console.log("★★★ props | ================\n", props);
  // props : { params: { id: '645bb2575888a7fef7d31f7d' }, searchParams: {} }
  console.log("★★★ result | ================\n", result);
  // result : { _id: new ObjectId("645bb2575888a7fef7d31f7d"), title: '안녕', content: '반가워'}
  return (
    <div>
      <h3>수정 페이지</h3>
      <form action="api/post/new" method="POST">
        <input
          name="title"
          placeholder="제목 작성"
          defaultValue={result.title}
        />
        <input
          name="content"
          placeholder="제목 작성"
          defaultValue={result.content}
        />
        <button type="submit">수정 완료</button>
      </form>
    </div>
  );
}

/*
  1. 글마다 수정버튼 → 누르면 수정페이지로 이동
  2. 수정페이지 만들기 (글 가져와서 채워놔야함) - 완료
  3. 발행누르면 DB에 있던 글 수정
*/
