import React from "react";
import Link from "next/link";
import NavStyles from "./styles/NavStyles";
import User from "./User";
import { userInfo } from "os";

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
