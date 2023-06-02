import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function handler(request, response) {
  if (request.method == "POST") {
    console.log(request.body._id);
    // [Object: null prototype] {
    //      _id: '645bb2575888a7fef7d31f7d',
    //      title: '안녕',
    //      content: '반가워'
    // }

    let 바뀐내용 = { title: request.body.title, content: request.body.content };
    const db = (await connectDB).db("forum");
    let result = await db
      .collection("post")
      //   .updateOne({ 어떤document수정할건지 }, { $set: 바꿀내용(title,content) });
      .updateOne({ _id: new ObjectId(request.body._id) }, { $set: 바뀐내용 });

    response.status(200).redirect(302, "/list");
  }
}
