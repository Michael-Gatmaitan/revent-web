"use client";
import React, { useState, useEffect } from "react";

interface IForecastedData {
  item: Item;
  sales: Sale[];
}

const ForecastedData = ({ item, sales }: IForecastedData) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [forecastData, setForecastData] = useState<number[]>();

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
        const labels = generateDateLabels(sales.length, result.forecast.length);
        console.log("Historical data: ", saleHistory);
        console.log("Forecasted data: ", result.forecast);

        console.log("Labels generated: ", labels);
      }
    } catch (err) {
      console.log("Something went wrong: ", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (sales && sales.length > 1) {
      fetchForecast();
    }
  }, [sales]);

  // let saleHistory = sales.map((sale) => sale.quantity);
  // saleHistory = [
  //   ...saleHistory,
  //   ...saleHistory,
  //   ...saleHistory,
  //   ...saleHistory,
  //   ...saleHistory,
  //   ...saleHistory,
  //   ...saleHistory,
  //   ...saleHistory,
  //   ...saleHistory,
  //   ...saleHistory,
  // ];

  // // post requiest for train
  //
  // console.log("TRAIN RESULT: ", trainResult);
  if (isLoading) return <div className="bg-red-500">Loading</div>;

  return <div>Done</div>;
};

export default ForecastedData;
