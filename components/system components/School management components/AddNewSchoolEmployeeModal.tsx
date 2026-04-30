"use client";
import { useQueries, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useParams } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";
import { schoolAdminRegistration } from "@/backend/user";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { LuPlus } from "react-icons/lu";
const AddNewSchoolEmployeeModal = () => {
  const queryClient = useQueryClient();
  const params = useParams<{ id: string }>();
  const schoolid = Array.isArray(params.id) ? params.id[0] : params.id;
  const [openModal, setOpenModal] = useState(false);
  const [alertDialogOpen, setAlertDialogOpen] = useState(false);
  const [missingFields, setMissingFields] = useState<string[]>([]);
  const [registeredUsername, setRegisteredUsername] = useState("");

  const [newUser, setNewUser] = useState({
    email: "",
    username: "",
    password: "",
  });

  const {
    mutate: createUserMutation,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: schoolAdminRegistration,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["schooladmins"] });
      setRegisteredUsername(data.username); // Store the registered username
      setOpenModal(false);
      setNewUser({
        email: "",
        username: "",
        password: "",
      });
      setAlertDialogOpen(true);
    },
    onError: (error: any) => {
      setAlertDialogOpen(true);
      setMissingFields(error.missingFields || []);
    },
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    createUserMutation({
      ...newUser,
      userType: "school_admin",
      schoolId: schoolid,
    });
  };

  return (
    <>
      <Dialog open={openModal} onOpenChange={(open) => setOpenModal(open)}>
        <DialogTrigger asChild>
          <Button
            size="icon"
            className="rounded-full bg-[#507FFF] text-white self-end sm:self-auto"
          >
            <LuPlus />
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-150">
          <DialogHeader>
            <DialogTitle>Create your own account</DialogTitle>
            <DialogDescription>
              Guide and monitor your kids for better growth and development.
              Create an account to get started.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <Label>Email</Label>
              <Input
                placeholder="Enter email"
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
              />
            </div>

            <div className="flex flex-col gap-1">
              <Label>Username</Label>
              <Input
                placeholder="Enter username"
                value={newUser.username}
                onChange={(e) =>
                  setNewUser({ ...newUser, username: e.target.value })
                }
              />
            </div>

            <div className="flex flex-col gap-1">
              <Label>Password</Label>
              <Input
                placeholder="Enter password"
                value={newUser.password}
                onChange={(e) =>
                  setNewUser({ ...newUser, password: e.target.value })
                }
              />
            </div>
          </div>

          <DialogFooter className="flex items-center gap-3">
            <DialogClose asChild>
              <Button variant={"secondary"}>Close</Button>
            </DialogClose>
            <Button
              disabled={isPending}
              onClick={handleSubmit}
              className="text-white bg-[#ff5b5b]"
            >
              {isPending ? (
                <>
                  <Spinner /> Creating...
                </>
              ) : (
                <>Create Account</>
              )}{" "}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={alertDialogOpen}
        onOpenChange={(open) => setAlertDialogOpen(open)}
      >
        <AlertDialogContent className="max-w-150">
          <AlertDialogHeader>
            {isError ? (
              <AlertDialogTitle>
                Error! {(error as Error).message}
              </AlertDialogTitle>
            ) : (
              <AlertDialogTitle>Congratulations!</AlertDialogTitle>
            )}

            {isError ? (
              <AlertDialogDescription>
                {missingFields.length > 0 ? (
                  <div>
                    <ul className="flex items-center justify-center flex-wrap gap-2 mt-2">
                      {missingFields.map((field, index) => (
                        <li
                          key={index}
                          className="px-2 py-1 bg-red-100 text-red-600 rounded-md text-sm"
                        >
                          {field}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <span>{(error as Error).message}</span>
                )}
              </AlertDialogDescription>
            ) : (
              <>
                <AlertDialogDescription>
                  Your account has been created successfully.
                </AlertDialogDescription>

                <AlertDialogDescription>
                  Your username is: {registeredUsername}
                </AlertDialogDescription>
              </>
            )}
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Close</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default AddNewSchoolEmployeeModal;
