"use client";

import Button from "../ui/button";
import Checkbox from "../ui/checkbox";

export default function RegisterForm() {
  return (
    <form className="flex flex-col">
      <div className="mb-[40px]">
        <div className="grid gap-[25px] mb-[20px]">
          <input type="email" placeholder="email*" />
          <input type="password" placeholder="password*" />
          <input type="password" placeholder="confirm password*" />
        </div>
        <label className="flex gap-[10px] cursor-pointer">
          <Checkbox />
          <span className="text-sm">
            I agree to the terms of personal data processing
          </span>
        </label>
      </div>
      <div className="flex gap-[25px]">
        <Button variant="secondary" type="button">
          Login
        </Button>
        <Button variant="primary" type="submit">
          Registration
        </Button>
      </div>
    </form>
  );
}
