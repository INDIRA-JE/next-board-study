export default function handler(요청, 응답) {
  console.log(요청.query);
  // if문으로 - 각각의 기능 구분
  // DB 입출력 코드 작성 - 서버측에서 실행되는 코드들 이기에 작성 가능
  if (요청.method == "POST") {
    // console.log(요청.method);
    응답.status(500).json("[ POST 출력 ] - 유저가 필요한 데이터 전송");
    // console.log(응답.statusCode);
  } else if (요청.method == "GET") {
    // console.log(요청.method);
    응답.status(200).json("[ GET 추가 ] - 새로운 데이터");
    // console.log(응답.statusCode);
  }
}

// test
