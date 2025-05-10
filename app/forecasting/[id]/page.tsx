// "use client";

import createApolloClient from "@/lib/apollo-client";
import { GET_ITEM_BY_ID, GET_ITEM_SALE_BY_ID } from "@/lib/gql";
import ItemInfo from "./item-info";
import ForecastedData from "./forecasted-data";

const getItemById = async (id: number) => {
  try {
    const client = createApolloClient();
    const { data, loading, error } = await client.query({
      query: GET_ITEM_BY_ID,
      variables: {
        productID: id,
      },
    });

    if (error) {
      console.log(`There was an error getting product id of: ${id}`);
      return null;
    }

    return data;
  } catch (err) {
    return err;
  }
};

const getItemSaleById = async (itemNumber: string) => {
  try {
    const client = createApolloClient();
    const { data, error } = await client.query({
      query: GET_ITEM_SALE_BY_ID,
      variables: {
        itemNumber: itemNumber,
      },
    });

    if (error) {
      console.log(`There was an error getting item sale: ${itemNumber}`);
      return null;
    }

    return data;
  } catch (err) {
    return err;
  }
};

const page = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;

  const _item = await getItemById(parseInt(id));
  if (!_item) return <div>There was no item fetched</div>;

  const { item }: { item: Item } = _item;

  const _itemSales = await getItemSaleById(item.itemNumber.toString());
  const { itemSaleById }: { itemSaleById: Sale[] } = _itemSales;

  return (
    <div>
      {/* Display product info */}
      {/* {id} */}
      {/**/}
      {/* <div>Item from db</div> */}
      {/* {item.productID} */}
      {/* {item.itemName} */}

      {/* We can use the sale data for forecasting */}
      <ItemInfo sales={itemSaleById} item={item} />

      {/* Display forecast info */}
      <ForecastedData sales={itemSaleById} item={item} />
    </div>
  );
};

export default page;
