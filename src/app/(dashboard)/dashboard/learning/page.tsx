import { getLearningItems } from "./actions";
import { LearningCardList } from "./components/learning-card-list";
import { LearningFormDialog } from "./components/learning-form-dialog";
import { Button } from "@/components/ui/button";

export default async function LearningPage() {
  const items = await getLearningItems();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Learning</h1>
        <LearningFormDialog mode="create" trigger={<Button>Add item</Button>} />
      </div>

      <LearningCardList items={items} />
    </div>
  );
}
