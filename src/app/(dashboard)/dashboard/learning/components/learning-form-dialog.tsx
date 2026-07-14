"use client";

import { cloneElement, isValidElement, useState, type ReactElement } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { toast } from "sonner";
import { learningSchema, type LearningFormValues, type LearningRow } from "../schema";
import { createLearning, updateLearning } from "../actions";
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

const PROVIDERS: LearningFormValues["provider"][] = [
  "NPTEL",
  "UDEMY",
  "COURSERA",
  "YOUTUBE",
  "BOOK",
  "OTHER",
];
const STATUSES: LearningFormValues["status"][] = [
  "NOT_STARTED",
  "IN_PROGRESS",
  "COMPLETED",
  "PAUSED",
];

export function LearningFormDialog({
  mode,
  learning,
  trigger,
}: {
  mode: "create" | "edit";
  learning?: LearningRow;
  trigger: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<z.input<typeof learningSchema>, unknown, LearningFormValues>({
    resolver: zodResolver(learningSchema),
    defaultValues: learning
      ? { ...learning, link: learning.link ?? "", notes: learning.notes ?? "" }
      : {
          title: "",
          provider: "OTHER",
          status: "NOT_STARTED",
          progressPercent: 0,
          hoursSpent: 0,
          link: "",
          notes: "",
        },
  });

  async function onSubmit(values: LearningFormValues) {
    try {
      if (mode === "create") {
        await createLearning(values);
        toast.success("Learning item added");
      } else if (learning) {
        await updateLearning(learning.id, values);
        toast.success("Learning item updated");
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
          <DialogTitle>{mode === "create" ? "Add learning item" : "Edit learning item"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="max-h-[70vh] space-y-4 overflow-y-auto">
          <div className="space-y-1.5">
            <Label htmlFor="learn-title">Title</Label>
            <Input id="learn-title" {...register("title")} />
            {errors.title && <p className="text-xs text-destructive">{errors.title.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="learn-provider">Provider</Label>
              <Select
                defaultValue={learning?.provider ?? "OTHER"}
                onValueChange={(v) => setValue("provider", v as LearningFormValues["provider"])}
              >
                <SelectTrigger id="learn-provider" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {PROVIDERS.map((p) => (
                    <SelectItem key={p} value={p}>
                      {p}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="learn-status">Status</Label>
              <Select
                defaultValue={learning?.status ?? "NOT_STARTED"}
                onValueChange={(v) => setValue("status", v as LearningFormValues["status"])}
              >
                <SelectTrigger id="learn-status" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {STATUSES.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s.replace("_", " ")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="learn-progress">Progress %</Label>
              <Input
                id="learn-progress"
                type="number"
                min={0}
                max={100}
                {...register("progressPercent")}
              />
              {errors.progressPercent && (
                <p className="text-xs text-destructive">{errors.progressPercent.message}</p>
              )}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="learn-hours">Hours spent</Label>
              <Input id="learn-hours" type="number" min={0} step="0.5" {...register("hoursSpent")} />
              {errors.hoursSpent && (
                <p className="text-xs text-destructive">{errors.hoursSpent.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="learn-link">Link</Label>
            <Input id="learn-link" {...register("link")} />
            {errors.link && <p className="text-xs text-destructive">{errors.link.message}</p>}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="learn-notes">Notes</Label>
            <Textarea id="learn-notes" {...register("notes")} />
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : mode === "create" ? "Add item" : "Save changes"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
