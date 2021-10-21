import React from "react";
import { Col, Card, Button } from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/router";

const CardPage = ({ backgroundImage, background, color, link, text, desc }) => {
  const router = useRouter();

  function addHours(date, hours) {
    const newDate = new Date(date);
    newDate.setHours(newDate.getHours() + hours);
    return newDate;
  }

  // const handlePage = () => {
  //   router.push("/peserta/subvit/subtansi/1");
  //   const date = new Date(); // Fri Feb 26 2021 20:08:30
  //   const target = addHours(date, 1); // Fri Feb 26 2021 21:08:30
  //   const count = (target - date) / 1000;
  //   sessionStorage.setItem("targetDate", count);
  // };
  return (
    <>
      <Col md={6} className="mb-4 px-2">
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
