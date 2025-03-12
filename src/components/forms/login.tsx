"use client";

import { useRouter } from "next/navigation";
import Button from "../ui/button";

export default function LoginForm() {
  const router = useRouter();

  return (
    <form className="flex flex-col">
      <div className="mb-[40px]">
        <div className="grid gap-[25px] mb-[20px]">
          <input type="email" placeholder="email*" />
          <input type="password" placeholder="password*" />
        </div>
      </div>
      <div className="flex gap-[25px]">
        <Button variant="primary" type="submit">
          Login
        </Button>
        <Button
          variant="secondary"
          type="button"
          onClick={() => router.replace("/register")}
        >
          Registration
        </Button>
      </div>
    </form>
  );
}
