import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Pagination from "react-js-pagination";
import PageWrapper from "../../../../wrapper/page.wrapper";
import { useDispatch, useSelector } from "react-redux";
import LoadingTable from "../../../../LoadingTable";
import IconEye from "../../../../assets/icon/Eye";
import IconPencil from "../../../../assets/icon/Pencil";
import IconDelete from "../../../../assets/icon/Delete";
import IconAdd from "../../../../assets/icon/Add";
import IconSearch from "../../../../assets/icon/Search";
import BgHeader from "../../../../../public/assets/icon/Header.svg";
import Image from "next/image";

const styleHeader = {
  height: "240px",
};

const styleCardContent = {
  position: "relative",
  top: "-4rem",
};

const listNumber = {
  listStyleType: "decimal",
};
// const styleBgHeader = {
//   position:"absolute",
//   inset:"0",
// }

const TentangKami = ({ token }) => {
  let dispatch = useDispatch();
  const router = useRouter();

  const {
    loading: allLoading,
    error,
    pages,
    success,
  } = useSelector((state) => state.detailPage);

  const onNewReset = () => {
    router.replace("/site-management/api", undefined, {
      shallow: true,
    });
  };
  return (
    <PageWrapper>
      <div className="row">
        <div className="col-12 order-1">
          <div className="card card-custom card-stretch gutter-b">
            <div
              className="card-header border-0 position-relative"
              style={styleHeader}
            >
              <div>
                <Image
                  src={BgHeader}
                  alt="Picture of the author"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <h3
                className="card-title font-weight-bolder text-dark border-bottom w-100 pb-5 mb-5 mt-5"
                style={{ fontSize: "24px" }}
              >
                Tentang Kami
              </h3>
            </div>
            <div className="card-body pt-0">
              <div className="card gutter-b" style={styleCardContent}>
                {/* <div className="card-header">
                  <div className="card-title">
                    <h3 className="card-label">
                      Basic Card
                      <small>sub title</small>
                    </h3>
                  </div>
                </div> */}
                <div className="card-body fz-16">
                  <div
                className="ml-2"
                dangerouslySetInnerHTML={{ __html: pages.content }}
              />
                  {/* <p>
                    Program Digital Talent Scholarship adalah program pelatihan
                    pengembangan kompetensi yang telah diberikan kepada talenta
                    digital Indonesia sejak tahun 2018. Program Digital Talent
                    Scholarship tahun 2021 didesain untuk menciptakan ekosistem
                    seimbang dalam memaksimalkan peran pentahelix (pemerintah,
                    komunitas/masyarakat, institusi pendidikan tinggi, dunia
                    usaha, dan media) untuk menjadi fasilitator dan akselerator
                    pendukung ekonomi digital.
                  </p>
                  <p>
                    Program Digital Talent Scholarship bertujuan untuk
                    meningkatkan keterampilan dan daya saing, produktivitas,
                    profesionalisme SDM bidang teknologi informasi dan
                    komunikasi bagi angkatan kerja muda Indonesia, masyarakat
                    umum, dan aparatur sipil negara.
                  </p>
                  <p>
                    Program DTS 2021 secara garis besar dibagi menjadi delapan
                    akademi, yaitu:
                  </p>
                  <ul style={listNumber}>
                    <li>Fresh Graduate Academy (FGA)</li>
                    <li>Vocational School Graduate Academy (VSGA)</li>
                    <li>Thematic Academy (TA)</li>
                    <li>Professional Academy (ProA)</li>
                    <li>Government Transformation Academy (GTA)</li>
                    <li>Digital Entrepreneurship Academy (DEA)</li>
                    <li>Digital Leadership Academy (DLA)</li>
                    <li>Talent Scouting Academy (TSA)</li>
                  </ul> */}
                </div>
              </div>
            </div>
          </div>
        </div>{" "}
      </div>
    </PageWrapper>
  );
};

export default TentangKami;
