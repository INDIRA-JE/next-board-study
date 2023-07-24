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
            onClick={(e) => {
              fetch("/api/post/delete", {
                // method: "DELETE", // DELETE가 안될 때는 -> POST해도 상관없다
                method: "POST",
                // body: JSON.stringify({ a: 1 }),
                body: result[i]._id,
              })
                .then((r) => r.json())
                .then(() => {
                  // 숨기는 기능
                  e.target.parentElement.style.opacity = 0;
                  // 1초 후에 -> 박스 없애는 기능
                  setTimeout(() => {
                    e.target.parentElement.style.display = "none";
                  }, 1000);
                });
              // URL Parameter 사용
              // fetch("/api/test?name=JE&age=20");
              // fetch("/api/abc/어쩌구");
              // fetch("/api/abc/JE");
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
