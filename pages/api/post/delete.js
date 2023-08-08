import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function handler(요청, 응답) {
  // console.log("확인 \n", 요청.body);

  // if (요청.method == "DELETE") { ※ DELETE 요청시 데이터가 없을 때 → POST로 사용
  if (요청.method == "POST") {
    // console.log("\n>>> 요청.body(_id) : ", 요청.body); // {"a":1}
    // console.log("\n>>> 요청.body(_id).a : ", 요청.body.a); // undefined
    // console.log("\n>>> 요청.body(_id).a : ", JSON.parse(요청.body).a); // 1

    const db = (await connectDB).db("forum");
    let result = await db
      .collection("post")
      .deleteOne({ _id: new ObjectId(요청.body) });

    // console.log("???????", result); // { acknowledged: true, deletedCount: 1 }
    응답.status(200).json("삭제완료");
  }
}
