import { ambiente } from "../env.js";

export const ACCESS_SECRET: string = ambiente.jwtAccessSecret;
export const SALT_ROUNDS: number = 10;
export const DURACAO_UM_DIA: number = 24 * 60 * 60 * 1000;
