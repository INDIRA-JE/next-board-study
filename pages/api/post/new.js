import { connectDB } from "@/util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(request, response) {
  // 1. request 들어오는지 확인
  // console.log("◆ 요청 =========\n", request.method);
  // console.log("◆ 요청 =========\n", request.body);

  // 유저정보 DB에서 가져오기
  let session = await getServerSession(request, response, authOptions);
  console.log("\n### WriteSession\n", session);
  if (session) {
    request.body.author = session.user.email;
  }
  console.log("\n### request.body\n", request.body);

  // 4. 반복문 작성
  if (request.method == "POST") {
    if (request.body.title == "") {
      response.status(500).json("너 왜 제목 작성안해??");
    } else if (request.body.content == "") {
      response.status(500).json("너 왜 내용 작성안해??");
    }
    // 2. DB 연결 & 저장(insertOne(요청.데이터)) 적용
    const db = (await connectDB).db("forum");
    let result = await db.collection("post").insertOne(request.body);
    // 3. 응답 상태 & 경로 설정
    return response.status(200).redirect(302, "/list");
  }
}
