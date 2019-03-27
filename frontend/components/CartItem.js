import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import formatMoney from "../lib/formatMoney";
import RemoveFromCart from "./RemoveFromCart";

const CartItemStyles = styled.li`
  padding: 1rem 0;
  border-bottom: 1px solid ${props => props.theme.lightGrey};
  display: grid;
  align-items: center;
  grid-template-columns: auto 1fr auto;
  img {
    margin-right: 10px;
  }
  h3,
  p {
    margin: 0;
  }
`;

const CartItem = ({ cartItem }) => {
  // In case the item has been deleted from items list, not just from cart
  if (!cartItem.item) {
    return (
      <CartItemStyles>
        <p>This item has been removed</p>
        <div />
        <RemoveFromCart id={cartItem.id} />
      </CartItemStyles>
    );
  }
  return (
    <CartItemStyles>
      <img src={cartItem.item.image} width="100" alt={cartItem.item.title} />
      <div className="cart-item-detail">
        <h3>{cartItem.item.title}</h3>
        <p>
          {formatMoney(cartItem.item.price * cartItem.quantity)}
          {" - "}
          <em>
            {cartItem.quantity} &times; {formatMoney(cartItem.item.price)} each
          </em>
        </p>
      </div>
      <RemoveFromCart id={cartItem.id} />
    </CartItemStyles>
  );
};

CartItem.propTypes = {
  cartItem: PropTypes.object.isRequired
};

export default CartItem;
