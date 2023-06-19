"use client";

import Link from "next/link";

export default function ListItem({ result }) {
  console.log("\n>>> ListItem page : ", result);
  console.log("\n>>> result._id : ", result._id);
  /* result 값
      [
        { _id: "645bb2575888a7fef7d31f7d", title: "안녕1", content: "반가워1" },
        { _id: "645cee323d5c717e29a895ac", title: "두번째글1", content: "두번째 글내용1", },
        { _id: "645d166d3d5c717e29a895ad", title: "333번째글1", content: "세번째 글 내용1", },
      ];
  */

  return (
    <div>
      {result.map((a, i) => {
        console.log("\ni.num : ", i);
        console.log("a._id : ", a._id);
        console.log("a.title : ", a.title);
        console.log("a.content : ", a.content);

        return (
          <div className="list-item" key={i}>
            {/* <h4>{result[i].title}</h4> → 링크 적용*/}
            <Link href={"/detail/" + result[i]._id}>
              <h4>{a.title}</h4>
            </Link>
            {/* <DetailLink /> */}
            {/* <Link href={"/edit/" + result[i]._id}>🔄️</Link> */}
            <Link href={"/edit/" + result[i]._id} className="list-btn">
              ✏️
            </Link>

            <span
              onClick={() => {
                fetch("/api/post/delete", {
                  method: "DELETE",
                  body: result[i]._id,
                }).then(() => {
                  console.log("삭제완료");
                });
              }}
            >
              🗑️
            </span>

            <p>1월 1일</p>
          </div>
        );
      })}
    </div>
  );
}
