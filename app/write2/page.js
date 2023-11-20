// "use client";

import { connectDB } from "@/util/database";
import { handleSubmit } from "./actions";
import { revalidatePath } from "next/cache";

// server action 기능 사용하면 -> page.js 안에서 서버기능까지 전부 구현가능
// 1. 페이지 만듬
export default async function Write2() {
  const db = (await connectDB).db("forum");
  let result = await db.collection("post_test").find().toArray();

  // 3. 서버 API 생성
  async function handleSubmit(formData) {
    "use server";
    // DB 입출력
    const db = (await connectDB).db("forum");
    await db
      .collection("post_test")
      .insertOne({ title: formData.get("title") });

    console.log("유저 데이터 \n\t", formData.get("title"));
    revalidatePath("/write2"); // 새로고침 기능 추가(차이점만 바꿔줌)
  } // test : actions.js 페이지로 이동

  // 2. 폼 만듬
  return (
    <div>
      <form action={handleSubmit}>
        <input name="title"></input>
        <button type="submit">버튼</button>
      </form>
      {result ? result.map((a) => <p> 글제목 : {a.title}</p>) : null}
    </div>
  );
}
