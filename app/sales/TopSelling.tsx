import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import createApolloClient from "@/lib/apollo-client";
import { GET_TOP_SALES } from "@/lib/gql";
import Image from "next/image";

const TopSelling = async () => {
  // const clien
  const client = createApolloClient();
  const topSalesResult = await client.query({
    query: GET_TOP_SALES,
  });

  if (topSalesResult.error) return <div>Error getting top sales</div>;

  const { topSales }: { topSales: TopSales[] } = topSalesResult.data;

  console.log(topSales);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top selling products</CardTitle>
        <CardDescription>Top 5 product sold this year.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-2">
        {topSales.map((topSale) => {
          const itemImageLocal = `http://localhost/imsa/data/item_images/${topSale.imageURL}`;

          return (
            <div
              className="border-1 flex gap-2 rounded-sm p-2"
              key={topSale.saleID}
            >
              <div className="w-[50px] h-[50px]">
                <AspectRatio ratio={1 / 1}>
                  <Image
                    src={
                      topSale.imageURL.startsWith("http")
                        ? topSale.imageURL
                        : itemImageLocal
                    }
                    className="object-cover h-full w-full rounded-md"
                    fill
                    alt={topSale.itemName}
                  />
                </AspectRatio>
              </div>

              <div className="flex justify-between grow">
                <div>
                  <div className="font-bold">{topSale.itemName}</div>
                  <div className="text-xs">
                    {topSale.total_quantity_sold} pcs sold
                  </div>
                </div>
                <div className="flex items-center">
                  <div>{topSale.totalRevenue}</div>
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default TopSelling;
