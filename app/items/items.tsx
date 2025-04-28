// "use client";
import ItemCard from "../components/item-card";

const Items = ({
  items,
  selectMode,
}: {
  items: Item[];
  selectMode?: boolean;
}) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-2 md:gap-4">
      {items.map((item) => (
        <ItemCard key={item.productID} item={item} selectMode={selectMode} />
      ))}
    </div>
  );
};

export default Items;
