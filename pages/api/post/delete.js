import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function handler(요청, 응답) {
  // if (요청.method == "DELETE") { ※ DELETE 요청시 데이터가 없을 때 → POST로 사용
  if (요청.method == "POST") {
    // console.log("\n>>> 요청.body : ", JSON.parse(요청.body).a);
    console.log("\n>>> 요청.body(_id) : ", 요청.body); // result[i]._id 값
    const db = (await connectDB).db("forum");
    let result = await db
      .collection("post")
      .deleteOne({ _id: new ObjectId(요청.body) });
    응답.status(200).json("삭제완료");
  }
}
