import axios, { ResponseType } from "axios";
import { parse } from "cookie";

const url = "http://localhost:3030/api";

export type RequestData = Record<string, unknown> | { cookie: string };

export async function request<T extends RequestData = RequestData>(
  path: string,
  method: "POST" | "GET" | "PUT" | "PATCH" | "DELETE" = "GET",
  data?: T,
  responseType: ResponseType = "json",
) {
  const parsedCookie = parse((data?.cookie as string) ?? "")?.["discord-clone"] ?? "";

  return axios(`${url}${path}`, {
    method,
    data,
    withCredentials: true,
    responseType,
    headers: {
      Session: parsedCookie,
    },
  });
}
