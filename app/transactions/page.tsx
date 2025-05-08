import createApolloClient from "@/lib/apollo-client";
import { GET_TRANSACTIONS } from "@/lib/gql";
import TransactionTable from "./transaction-table";

const TransactionPage = async () => {
  const client = createApolloClient();
  const { data, loading, error } = await client.query({
    query: GET_TRANSACTIONS,
  });

  if (error) return <div>Something went wrong: ${error.message}</div>;

  if (loading) return <div>Loading...</div>;

  const { transactions }: { transactions: Transaction[] } = data;

  // const get
  return (
    <div>
      <TransactionTable transactions={transactions} />
    </div>
  );
};

export default TransactionPage;
