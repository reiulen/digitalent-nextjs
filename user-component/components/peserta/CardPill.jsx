import React, { useState } from "react";
import Image from "next/image";
import { Col, Card } from "react-bootstrap";

const CardPill = ({ background, backgroundImg, icon, color, value, title }) => {
  return (
    <Col className="px-2">
      <Card
        border="transparent"
        className={`${background} px-6 py-8 rounded-xl mb-4`}
        style={{
          backgroundImage:
            "url('/assets/icon/new-card-icon/" + backgroundImg + "')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right top",
          backgroundSize: "120px",
        }}
      >
        <span className="svg-icon svg-icon-3x svg-icon-warning d-block my-2">
          <div className="row ml-4">
            <Image
              alt="card-page-icon"
              src={`/assets/icon/${icon}`}
              width={30}
              height={30}
            />
            <p
              className={`font-weight-bold font-size-h2 ml-2 my-auto`}
              style={{ color: color }}
            >
              {value}
            </p>
          </div>
        </span>
        <p
          className="ml-3 mt-2"
          style={{
            color: color,
            fontSize: "15px",
            fontWeight: "500",
          }}
        >
          {title}
        </p>
      </Card>
    </Col>
  );
};

export default CardPill;
