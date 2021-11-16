import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import SubHeaderComponent from "../../components/template/Subheader.component";
import { useRouter } from "next/router";

const TentangKami = () => {
  const router = useRouter();
  return (
    <>
      <Container fluid className="px-md-30 px-10 py-10">
        <SubHeaderComponent
          data={[{ link: router.asPath, name: "Tentang Kami" }]}
        />
        <Row>
          <Col md={12}>
            <div className="ml-2 mb-3 title-pelatihan">
              <h1 className="fw-700 fz-36">Tentang Kami</h1>

              <div className="mt-5 mt-md-1">
                <p className="mr-6 fz-18 text-muted fw-500">
                  Informasi tentang Digitalent Scholarship Kominfo
                </p>
              </div>
            </div>
          </Col>
        </Row>

        <div className="p-4 border rounded mt-5">
          <div>
            Program Digital Talent Scholarship adalah program pelatihan
            pengembangan kompetensi yang telah diberikan kepada talenta digital
            Indonesia sejak tahun 2018. Program Digital Talent Scholarship tahun
            2021 didesain untuk menciptakan ekosistem seimbang dalam
            memaksimalkan peran pentahelix (pemerintah, komunitas/masyarakat,
            institusi pendidikan tinggi, dunia usaha, dan media) untuk menjadi
            fasilitator dan akselerator pendukung ekonomi digital. Program
            Digital Talent Scholarship bertujuan untuk meningkatkan keterampilan
            dan daya saing, produktivitas, profesionalisme SDM bidang teknologi
            informasi dan komunikasi bagi angkatan kerja muda Indonesia,
            masyarakat umum, dan aparatur sipil negara. Program DTS 2021 secara
            garis besar dibagi menjadi delapan akademi, yaitu: Fresh Graduate
            Academy (FGA) Vocational School Graduate Academy (VSGA) Thematic
            Academy (TA) Professional Academy (ProA) Government Transformation
            Academy (GTA) Digital Entrepreneurship Academy (DEA) Digital
            Leadership Academy (DLA) Talent Scouting Academy (TSA)
          </div>
        </div>
      </Container>
    </>
  );
};

export default TentangKami;
