"use client";

import { cloneElement, isValidElement, useState, type ReactElement } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  certificationSchema,
  type CertificationFormValues,
  type CertificationRow,
} from "../schema";
import { createCertification, updateCertification } from "../actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

function toDateInputValue(date: Date | null) {
  if (!date) return "";
  const d = new Date(date);
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
}

export function CertificationFormDialog({
  mode,
  certification,
  trigger,
}: {
  mode: "create" | "edit";
  certification?: CertificationRow;
  trigger: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CertificationFormValues>({
    resolver: zodResolver(certificationSchema),
    defaultValues: certification
      ? {
          name: certification.name,
          status: certification.status,
          examDate: toDateInputValue(certification.examDate),
          expiryDate: toDateInputValue(certification.expiryDate),
          score: certification.score ?? "",
          certificateUrl: certification.certificateUrl ?? "",
          notes: certification.notes ?? "",
        }
      : {
          name: "",
          status: "PLANNED",
          examDate: "",
          expiryDate: "",
          score: "",
          certificateUrl: "",
          notes: "",
        },
  });

  async function onSubmit(values: CertificationFormValues) {
    try {
      if (mode === "create") {
        await createCertification(values);
        toast.success("Certification added");
      } else if (certification) {
        await updateCertification(certification.id, values);
        toast.success("Certification updated");
      }
      setOpen(false);
      reset();
    } catch {
      toast.error("Something went wrong");
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {isValidElement(trigger)
        ? cloneElement(trigger as ReactElement<{ onClick?: () => void }>, {
            onClick: () => setOpen(true),
          })
        : trigger}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Add certification" : "Edit certification"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="max-h-[70vh] space-y-4 overflow-y-auto">
          <div className="space-y-1.5">
            <Label htmlFor="cert-name">Name</Label>
            <Input id="cert-name" {...register("name")} />
            {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="cert-status">Status</Label>
            <Select
              defaultValue={certification?.status ?? "PLANNED"}
              onValueChange={(v) =>
                setValue("status", v as CertificationFormValues["status"])
              }
            >
              <SelectTrigger id="cert-status" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PREPARING">Preparing</SelectItem>
                <SelectItem value="PLANNED">Planned</SelectItem>
                <SelectItem value="COMPLETED">Completed</SelectItem>
                <SelectItem value="RENEW">Renew</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="cert-examDate">Exam date</Label>
              <Input id="cert-examDate" type="date" {...register("examDate")} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="cert-expiryDate">Expiry date</Label>
              <Input id="cert-expiryDate" type="date" {...register("expiryDate")} />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="cert-score">Score</Label>
            <Input id="cert-score" {...register("score")} />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="cert-certificateUrl">Certificate URL</Label>
            <Input id="cert-certificateUrl" {...register("certificateUrl")} />
            {errors.certificateUrl && (
              <p className="text-xs text-destructive">{errors.certificateUrl.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="cert-notes">Notes</Label>
            <Textarea id="cert-notes" {...register("notes")} />
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : mode === "create" ? "Add certification" : "Save changes"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
