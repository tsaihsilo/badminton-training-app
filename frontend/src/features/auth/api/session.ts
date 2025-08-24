export type Session = {
  isAuthenticated: boolean,
  isInstructor: boolean,
  user?: { username: string } & Record<string, unknown>;
}

export const getSession = async (): Promise<Session> => {
  const res = await fetch("http://localhost:8000/_allauth/browser/v1/auth/session", {
    method: "GET",
    credentials: "include"
  });

  const data = await res.json();

  if (![200, 401, 410].includes(res.status)) {
    throw new Error(JSON.stringify(data));
  }

  return {
    isAuthenticated: data.meta.is_authenticated,
    isInstructor: data.data.user?.is_instructor,
    user: data.data.user,
  }
}