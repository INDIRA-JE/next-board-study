import { connectDB } from "@/util/database";
import Link from "next/link";
import DetailLink from "./DetailLink";

export default async function List() {
  const db = (await connectDB).db("forum");
  let result = await db.collection("post").find().toArray();
  //   console.log(result);
  //   console.log(result[0].title);
  //   console.log(Date);

  /* Object 자료형 Test
  let data = { name: "JE", age: "20" };
  console.log(data);
  console.log(data.name);
  console.log(data.age);
  data.age = 30;
  console.log(data.age); */

  return (
    <div className="list-bg">
      {result.map((a, i) => {
        // console.log(a.title);
        // console.log(i.title);
        return (
          <div className="list-item" key={i}>
            {/* <h4>{result[i].title}</h4> → 링크 적용*/}
            <Link href={"/detail/" + result[i]._id}>
              <h4>{a.title}</h4>
            </Link>
            <DetailLink />
            <p>1월 1일</p>
          </div>
        );
      })}

      {/* [ 반복부분 제거 ]
      <div className="list-item">
        <h4>{result[0].title}</h4>
        <p>1월 1일</p>
      </div>
      <div className="list-item">
        <h4>{result[1].title}</h4>
        <p>1월 1일</p>
      </div>
      <div className="list-item">
        <h4>{result[2].title}</h4>
        <p>1월 1일</p>
      </div> 
      */}
    </div>
  );
}
