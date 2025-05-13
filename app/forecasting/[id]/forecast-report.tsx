import { ThumbsUp, TrendingDown, TrendingUp } from "lucide-react";
import { ITrendAnalysis } from "./forecasted-data";
import { Button } from "@/components/ui/button";

interface IForecastReport {
  restockStatus: { need: boolean; quantity: number };
  trendAnalysis: ITrendAnalysis;
  duration: string
}

const ForecastReport = ({ restockStatus, trendAnalysis, duration }: IForecastReport) => {
  console.log("RESTOCK STATUS: ", restockStatus);
  if (!trendAnalysis) return <div>Trend analysis is null</div>;

  const { overallChange, immediateChange, forecastTrend } = trendAnalysis;
  console.log(overallChange, immediateChange, forecastTrend);

  return (
    <div className="flex-1/3 gap-2">
      <div className="text-2xl font-bold mb-2">Forecast report</div>
      <div className="grid grid-cols-2 gap-2">
        <div
          className={` rounded-md p-4 flex justify-between flex-col gap-2 ${overallChange > 0 ? "bg-green-500" : "bg-red-500"}`}
        >
          <div className="font-medium">
            Trending {overallChange > 0 ? "up" : "down"} by
          </div>
          <div className="font-bold text-3xl">{overallChange.toFixed(2)}%</div>
          <div className="flex gap-2 leading-none">
            {immediateChange > 0 ? (
              <TrendingUp className="h-4 w-4" />
            ) : (
              <TrendingDown className="h-4 w-4" />
            )}
            in next {duration}
          </div>
        </div>

        <div
          className={` rounded-md p-4 flex justify-between flex-col gap-2 ${immediateChange > 0 ? "bg-green-500" : "bg-red-500"}`}
        >
          <div className="font-medium">
            Immediate change {immediateChange > 0 ? "up" : "down"} by
          </div>
          <div className="font-bold text-3xl">
            {immediateChange.toFixed(2)}%
          </div>
          <div className="flex gap-2 leading-none">
            {immediateChange > 0 ? (
              <TrendingUp className="h-4 w-4" />
            ) : (
              <TrendingDown className="h-4 w-4" />
            )}
            First day of forecasted
          </div>
        </div>

        <div
          className={` rounded-md p-4 flex justify-between flex-col gap-2 ${forecastTrend > 0 ? "bg-green-500" : "bg-red-500"}`}
        >
          <div className="font-medium">Start vs End of forecasted data</div>
          <div className="font-bold text-3xl">{forecastTrend.toFixed(2)}%</div>
          <div className="flex gap-2 leading-none">
            {immediateChange > 0 ? (
              <TrendingUp className="h-4 w-4" />
            ) : (
              <TrendingDown className="h-4 w-4" />
            )}
            in next {duration}
          </div>
        </div>

        <div
          className={` rounded-md p-4 flex justify-between flex-col gap-2 ${!restockStatus.need ? "bg-green-500" : "bg-red-500"}`}
        >
          <div className="font-medium">Stock status</div>
          <div className="font-bold text-3xl">
            {restockStatus.need
              ? `${restockStatus.quantity} pcs needed`
              : "Stock is good"}
          </div>
          <div className="flex gap-2 leading-none">
            {restockStatus.need ? (
              <Button variant="secondary">Quick restock</Button>
            ) : (
              <>
                <ThumbsUp className="h-4 w-4" /> Item is safe{" "}
              </>
            )}

            {/* {immediateChange > 0 ? ( */}
            {/*   <TrendingUp className="h-4 w-4" /> */}
            {/* ) : ( */}
            {/*   <TrendingDown className="h-4 w-4" /> */}
            {/* )} */}
            {/* in next 7 days */}
          </div>
        </div>
      </div>

      {/* <div className="flex gap-2 font-medium leading-none"> */}
      {/*   {overallChange > 0 ? ( */}
      {/*     <TrendingUp className="h-4 w-4" /> */}
      {/*   ) : ( */}
      {/*     <TrendingDown className="h-4 w-4" /> */}
      {/*   )} */}
      {/* Trending {overallChange > 0 ? "up" : "down"} by{" "} */}
      {/*   {overallChange.toFixed(2)}% in next 7 days */}
      {/* </div> */}
      {/**/}
      {/* <div className="flex gap-2 font-medium leading-none"> */}
      {/*   {immediateChange > 0 ? ( */}
      {/*     <TrendingUp className="h-4 w-4" /> */}
      {/*   ) : ( */}
      {/*     <TrendingDown className="h-4 w-4" /> */}
      {/*   )} */}
      {/*   Immediate change (Next day) {immediateChange > 0 ? "up" : "down"} by{" "} */}
      {/*   {immediateChange.toFixed(2)}% */}
      {/* </div> */}
      {/**/}
      {/* <div className="flex gap-2 font-medium leading-none"> */}
      {/*   {forecastTrend > 0 ? ( */}
      {/*     <TrendingUp className="h-4 w-4" /> */}
      {/*   ) : ( */}
      {/*     <TrendingDown className="h-4 w-4" /> */}
      {/*   )} */}
      {/*   Start vs End of forecasted data: {forecastTrend.toFixed(2)}% */}
      {/* </div> */}
      {/**/}
      {/* <div className="leading-none text-muted-foreground"> */}
      {/*   Showing total visitors for the last 6 months */}
      {/* </div> */}

      {/* <div className="mt-2"> */}
      {/*   Overall Forecast vs Recent History:{" "} */}
      {/*   {trendAnalysis!.overallChange.toFixed(2)} */}
      {/*   Immediate Change (Next Day): {trendAnalysis!.immediateChange} */}
      {/*   Forecast Trajectory (Week End vs Start): {trendAnalysis!.forecastTrend} */}
      {/* </div> */}
    </div>
  );
};

export default ForecastReport;
