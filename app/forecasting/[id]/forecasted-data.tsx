"use client";
import React, { useState, useEffect } from "react";
import { ForecastGraph } from "./forecast-graph";
import ForecastReport from "./forecast-report";
import { Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface IForecastedData {
  item: Item;
  sales: Sale[];
}

export type ITrendAnalysis = {
  overallChange: number;
  immediateChange: number;
  forecastTrend: number;
} | null;

const ForecastedData = ({ item, sales }: IForecastedData) => {
  const [duration, setDuration] = useState<
    "1 week" | "1 month" | "2 months" | "3 months"
  >("1 week");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [saleHistory, setSaleHistory] = useState<number[]>();
  const [forecastedData, setForecastedData] = useState<number[]>();
  const [chartLabels, setChartLabels] = useState<string[]>();
  const [trendAnalysis, setTrendAnalysis] = useState<ITrendAnalysis>(null);
  const [restockStatus, setRestockStatus] = useState({
    need: false,
    quantity: 0,
  });

  const generateDateLabels = (
    historicalLength: number,
    forecastLength: number,
  ) => {
    const today = new Date();
    const labels = [];

    // Historical dates (past)
    for (let i = historicalLength - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(today.getDate() - i);
      labels.push(
        date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      );
    }

    // Forecast dates (future)
    for (let i = 1; i <= forecastLength; i++) {
      const date = new Date();
      date.setDate(today.getDate() + i);
      labels.push(
        date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      );
    }

    return labels;
  };

  const fetchForecast = async () => {
    console.log("Generating forecast for ", item.itemName);
    try {
      setIsLoading(true);

      // TODO: Call api from :5000/predict
      // TODO: body should be: {
      // itemNumber: number | string,
      // duration: "7days", "1 months", "2 months" "3 months"
      // }
      //
      // returns {
      //  predictedQuantities: number[]
      //  durationRequested: "1 month" ...
      //  numOfDays: number
      // }

      const req = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          itemNumber: item.itemNumber,
          duration: duration,
        }),
      });

      const predictResult: {
        saleHistory: number[];
        durationRequested: string;
        numOfDays: number;
        predictedQuantities: number[];
      } = await req.json();

      const { saleHistory, durationRequested, numOfDays, predictedQuantities } =
        predictResult;

      console.log("Some results: ", {
        durationRequested,
        numOfDays,
        predictedQuantities,
      });

      if (predictResult.predictedQuantities) {
        const forecast = predictResult.predictedQuantities;
        const labels = generateDateLabels(sales.length, forecast.length);
        const trends = calculateTrendPercentage(saleHistory, forecast);

        setSaleHistory(saleHistory);
        setForecastedData(forecast);
        setChartLabels(labels);
        setTrendAnalysis(trends);

        console.log("Historical data: ", saleHistory);
        console.log("Forecasted data: ", forecast);
        console.log("Labels generated: ", labels);
        console.log("Trends: ", trends);
      }
    } catch (err) {
      setError("Training model gives error");
      console.log("Something went wrong: ", err);
    } finally {
      setIsLoading(false);
    }
  };

  const calculateTrendPercentage = (
    historicalData: number[],
    forecastData: number[],
  ) => {
    if (
      !historicalData ||
      !forecastData ||
      historicalData.length === 0 ||
      forecastData.length === 0
    ) {
      return null;
    }
    const recentHistoricalPeriods = Math.min(
      forecastData.length,
      historicalData.length,
    );

    console.log(
      "Gostorical and forecasted data in calculateTrendPercentage: ",
      historicalData,
      forecastData,
    );

    const recentHistorical = historicalData.slice(-recentHistoricalPeriods);

    const avgHistorical =
      recentHistorical.reduce((sum, val) => sum + val, 0) /
      recentHistoricalPeriods;

    // Calculate average of forecast data
    const avgForecast =
      forecastData.reduce((sum, val) => sum + val, 0) / forecastData.length;

    // Final OverAll
    const percentageChange =
      ((avgForecast - avgHistorical) / avgHistorical) * 100;

    // Calculate day-to-day trend (first forecast day vs last historical day)
    const lastHistoricalValue = historicalData[historicalData.length - 1];
    const firstForecastValue = forecastData[0];

    // Final Immediate
    const immediateChange =
      ((firstForecastValue - lastHistoricalValue) / lastHistoricalValue) * 100;

    // Calculate end-to-end forecast trend (last forecast day vs first forecast day)
    const lastForecastValue = forecastData[forecastData.length - 1];
    const forecastTrend =
      ((lastForecastValue - firstForecastValue) / firstForecastValue) * 100;

    const totalQuantityOfForecast = forecastData.reduce((sum, val) =>
      Math.round(sum + val),
    );
    console.log("Quantity of forecast: ", totalQuantityOfForecast);
    console.log("Stock of item: ", item.stock);

    if (item.stock < totalQuantityOfForecast) {
      setRestockStatus({
        need: true,
        quantity: Math.abs(totalQuantityOfForecast - Math.abs(item.stock)),
      });
    }

    return {
      overallChange: percentageChange, // Past vs Future
      immediateChange: immediateChange, // Last historical day vs first forecast
      forecastTrend: forecastTrend, // Forecast trajectory

      // forecastTrend:
      // The first forecasted data point
      // Against the last forecasted data point
      // Shows if the forecast itself is trending up or down over time
    };
  };

  useEffect(() => {
    if (sales && sales.length > 1) {
      fetchForecast();
      console.log("Horizon changed: ", duration);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sales, duration]);

  if (isLoading) return <Loading />;

  if (error) return <div className="text-destructive">{error}</div>;

  if (!saleHistory || !forecastedData || !chartLabels) {
    console.log(saleHistory, forecastedData, chartLabels);
    return (
      <div className="mt-4 text-destructive text-center">
        {/* Either of params cannot be undefined it is because sales length is not */}
        {/* enough: {sales.length} */}
        The item cannot be forecasted due to its history sale is not enough for
        training the model.
      </div>
    );
  }

  return (
    <div className="mt-5 grid lg:flex gap-2">
      <div className="lg:grow">
        <div className="flex justify-between">
          <div className="text-2xl font-bold mb-2">Forecast graph</div>

          <Select
            // value={duration}
            // defaultValue={duration}
            onValueChange={(val: typeof duration) => setDuration(val)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select duration" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Duration</SelectLabel>
                <SelectItem value="1 week">1 week</SelectItem>
                <SelectItem value="1 month">30 Days</SelectItem>
                <SelectItem value="2 months">60 days</SelectItem>
                <SelectItem value="3 months">90 days</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <ForecastGraph
          saleHistory={saleHistory}
          forecastedData={forecastedData}
          labels={chartLabels}
          trendAnalysis={trendAnalysis}
          duration={duration}
        />

        <div className="w-full mt-2 grid lg:flex gap-2">
          <div className="bg-secondary rounded-sm grow p-2">
            Longer history sale can have better future predictions.
          </div>
          <div className="bg-secondary rounded-sm grow p-2">
            More days to predict can lead to less accurate results.
          </div>
        </div>
      </div>

      <ForecastReport
        restockStatus={restockStatus}
        trendAnalysis={trendAnalysis}
        duration={duration}
        itemNumber={item.itemNumber}
      />
    </div>
  );
};

const Loading = () => {
  return (
    <div className="flex w-full h-[300px] mt-2 justify-center items-center">
      <div className="flex flex-col gap-1 justify-center h-min items-center content-center">
        <Loader2 className="animate-spin" />
        Forecasting item...
      </div>
    </div>
  );
};

export default ForecastedData;
