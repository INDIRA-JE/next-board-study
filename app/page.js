import { MongoClient } from "mongodb";
import { connectDB } from "@/util/database.js";

// 예약변수 Revalidate : 페이지 단위 캐싱 가능
export const revalidate = 60;

export default async function Home() {
  // MongoDB 연결 코드
  // const client = await connectDB;
  // const db = client.db("forum");
  // 축약코드
  const db = (await connectDB).db("forum");
  let result = await db.collection("post").find().toArray();
  // db에 있는 post collection에 있는 모든 데이터를 가져와서 Array로 변환
  // console.log(result);

  // 캐싱(caching) : 잠시 저장
  // await fetch("/url", { cache: "force-cache" });
  // await fetch("/url", { cache: "no-store" }); // 매번 서버로 요청해서 새거 가져옴
  // await fetch("/url", { next: { revalidate: 60 } }); // 60초(60초만 보관)마다 캐싱된 데이터 갱신 해줌

  return <main>{result[0].title}</main>;
}
