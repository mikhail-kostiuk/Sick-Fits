import React, { Component } from "react";
import StripeCheckout from "react-stripe-checkout";
import { Mutation } from "react-apollo";
import Router from "next/router";
import NProgress from "nprogress";
import PropTypes from "prop-types";
import gql from "graphql-tag";
import calcTotalPrice from "../lib/calcTotalPrice";
import ErrorMessage from "./ErrorMessage";
import User, { CURRENT_USER_QUERY } from "./User";

function totalItems(cart) {
  return cart.reduce((total, cartItem) => total + cartItem.quantity, 0);
}

function onToken(res) {
  console.log(res);
}

class Checkout extends Component {
  onToken(res) {
    console.log(res);
  }

  render() {
    return (
      <User>
        {({ data: { currentUser } }) => (
          <StripeCheckout
            amount={calcTotalPrice(currentUser.cart)}
            name="Sick Fits"
            description={`Order of ${totalItems(currentUser.cart)} items!`}
            image={currentUser.cart[0].item && currentUser.cart[0].item.image}
            stripeKey="pk_test_aLEsxm7mjJtqqyUcsPJtwHVC"
            currency="USD"
            email={currentUser.email}
            token={res => this.onToken(res)}
          >
            {this.props.children}
          </StripeCheckout>
        )}
      </User>
    );
  }
}

export default Checkout;
