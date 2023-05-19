import { connectDB } from "@/util/database";

export default async function DBList(request, response) {
  const db = (await connectDB).db("forum");
  let result = await db.collection("post").find().toArray();

  response.status(200).json(result);
}

/* 
    1. 서버기능 작성 : DB 게시물들 뽑아서 -> 유저에게 출력
    2. 테스트 : 브라우저 GET 요청
*/
