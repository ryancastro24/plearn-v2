"use client";

import { useState } from "react";
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
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deactivateTeacher } from "@/backend/schooladminteachers";
import { toast } from "react-toastify";
type Props = {
  accessDialogOpen: boolean;
  setAccessDialogOpen: (open: boolean) => void;
  teacherName: string;
  hasAccess: boolean;
  teacherId: string;
};

const SetTeacherAccessDialog = ({
  accessDialogOpen,
  setAccessDialogOpen,
  teacherName,
  hasAccess,
  teacherId,
}: Props) => {
  const [confirmChecked, setConfirmChecked] = useState(false);
  const [reason, setReason] = useState("");
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: deactivateTeacher,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schoolteachers"] });
      setAccessDialogOpen(false);
      setConfirmChecked(false);
      setReason("");
      toast.success("Teacher access updated successfully");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to update teacher access");
    },
    onSettled: () => {
      setConfirmChecked(false);
      setReason("");
      setAccessDialogOpen(false);
    },
  });

  const handleConfirm = () => {
    mutate({
      id: teacherId,
      isActive: !hasAccess, // toggle
      inactiveReason: !hasAccess ? undefined : reason,
    });
  };

  return (
    <AlertDialog open={accessDialogOpen} onOpenChange={setAccessDialogOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {hasAccess ? "Disable Teacher Access" : "Restore Teacher Access"}
          </AlertDialogTitle>

          <AlertDialogDescription>
            {hasAccess ? (
              <>
                You are about to <b>disable access</b> for <b>{teacherName}</b>.
                <br />
                This means the teacher will no longer be able to log in.
              </>
            ) : (
              <>
                You are about to <b>restore access</b> for <b>{teacherName}</b>.
              </>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>

        {/* ✅ SELECT instead of input */}
        {hasAccess && (
          <div className="mt-2">
            <Select onValueChange={setReason}>
              <SelectTrigger>
                <SelectValue placeholder="Select reason" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="resign">Resign</SelectItem>
                <SelectItem value="expelled">Expelled</SelectItem>
                <SelectItem value="awol">AWOL</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        {/* ✅ Confirmation */}
        <div className="flex items-center gap-2 mt-3">
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

          <AlertDialogAction
            disabled={
              !confirmChecked || isPending || (hasAccess && !reason) // require reason when disabling
            }
            onClick={handleConfirm}
            className={
              hasAccess
                ? "bg-red-600 hover:bg-red-700"
                : "bg-green-600 hover:bg-green-700"
            }
          >
            {isPending
              ? "Processing..."
              : hasAccess
                ? "Disable Access"
                : "Restore Access"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default SetTeacherAccessDialog;
