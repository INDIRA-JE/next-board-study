"use client";

import { signIn } from "next-auth/react";

export default function LogInBtn() {
  console.log("\n### LogInBtn 확인\n");
  return <button onClick={() => signIn()}>로그인</button>;
}
