import { UserData } from "../lib/types";

type KidRegistrationData = Omit<
  UserData,
  "email" | "contactNumber" | "profileImage" | "validId"
>;
type UserRegistrationData = Omit<UserData, "characteristics" | "profileImage">;

export const kidRegistration = async (userData: KidRegistrationData) => {
  const response = await fetch("http://localhost:5000/api/users/registerkid", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  // ✅ parse response body FIRST
  const data = await response.json();

  if (!response.ok) {
    // ✅ create custom error and attach backend data
    const err: any = new Error(data.message || "Request failed");
    err.missingFields = data.missingFields;
    err.status = response.status;

    throw err;
  }

  return data;
};

export const userRegisteration = async (userData: UserRegistrationData) => {
  const response = await fetch("http://localhost:5000/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  // ✅ parse response body FIRST
  const data = await response.json();

  if (!response.ok) {
    // ✅ create custom error and attach backend data
    const err: any = new Error(data.message || "Request failed");
    err.missingFields = data.missingFields;
    err.status = response.status;

    throw err;
  }

  return data;
};

// get user personal data after login using jwt token
export const getUserData = async () => {
  const res = await fetch("http://localhost:5000/api/auth/me", {
    credentials: "include",
  });

  if (!res.ok) throw new Error("Not authenticated");

  return res.json();
};

// get user kids data after login using jwt token
export const getUserKidsData = async () => {
  const res = await fetch("http://localhost:5000/api/users/userkids", {
    credentials: "include",
  });

  if (!res.ok) throw new Error("Not authenticated");

  return res.json();
};

// get kidData
export const getKidData = async (id: string) => {
  const res = await fetch(`http://localhost:5000/api/users/kid/${id}`);

  if (!res.ok) throw new Error("Failed to fetch kid data");

  return res.json();
};
