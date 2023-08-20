import { connectDB } from "@/util/database";
import bcrypt from "bcrypt";

export default async function handler(요청, 응답) {
  // DB 관련 변수
  let db = (await connectDB).db("forum");
  let findPost = await db.collection("user_cred").find().toArray();

  if (요청.method == "POST") {
    // 이메일 중복 체크
    const emailArray = findPost.map((obj) => obj.email);
    console.log("\n = console emailArray \n", emailArray);

    console.log("\n = console body.email \n", 요청.body.email);
    if (요청.body.name === "" || 요청.body.email === "") {
      return 응답.status(500).json("빈칸에 입력해야 해");
    } else if (emailArray.includes(요청.body.email)) {
      return 응답.status(500).json("Email 중복이야");
    }

    /* 유저의 입력값 체크
        - 유저가 빈칸 / 너무 긴 문자
        - 중복된 이메일 체크
    */
    if (요청.body.password === "") {
      // console.log("\n = console password\n", 요청.body.password);
      return 응답.status(500).json("비밀번호를 입력해야 해");
    } else if (요청.body.password.includes(" ")) {
      // console.log("\n = console includes\n", 요청.body.password);
      return 응답.status(500).json("공백이 있어");
    } else if (요청.body.password.length > 10) {
      // console.log("\n = console length\n", 요청.body.password);
      return 응답.status(500).json("너무 길어~");
    }

    // 암호화
    let hash = await bcrypt.hash(요청.body.password, 10);
    // console.log("\n = console\n", hash); // $2b$10$4fkhpd3DVGBy1u2921qvWuDOXB24osE2pqymBAJGGEgwqVdbUvTLi
    // console.log("\n = console\n", 요청.body); // [Object: null prototype] { name: 'test name', email: 'test email', password: 'test password' }
    // console.log("\n = console\n", 요청.body.password); // test password
    /* 
        요청.body.password = test password
        └ 이렇게 password 가 보여기네 나오기 때문에 암호화 적용이 필요 
    */
    // 암호화 적용
    요청.body.password = hash;
    // console.log("\n = console hash\n", 요청.body.password); // $2b$10$DXgRg.VdfsYWyBcr4od2TO3bu41QB0vehbun.ebrD4Rva.QFLeEja

    // DB 추가(insertOne)
    // let db = (await connectDB).db("forum"); // 위에 변수 선언으로 이동
    // await db.collection("user_cred").insertOne(요청.body);

    // 상태전달
    응답.status(200).json("가입 완료");
  }
}
