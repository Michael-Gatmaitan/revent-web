"use client";
import { Bar, BarChart, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// import createApolloClient from "@/lib/apollo-client";
// import { GET_SALE_GRAPH } from "@/lib/gql";
// import { useState, useEffect } from "react";

// const chartConfig = {
//   history: {
//     label: "History",
//     color: "var(--chart-1)",
//   },
//   predicted: {
//     label: "Predicted",
//     color: "var(--chart-2)",
//   },
// } satisfies ChartConfig;

interface ISaleGraph {
  saleGraph: SaleGraph[];
}

// const SaleGraphComponent = ({ sales }: ISaleGraph) => {
// const [chartData, setChartData] = useState<SaleGraph[]>([]);
//
// useEffect(() => {
//   const getSaleGraph = async () => {
//     const client = createApolloClient();
//
//     const saleGraphResult = await client.query({
//       query: GET_SALE_GRAPH,
//     });
//
//     if (saleGraphResult.error) return;
//     console.log("SALE GRPH: ", saleGraphResult.data.saleGraph);
//     setChartData(saleGraphResult.data.saleGraph);
//   };
//
//   getSaleGraph();
// });
//

// const chartData = [
//   { month: "January", desktop: 186 },
//   { month: "February", desktop: 305 },
//   { month: "March", desktop: 237 },
//   { month: "April", desktop: 73 },
//   { month: "May", desktop: 209 },
//   { month: "June", desktop: 214 },
// ];

const chartConfig = {
  // desktop: {
  //   label: "Desktop",
  //   color: "var(--chart-1)",
  // },

  totalRevenue: {
    label: "Revenue",
    color: "var(--chart-1)",
  },
  totalQuantity: {
    label: "Total quantity",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export function SaleGraphComponent({ saleGraph }: ISaleGraph) {
  console.log("SALE GRAPH FROM CHARTS: ", saleGraph);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sale total revenues</CardTitle>
        <CardDescription>Per product</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={saleGraph}
            layout="vertical"
            margin={{
              left: -20,
            }}
          >
            <XAxis type="number" dataKey="totalRevenue" hide />
            <YAxis
              dataKey="itemName"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey="totalRevenue"
              fill="var(--color-totalRevenue)"
              radius={5}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export default SaleGraphComponent;
