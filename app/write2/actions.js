"use server";

// 3. 서버 API 생성
export async function handleSubmit(formData) {
  console.log("유저 데이터 \n\t", formData.get("title"));
}
