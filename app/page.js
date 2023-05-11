import { MongoClient } from "mongodb";
import { connectDB } from "@/util/database.js";

export default async function Home() {
  // MongoDB 연결 코드
  // const client = await connectDB;
  // const db = client.db("forum");
  // 축약코드
  const db = (await connectDB).db("forum");
  let result = await db.collection("post").find().toArray();
  // db에 있는 post collection에 있는 모든 데이터를 가져와서 Array로 변환
  console.log(result);

  return <main>{result[0].title}</main>;
}
