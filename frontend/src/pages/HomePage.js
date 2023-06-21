import { Link } from 'react-router-dom';
import data from '../data';
import { useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Product from '../components/Product';
import { Helmet } from 'react-helmet-async';
import LoadingComponent from '../components/LoadingComponent';
import MessageBox from '../components/MessageBox';


const reducer = (state, action) => {
  switch (action.type) {
    case 'GET_REQUEST':
      return { ...state, loading: true };
    case 'GET_SUCCESS':
      return { ...state, loading: false, products: action.payload };
    case 'GET_FAILURE':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function HomePage() {
  const [{ loading, error, products }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
    products: [],
  });

  useEffect(() => {
    const getProducts = async () => {
      dispatch({ type: 'GET_REQUEST' });
      try {
        const res = await axios.get('/api/v1/products'); //try catch
        dispatch({ type: 'GET_SUCCESS', payload: res.data });
      } catch (error) {
        dispatch({ type: 'GET_FAILURE', payload: error.message });
      }
    };

    getProducts();
  }, []);

  return (
    <div>
      <Helmet>
        <title>EShop</title>
      </Helmet>
      <h1>Products</h1>
      <div className="products">
        {loading ? (
         <LoadingComponent/>
        ) : error ? (
          <MessageBox variant='danger'>{error}</MessageBox>
        ) : (
          <Row>
            {products.map((p) => (
              <Col key={p.token} lg={3} md={4} sm={6} className='mb-3'>
                <Product product={p}/>
              </Col>
            ))}
          </Row>
        )}
      </div>
    </div>
  );
}

export default HomePage;
