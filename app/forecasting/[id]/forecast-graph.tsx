"use client";
import { CartesianGrid, LabelList, Line, LineChart, XAxis } from "recharts";
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
import { useState, useEffect } from "react";
import { type ITrendAnalysis } from "./forecasted-data";

const chartConfig = {
  history: {
    label: "History",
    color: "var(--chart-1)",
  },
  predicted: {
    label: "Predicted",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

interface IForecastedGraph {
  saleHistory: number[];
  forecastedData: number[];
  labels: string[];
  trendAnalysis: ITrendAnalysis;
}

interface ISaleData {
  day: string;
  history: number | null;
  predicted: number | null;
}

export function ForecastGraph({
  saleHistory,
  forecastedData,
  labels,
  trendAnalysis,
}: IForecastedGraph) {
  const [chartData, setChartData] = useState<ISaleData[]>([]);

  useEffect(() => {
    console.log(saleHistory, forecastedData);

    // const combinedData = [...salesHistory]
    const saleHistoryChartData: ISaleData[] = saleHistory.map((data, i) => {
      return { day: labels[i], history: data, predicted: null };
    });

    const forecastedDataChartData: ISaleData[] = forecastedData.map(
      (data, i) => {
        return {
          day: labels[saleHistoryChartData.length + i],
          predicted: Math.floor(data),
          history: null,
        };
      },
    );

    const combinedData = [...saleHistoryChartData, ...forecastedDataChartData];
    setChartData(combinedData);
  }, [saleHistory, forecastedData, labels]);

  useEffect(() => {
    console.log("CHART DATA: ", chartData);
  }, [chartData]);

  if (!trendAnalysis) return <div>No trends calculated</div>;

  const { overallChange, immediateChange, forecastTrend } = trendAnalysis;
  console.log(overallChange, immediateChange, forecastTrend);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Product forecast</CardTitle>
        {/* <CardTitle>{chartData.length}</CardTitle> */}
        <CardDescription>
          {labels[0]} - {labels[labels.length - 1]}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              // tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              // content={<ChartTooltipContent hideLabel />}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Line
              dataKey="history"
              type="natural"
              stroke="var(--color-history)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-history)",
              }}
              activeDot={{
                r: 6,
              }}
            >
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Line>

            <Line
              dataKey="predicted"
              type="natural"
              stroke="var(--color-predicted)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Showing forecasted sale in 7 days
        </div>
      </CardFooter>
    </Card>
  );
}
