import styled from "styled-components";

const NavStyles = styled.ul`
  margin: 0;
  padding: 0;
  display: flex;
  list-style-type: none;
  justify-self: end;
  font-size: 2rem;
  li {
    display: flex;
  }
  li::before {
    content: "";
    width: 2px;
    background: ${props => props.theme.lightGrey};
    height: 100%;
    left: 0;
    transform: skew(-20deg);
    top: 0;
    bottom: 0;
  }
  a,
  button {
    padding: 1rem 3rem;
    display: flex;
    align-items: center;
    position: relative;
    text-transform: uppercase;
    font-size: 1em;
    background: none;
    border: 0;
    cursor: pointer;
    color: ${props => props.theme.black};
    font-weight: 800;
    @media (max-width: 700px) {
      font-size: 10px;
      padding: 0 10px;
    }
    &::after {
      height: 2px;
      background: red;
      content: "";
      width: 0;
      position: absolute;
      transform: translateX(-50%);
      transition: width 0.4s;
      transition-timing-function: cubic-bezier(1, -0.65, 0, 2.31);
      left: 50%;
      margin-top: 2rem;
    }
    &:hover,
    &:focus {
      outline: none;
      &::after {
        width: calc(100% - 60px);
      }
    }
  }
  @media (max-width: 1300px) {
    border-top: 2px solid ${props => props.theme.lightGrey};
    width: 100%;
    justify-content: center;
    font-size: 1.5rem;
    li:last-child::after {
      content: "";
      width: 2px;
      background: ${props => props.theme.lightGrey};
      height: 100%;
      right: 0;
      transform: skew(-20deg);
      top: 0;
      bottom: 0;
    }
  }
`;

export default NavStyles;
