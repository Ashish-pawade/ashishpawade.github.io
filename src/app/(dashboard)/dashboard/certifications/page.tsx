import { getCertifications } from "./actions";
import { CertificationTable } from "./components/certification-table";
import { CertificationFormDialog } from "./components/certification-form-dialog";
import { NextExamCountdown } from "./components/next-exam-countdown";
import { Button } from "@/components/ui/button";

export default async function CertificationsPage() {
  const certifications = await getCertifications();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Certifications</h1>
        <CertificationFormDialog
          mode="create"
          trigger={<Button>Add certification</Button>}
        />
      </div>

      <div className="max-w-xs">
        <NextExamCountdown certifications={certifications} />
      </div>

      <CertificationTable certifications={certifications} />
    </div>
  );
}
