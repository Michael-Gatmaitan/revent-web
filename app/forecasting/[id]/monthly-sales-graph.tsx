"use client";
import createApolloClient from "@/lib/apollo-client";
import { GET_MONTHLY_SALES_BY_ITEM_NUMBER } from "@/lib/gql";
import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

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

const MonthlySalesGraph = ({ itemNumber }: { itemNumber: string }) => {
  const [monthlySale, setMonthlySale] = useState<MonthlySales[]>([]);
  console.log(itemNumber);

  useEffect(() => {
    console.log("ITEM NUMBER: ", itemNumber);
    const getMonthlySales = async () => {
      const client = createApolloClient();
      const monthlySalesByItemNumberResult = await client.query({
        query: GET_MONTHLY_SALES_BY_ITEM_NUMBER,
        variables: {
          itemNumber: itemNumber.toString(),
        },
      });

      if (monthlySalesByItemNumberResult.error) {
        console.log(
          "Error in getting monthlySaleByItemNumber: ",
          monthlySalesByItemNumberResult.error.message,
        );
      }

      const {
        monthlySaleByItemNumber,
      }: { monthlySaleByItemNumber: MonthlySales[] } =
        monthlySalesByItemNumberResult.data;
      setMonthlySale(monthlySaleByItemNumber);
    };

    getMonthlySales();
  }, [itemNumber]);

  return <Graph monthlySale={monthlySale} />;
};

export default MonthlySalesGraph;

const chartConfig = {
  sale: {
    label: "Sale",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

const Graph = ({ monthlySale }: { monthlySale: MonthlySales[] }) => {
  return (
    <Card className="mt-2">
      <CardHeader>
        <CardTitle>Revenue for each month</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={monthlySale}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="sale" fill="var(--color-sale)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
