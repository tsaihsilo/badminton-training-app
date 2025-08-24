import Cookies from "js-cookie";

export const logoutMutation = async () => {
  const res = await fetch("http://localhost:8000/_allauth/browser/v1/auth/session",
    {
      method: "DELETE",
      credentials: "include",
      headers: { 
        "X-CSRFToken": Cookies.get("csrftoken") || ""
      }
    }
  )
  
  if (res.status === 401 || res.status === 410) return;

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || "Logout Failed")
  }
}