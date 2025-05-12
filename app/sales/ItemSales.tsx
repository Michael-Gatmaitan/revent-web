import createApolloClient from "@/lib/apollo-client";
import { GET_ITEM_SALE_BY_ID } from "@/lib/gql";

interface IItemSales {
  item: Item;
}

const ItemSales = async ({ item }: IItemSales) => {
  const { itemNumber } = item;
  const client = createApolloClient();
  const { loading, data } = await client.query({
    query: GET_ITEM_SALE_BY_ID,
    variables: {
      itemNumber,
    },
  });

  console.log(data);

  if (loading) return <div>Loading</div>;

  const { itemSaleById }: { itemSaleById: Sale[] } = data;

  return (
    <div>
      {itemSaleById.map((sale) => (
        <div key={sale.saleID}>{sale.quantity}</div>
      ))}
    </div>
  );
};

export default ItemSales;
