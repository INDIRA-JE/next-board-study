import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function edit(props) {
  const db = (await connectDB).db("forum");
  let result = await db
    .collection("post")
    .findOne({ _id: new ObjectId(props.params.id) });
  console.log(props); // { params: { id: '645bb2575888a7fef7d31f7d' }, searchParams: {} }
  console.log(result);
  console.log(result._id); // new ObjectId("645bb2575888a7fef7d31f7d")
  console.log(result._id.toString()); // 645bb2575888a7fef7d31f7d

  return (
    <div className="p-20">
      <h3>수정 페이지</h3>
      <form action="/api/post/edit" method="POST">
        <input
          name="_id"
          defaultValue={result._id.toString()}
          style={{ display: "none" }}
        />
        <input name="title" placeholder="글 제목" defaultValue={result.title} />
        <input
          name="content"
          placeholder="글 내용"
          defaultValue={result.content}
        />
        <button type="submit">수정</button>
      </form>
    </div>
  );
}
