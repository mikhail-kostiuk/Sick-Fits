import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Router from "next/router";
import ErrorMessage from "./ErrorMessage";
import Form from "./styles/Form";

export const CREATE_ITEM_MUTATION = gql`
  mutation CREATE_ITEM_MUTATION(
    $title: String!
    $description: String!
    $price: Int!
    $image: String
    $largeImage: String
  ) {
    createItem(
      title: $title
      description: $description
      price: $price
      image: $image
      largeImage: $largeImage
    ) {
      id
    }
  }
`;

class CreateItem extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      description: "",
      image: "",
      largeImage: "",
      price: 0
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.uploadFile = this.uploadFile.bind(this);
  }

  handleInputChange(e) {
    const { name, type, value } = e.target;
    const val = type === "number" ? parseFloat(value) : value;
    this.setState({ [name]: val });
  }

  async handleFormSubmit(e, mutationFunc) {
    e.preventDefault();
    const res = await mutationFunc();
    Router.push({
      pathname: "/item",
      query: { id: res.data.createItem.id }
    });
  }

  async uploadFile(e) {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "sickfits");
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/datu1c8fw/image/upload",
      { method: "POST", body: data }
    );
    const file = await res.json();
    if (file.error) {
      this.setState({
        image: "",
        largeImage: ""
      });
    } else {
      this.setState({
        image: file.secure_url,
        largeImage: file.eager[0].secure_url
      });
    }
  }

  render() {
    return (
      <Mutation mutation={CREATE_ITEM_MUTATION} variables={this.state}>
        {(createItem, { loading, error }) => (
          <Form
            onSubmit={e => {
              this.handleFormSubmit(e, createItem);
            }}
          >
            <ErrorMessage error={error} />
            <fieldset disabled={loading} aria-busy={loading}>
              <label htmlFor="file">
                Image
                <input
                  type="file"
                  id="file"
                  name="file"
                  placeholder="Upload an image"
                  required
                  onChange={this.uploadFile}
                />
                {this.state.image && (
                  <img src={this.state.image} alt="Upload Preview" />
                )}
              </label>
              <label htmlFor="title">
                Title
                <input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Title"
                  required
                  value={this.state.title}
                  onChange={this.handleInputChange}
                />
              </label>
              <label htmlFor="price">
                Price
                <input
                  type="number"
                  id="price"
                  name="price"
                  placeholder="Price"
                  required
                  value={this.state.price}
                  onChange={this.handleInputChange}
                />
              </label>
              <label htmlFor="description">
                Description
                <textarea
                  type="text"
                  id="description"
                  name="description"
                  placeholder="Enter a description"
                  required
                  value={this.state.description}
                  onChange={this.handleInputChange}
                />
              </label>
              <button type="submit">Submit</button>
            </fieldset>
          </Form>
        )}
      </Mutation>
    );
  }
}

export default CreateItem;
