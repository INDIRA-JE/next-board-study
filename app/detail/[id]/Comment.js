"use client";

import { useEffect, useState } from "react";

export default function Comment(props) {
  let [comment, setComment] = useState("");
  // 2. 가져온 데이터를 변수나 state에 저장해두고
  let [data, setData] = useState([]);

  useEffect(() => {
    // useEffect 특징 1 : html 로드 / 재렌더링 될 때마다 실행됨
    // useEffect 특징 2 : <div>안에 있는 html을 먼저 보여준 후에 → 늦게 실행시작
    fetch("/api/comment/list?id=" + props._id)
      .then((r) => r.json())
      .then((result) => {
        console.log(result);
        setData(result);
        // console.log(data);
      });
  }, []); // ,[] : 이러면 html 로드될 때 1회만 실행됨
  /* 순서
      1. 일단 html 내용 뭐라도 보여주고
      2. ajax로 데이터 가져오기 시작 (ajax 가져올 때 1~2초 걸리는 것 때문)
      3. ajax 결과를 html에 넣어줌
    └ 이게 UX 적으로 더 나음
  */

  return (
    <div>
      <div>댓글목록 보여줄 부분</div>
      {/* 3. state를 html에 넣기*/}
      <hr></hr>
      {data.length > 0 // 추가 : 댓글 없을 때
        ? data.map((a, i) => <p key={i}>{a.content}</p>)
        : "댓글 없음"}
      <input
        onChange={(e) => {
          setComment(e.target.value);
          console.log(e.target.value);
        }}
      />
      <button
        onClick={() => {
          // console.log(comment);
          fetch("/api/comment/new", {
            method: "POST",
            body: JSON.stringify({ comment: comment, _id: props._id }),
          });
        }}
      >
        댓글 전송
      </button>
    </div>
  );
}
