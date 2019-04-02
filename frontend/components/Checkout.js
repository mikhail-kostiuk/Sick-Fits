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

const CREATE_ORDER_MUTATION = gql`
  mutation CREATE_ORDER_MUTATION($token: String!) {
    createOrder(token: $token) {
      id
      charge
      total
      items {
        id
        title
      }
    }
  }
`;

function totalItems(cart) {
  return cart.reduce((total, cartItem) => total + cartItem.quantity, 0);
}

class Checkout extends Component {
  onToken(res, mutationFunc) {
    console.log(res);
    mutationFunc({
      variables: {
        token: res.id
      }
    }).catch(err => alert(err.message));
  }

  render() {
    return (
      <User>
        {({ data: { currentUser } }) => (
          <Mutation
            mutation={CREATE_ORDER_MUTATION}
            refetchQueries={[{ query: CURRENT_USER_QUERY }]}
          >
            {createOrder => (
              <StripeCheckout
                amount={calcTotalPrice(currentUser.cart)}
                name="Sick Fits"
                description={`Order of ${totalItems(currentUser.cart)} items!`}
                image={
                  currentUser.cart.length
                    ? currentUser.cart[0].item.image
                    : null
                }
                stripeKey="pk_test_aLEsxm7mjJtqqyUcsPJtwHVC"
                currency="USD"
                email={currentUser.email}
                token={res => this.onToken(res, createOrder)}
              >
                {this.props.children}
              </StripeCheckout>
            )}
          </Mutation>
        )}
      </User>
    );
  }
}

export default Checkout;
