import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function handler(request, response) {
  if (request.method == "POST") {
    console.log(request.body);

    let 바꿀내용 = { title: request.body.title, content: request.body.content };
    const db = (await connectDB).db("forum");
    let result = await db
      .collection("post")
      .updateOne({ _id: new ObjectId(request.body._id) }, { $set: 바꿀내용 });
    response.status(200).redirect(302, "/list");
  }
}
