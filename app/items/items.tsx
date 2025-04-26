import ItemCard from "../components/item-card";

const Items = ({ items }: { items: Item[] }) => {
  return (
    <>
      {/* <Card className="sticky top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-red-500"></Card> */}

      <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-2 md:gap-4">
        {items.map((item) => (
          <ItemCard key={item.productID} item={item} />
        ))}
      </div>
    </>
  );
};

export default Items;
