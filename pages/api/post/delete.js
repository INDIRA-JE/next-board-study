export default async function handler(요청, 응답) {
  if (요청.method == "DELETE") {
    console.log(요청.body);
    // const db = (await connectDB).db("forum");
    // let result = await db.collection("post").deleteOne("_id: id값");
    응답.status(200).json("삭제완료");
  }
}
