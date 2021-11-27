import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import BreadcrumbComponent from "../../../components/global/Breadcrumb.component";
import { useRouter } from "next/router";
import HomeWrapper from "../../../components/wrapper/Home.wrapper";

const TentangKami = () => {
  const router = useRouter();
  return (
    <>
      <HomeWrapper>
        <BreadcrumbComponent
          data={[{ link: router.asPath, name: "Tentang Kami" }]}
        />
        <Row>
          <Col md={12}>
            <div className="ml-2 mb-3 title-pelatihan">
              <h1 className="fw-700 fz-40">Tentang Kami</h1>

              <div className="mt-5 mt-md-1">
                <p className="mr-6 fz-18 text-muted fw-400">
                  Informasi tentang Digitalent Scholarship Kominfo
                </p>
              </div>
            </div>
          </Col>
        </Row>

        <div className="p-10 border rounded-xl mt-5">
          <div
            className="fz-16"
            style={{
              color: "#212121",
              textAlign: "justify",
              letterSpacing: "0.015em",
            }}
          >
            <p>
              Program Digital Talent Scholarship adalah program pelatihan
              pengembangan kompetensi yang telah diberikan kepada talenta
              digital Indonesia sejak tahun 2018. Program Digital Talent
              Scholarship tahun 2021 didesain untuk menciptakan ekosistem
              seimbang dalam memaksimalkan peran pentahelix (pemerintah,
              komunitas/masyarakat, institusi pendidikan tinggi, dunia usaha,
              dan media) untuk menjadi fasilitator dan akselerator pendukung
              ekonomi digital.
            </p>
            <br />
            <p>
              Program Digital Talent Scholarship bertujuan untuk meningkatkan
              keterampilan dan daya saing, produktivitas, profesionalisme SDM
              bidang teknologi informasi dan komunikasi bagi angkatan kerja muda
              Indonesia, masyarakat umum, dan aparatur sipil negara. Program DTS
              2021 secara garis besar dibagi menjadi delapan akademi, yaitu:
              <br />
              <ol>
                <li>Fresh Graduate Academy (FGA)</li>
                <li>Vocational School Graduate Academy (VSGA)</li>
                <li>Thematic Academy (TA)</li>
                <li>Professional Academy (ProA)</li>
                <li>Government Transformation Academy (GTA)</li>
                <li>Digital Entrepreneurship Academy (DEA)</li>
                <li>Digital Leadership Academy (DLA)</li>
                <li>Talent Scouting Academy (TSA)</li>
              </ol>
            </p>
          </div>
        </div>
      </HomeWrapper>
    </>
  );
};

export default TentangKami;
