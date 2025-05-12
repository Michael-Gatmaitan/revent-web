import createApolloClient from "@/lib/apollo-client";
import { GET_ITEMS } from "@/lib/gql";
import Items from "./items";

const ItemsPage = async () => {
  const client = createApolloClient();
  const { data, loading, error } = await client.query({
    query: GET_ITEMS,
  });

  if (error) return <div>Something went wrong: {error.message}</div>;

  if (loading) return <div>Loading...</div>;

  const { items }: { items: Item[] } = data;

  console.log(data);

  return (
    <div>
      <Items items={items} />
    </div>
  );
};

export default ItemsPage;
