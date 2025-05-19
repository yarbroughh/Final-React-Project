//Fetches preserve locations from MockAPI withe useEffect and useState
//Embedded a Google map with iframe to show where locations are
//Bootstrap cards used for displaying locations
//Locations link to external URLs for each preserve

import { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import Layout from './Layout';
import type { Preserve } from './types';

export default function Explore() {
  const [preserves, setPreserves] = useState<Preserve[]>([]);

  useEffect(() => {
    fetch('https://681e7312c1c291fa66341abc.mockapi.io/API/Nature/locations')
      .then((res) => res.json())
      .then((data) => setPreserves(data))
      .catch((err) => console.error('Error fetching preserve data:', err));
  }, []);

  return (
    <Layout heroTitle="Explore Preserves" heroImage="/images/hero-explore.jpg">
      <section className="text-center py-5">
        <h2>Discover protected lands across West Michigan.</h2>
      </section>
            {/* Embedded Google My Map */}
      <Container className="mb-5">
        <Row>
          <Col>
            <div style={{ width: '100%', height: '600px' }}>
              <iframe
                src="https://www.google.com/maps/d/u/0/embed?mid=1nxoSVNxmqusBjJxaaPD_6Nar-WyHNys&ehbc=2E312F"
                width="100%"
                height="100%"
                allowFullScreen
                loading="lazy"
                style={{ border: 0 }}
              ></iframe>
            </div>
          </Col>
        </Row>
      </Container>

   {/*Cards to list all the preserves including an image and link to another website  */}
    <section className="section-background py-5">
        <div className="text-center mb-5">
            <h3>West Michigan's Nature Preserves</h3>
        </div>
      <Container>
        <Row>
          {preserves.map((preserve) => (
            <Col key={preserve.id} xs={12} sm={6} md={4} lg={2} className="mb-4">
              <a
                href={preserve.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <Card className="h-100 shadow-sm">
                  <Card.Img
                    variant="top"
                    src={preserve.image}
                    alt={preserve.name}
                    style={{ height: '140px', objectFit: 'cover' }}
                  />
                  <Card.Body>
                    <Card.Title className="card-title">
                      {preserve.name}
                    </Card.Title>
                  </Card.Body>
                </Card>
              </a>
            </Col>
          ))}
        </Row>
      </Container>
    </section>

    </Layout>
  );
}
