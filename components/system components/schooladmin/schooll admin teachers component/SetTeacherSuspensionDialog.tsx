"use client";

import { useState } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { suspendTeacher } from "@/backend/schooladminteachers";
import { toast } from "react-toastify";
import { DatePicker } from "../../parent/kids page components/DatePicker";
import { Label } from "@/components/ui/label";

type Props = {
  suspensionDialogOpen: boolean;
  setSuspensionDialogOpen: (open: boolean) => void;
  teacherName: string;
  isSuspended: boolean;
  teacherId: string;
};

const SetTeacherSuspensionDialog = ({
  suspensionDialogOpen,
  setSuspensionDialogOpen,
  teacherName,
  isSuspended,
  teacherId,
}: Props) => {
  const [confirmChecked, setConfirmChecked] = useState(false);
  const [suspensionDate, setSuspensionDate] = useState<string>("");

  const queryClient = useQueryClient();

  // ✅ FIXED mutation
  const { mutate, isPending } = useMutation({
    mutationFn: suspendTeacher,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schoolteachers"] });
      toast.success("Teacher suspension updated successfully");
    },

    onError: (error: any) => {
      toast.error(error.message || "Failed to update suspension");
    },

    onSettled: () => {
      setSuspensionDialogOpen(false);
      setConfirmChecked(false);
      setSuspensionDate("");
    },
  });

  // ✅ FIXED handler
  const handleConfirm = () => {
    mutate({
      id: teacherId,
      isSuspended: !isSuspended,
      suspensionDate: suspensionDate,
    });
  };

  return (
    <AlertDialog
      open={suspensionDialogOpen}
      onOpenChange={setSuspensionDialogOpen}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {isSuspended ? "Remove Suspension" : "Suspend Teacher"}
          </AlertDialogTitle>

          <AlertDialogDescription>
            {isSuspended ? (
              <>
                You are about to <b>remove suspension</b> for{" "}
                <b>{teacherName}</b>. This will restore their access.
              </>
            ) : (
              <>
                You are about to <b>suspend</b> <b>{teacherName}</b>. They will
                no longer be able to access the system.
              </>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>

        {/* ✅ Inputs section FIXED */}
        {!isSuspended && (
          <div className="flex flex-col gap-4 mt-4">
            <div className="flex flex-col gap-2">
              <Label>Suspension Date</Label>
              <DatePicker
                value={suspensionDate}
                onChange={(date: string | null) =>
                  setSuspensionDate(date ?? "")
                }
              />
            </div>
          </div>
        )}

        {/* ✅ Confirmation */}
        <div className="flex items-center gap-2 mt-4">
          <Checkbox
            checked={confirmChecked}
            onCheckedChange={(val) => setConfirmChecked(!!val)}
          />
          <span className="text-sm text-gray-600">
            I understand this action
          </span>
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>

          <button
            disabled={!confirmChecked || isPending}
            onClick={handleConfirm}
            className={`px-4 py-2 rounded text-white transition
              ${
                isSuspended
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-red-600 hover:bg-red-700"
              }
              disabled:opacity-50
            `}
          >
            {isPending
              ? "Processing..."
              : isSuspended
                ? "Remove Suspension"
                : "Suspend"}
          </button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default SetTeacherSuspensionDialog;
