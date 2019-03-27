import React from "react";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import User from "./User";
import CartItem from "./CartItem";
import CartStyles from "./styles/CartStyles";
import Supreme from "./styles/Supreme";
import CloseButton from "./styles/CloseButton";
import StyledButton from "./styles/StyledButton";
import calcTotalPrice from "../lib/calcTotalPrice";
import formatMoney from "../lib/formatMoney";

export const LOCAL_STATE_QUERY = gql`
  query LOCAL_STATE_QUERY {
    cartOpen @client
  }
`;

export const TOGGLE_CART_MUTATION = gql`
  mutation TOGGLE_CART_MUTATION {
    toggleCart @client
  }
`;

const Cart = () => {
  return (
    <User>
      {({ data: { currentUser } }) => {
        if (!currentUser) {
          return null;
        }
        return (
          <Mutation mutation={TOGGLE_CART_MUTATION}>
            {toggleCart => (
              <Query query={LOCAL_STATE_QUERY}>
                {({ data }) => (
                  <CartStyles open={data.cartOpen}>
                    <header>
                      <CloseButton onClick={toggleCart} title="close">
                        &times;
                      </CloseButton>
                      <Supreme>{currentUser.name}'s Cart</Supreme>
                      <p>
                        You have {currentUser.cart.length} Item
                        {currentUser.cart.length === 1 ? "" : "s"} in your cart.
                      </p>
                    </header>
                    <ul>
                      {currentUser.cart.map(cartItem => (
                        <CartItem key={cartItem.id} cartItem={cartItem} />
                      ))}
                    </ul>
                    <footer>
                      <p>{formatMoney(calcTotalPrice(currentUser.cart))}</p>
                      <StyledButton>Checkout</StyledButton>
                    </footer>
                  </CartStyles>
                )}
              </Query>
            )}
          </Mutation>
        );
      }}
    </User>
  );
};

export default Cart;
