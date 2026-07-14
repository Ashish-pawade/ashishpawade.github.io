import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExpenseFormDialog } from "./expense-form-dialog";
import { DeleteConfirmDialog } from "./delete-confirm-dialog";
import type { ExpenseRow } from "../schema";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function ExpenseTable({ expenses }: { expenses: ExpenseRow[] }) {
  if (expenses.length === 0) {
    return (
      <div className="rounded-md border p-8 text-center text-sm text-muted-foreground">
        No transactions match your filters.
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Payee</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Type</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead className="w-24" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {expenses.map((e) => (
            <TableRow key={e.id}>
              <TableCell className="whitespace-nowrap">
                {new Date(e.date).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </TableCell>
              <TableCell>{e.payee}</TableCell>
              <TableCell>{e.category}</TableCell>
              <TableCell>
                <Badge variant={e.type === "INCOME" ? "default" : "secondary"}>{e.type}</Badge>
              </TableCell>
              <TableCell className="text-right font-medium">
                {formatCurrency(e.amount)}
              </TableCell>
              <TableCell>
                <div className="flex justify-end gap-1">
                  <ExpenseFormDialog
                    mode="edit"
                    expense={e}
                    trigger={
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                    }
                  />
                  <DeleteConfirmDialog
                    expenseId={e.id}
                    trigger={
                      <Button variant="ghost" size="sm">
                        Delete
                      </Button>
                    }
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
