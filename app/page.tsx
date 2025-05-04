import createApolloClient from "@/lib/apollo-client";
import { GET_SALES } from "@/lib/gql";

export default async function Home() {
  const client = createApolloClient();
  const { data } = await client.query({
    query: GET_SALES,
  });

  console.log(data);
  return <div>Hello</div>;
}
