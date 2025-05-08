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
  discount: number;
  quantity: number;
  unitPrice: number;
}

interface MutationMessage {
  message: string;
  success: boolean;
}

interface Customer {
  customerID: number;
  fullName: string;
  email: string;
  mobile: number;
  phone2: number;
  address: string;
  address2: string;
  city: string;
  district: string;
  status: string;
  createdOn: string;
}

interface Transaction {
  id: number;
  description: string;
  type: string;
}
