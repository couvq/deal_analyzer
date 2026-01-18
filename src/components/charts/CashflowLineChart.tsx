"use client";

import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { useCashFlowLineChart } from "@/hooks";
import type { Control } from "react-hook-form";
import type { FormValues } from "@/types/shared";

const chartConfig = {
  cashflow: {
    label: "Cash flow",
    color: "var(--chart-1)",
  },
  income: {
    label: "Income",
    color: "var(--chart-2)",
  },
  expenses: {
    label: "Expenses",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig;

interface CashflowLineChartProps {
  control: Control<FormValues, any, FormValues>;
}

const CashflowLineChart = ({ control }: CashflowLineChartProps) => {
  const cashflowLineChartData = useCashFlowLineChart(control);
  const chartDataWithLabel = cashflowLineChartData.map((data, index) => ({
    year: `Year ${index + 1}`,
    cashflow: data.cashFlow,
    income: data.income,
    expenses: data.expenses,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cash flow over time</CardTitle>
        <CardDescription>
          Year 1 - Year {cashflowLineChartData.length}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartDataWithLabel}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="year"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="cashflow"
              type="monotone"
              stroke="var(--color-cashflow)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="income"
              type="monotone"
              stroke="var(--color-income)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="expenses"
              type="monotone"
              stroke="var(--color-expenses)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
          {/** TODO: show how long it takes to be cash flow positive and gains over time */}
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 leading-none font-medium">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="text-muted-foreground flex items-center gap-2 leading-none">
              Showing total visitors for the last 6 months
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CashflowLineChart;
