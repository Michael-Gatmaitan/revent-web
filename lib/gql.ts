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
