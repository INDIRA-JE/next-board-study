import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function handler(요청, 응답) {
  // console.log("요청.query = \n", 요청.query); // { delete_2: 'TEST' }
  // console.log("요청.method = \n", 요청.method); // POST
  // console.log("body = \n", 요청.body); // 64ae7d29c13f1905a0c15595

  if (요청.method == "POST") {
    // console.log("if 요청.body = \n", 요청.method);

    const db = (await connectDB).db("forum");
    let result = await db
      .collection("post")
      .deleteOne({ _id: new ObjectId(요청.body) });

    // console.log("del result = \n", result);
    응답.status(200).json("삭제완료");
  }
}
