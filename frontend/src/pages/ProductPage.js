import React, { Profiler, useContext } from "react";
import { useParams } from "react-router-dom";
import { useEffect, useReducer, useState } from "react";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Rating from "../components/Rating";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import { Helmet } from "react-helmet-async";
import LoadingComponent from "../components/LoadingComponent";
import MessageBox from "../components/MessageBox";
import { getError } from "../GetError";
import { Store } from "../store";


const reducer = (state, action) => {
  switch (action.type) {
    case "GET_REQUEST":
      return { ...state, loading: true };
    case "GET_SUCCESS":
      console.log(state);
      return { ...state, loading: false, product: action.payload };
    case "GET_FAILURE":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const ProductPage = () => {
  const params = useParams(); //now we can mess with params
  const { token } = params; //deconstraction

  const [{ loading, error, product }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
    product: [],
  });

  useEffect(() => {
    const getProduct = async () => {
      dispatch({ type: "GET_REQUEST" });
      try {
        const res = await axios.get(`/api/v1/product/token/${token}`);
        dispatch({ type: "GET_SUCCESS", payload: res.data });
      } catch (error) {
        dispatch({ type: "GET_FAILURE", payload: getError(error) });
      }
    };

    getProduct();
  }, [token]);

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart } = state;

  const addToCartHandler = async() => {
    const existItem = cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem? existItem.quantity + 1 : 1;
    const {data} = await axios.get(`/api/v1/products/${product._id}`);
    if(data.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock');
      return;
    } 
    console.log({...product, quantity: 1});
    ctxDispatch({ type: "ADD_TO_CART", payload: {...product, quantity}});
  };

  return (
    <div>
      {loading ? (
        <LoadingComponent />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div>
          <Row>
            <Col md={6}>
              <img
                className="img-large"
                src={product.image}
                alt={product.name}
              />
            </Col>
            <Col md={3}>
              <ListGroup variant="flash">
                <ListGroup.Item>
                  <Helmet>
                    <title>{product.name}</title>
                  </Helmet>
                  <h1>{product.name}</h1>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    rating={product.rating}
                    numReviews={product.numReviews}
                  ></Rating>
                </ListGroup.Item>
                <ListGroup.Item>Price : ${product.price}</ListGroup.Item>

                <ListGroup.Item>
                  Description:
                  <p>{product.description}</p>
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <Card.Body>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <Row>
                        <Col>Price:</Col>
                        <Col>${product.price}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Status:</Col>
                        <Col>
                          {product.countInStock > 0 ? (
                            <Badge bg="success">In Stock</Badge>
                          ) : (
                            <Badge bg="danger">Unavailable</Badge>
                          )}
                        </Col>
                      </Row>
                    </ListGroup.Item>

                    {product.countInStock > 0 && (
                      <ListGroup.Item>
                        <div className="d-grid">
                          <Button onClick={addToCartHandler} variant="primary">
                            Add to Cart
                          </Button>
                        </div>
                      </ListGroup.Item>
                    )}
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
