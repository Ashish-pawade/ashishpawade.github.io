import { Progress } from "@/components/ui/progress";

export function ProgressBar({ value }: { value: number }) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>Progress</span>
        <span>{value}%</span>
      </div>
      <Progress value={value} />
    </div>
  );
}
