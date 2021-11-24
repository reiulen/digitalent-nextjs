import React, { Fragment, useState, useEffect } from "react";
import { Col } from "react-bootstrap";
import { useRouter } from "next/router";
import style from "../helpdesk.module.css";

export default function Index() {
  const router = useRouter();
  const [active, setActive] = useState(
    router.asPath.includes("formulir-pengaduan")
  );

  const sidebar = ["live-chat", "formulir-pengaduan", "hubungi-kami"];
  const [index, setIndex] = useState(null);
  const icon = ["question-answer-fill", "file-text-line", "phone-line"];
  useEffect(() => {
    const arr = router.asPath.split("/");
    const current = arr[arr.length - 1];
    setIndex(sidebar.indexOf(current));
  }, [router]);

  return (
    <Fragment>
      <Col md={4}>
        <h1 style={{ fontSize: "40px", fontWeight: 700 }}>BANTUAN</h1>
        <p className="fz-18 mb-18" style={{ color: "#6C6C6C" }}>
          Ada yang bisa kami bantu?
        </p>
        {sidebar &&
          sidebar.map((el, i) => (
            <a
              href={
                !el.includes("hubungi-kami")
                  ? `/helpdesk/${sidebar[i]}`
                  : 'tel:0213452841"'
              }
              className={`d-flex align-items-center mb-8 text-capitalize ${
                i === index
                  ? style.helpdesk_sidebar_active
                  : style.helpdesk_sidebar_inactive
              }`}
            >
              <div
                style={{ fontSize: "18px" }}
                className={`ri-${icon[i]} mr-4`}
              />
              {el.split("-").join(" ")}
            </a>
          ))}
      </Col>
    </Fragment>
  );
}
