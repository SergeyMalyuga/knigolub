import jwt from "jsonwebtoken";

const JWT_SECRET: string = process.env.JWT_SECRET as string;

if (!JWT_SECRET) {
  throw new Error("❌ FATAL: JWT_SECRET не задан в .env файле!");
}

export function generateToken(payload: {
  id: string;
  email: string;
}): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}
