import React from "react";
import Link from "next/link";
import NavStyles from "./styles/NavStyles";
import User from "./User";

const Nav = () => {
  return (
    <NavStyles>
      <User>
        {data => {
          console.log(data);
          return <p>User</p>;
        }}
      </User>
      <li>
        <Link href="/items">
          <a>Items</a>
        </Link>
      </li>
      <li>
        <Link href="/sell">
          <a>Sell</a>
        </Link>
      </li>
      <li>
        <Link href="/signup">
          <a>Signup</a>
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
    </NavStyles>
  );
};

export default Nav;
