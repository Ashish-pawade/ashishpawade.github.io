"use client";

import { cloneElement, isValidElement, useState, type ReactElement } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { toast } from "sonner";
import { expenseSchema, type ExpenseFormValues, type ExpenseRow } from "../schema";
import { createExpense, updateExpense } from "../actions";
import { lookupVendorAlias } from "../vendor-alias";
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

function toDateInputValue(date: Date) {
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
}

export function ExpenseFormDialog({
  mode,
  expense,
  trigger,
}: {
  mode: "create" | "edit";
  expense?: ExpenseRow;
  trigger: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<z.input<typeof expenseSchema>, unknown, ExpenseFormValues>({
    resolver: zodResolver(expenseSchema),
    defaultValues: expense
      ? { ...expense, date: toDateInputValue(new Date(expense.date)), note: expense.note ?? "" }
      : {
          date: toDateInputValue(new Date()),
          type: "EXPENSE",
          category: "",
          payee: "",
          amount: 0,
          note: "",
        },
  });

  const payeeField = register("payee");

  async function handlePayeeBlur(e: React.FocusEvent<HTMLInputElement>) {
    await payeeField.onBlur(e);
    const payee = getValues("payee");
    if (!payee || getValues("category")) return;
    const alias = await lookupVendorAlias(payee);
    if (alias) {
      setValue("category", alias.defaultCategory);
    }
  }

  async function onSubmit(values: ExpenseFormValues) {
    try {
      if (mode === "create") {
        await createExpense(values);
        toast.success("Expense added");
      } else if (expense) {
        await updateExpense(expense.id, values);
        toast.success("Expense updated");
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
          <DialogTitle>{mode === "create" ? "Add expense" : "Edit expense"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="date">Date</Label>
              <Input id="date" type="date" {...register("date")} />
              {errors.date && <p className="text-xs text-destructive">{errors.date.message}</p>}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="type">Type</Label>
              <Select
                defaultValue={expense?.type ?? "EXPENSE"}
                onValueChange={(v) => setValue("type", v as "INCOME" | "EXPENSE")}
              >
                <SelectTrigger id="type" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="EXPENSE">Expense</SelectItem>
                  <SelectItem value="INCOME">Income</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="payee">Payee</Label>
            <Input id="payee" {...payeeField} onBlur={handlePayeeBlur} />
            {errors.payee && <p className="text-xs text-destructive">{errors.payee.message}</p>}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="category">Category</Label>
            <Input id="category" {...register("category")} />
            {errors.category && (
              <p className="text-xs text-destructive">{errors.category.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="amount">Amount</Label>
            <Input id="amount" type="number" step="0.01" {...register("amount")} />
            {errors.amount && (
              <p className="text-xs text-destructive">{errors.amount.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="note">Note</Label>
            <Textarea id="note" {...register("note")} />
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : mode === "create" ? "Add expense" : "Save changes"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
