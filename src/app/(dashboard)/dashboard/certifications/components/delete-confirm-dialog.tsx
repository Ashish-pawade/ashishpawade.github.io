"use client";

import { cloneElement, isValidElement, useState, type ReactElement } from "react";
import { toast } from "sonner";
import { deleteCertification } from "../actions";
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

export function DeleteConfirmDialog({
  certificationId,
  trigger,
}: {
  certificationId: string;
  trigger: ReactElement<{ onClick?: () => void }>;
}) {
  const [open, setOpen] = useState(false);

  async function handleDelete() {
    try {
      await deleteCertification(certificationId);
      toast.success("Certification deleted");
    } catch {
      toast.error("Something went wrong");
    } finally {
      setOpen(false);
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      {isValidElement(trigger) ? cloneElement(trigger, { onClick: () => setOpen(true) }) : trigger}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete this certification?</AlertDialogTitle>
          <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
