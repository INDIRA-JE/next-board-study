"use client";

import { useState } from "react";

export default function write() {
  let [src, serSrc] = useState("");

  return (
    <div className="p-20">
      <h3>글 작성</h3>
      <form action="api/post/new" method="POST">
        <input name="title" placeholder="글 제목 작성" />
        <input name="content" placeholder="글 내용 작성" />
        <input
          type="file"
          accept="image/*"
          onChange={async (e) => {
            let file = e.target.files[0];
            let filename = encodeURIComponent(file.name); // encoding 된 파일명이 남는다
            let res = await fetch("/api/post/image?file=" + filename); // file.name → filename
            res = await res.json();

            //S3 업로드
            const formData = new FormData();
            Object.entries({ ...res.fields, file }).forEach(([key, value]) => {
              formData.append(key, value);
            });
            let 업로드결과 = await fetch(res.url, {
              method: "POST",
              body: formData,
            });
            setSrc(업로드결과.url + "/" + filename);

            // if (업로드결과.ok) {
            //   setSrc(업로드결과.url + "/" + filename);
            // } else {
            //   console.log("실패");
            // }
          }}
        />
        <button type="submit">저장</button>
      </form>

      {/* <form action="/api/test" method="POST">
        <button type="submit">POST 버튼</button>
      </form>
      <form action="/api/test" method="GET">
        <button type="submit">GET 버튼</button>
      </form> */}
    </div>
  );
}
