"use client";
import React, { useState, useEffect } from "react";
import { ForecastGraph } from "./forecast-graph";

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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [saleHistory, setSaleHistory] = useState<number[]>();
  const [forecastedData, setForecastedData] = useState<number[]>();
  const [chartLabels, setChartLabels] = useState<string[]>();
  const [trendAnalysis, setTrendAnalysis] = useState<ITrendAnalysis>(null);

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
      const saleHistory = sales.map((sale) => sale.quantity);

      // const reqTrain = await fetch("http://localhost:3000/api/forecast/train", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     timeSeriesData: saleHistory,
      //   }),
      // });
      //
      // const trainResult = await reqTrain.json();
      // console.log("Train result: ", trainResult);

      // const lookbackWindow = 30;
      // const recentData = sales.slice(-lookbackWindow);

      // POST request for predict
      const req = await fetch("http://localhost:3000/api/forecast/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          recentData: saleHistory,
          // recentData,
          options: {
            forecastHorizon: 7,
          },
        }),
      });

      const result = await req.json();

      if (result.forecast) {
        const forecast = result.forecast;
        const labels = generateDateLabels(sales.length, result.forecast.length);
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
    }
  }, [sales]);

  if (isLoading) return <div className="bg-red-500">Loading</div>;

  if (error) return <div className="text-destructive">{error}</div>;

  if (!saleHistory || !forecastedData || !chartLabels) {
    console.log(saleHistory, forecastedData, chartLabels);
    return (
      <div>
        Either of params cannot be undefined it is because sales length is not
        enough: {sales.length}
      </div>
    );
  }

  return (
    <div className="mt-3">
      <ForecastGraph
        saleHistory={saleHistory}
        forecastedData={forecastedData}
        labels={chartLabels}
        trendAnalysis={trendAnalysis}
      />

      {/* <div className="mt-2"> */}
      {/*   Overall Forecast vs Recent History:{" "} */}
      {/*   {trendAnalysis!.overallChange.toFixed(2)} */}
      {/*   Immediate Change (Next Day): {trendAnalysis!.immediateChange} */}
      {/*   Forecast Trajectory (Week End vs Start): {trendAnalysis!.forecastTrend} */}
      {/* </div> */}
    </div>
  );
};

export default ForecastedData;
