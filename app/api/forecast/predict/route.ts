// import forecastService from "@/app/temp/forecastService";
import { generateForecast } from "../../../temp/forecastService";

export const POST = async (req: Request) => {
  const data = await req.json();

  try {
    const {
      recentData,
      options,
    }: { recentData: number[]; options: { forecastHorizon: number } } = data;
    console.log("predict/route body: ", data);
    const forecast = await generateForecast(recentData, options);

    console.log("Forecasted: ", forecast);

    return new Response(JSON.stringify(forecast));
  } catch (err) {
    console.log("Error in predict API endpoint: ", err);
    return new Response(
      JSON.stringify({
        success: false,
        error: "Failed to generate forecast",
      }),
      { status: 500 },
    );
  }
};
