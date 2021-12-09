import React from "react";
import SubHeaderComponent from "../../../components/global/Breadcrumb.component";
import { useRouter } from "next/router";
import { Container } from "react-bootstrap";
import Script from "next/script";
import Sidebar from "../../../components/template/helpdesk/index";

export default function FormPengaduan() {
  const router = useRouter();

  return (
    <Container fluid className="px-md-17 px-10 py-10 bg-white">
      <SubHeaderComponent data={[{ link: router.asPath, name: "Helpdesk" }]} />
      <Sidebar>
        <h1 className={`font-weight-boldest text-blue-primary mb-15 `}>
          Live Chat
        </h1>
        <div className="h-700px d-flex justify-content-center">
          <iframe
            src="https://chat.sociomile.com/livechat/57c6e0e722c054db65f99267"
            width="700px"
            // height="100%"
            className=" m-0 p-0 border-0"
          />
        </div>
      </Sidebar>
    </Container>
  );
}
