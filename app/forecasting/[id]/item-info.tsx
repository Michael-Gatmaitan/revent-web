interface IItemInfo {
  item: Item;
  sales: Sale[];
}

const ItemInfo = ({ item, sales }: IItemInfo) => {
  return (
    <div>
      <div>{item.itemName}</div>
      <div>History sales: {sales.length}</div>
    </div>
  );
};

export default ItemInfo;
