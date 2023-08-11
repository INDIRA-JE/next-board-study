import { connectDB } from "@/util/database";
import ListItem from "./ListItem";
import ListItem2 from "./ListItem2";

// Rendering 부분(변수명은 그대로 사용)
export const dynamic = "force-dynamic";
// export const dynamic = "force-static";

export default async function List() {
  const db = (await connectDB).db("forum");
  let result = await db.collection("post").find().toArray();
  // console.log("\n### List page1\n", result);

  // Warning 나는 부분 : _id값을 문자열(toString)로 변경
  result = result.map((a) => {
    a._id = a._id.toString();
    return a;
  });
  // console.log(">>> List page2\n", result);

  return (
    <div className="list-bg">
      <ListItem result={result} />
      {/* <ListItem2 result={result} /> */}
    </div>
  );
}

/* Object 자료형 Test
  let data = { name: "JE", age: "20" };
  console.log(data);
  console.log(data.name);
  console.log(data.age);
  data.age = 30;
  console.log(data.age); */
