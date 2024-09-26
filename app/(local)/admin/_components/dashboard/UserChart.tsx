"use client";

import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A simple area chart";

interface UserChartProps {
  data: { label: string; value: number }[];
}

const chartConfig = {
  user: {
    label: "User",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export default function UserChart({ data }: UserChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>User Trending Chart</CardTitle>
        <CardDescription>Showing the number of users</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              top: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <ChartTooltip
              content={<ChartTooltipContent indicator="line" />}
              cursor={false}
            />
            <XAxis dataKey="label" />
            <Area
              dataKey="value"
              fill="var(--color-user)"
              fillOpacity={0.4}
              stroke="var(--color-user)"
              type="natural"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by {data[5].value - data[4].value} users
              <TrendingUp className="size-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              {data[0].label} - {data[5].label} 2024
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
