import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Form from "./styles/Form";
import ErrorMessage from "./ErrorMessage";
import { CURRENT_USER_QUERY } from "./User";

const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    requestReset(email: $email) {
      message
    }
  }
`;

class RequestReset extends Component {
  constructor() {
    super();
    this.state = {
      email: ""
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  async handleFormSubmit(e, mutationFunc) {
    e.preventDefault();
    await mutationFunc();
    this.setState({ email: "" });
  }

  render() {
    return (
      <Mutation
        mutation={REQUEST_RESET_MUTATION}
        variables={this.state}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {(reset, { error, loading, called }) => (
          <Form
            method="post"
            onSubmit={e => {
              this.handleFormSubmit(e, reset);
            }}
          >
            <fieldset disabled={loading} aria-busy={loading}>
              <h2>Request a password reset</h2>
              <ErrorMessage error={error} />
              {!error && !loading && called && (
                <p>Success! Check your email for a reset link.</p>
              )}
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
            </fieldset>
            <button>Request Reset</button>
          </Form>
        )}
      </Mutation>
    );
  }
}

export default RequestReset;
