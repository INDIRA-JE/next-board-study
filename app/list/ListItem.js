"use client";

import Link from "next/link";

export default function ListItem({ result }) {
  // console.log("\n>>> result : ", result);
  /* result 값
      [
        { _id: "645bb2575888a7fef7d31f7d", title: "안녕1", content: "반가워1" },
        { _id: "645cee323d5c717e29a895ac", title: "두번째글1", content: "두번째 글내용1", },
        { _id: "645d166d3d5c717e29a895ad", title: "333번째글1", content: "세번째 글 내용1", },
      ];
  */

  return (
    <div>
      {result.map((a, i) => (
        <div className="list-item" key={i}>
          <Link href={"/detail/" + result[i]._id}>
            <h4>{result[i].title}</h4>
          </Link>
          <Link href={"/edit/" + result[i]._id}>✏️</Link>
          <span
            onClick={() => {
              fetch("/api/post/delete", {
                // method: "DELETE",
                method: "POST",
                // body: JSON.stringify({ a: 1 }),
                body: result[i]._id,
              })
                .then((r) => {
                  if (r.status == 200) {
                    return r.json();
                  } else {
                    // 서버가 에러코드 전송시 -> 실행할 코드
                  }
                })
                .then((r) => {
                  // 성공시 -> 실행할 코드
                })
                .catch((error) => {
                  // 인터넷 문제로 실패시 -> 실행할 코드
                  console.log(error);
                });
            }}
          >
            🗑️
          </span>
          <p>1월 1일</p>
        </div>
      ))}
    </div>
  );
}
