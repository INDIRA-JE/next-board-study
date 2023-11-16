"use client";

import { signIn } from "next-auth/react";

export default function LogInBtn() {
  return <button onClick={() => signIn()}>로그인</button>;
}
