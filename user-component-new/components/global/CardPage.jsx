import React from "react";
import { Col, Card, Button } from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/router";

const CardPage = ({
  backgroundImage,
  background,
  color,
  link,
  text,
  desc,
  total,
  isSubvit,
  col,
}) => {
  const router = useRouter();

  function addHours(date, hours) {
    const newDate = new Date(date);
    newDate.setHours(newDate.getHours() + hours);
    return newDate;
  }
  return (
    <>
      <Col md={col} className="mb-4 px-2">
        <Card
          className="rounded-xl h-100"
          style={{
            backgroundImage:
              "url('/assets/icon/new-card-icon/" + backgroundImage + "')",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right top",
          }}
        >
          <Card.Body
            className="d-flex flex-column justify-content-between"
            style={{ height: "180px" }}
          >
            <p
              style={{
                fontSize: "16px",
                fontWeight: "600",
                width: isSubvit ? "100%" : "100%",
                color: color,
              }}
            >
              {desc}
            </p>

            <Link href={`${link}`} passHref>
              <Button
                variant={background}
                className="font-weight-bolder rounded-full"
                style={{ width: "max-content" }}
              >
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
