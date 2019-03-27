import React from "react";
import { Mutation } from "react-apollo";
import Link from "next/link";
import NavStyles from "./styles/NavStyles";
import User from "./User";
import Signout from "./Signout";
import { TOGGLE_CART_MUTATION } from "./Cart";
import CartCount from "./CartCount";

const Nav = () => {
  return (
    <User>
      {({ data: { currentUser } }) => (
        <NavStyles>
          <li>
            <Link href="/items">
              <a>Shop</a>
            </Link>
          </li>
          {currentUser && (
            <>
              <li>
                <Link href="/sell">
                  <a>Sell</a>
                </Link>
              </li>
              <li>
                <Link href="/orders">
                  <a>Orders</a>
                </Link>
              </li>
              <li>
                <Link href="/me">
                  <a>Account</a>
                </Link>
              </li>
              <li>
                <Signout />
              </li>
              <li>
                <Mutation mutation={TOGGLE_CART_MUTATION}>
                  {toggleCart => (
                    <button onClick={toggleCart}>
                      My Cart
                      <CartCount
                        count={currentUser.cart.reduce(
                          (total, cartItem) => total + cartItem.quantity,
                          0
                        )}
                      />
                    </button>
                  )}
                </Mutation>
              </li>
            </>
          )}
          {!currentUser && (
            <li>
              <Link href="/signup">
                <a>Sign in</a>
              </Link>
            </li>
          )}
        </NavStyles>
      )}
    </User>
  );
};

export default Nav;
