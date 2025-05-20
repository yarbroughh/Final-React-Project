//store data is fetched from MockAPI 
//Learned the Router v6 useOutletConext to call addToCart
//Bootstrap cards are used to display products
//Use OnClick navigate to go to cart/checkout 

import { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import Layout from './Layout';
import type { StoreItem } from './types';
import type { ContextType } from './types';
import { useOutletContext } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Store() {
  const { addToCart } = useOutletContext<ContextType>(); {/*used in React V6*/}
  const [storeItems, setStoreItems] = useState<StoreItem[]>([]);  
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://681e7312c1c291fa66341abc.mockapi.io/API/Nature/store-items')
      .then(res => res.json())
      .then(data => setStoreItems(data));
    }, []);

  return (
        <Layout
          heroTitle="Store"
          heroImage="/images/hero-store.jpg"
        >
            <section className="section-background py-5">
                <Container className="py-5">
                    <h2 className="mb-4 text-center">Shop to Support Preservation</h2>
                    <Row className="mb-4 justify-content-center">
                        <Col xs="auto">
                            <Button className="btn-secondary" onClick={() => navigate('/cart')}>Go to Cart Checkout</Button>
                        </Col>
                    </Row>
                    <Row>
                        {storeItems.map(item => ( //map to display all items
                            <Col key={item.id} md={4} className="mb-4">
                                <Card className="store-card"> {/*add class for flex styling*/}
                                    <Card.Img
                                        className="store-image"
                                        variant="top"
                                        src={`/images/${item.imageUrl}`}
                                        alt={item.name} />
                                    <Card.Body>
                                        <Card.Title>{item.name}</Card.Title>
                                        <Card.Text>{item.description}</Card.Text>
                                        <div className="card-price">${item.price.toFixed(2)}</div> {/*Change to div align prices and fix the decimels to 2*/}
                                        <Button className="btn-secondary" onClick={() => addToCart(item)}>Add to Cart</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </section>
        </Layout>      
  );
}

export default Store;
