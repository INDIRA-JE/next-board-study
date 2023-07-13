"use client";

import Link from "next/link";

export default function ListItem2({ result }) {
  // console.log(result);
  /*
  [
    { _id: '645bb2575888a7fef7d31f7d', title: '안녕1', content: '반가워1' },
    { 
      _id: '645cee323d5c717e29a895ac',
      title: '두번째글1',
      content: '두번째 글내용1'
    }
  ]
  */

  return (
    <div>
      {/* DB(result)에서 찾은 값(Array)를 가져오기 */}
      {result.map((a, i) => (
        <div className="list-item" key={i}>
          <Link href={"/detail/" + result[i]._id}>
            <h3>{result[i].title}</h3>
          </Link>
          <button href={"/edit/" + result[i]._id}>✏️</button>
          <button
            onClick={() => {
              // POST 확인되면 -> 서버([delete_2].js)로 전달
              fetch(
                "/api/delete/[result[i]._id]" +
                  { method: "POST", body: result[i]._id }
              )
                // 서버에서 온 데이터(응답)을 출력
                .then((result) => {
                  return result.json();
                })
                .then((result) => {
                  console.log(result);
                });
            }}
          >
            🗑️
          </button>
        </div>
      ))}
    </div>
  );
}

/**
 {result.map((a, i) => (
   <div className="list-item" key={i}>
     <Link href={"/detail/" + result[i]._id}>
       <h4>{result[i].title}</h4>
     </Link>
     <Link href={"/edit/" + result[i]._id}>✏️</Link>
     <span>🗑️</span>
     <p>1월 1일</p>
   </div>
 ))}

 */
