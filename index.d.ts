interface Item {
  productID: number;
  itemNumber: number;
  itemName: string;
  discount: Float!;
  stock: number;
  unitPrice: number;
  status: string;
  description: string;
  imageURL: string;
}

interface Sale {
  saleID: number;
  itemNumber: string;
  customerID: number;
  customerName: string;
  itemName: string;
  saleDate: string;
  discount: Float!;
  quantity: number;
  unitPrice: Float!;
}

interface MutationMessage {
  message: string;
  success: boolean;
}
