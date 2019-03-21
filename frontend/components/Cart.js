import React from "react";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import CartStyles from "./styles/CartStyles";
import Supreme from "./styles/Supreme";
import CloseButton from "./styles/CloseButton";
import StyledButton from "./styles/StyledButton";

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
    <Mutation mutation={TOGGLE_CART_MUTATION}>
      {toggleCart => (
        <Query query={LOCAL_STATE_QUERY}>
          {({ data }) => (
            <CartStyles open={data.cartOpen}>
              <header>
                <CloseButton onClick={toggleCart} title="close">
                  &times;
                </CloseButton>
                <Supreme>Your Cart</Supreme>
                <p>You have __ Items in your cart.</p>
              </header>
              <footer>
                <p>10.10$</p>
                <StyledButton>Checkout</StyledButton>
              </footer>
            </CartStyles>
          )}
        </Query>
      )}
    </Mutation>
  );
};

export default Cart;
