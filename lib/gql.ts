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
  mutation DeleteItem(
    $productID: Int!
  ) {
    deleteItem(productID: $productID) {
      message
      success
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
