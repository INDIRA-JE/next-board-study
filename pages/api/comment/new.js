import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(요청, 응답) {
  let session = await getServerSession(요청, 응답, authOptions);

  if (요청.method == "POST") {
    요청.body = JSON.parse(요청.body);

    let 저장할것 = {
      // 확인 작업 (로그인상태가 아니면 거절, 빈칸체크, 등)
      content: 요청.body.comment,
      parent: new ObjectId(요청.body._id),
      author: session.user.email,
    };

    const db = (await connectDB).db("forum");
    let result = await db.collection("comment").insertOne(요청.body);
    응답.status(200).JSON("저장완료");
  }
}
