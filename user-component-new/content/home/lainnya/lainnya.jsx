import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Pagination from "react-js-pagination";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { Container } from "react-bootstrap";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import Select from "react-select";

import { getAllBerandaBerita } from "../../../../redux/actions/beranda/berita.actions";
import PulseLoaderRender from "../../../components/loader/PulseLoader";
import SubHeaderComponent from "../../../components/global/Breadcrumb.component";
import HomeWrapper from "../../../components/wrapper/Home.wrapper";

import styles from "../artikel/artikel.module.css";

const Berita = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const {
    loading: allLoading,
    error,
    pages,
    success,
  } = useSelector((state) => state.detailPage);

  // Style Select Filter
  const customStyle = {
    control: (styles) => ({
      ...styles,
      borderRadius: "30px",
      paddingLeft: "25px",
      fontFamily: "Poppins",
      fontSize: "14px",
    }),
    multiValue: (styles) => ({
      ...styles,
      backgroundColor: "#E6F2FF",
      borderRadius: "30px",
      fontFamily: "Poppins",
      fontSize: "14px",
    }),
    multiValueLabel: (styles) => ({
      ...styles,
      color: "#ADB5BD",
      fontFamily: "Poppins",
      fontSize: "14px",
    }),
  };

  return (
    <HomeWrapper>
      {/* BreadCrumb */}
      <SubHeaderComponent data={[{ link: router.asPath, name: "Berita" }]} />
      <div className="row">
        {pages.template_type === 0 && (
          <div className="col-12 order-1">
            <h3
              className="card-title font-weight-bolder text-dark w-100 pb-5 my-0 my-sm-5"
              style={{ fontSize: "40px" }}
            >
              {pages.name}
            </h3>
            <div className="" style={{ marginBottom: "48px" }}>
              <Image
                src={
                  process.env.END_POINT_API_IMAGE_SITE_MANAGEMENT +
                  "site-management/images/" +
                  pages.property_template.image
                }
                width="1500vw"
                height="413"
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
              <div className="col-md-4 mt-3">
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
    </HomeWrapper>
  );
};

export default Berita;
