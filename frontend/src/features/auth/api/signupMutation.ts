import Cookies from "js-cookie";
import { ErrorResponse } from "../types/errorResponse";
import { getSession, Session } from "./session";

export const signupMutation = async (credentials: { username: string; password: string; is_instructor: boolean; }): Promise<Session> => {
  const res = await fetch("http://localhost:8000/_allauth/browser/v1/auth/signup", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": Cookies.get("csrftoken") || "",
    },
    body: JSON.stringify(credentials),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new ErrorResponse("Signup failed", res.status, data.errors);
  }

  return getSession();
};
