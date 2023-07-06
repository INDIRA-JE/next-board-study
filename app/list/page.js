import { connectDB } from "@/util/database";
import ListItem from "./ListItem";
import Link from "next/link";

export default async function List() {
  const db = (await connectDB).db("forum");
  let result = await db.collection("post").find().toArray();
  // console.log("■ List page1\n", result);
  // result = result.map((a) => {
  //   a._id = a._id.toString();
  //   return a;
  // });
  // console.log(">>> List page2\n", result);

  return (
    <div className="list-bg">
      <ListItem result={result} />
    </div>
  );
}

//   console.log(result[0].title);
//   console.log(Date);

/* Object 자료형 Test
  let data = { name: "JE", age: "20" };
  console.log(data);
  console.log(data.name);
  console.log(data.age);
  data.age = 30;
  console.log(data.age); */
