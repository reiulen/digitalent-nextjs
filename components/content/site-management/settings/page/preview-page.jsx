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

  console.log(pages);
  return (
    <PageWrapper>
      <div className="row">
        {pages.template_type === 0 && (
          <div className="col-12 order-1">
            <h3
              className="card-title font-weight-bolder text-dark w-100 pb-5 my-0 my-sm-5"
              style={{ fontSize: "40px" }}
            >
              {pages.name}
            </h3>
            <div className="">
              <Image
                src={
                  process.env.END_POINT_API_IMAGE_SITE_MANAGEMENT +
                  "site-management/images/" +
                  pages.property_template.image
                }
                width="1500vw"
                height="1000vh"
                objectFit="fill"
                alt="Detail Image"
                className="rounded-lg"
              />
            </div>
            <div className="border-rounded">
              <div className="border rounded-lg mb-5">
                <div
                  className="row my-5 mx-5 text-justify"
                  style={{ overflowX: "hidden" }}
                >
                  <div
                    dangerouslySetInnerHTML={{
                      __html: pages.property_template.content,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {pages.template_type === 1 && (
          <div className="col-12 order-1">
            <h3
              className="card-title font-weight-bolder text-dark w-100 pb-5 my-0 my-sm-5"
              style={{ fontSize: "40px" }}
            >
              {pages.name}
            </h3>
            <div className="border-rounded">
              <div className="border rounded-lg mb-5">
                <div
                  className="row my-5 mx-5 text-justify"
                  style={{ overflowX: "hidden" }}
                >
                  <div
                    dangerouslySetInnerHTML={{
                      __html: pages.property_template.content,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {pages.template_type === 2 && (
          <div className="col-12 order-1">
            <h3
              className="card-title font-weight-bolder text-dark w-100 pb-5 my-0 my-sm-5"
              style={{ fontSize: "40px" }}
            >
              {pages.name}
            </h3>
            <div className="row">
              <div className="col-md-3 mt-3">
                <Image
                  src={
                    process.env.END_POINT_API_IMAGE_SITE_MANAGEMENT +
                    "site-management/images/" +
                    pages.property_template.image
                  }
                  width="1500vw"
                  height="1000vh"
                  objectFit="fill"
                  alt="Detail Image"
                  className="rounded-lg"
                />
              </div>
              <div className="border-rounded col-md-8 mt-3">
                <div className="border rounded-lg mb-5">
                  <div
                    className="row my-5 mx-5 text-justify"
                    style={{ overflowX: "hidden" }}
                  >
                    <div
                      dangerouslySetInnerHTML={{
                        __html: pages.property_template.content,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </PageWrapper>
  );
};

export default TentangKami;
