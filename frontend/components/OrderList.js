import React, { Component } from "react";
import { Query } from "react-apollo";
import { distanceInWords } from "date-fns";
import Link from "next/link";
import styled from "styled-components";
import gql from "graphql-tag";
import ErrorMessage from "./ErrorMessage";
import formatMoney from "../lib/formatMoney";
import OrderItemStyles from "./styles/OrderItemStyles";

const USER_ORDERS_QUERY = gql`
  query USER_ORDERS_QUERY {
    orders(orderBy: createdAt_DESC) {
      id
      total
      createdAt
      items {
        id
        title
        price
        description
        quantity
        image
      }
    }
  }
`;

const OrderUl = styled.ul`
  display: grid;
  grid-gap: 4rem;
  padding-inline-start: 0;
`;

const OrdersHeading = styled.h2`
  border-bottom: 2px solid red;
  margin-top: 0;
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  text-align: center;
`;

class OrderList extends Component {
  render() {
    return (
      <Query query={USER_ORDERS_QUERY}>
        {({ data: { orders }, loading, error }) => {
          if (loading) {
            return <p>Loading...</p>;
          }
          if (error) {
            return <ErrorMessage error={error} />;
          }
          return (
            <div>
              <OrdersHeading>You have {orders.length} orders</OrdersHeading>
              <OrderUl>
                {orders.map(order => (
                  <OrderItemStyles key={order.id}>
                    <Link
                      href={{
                        pathname: "/order",
                        query: { id: order.id }
                      }}
                    >
                      <a>
                        <div className="order-meta">
                          <p>
                            {order.items.reduce((a, b) => a + b.quantity, 0)}{" "}
                            Items
                          </p>
                          <p>{order.items.length} Products</p>
                          {/* {console.log(formatDistance)} */}
                          <p>
                            {distanceInWords(order.createdAt, new Date())} ago
                          </p>
                          <p>{formatMoney(order.total)}</p>
                        </div>
                        <div className="images">
                          {order.items.map(item => (
                            <img
                              key={item.id}
                              src={item.image}
                              alt={item.title}
                            />
                          ))}
                        </div>
                      </a>
                    </Link>
                  </OrderItemStyles>
                ))}
              </OrderUl>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default OrderList;
