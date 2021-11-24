import React from "react";
import PageWrapper from "../../../wrapper/page.wrapper";
import { Card } from "react-bootstrap";

export default function TTEP12({ token }) {
  console.log(token);
  return (
    <PageWrapper>
      <Card>
        <Card.Title className="mx-10 my-8">
          <p>
            <h1 className="fz-24">Card Title</h1>
          </p>
          <p>
            Anda belum memiliki file p12, silahkan unggah file sesuai dengan
            ketentuan
          </p>
        </Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
      </Card>
    </PageWrapper>
  );
}
