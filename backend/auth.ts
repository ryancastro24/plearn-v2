export const loginUser = async (username: string, password: string) => {
  const response = await fetch("http://localhost:5000/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // send cookies
    body: JSON.stringify({ username, password }),
  });

  // ✅ parse response body first
  const data = await response.json();

  if (!response.ok) {
    // ✅ create custom error and attach backend data
    const err: any = new Error(data.error || "Login failedss");
    err.status = response.status;

    console.log(err);
    throw err;
  }

  return data;
};

export async function logoutUser() {
  try {
    const res = await fetch(`http://localhost:5000/api/auth/logout`, {
      method: "POST", // or "GET" depending on your route
      credentials: "include", // 🔥 VERY IMPORTANT (sends cookie)
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Logout failed");
    }

    // ✅ Optional: clear client-side state
    // e.g. localStorage, Zustand, Redux, React Query cache
    // localStorage.removeItem("user");

    return data;
  } catch (error: any) {
    console.error("Logout error:", error.message);
    throw error;
  }
}
