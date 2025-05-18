//Created a simple cart/order page with "old school" processing to just submit
//order information since I can't process a payment

import { useOutletContext } from 'react-router-dom';
import { useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';

import Layout from './Layout'

import type { StoreItem } from './types'

function Cart() {
    const { cartItems, clearCart } = useOutletContext<{ //also clear the cart-call it when setting submit to true
        cartItems: StoreItem[];
        clearCart: () => void;
    }>();
    const [submitted, setSubmitted] = useState(false);
    
    const [formData, setFormData] = useState({
        name: '',
        email: '', 
        address: '',
    });

    const total = cartItems.reduce((sum, item) => sum + item.price, 0);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const order = {
            ...formData,
            cart: JSON.stringify(cartItems),
            createdAt: new Date().toISOString()
        };

        try {
            await fetch('https://681e7312c1c291fa66341abc.mockapi.io/API/Nature/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(order)
            });
            clearCart();
            setSubmitted(true);
        } catch (err) {
            console.error("Order submission failed", err);
        }
    };

    return (
        <Layout
            heroTitle="Cart"
            heroImage="/images/hero-cart.jpg">
        <Container fluid className="section-background p-5">
            <h2 className="text-center mb-4">Your Cart</h2>

            {cartItems.length === 0 ? (
                <p className="text-center">Your cart is empty.</p>
            ) : (
                <>
                    <Row className="mb-4">
                        {cartItems.map((item) => (
                            <Col key={item.id} md={4} className="mb-3">
                                <Card>
                                    <Card.Img src={`/images/${item.imageUrl}`} alt={item.name} className="store-image" />
                                    <Card.Body>
                                        <Card.Title>{item.name}</Card.Title>
                                        <Card.Text><strong>${item.price.toFixed(2)}</strong></Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>

                    <h3 className="mb-4 text-center">Total: ${total.toFixed(2)}</h3>

                    {submitted ? (
                        <p className="text-success text-center">Thank you! Your order has been submitted. </p>
                    ) : (
                        <Form onSubmit={handleSubmit}>
                            <Row className="mb-3">
                                <Col md={6}>
                                    <Form.Group controlId="name">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control
                                            id="name"
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value})}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group controlId="email">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            id="email"
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value})}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Form.Group className="mb-3" controlId="address">
                                <Form.Label>Shipping Address</Form.Label>
                                <Form.Control
                                    id="address"
                                    as="textarea"
                                    rows={3}
                                    required
                                    value={formData.address}
                                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                />
                            </Form.Group>

                            <div className="text-center">
                                <Button type="submit">Submit Order</Button>
                            </div>
                        </Form>
                    )}
                </>
            )}
        </Container>
    </Layout>
  );
}

export default Cart;