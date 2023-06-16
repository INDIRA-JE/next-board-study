import { connectDB } from "@/util/database";

export default async function join(request, response) {
  // request 값 확인
  // console.log("### request.method\n", request.method);
  // console.log("### request.body\n", request.body);
  // console.log("### 1. request.body.id\n", request.body.id);
  // console.log("### 1. request.body.pw\n", request.body.pw);

  // 변수 설정
  const db = (await connectDB).db("forum");
  const findId = await db.collection("account").findOne();
  const id = request.body.id;
  const pw = request.body.pw;
  // console.log("### 2. Id\n", id);
  // console.log("### 2-1. pw\n", pw);
  // console.log("### 3. findId\n", findId);

  // 구분
  if (id === findId.id) {
    return response.status(500).json("아이디 중복~!");
  } else if (id == "") {
    return response.status(500).json("아이디 입력 하자~!");
  } else if (pw == "") {
    return response.status(500).json("비번 입력 하자~!");
  }

  // DB에 보관 기능
  let result = await db.collection("account").insertOne(request.body);

  // 회원가입 성공시 -> 로그인 화면으로
  return response.status(200).redirect(302, "/login");
}

/*
  1. 유저가 아이디 비번을 서버로 보내면 
    request
  2. 서버는 유저 아이디를 db에서 findOne() 합니다
    DB에서 유저 아이디를 findOne()
  3. 결과가 있으면 /실패 페이지 보여주기 
      DB에 id가 있으면 -> 실패 페이지
  4. 결과가 없으면 db에 아이디와 비번을 저장해주기
      DB에 id가 없으면 -> id, pw 저장해주기
    4-1. 회원가입 완료시 -> login 화면으로 이동
*/
