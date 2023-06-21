import { Link } from "react-router-dom";
import { useEffect, useReducer, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Rating from "./Rating";
import { Helmet } from "react-helmet-async";

function Product(props) {
  const { product } = props;
  return (
    <Card className="product-card">
      <Helmet></Helmet>
      <Link to={`/product/${product.token}`}>
        <img
          className="card-img-top"
          alt={product.name}
          src={product.image}
        ></img>
      </Link>
      <Card.Body>
        <Link to={`/product/${product.token}`}>
          <Card.Title>{product.name}</Card.Title>
        </Link>
        <Rating rating={product.rating} numReviews={product.numReviews} />
        <Card.Text>{product.price}$</Card.Text>
        <Button className="btn btn-primary">Add to cart</Button>
      </Card.Body>
    </Card>
  );
}

export default Product;
