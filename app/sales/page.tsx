import createApolloClient from "@/lib/apollo-client";
import { GET_SALE_GRAPH } from "@/lib/gql";
import TopSelling from "./TopSelling";
import SaleGraphComponent from "./SaleGraphComponent";

const SalesPage = async () => {
  // const client = createApolloClient();
  //
  // const salesResult = await client.query({
  //   query: GET_SALES,
  // });
  //
  // if (salesResult.error) return <div>Failed to get sales.</div>;
  //
  // if (salesResult.loading) return <div>Loading...</div>;
  //
  // const { sales }: { sales: Sale[] } = salesResult.data;

  // console.log(sales);
  //
  const client = createApolloClient();

  const saleGraphResult = await client.query({
    query: GET_SALE_GRAPH,
  });

  if (saleGraphResult.error)
    return <div>There was an error on getting graph sale data</div>;

  const { saleGraph }: { saleGraph: SaleGraph[] } = saleGraphResult.data;

  console.log("SALE GRAPH FROM PAGE: ", saleGraph);

  return (
    <div>
      <div className="text-3xl font-bold">Sales</div>
      <div className="text-md">Determine each product sales</div>

      <div className="mt-4 flex flex-col lg:flex-row grow gap-2">
        <div className="lg:flex-3/4">
          <SaleGraphComponent saleGraph={saleGraph} />
        </div>

        <div>
          <TopSelling />
        </div>
      </div>
      {/* {items.map((item) => ( */}
      {/*   <div>{item.itemName}</div> */}
      {/* ))} */}
    </div>
  );
};

export default SalesPage;
