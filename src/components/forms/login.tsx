"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../ui/button";

const schema = z.object({
  email: z.string().email("Введите корректный email"),
  password: z.string().min(6, "Пароль должен быть минимум 6 символов"),
});

type LoginFormValues = z.infer<typeof schema>;

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({ resolver: zodResolver(schema) });
  const router = useRouter();

  const fetchData = (data: LoginFormValues) => {
    fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: data.email, password: data.password }),
    })
      .then((res) => res.json())
      .then((data) => localStorage.setItem("accessToken", data.accessToken))
      .catch((error) => console.log(error));
  };

  const onSubmit = (data: LoginFormValues) => {
    console.log("Форма отправлена:", JSON.stringify(data));
    fetchData(data);
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
