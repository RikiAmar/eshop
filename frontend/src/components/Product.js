import { Link } from 'react-router-dom';
import { useEffect, useReducer, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Rating from 'react-bootstrap/Rating';



function Product(props) {
  const { product } = props;
  return (
    <Card>
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
        <Card.Text>{product.price}$</Card.Text>
        <Button>Add to cart</Button>
      </Card.Body>
      <Rating rating ={product.rating} numOfReviews={}></Rating>
    </Card>
  );
}

export default Product;
