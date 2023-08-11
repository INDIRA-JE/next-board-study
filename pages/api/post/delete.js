import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(요청, 응답) {
  console.log("\n### delete 확인1 : 요청.method\n", 요청.method); // POST
  console.log("\n### delete 확인2 : 요청.body\n", 요청.body); // 64d6761721f1e8aa5720d3ef
  // console.log("\n### delete 확인 : 요청.body(_id).a\n : ", JSON.parse(요청.body).a); // 1

  // if (요청.method == "DELETE") { ※ DELETE 요청시 데이터가 없을 때 → POST로 사용
  // if (요청.method == "DELETE") {
  if (요청.method == "POST") {
    // console.log("\n### delete 확인3 : 요청.body(_id) : ", 요청.body); // {"a":1}
    // console.log("\n### delete 확인 : 요청.body(_id).a : ", 요청.body.a); // undefined
    // console.log("\n### delete 확인 : 요청.body(_id).a : ", JSON.parse(요청.body).a); // 1

    // 본인 계정으로만 삭제 기능
    let session = await getServerSession(요청, 응답, authOptions);
    console.log("\n### delete 확인4 : session\n", session); // { user: { name: 'INDIRA-JE', email: 'whddms87@gmail.com', image: 'https://avatars.githubusercontent.com/u/37805937?v=4' }, expires: '2023-09-10T18:09:03.108Z'}
    // console.log("\n### delete 확인 : session\n", session.user.email); // whddms87@gmail.com
    // 삭제할 DB 찾기(findOne() 사용)
    const db = (await connectDB).db("forum");
    let findResult = await db
      .collection("post")
      .findOne({ _id: new ObjectId(요청.body) });
    console.log("\n### delete 확인5 : findResult\n", findResult); // { _id: new ObjectId("64d6226221f1e8aa5720d3e9"), title: '2222222', content: '22222', author: 'whddms87@gmail.com'}

    if (session == null) {
      console.log("### delete 확인6 : if session\n", session); // null
      return 응답.status(500).json("로그인 필요");
    } else if (findResult.author == session.user.email) {
      // DB delete
      let delResult = await db
        .collection("post")
        .deleteOne({ _id: new ObjectId(요청.body) });
      console.log("\n### delete 확인7 : delResult\n", delResult); // { acknowledged: true, deletedCount: 1 }
      return 응답.status(200).json("삭제완료");
    } else {
      return 응답.status(500).json("현재 유저와 작성자 불일치");
    }
  }
}
