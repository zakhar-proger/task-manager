"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Button from "@/components/ui/button";
import Checkbox from "@/components/ui/checkbox";

const schema = z
  .object({
    email: z.string().email("Введите корректный email"),
    password: z.string().min(6, "Пароль должен быть минимум 6 символов"),
    confirmPassword: z.string().min(6, "Пароль должен быть минимум 6 символов"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  });

type RegisterFormValues = z.infer<typeof schema>;

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterFormValues>({ resolver: zodResolver(schema) });
  const router = useRouter();

  const fetchData = (data: RegisterFormValues) => {
    fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: data.email, password: data.password }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  const onSubmit = (data: RegisterFormValues) => {
    console.log("Форма отправлена:", JSON.stringify(data));
    fetchData(data);
    reset();
  };

  return (
    <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-[40px]">
        <div className="grid gap-[25px] mb-[20px]">
          <input {...register("email")} type="email" placeholder="email*" />
          {errors.email && <span>{errors.email.message}</span>}
          <input
            {...register("password")}
            type="password"
            placeholder="password*"
          />
          {errors.password && <span>{errors.password.message}</span>}
          <input
            {...register("confirmPassword")}
            type="password"
            placeholder="confirm password*"
          />
          {errors.confirmPassword && (
            <span>{errors.confirmPassword.message}</span>
          )}
        </div>
        <label className="flex gap-[10px] cursor-pointer">
          <Checkbox />
          <span className="text-[14px]">
            I agree to the terms of personal data processing
          </span>
        </label>
      </div>
      <div className="flex gap-[25px]">
        <Button
          variant="secondary"
          type="button"
          onClick={() => router.replace("/login")}
        >
          Login
        </Button>
        <Button variant="primary" type="submit">
          Registration
        </Button>
      </div>
    </form>
  );
}
