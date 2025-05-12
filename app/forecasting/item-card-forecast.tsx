import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import Link from "next/link";

interface IITemCardForecast {
  item: Item;
}
const ItemCardForecast = ({ item }: IITemCardForecast) => {
  const { productID, itemName, itemNumber, imageURL, stock } = item;
  console.log(itemName, itemNumber, imageURL, stock);

  const itemImageLocal = `http://localhost/imsa/data/item_images/${imageURL}`;

  return (
    <Card className="p-2">
      <CardContent className="p-0 flex gap-2">
        <div className="w-[50px] h-[50px]">
          <AspectRatio ratio={1 / 1}>
            <Image
              src={imageURL.startsWith("http") ? imageURL : itemImageLocal}
              className="object-cover h-full w-full rounded-md"
              fill
              alt={itemName}
            />
          </AspectRatio>
        </div>

        <div className="flex grow justify-between items-center">
          <div>
            <div className="break-normal font-bold">{itemName}</div>
            <div className="text-sm opacity-70">#{itemNumber}</div>
          </div>

          <div>
            <Button asChild variant="outline">
              <Link href={`/forecasting/${productID}`}>Forecast item</Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ItemCardForecast;
