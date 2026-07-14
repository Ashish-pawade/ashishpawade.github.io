import { differenceInCalendarDays } from "date-fns";
import { Badge } from "@/components/ui/badge";

const EXPIRING_SOON_THRESHOLD_DAYS = 60;

export function ExpiringSoonBadge({ expiryDate }: { expiryDate: Date | null }) {
  if (!expiryDate) return null;

  const days = differenceInCalendarDays(new Date(expiryDate), new Date());
  if (days < 0 || days > EXPIRING_SOON_THRESHOLD_DAYS) return null;

  return (
    <Badge variant="secondary" className="bg-orange-500/10 text-orange-600 dark:text-orange-400">
      Expiring in {days}d
    </Badge>
  );
}
