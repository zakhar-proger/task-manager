import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 400 });
  }

  const accessToken = jwt.sign(
    { userId: user.id },
    process.env.JWT_ACCESS_SECRET!,
    { expiresIn: "15m" }
  );

  const refreshToken = jwt.sign(
    { userId: user.id },
    process.env.JWT_REFRESH_SECRET!,
    { expiresIn: "7d" }
  );

  await prisma.user.update({ where: { id: user.id }, data: { refreshToken } });

  const response = NextResponse.json({
    accessToken,
    status: 201,
  });

  response.cookies.set("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7,
    sameSite: "strict",
  });

  return response;
}
