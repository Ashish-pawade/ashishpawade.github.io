import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(
    value
  );
}

export function MonthlySummaryCards({
  income,
  expense,
  savings,
  savingsRate,
}: {
  income: number;
  expense: number;
  savings: number;
  savingsRate: number;
}) {
  const cards = [
    { label: "Income", value: formatCurrency(income) },
    { label: "Expense", value: formatCurrency(expense) },
    { label: "Savings", value: formatCurrency(savings) },
    { label: "Savings rate", value: `${savingsRate.toFixed(1)}%` },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {cards.map((c) => (
        <Card key={c.label}>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-normal text-muted-foreground">
              {c.label}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-semibold">{c.value}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
