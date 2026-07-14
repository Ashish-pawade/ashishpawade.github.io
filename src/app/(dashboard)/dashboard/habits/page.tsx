import { getHabitsWithEntries } from "./actions";
import { HabitList } from "./components/habit-list";
import { HabitFormDialog } from "./components/habit-form-dialog";
import { Button } from "@/components/ui/button";

export default async function HabitsPage() {
  const habits = await getHabitsWithEntries();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Habits</h1>
        <HabitFormDialog trigger={<Button>Add habit</Button>} />
      </div>

      <HabitList habits={habits} />
    </div>
  );
}
