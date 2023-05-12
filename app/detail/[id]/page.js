import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function Detail(props) {
  const db = (await connectDB).db("forum");
  let result = await db
    .collection("post")
    .findOne({ _id: new ObjectId(props.params.id) });

  return (
    <div>
      <h3>상세 페이지</h3>
      <h4>{result.title}</h4>
      <p>{result.content}</p>
    </div>
  );
}

/** 상세 페이지 만들기
 *  - 여러 페이지 사용 할 경우 -> 많이 만들지 않고 여러페이지를 사용 할 수 있는 방법
 *      1. URL 만들고
 *      2. 사용할 DB 가져오고
 *          2-1. 세부 내용 선택해서 가져오기
 *                  원하는 내용만(title : "안녕") 가져오기
 *      3. ID를 입력 했을 때 -> 페이지로 들어가지게 만들기
 *
 *  오늘의 숙제
 *      - /list 페이지에서
 *      - 제목에 상세페이지 이동 링크 넣고 이동 되는지 확인
 */
