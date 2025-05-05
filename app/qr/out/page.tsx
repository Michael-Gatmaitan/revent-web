// "use server";
import Items from "@/app/items/items";
import createApolloClient from "@/lib/apollo-client";
import { GET_ITEMS } from "@/lib/gql";

const OutPage = async () => {
  const client = createApolloClient();
  const { data, loading, error } = await client.query({
    query: GET_ITEMS,
  });

  if (error) return <div>Something went wrong: ${error.message}</div>;

  if (loading) return <div>Loading...</div>;

  const { items }: { items: Item[] } = data;

  return (
    <div>
      <Items items={items} selectMode={true} />{" "}
    </div>
  );
};

export default OutPage;
