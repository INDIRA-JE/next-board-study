import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(request) {
  /** 기능들
  console.log("✔️ nextUrl\n\t", request.nextUrl);
  console.log("✔️ cookies\n\t", request.cookies);
  console.log("✔️ headers\n\t", request.headers);
  console.log("✔️ request.headers\n\t", request.headers.get("user-agent"));
  // middleware 기능 마지막엔 이거 써줘야 함
  NextResponse.next(); // 통과시킴
  NextResponse.redirect(); // 다른페이지로 강제이동
  NextResponse.rewrite(); // 다른 페이지로 강제이동(주소창은 그대로)
  */
  /** 이론
  // 2. 로그인 안된 유저는 /write 페이지 접속 못하게 막자 = 로그인 페이지로 이동
  // 2. 변수 선언
  const session = await getToken({ req: request });
  console.log(session); // null = 로그아웃 상태
  // 로그아웃 상태 -> /write 로 접속시 -> signin 페이지로 강제 이동
  if (request.nextUrl.pathname.startsWith("/write")) {
    if (session == null) {
      return NextResponse.redirect(
        new URL("http://localhost:3000/api/auth/signin"),
        request.url
      );
    }
  }

  // 1. /list 페이지 접속기록 몰래 저장하기
  // if (request.nextUrl.pathname === "/list") {
  // startsWith : /list로 시작하는 모든 URL도 검사 가능
  if (request.nextUrl.pathname.startsWith("/list")) {
    console.log(new Date());
    console.log(request.headers.get("sec-ch-ua-platform"));
    return NextResponse.next();
  }
  
  // 3. 특정페이지 접속시 쿠키를 만들어보자
  request.cookies.get("쿠키이름"); //출력
  request.cookies.has("쿠키이름"); //존재확인
  request.cookies.delete("쿠키이름"); //삭제
  
  const response = NextResponse.next();
  response.cookies.set({
      name: "mode",
      value: "dark",
      maxAge: 3600,
      httpOnly: true,
    });
    return response; // 쿠키 생성
    */
  // Q. 실습 - 유저가 /register 페이지 방문시 visited=true 라는 쿠키를 생성해주려면 ?
  if (request.nextUrl.pathname.startsWith("/register")) {
    if (request.cookies.has("visited") == false) {
      const response = NextResponse.next();
      response.cookies.set({
        name: "visited",
        value: "true",
        maxAge: 3600,
      });
      return response;
    }
    return NextResponse.next();
  }
}
