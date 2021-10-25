import React from "react";
import { Col, Card, Button } from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/router";

const CardPage = ({ backgroundImage, background, color, link, text, desc, total, isSubvit, col }) => {
  const router = useRouter();

  function addHours(date, hours) {
    const newDate = new Date(date);
    newDate.setHours(newDate.getHours() + hours);
    return newDate;
  }

  let md = []

  if(col.length === 4){
    md.push(6,6,6,6)
  }else if(col.length === 3){
    md.push(6,6,12)
  }

  function myFunction(col) {
    if(col.length === 4){
      return col[0]
    }else if(col.length === 3){
      return col[Math.floor(Math.random() * col.length)]
    }
  }

  

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
                width: isSubvit ? "140px" : "max-content",
                color: color,
              }}
            >
              {desc}
            </p>

            <Link href={`${link}`} passHref>
              <Button variant={background} className="font-weight-bolder rounded-full">
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
