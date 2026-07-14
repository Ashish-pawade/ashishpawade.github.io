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
import { CertificationFormDialog } from "./certification-form-dialog";
import { DeleteConfirmDialog } from "./delete-confirm-dialog";
import { ExpiringSoonBadge } from "./expiring-soon-badge";
import type { CertificationRow } from "../schema";

const STATUS_LABEL: Record<CertificationRow["status"], string> = {
  PREPARING: "Preparing",
  PLANNED: "Planned",
  COMPLETED: "Completed",
  RENEW: "Renew",
};

function formatDate(date: Date | null) {
  if (!date) return "—";
  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function CertificationTable({
  certifications,
}: {
  certifications: CertificationRow[];
}) {
  if (certifications.length === 0) {
    return (
      <div className="rounded-md border p-8 text-center text-sm text-muted-foreground">
        No certifications yet.
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Exam date</TableHead>
            <TableHead>Expiry date</TableHead>
            <TableHead>Score</TableHead>
            <TableHead className="w-24" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {certifications.map((c) => (
            <TableRow key={c.id}>
              <TableCell>
                <div className="font-medium">{c.name}</div>
                {c.certificateUrl && (
                  <a
                    href={c.certificateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-600 hover:underline dark:text-blue-400"
                  >
                    View certificate
                  </a>
                )}
              </TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1.5">
                  <Badge variant="secondary">{STATUS_LABEL[c.status]}</Badge>
                  <ExpiringSoonBadge expiryDate={c.expiryDate} />
                </div>
              </TableCell>
              <TableCell className="whitespace-nowrap">{formatDate(c.examDate)}</TableCell>
              <TableCell className="whitespace-nowrap">{formatDate(c.expiryDate)}</TableCell>
              <TableCell>{c.score ?? "—"}</TableCell>
              <TableCell>
                <div className="flex justify-end gap-1">
                  <CertificationFormDialog
                    mode="edit"
                    certification={c}
                    trigger={
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                    }
                  />
                  <DeleteConfirmDialog
                    certificationId={c.id}
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
