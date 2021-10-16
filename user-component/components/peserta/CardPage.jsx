import React from "react";
import { Col, Card, Button } from "react-bootstrap";
import Link from "next/link";

const CardPage = ({ backgroundImage, background, color, link, text, desc }) => {
  return (
    <>
      <Col md={6} className="mb-8">
        <Card
          className="rounded-xl h-100"
          style={{
            backgroundImage:
              "url('/assets/icon/new-card-icon/" + backgroundImage + "')",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right top",
          }}
        >
          <Card.Body>
            <p
              style={{
                fontSize: "16px",
                fontWeight: "600",
                width: "140px",
                color: color,
              }}
            >
              {desc}
            </p>

            <Link href={`${link}`} passHref>
              <Button variant={background} className="font-weight-bolder">
                {text}
              </Button>
            </Link>
          </Card.Body>
        </Card>
      </Col>
    </>
  );
};

export default CardPage;
