export const POST = async (req: Request) => {
  const data = await req.json();

  console.log("DATA FGROM P{OST TRAIN", data);

  try {
    const { timeSeriesData, options } = data;

    const result = await trainModel(timeSeriesData, options);

    return new Response(JSON.stringify(result));
  } catch (error) {
    console.error("Error in train endpoint:", error);

    return new Response(
      JSON.stringify({
        success: false,
        error: "Failed to train forecast model",
      }),
      {
        status: 500,
      },
    );
  }
};
