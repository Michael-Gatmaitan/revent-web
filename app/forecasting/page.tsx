import createApolloClient from "@/lib/apollo-client";
import { GET_ITEMS } from "@/lib/gql";
import ItemCardForecast from "./item-card-forecast";

const ForecastingPage = async () => {
  const client = createApolloClient();

  const itemsResults = await client.query({
    query: GET_ITEMS,
  });

  if (itemsResults.error) return <div>Error getting items for forecasting</div>;

  const { items }: { items: Item[] } = itemsResults.data;

  return (
    <div>
      <div className="text-3xl font-bold">Forecasting</div>
      <div className="text-md">
        Predict the future demand or performance of a product.
      </div>

      <div className="mt-4">
        <div className="text-xl font-bold mb-2">Forecast products</div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          {items.map((item) => (
            <ItemCardForecast item={item} key={item.productID} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ForecastingPage;
