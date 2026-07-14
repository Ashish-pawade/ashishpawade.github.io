"use client";

import { useOptimistic, useTransition } from "react";
import { toggleTodayEntry } from "../actions";
import { Button } from "@/components/ui/button";

export function TodayToggleButton({
  habitId,
  doneToday,
}: {
  habitId: string;
  doneToday: boolean;
}) {
  const [optimisticDone, setOptimisticDone] = useOptimistic(doneToday);
  const [isPending, startTransition] = useTransition();

  function handleClick() {
    startTransition(async () => {
      setOptimisticDone(!optimisticDone);
      await toggleTodayEntry(habitId);
    });
  }

  return (
    <Button
      size="sm"
      variant={optimisticDone ? "default" : "outline"}
      onClick={handleClick}
      disabled={isPending}
    >
      {optimisticDone ? "Done today" : "Mark done"}
    </Button>
  );
}
