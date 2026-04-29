"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "@/backend/auth";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";

const LoginForm = () => {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // dialog state
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<"success" | "error" | null>(null);
  const [message, setMessage] = useState("");

  const { mutate: loginMutate, isPending: loginPending } = useMutation({
    mutationFn: () => loginUser(username, password),

    onSuccess: (data: any) => {
      setStatus("success");
      setMessage(
        `Welcome ${data?.user?.firstname || ""} ${
          data?.user?.lastname || ""
        } 🎉`,
      );
      setOpen(true);
    },

    onError: (error: any) => {
      setStatus("error");
      setMessage(error.message || "Login failed");
      setOpen(true);
    },
  });

  const handleClose = () => {
    setOpen(false);

    if (status === "success") {
      router.push("/dashboard");
    }
  };

  return (
    <>
      <div className="flex flex-col gap-4 w-80">
        <div>
          <Label>Username</Label>
          <Input
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={loginPending}
          />
        </div>

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

        <Button
          onClick={() => loginMutate()}
          disabled={loginPending}
          className="w-full"
        >
          {loginPending ? "Logging in..." : "Login"}
        </Button>
      </div>

      {/* ✅ ALERT DIALOG */}
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent
          className={
            status === "error"
              ? "bg-red-100 border-red-400"
              : "bg-green-100 border-green-400"
          }
        >
          <AlertDialogHeader>
            <AlertDialogTitle>
              {status === "success" ? "Login Successful 🎉" : "Login Failed"}
            </AlertDialogTitle>

            <AlertDialogDescription>{message}</AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <Button
              onClick={handleClose}
              className={
                status === "error"
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-green-600 hover:bg-green-700"
              }
            >
              {status === "success" ? "Continue" : "Try Again"}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default LoginForm;
