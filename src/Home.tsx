//Layout component was created to to include a hero image and title for 
//consistency across pages
//Contains 4 CTAs using Boostrap cards/grid system to go to other pages
//Link didn't work so learned LinkContainer

import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'; //Link gave an error
import Layout from './Layout';

function Home() {
    return (
        
    <Layout
    heroTitle="West Michigan Land Conservancy"
    heroImage="/images/hero-home.jpg"
    >
    <section className="text-center py-5">
        <h2>Protecting West Michigan's natural spaces for generations to come.</h2>
    </section>

    <section className="section-background py-5">
        <Container>
            <Row>
                <Col xs={12} sm={6} md={3} className="mb-4">
                    <Card className="h-100">
                    <Card.Body className="d-flex flex-column">
                        <Card.Title>Explore</Card.Title>
                        <Card.Text>
                        Discover trails, preserves, and public lands across West Michigan.
                        </Card.Text>
                        <div className="mt-auto">
                        <LinkContainer to="/explore">
                            <Button className="btn btn-secondary">Explore Preserves</Button>
                        </LinkContainer>
                        </div>
                    </Card.Body>
                    </Card>
                </Col>

                <Col xs={12} sm={6} md={3} className="mb-4">
                    <Card className="h-100">
                    <Card.Body className="d-flex flex-column">
                        <Card.Title>Journal</Card.Title>
                        <Card.Text>
                        Read conservation stories, land updates, and community highlights.
                        </Card.Text>
                        <div className="mt-auto">
                        <LinkContainer to="/journal">
                            <Button className="btn btn-secondary">Visit Journal</Button>
                        </LinkContainer>
                        </div>
                    </Card.Body>
                    </Card>
                </Col>

                <Col xs={12} sm={6} md={3} className="mb-4">
                    <Card className="h-100">
                    <Card.Body className="d-flex flex-column">
                        <Card.Title>Store</Card.Title>
                        <Card.Text>
                        Support our mission with West Michigan merch, maps, and guides.
                        </Card.Text>
                        <div className="mt-auto">
                        <LinkContainer to="/store">
                            <Button className="btn btn-secondary">Shop Merch</Button>
                        </LinkContainer>
                        </div>
                    </Card.Body>
                    </Card>
                </Col>

                <Col xs={12} sm={6} md={3} className="mb-4">
                    <Card className="h-100">
                    <Card.Body className="d-flex flex-column">
                        <Card.Title>Contact Us</Card.Title>
                        <Card.Text>
                        Want info on what we do, upcoming events, or how you can help?
                        </Card.Text>
                        <div className="mt-auto">
                        <LinkContainer to="/contact">
                            <Button className="btn btn-secondary">Contact Us</Button>
                        </LinkContainer>
                        </div>
                    </Card.Body>
                    </Card>
                </Col>

            </Row>

        </Container>

    </section>

</Layout>
  );
}
export default Home;