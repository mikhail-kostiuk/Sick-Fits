import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Form from "./styles/Form";
import ErrorMessage from "./ErrorMessage";

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $email: String!
    $name: String!
    $password: String!
  ) {
    signup(email: $email, name: $name, password: $password) {
      id
      email
      name
    }
  }
`;

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      name: "",
      password: ""
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  async handleFormSubmit(e, mutationFunc) {
    e.preventDefault();
    await mutationFunc();
    this.setState({ email: "", name: "", password: "" });
  }

  render() {
    return (
      <Mutation mutation={SIGNUP_MUTATION} variables={this.state}>
        {(signup, { error, loading }) => (
          <Form
            method="post"
            onSubmit={e => {
              this.handleFormSubmit(e, signup);
            }}
          >
            <fieldset disabled={loading} aria-busy={loading}>
              <h2>Sign Up for An Account</h2>
              <ErrorMessage error={error} />
              <label htmlFor="email">
                Email
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  value={this.state.email}
                  onChange={this.handleInputChange}
                />
              </label>
              <label htmlFor="name">
                Name
                <input
                  type="text"
                  name="name"
                  placeholder="name"
                  value={this.state.name}
                  onChange={this.handleInputChange}
                />
              </label>
              <label htmlFor="password">
                Password
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  value={this.state.password}
                  onChange={this.handleInputChange}
                />
              </label>
            </fieldset>
            <button>Sign Up</button>
          </Form>
        )}
      </Mutation>
    );
  }
}

export default Signup;
