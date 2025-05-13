import { gql } from "@apollo/client";

export const GET_ITEMS = gql`
  query Items {
    items {
      productID
      itemNumber
      itemName
      discount
      stock
      unitPrice
      status
      description
      imageURL
    }
  }
`;

export const GET_ITEM_BY_ID = gql`
  query Item($productID: Int!) {
    item(productID: $productID) {
      productID
      itemNumber
      itemName
      discount
      stock
      unitPrice
      status
      description
      imageURL
    }
  }
`;

export const GET_ITEM_SALE_BY_ID = gql`
  query ItemSaleById($itemNumber: String!) {
    itemSaleById(itemNumber: $itemNumber) {
      saleID
      itemNumber
      customerID
      customerName
      itemName
      saleDate
      discount
      quantity
      unitPrice
    }
  }
`;

export const CREATE_ITEM = gql`
  mutation CreateItem(
    $itemNumber: Int!
    $itemName: String!
    $discount: Float!
    $stock: Int!
    $unitPrice: Int!
    $imageURL: String!
    $description: String!
  ) {
    createItem(
      itemNumber: $itemNumber
      itemName: $itemName
      discount: $discount
      stock: $stock
      unitPrice: $unitPrice
      imageURL: $imageURL
      description: $description
    ) {
      message
      success
    }
  }
`;

export const DEDUCT_ITEM = gql`
  mutation DeductItem($productID: Int!, $quantity: Int!, $customerID: Int!) {
    deductItem(
      productID: $productID
      quantity: $quantity
      customerID: $customerID
    ) {
      message
      success
    }
  }
`;

export const UPDATE_ITEM = gql`
  mutation UpdateItem(
    $productID: Int!
    $itemName: String!
    $discount: Float!
    $unitPrice: Int!
    $imageURL: String!
  ) {
    updateItem(
      productID: $productID
      itemName: $itemName
      discount: $discount
      unitPrice: $unitPrice
      imageURL: $imageURL
    ) {
      message
      success
    }
  }
`;

export const DELETE_ITEM = gql`
  mutation DeleteItem($productID: Int!) {
    deleteItem(productID: $productID) {
      message
      success
    }
  }
`;

export const GET_SALES = gql`
  query Sales {
    sales {
      saleID
      itemNumber
      customerID
      customerName
      itemName
      saleDate
      discount
      quantity
      unitPrice
    }
  }
`;

export const GET_SALE_GRAPH = gql`
  query SaleGraph {
    saleGraph {
      productID
      itemNumber
      itemName
      unitPrice
      quantitySold
      totalRevenue
    }
  }
`;

export const GET_MONTHLY_SALES = gql`
  query MonthlySales {
    monthlySales {
      month
      sale
    }
  }
`;

export const GET_TOP_SALES = gql`
  query TopSales {
    topSales {
      saleID
      quantitySold
      unitPrice
      itemNumber
      itemName
      imageURL
      totalRevenue
    }
  }
`;

export const GET_CUSTOMERS = gql`
  query Customers {
    customers {
      customerID
      fullName
      email
      mobile
      phone2
      address
      address2
      city
      district
      status
      createdOn
    }
  }
`;

export const GET_TRANSACTIONS = gql`
  query Transactions {
    transactions {
      id
      description
      type
    }
  }
`;

export const CREATE_TRANSACTION = gql`
  mutation CreateTransaction($description: String!, $type: String!) {
    createTransaction(description: $description, type: $type) {
      message
      success
    }
  }
`;
