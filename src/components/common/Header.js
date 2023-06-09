import { Badge, Col, Container, Figure, Row } from 'react-bootstrap';

const Header = ({ title, ...props }) => {
  return (
    <header>
      <Container fluid={true}>
        <Row>
          <Col>
            <Figure>
              <Figure.Image
                height={80}
                src={`${process.env.PUBLIC_URL}/LogoCompletoNegro.png`}
              />
            </Figure>
          </Col>
          <Badge bg='secondary'>by IMysticDrummer</Badge>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
