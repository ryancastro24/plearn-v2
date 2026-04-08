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
