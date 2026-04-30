"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { logoutUser } from "@/backend/auth";
import { Button } from "@/components/ui/button";
import { LuLogOut } from "react-icons/lu";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { is } from "date-fns/locale";

const LogoutAlertDialog = ({ isOpen }: { isOpen: boolean }) => {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  const handleLogout = async () => {
    try {
      setIsPending(true);

      await logoutUser();

      router.push("/");
    } catch (err: any) {
      alert(err.message);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {isOpen ? (
          <Button
            variant="outline"
            className="w-full justify-start"
            disabled={isPending}
            onClick={() => {}}
          >
            <LuLogOut className="mr-2" />
            Logout
          </Button>
        ) : (
          <Button
            variant="outline"
            className="w-10 h-10"
            disabled={isPending}
            onClick={() => {}}
          >
            <LuLogOut className="w-5 h-5" />
          </Button>
        )}
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-red-600">
            Logout Confirmation
          </AlertDialogTitle>

          <AlertDialogDescription>
            You are about to logout of your account.
            <br />
            This action <b>cannot be undone</b> and will end your session.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>

          <AlertDialogAction
            onClick={handleLogout}
            disabled={isPending}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            {isPending ? "Logging out..." : "Logout"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default LogoutAlertDialog;
