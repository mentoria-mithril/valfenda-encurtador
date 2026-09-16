import jwt from "jsonwebtoken";
import { ACCESS_SECRET } from "./constants.js";

export function gerarAccessToken(userId: string): string {
  return jwt.sign({ sub: userId }, ACCESS_SECRET, { expiresIn: "1d" });
}
