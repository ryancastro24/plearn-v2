"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "@/backend/auth";
const LoginForm = () => {
  const router = useRouter();

  // Login state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { mutate: loginMutate, isPending: loginPending } = useMutation({
    mutationFn: () => loginUser(username, password),
    onSuccess: (data) => {
      console.log("Login successful:", data);
      router.push("/dashboard"); // Redirect to dashboard after successful login
    },
    onError: (error: any) => {
      alert(error.message || "Login failed");
    },
  });

  return (
    <div className="flex flex-col gap-4 w-80">
      <div>
        <div>
          <div>
            <Label>Username</Label>
            <Input
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={loginPending}
            />
          </div>
        </div>

        <div>
          <div>
            <Label>Password</Label>
            <Input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loginPending}
            />
          </div>
        </div>

        <Button
          onClick={() => loginMutate()}
          disabled={loginPending}
          className="w-full"
        >
          {loginPending ? "Logging in..." : "Login"}
        </Button>
      </div>
    </div>
  );
};

export default LoginForm;
