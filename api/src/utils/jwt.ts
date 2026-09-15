import jwt from "jsonwebtoken";

export const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET!;

export function gerarAccessToken(userId: string) {
  return jwt.sign({ sub: userId }, ACCESS_SECRET, { expiresIn: "1d" });
}
