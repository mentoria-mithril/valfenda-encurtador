import { Request, Response } from "express";

export function logout(_req: Request, res: Response) {
  res.clearCookie("accessToken");

  return res.json({ ok: true });
}
