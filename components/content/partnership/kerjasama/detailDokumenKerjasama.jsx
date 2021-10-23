import React, { useState, useRef, useEffect } from "react";

import Link from "next/link";
import PageWrapper from "../../../wrapper/page.wrapper";
import DatePicker from "react-datepicker";
import { addDays } from "date-fns";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getSingleCooperation } from "../../../../redux/actions/partnership/managementCooporation.actions";
import Image from 'next/image'

const DetailDokumenKerjasama = ({ token }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  let { success } = router.query;
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const allMK = useSelector((state) => state.allMK);

  const [pdfFIle, setPdfFIle] = useState("");

  useEffect(() => {
    async function getSingleValue(id) {
      try {
        let { data } = await axios.get(
          `${process.env.END_POINT_API_PARTNERSHIP}api/cooperations/proposal/${id}`,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        setPdfFIle(data.data.document_file);
      } catch (error) {
        notify(error.response.data.message);
      }
    }

    getSingleValue(router.query.id);
    dispatch(getSingleCooperation(token, router.query.id));
  }, [dispatch, router.query.id, token]);

  return (
    <PageWrapper>
      {success && (
        <div
          className="alert alert-custom alert-light-success fade show mb-5"
          role="alert"
        >
          <div className="alert-icon">
            <i className="flaticon2-checkmark"></i>
          </div>
          <div className="alert-text">Berhasil Menyimpan Data</div>
          <div className="alert-close">
            <button
              type="button"
              className="close"
              data-dismiss="alert"
              aria-label="Close"
            >
              <span aria-hidden="true">
                <i className="ki ki-close"></i>
              </span>
            </button>
          </div>
        </div>
      )}

      <div className="col-lg-12 col-xxl-12 order-1 order-xxl-2 px-0">
        <div className="card card-custom card-stretch gutter-b">
          <div className="card-header border-0">
            <h3
              className="card-title font-weight-bolder text-dark mb-0 titles-1"
     
            >
              Detail Kerjasama
            </h3>
          </div>

          <div className="card-body pt-0">
            <form>

              <label
                htmlFor="staticEmail"
                className="col-form-label fz-14"
                style={{ color: "#6C6C6C" }}
              >
                Tanggal
              </label>
              <p className="fz-16">
                {allMK.cooperationById.length === 0
                  ? ""
                  : allMK.cooperationById.data.submission_date}
              </p>
              <label
                htmlFor="staticEmail"
                className="col-form-label fz-14"
                style={{ color: "#6C6C6C" }}
              >
                Judul kerjasama
              </label>
              <p className="fz-16">
                {allMK.cooperationById.length === 0
                  ? ""
                  : allMK.cooperationById.data.title}
              </p>

              <label
                htmlFor="staticEmail"
                className="col-form-label fz-14"
                style={{ color: "#6C6C6C" }}
              >
                Kategori kerjasama
              </label>
              <p className="fz-16">
                {allMK.cooperationById.length === 0
                  ? ""
                  : allMK.cooperationById.data.cooperation_category.name}
              </p>

              <label
                htmlFor="staticEmail"
                className="col-form-label fz-14"
                style={{ color: "#6C6C6C" }}
              >
                Periode Kerjasama
              </label>
              <p className="fz-16">
                {allMK.cooperationById.length === 0
                  ? ""
                  : allMK.cooperationById.data.period}{" "}
                Tahun (
                {allMK.cooperationById.length === 0
                  ? ""
                  : moment(allMK.cooperationById.data.period_date_start).format(
                      "DD MMMM YYYY"
                    )}
                &nbsp;-&nbsp;
                {allMK.cooperationById.length === 0
                  ? ""
                  : moment(allMK.cooperationById.data.period_date_end).format(
                      "DD MMMM YYYY"
                    )}
                )
              </p>

              <div className="row">
                <div className="col-12 col-sm-6">
                  <label
                    htmlFor="staticEmail"
                    className="col-form-label fz-14"
                    style={{ color: "#6C6C6C" }}
                  >
                    Nomor Perjanjian Lembaga
                  </label>
                  <p className="fz-16">
                    {allMK.cooperationById.length === 0
                      ? ""
                      : allMK.cooperationById.data.agreement_number_partner}
                  </p>
                </div>
                <div className="col-12 col-sm-6">
                  <label
                    htmlFor="staticEmail"
                    className="col-form-label fz-14"
                    style={{ color: "#6C6C6C" }}
                  >
                    Nomor Perjanjian KemKominfo
                  </label>
                  <p className="fz-16">
                    {allMK.cooperationById.length === 0
                      ? ""
                      : allMK.cooperationById.data.agreement_number_kemkominfo}
                  </p>
                </div>
              </div>

              

              <label
                htmlFor="staticEmail"
                className="col-form-label fz-14"
                style={{ color: "#6C6C6C" }}
              >
                Tanggal Penandatanganan
              </label>
              <p className="fz-16">
                {allMK.cooperationById.length === 0
                  ? ""
                  : allMK.cooperationById.data.signing_date}
              </p>

              <label
                htmlFor="staticEmail"
                className="col-form-label fz-14"
                style={{ color: "#6C6C6C" }}
              >
                Dokumen Kerjasama
              </label>

              <div className="border-bottom pb-6">
              <button type="button" className="btn bg-blue-secondary text-white rounded-full d-flex align-items-center" onClick={() =>
                      window.open(
                        `https://dts-partnership-dev.s3.ap-southeast-1.amazonaws.com/partnership/files/document_cooperations/${pdfFIle}`
                      )
                    }>
                
                <Image
                  src="/assets/icon/download-2-fill.svg"
                  width={16}
                  height={16}
                  alt="imagess"
                />{" "}
                <p className="mb-0 ml-2">Unduh</p>
              </button>
              </div>

              {allMK.cooperationById.length === 0 ? (
                ""
              ) : allMK.cooperationById.data.cooperation_category.data_content
                  .cooperation_form === "-" ? (
                <h1 className="my-4">Data kerja sama tidak ada</h1>
              ) : (
                allMK.cooperationById.data.cooperation_category.data_content.map(
                  (items, i) => {
                    return (
                      <div className="form-group" key={i}>
                       
                        <label
                htmlFor="staticEmail"
                className="col-form-label fz-14"
                style={{ color: "#6C6C6C" }}
              >
                {items.cooperation_form}
              </label>
              <p className="fz-16">
                {items.form_content}
              </p>


                      </div>
                    );
                  }
                )
              )}
              {/* loop end loop*/}

              <div className="form-group row">
                <div className="col-sm-12 d-flex justify-content-end">
                  <Link href="/partnership/kerjasama">
                    <a className="btn btn-sm btn-white btn-rounded-full text-blue-primary">
                      Kembali
                    </a>
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default DetailDokumenKerjasama;
