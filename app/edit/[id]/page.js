import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function edit(props) {
  const db = (await connectDB).db("forum");
  let result = await db
    .collection("post")
    .findOne({ _id: new ObjectId(props.params.id) });
  console.log(result);
  /* 
    {
        _id: new ObjectId("645cee323d5c717e29a895ac"), 
        title: '두번째글', 
        content: '두번째 글내용'
    }
  */

  //   await db.collection("post").updateOne({수정할 게시물 정보}, {수정할 내용});
  //   await db.collection("post").updateOne({_id : "게시물 아이디"}, {$set : {title:"제목 수정", content:"내용 수정"} });

  return (
    <div>
      <h3>수정 페이지</h3>
      <form action="api/post/new" method="POST">
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

/**
 * 글제목
 * 글 작성 박스(제목, 내용)
 * 버튼
 */
