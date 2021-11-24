import React, { useState, useEffect } from "react";

import Link from "next/link";
import PageWrapper from "../../../wrapper/page.wrapper";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  cancelChangeCategory,
  cancelChangeNamaLembaga,
  fetchListCooperationSelectById,
  fetchDataEmail,
} from "../../../../redux/actions/partnership/managementCooporation.actions";
import moment from "moment";

import Swal from "sweetalert2";

import Image from "next/image";

const EditDokumentKerjasamaById = ({ token }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const allMK = useSelector((state) => state.allMK);
  //
  //
  // state onchange form data
  const [isntitusiName, setIsntitusiName] = useState("");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [cooperationID, setCooperationID] = useState("");
  const [cooperationC_id, setCooperationC_id] = useState("");
  const [period, setPeriod] = useState("");
  const [periodUnit, setPeriodUnit] = useState("tahun");
  const [periodDateStart, setPeriodDateStart] = useState("");
  const [periodDateEnd, setPeriodDateEnd] = useState("");
  const [aggrementNumber, setAggrementNumber] = useState("");
  const [aggrementNumberInfo, setAggrementNumberInfo] = useState("");
  const [signinDate, setSigninDate] = useState("");
  const [email, setEmail] = useState("");

  // pdf from api
  const [document, setDocument] = useState("");

  const [AllCooperation, setAllCooperation] = useState("");
  const changeFormCooporation = (index, e) => {
    let dataaa = [...allMK.singleCooporationSelect.data.option];
    dataaa[index].cooperation = e.target.value;
    setAllCooperation(dataaa);
  };

  useEffect(() => {
    async function setDataSingle(id, token) {
      try {
        let { data } = await axios.get(
          `${process.env.END_POINT_API_PARTNERSHIP}api/cooperations/proposal/${id}`,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        if (data) {
          setIsntitusiName(data.data.institution_name);
          setTitle(data.data.title);
          setDate(data.data.submission_date);
          setCooperationID(data.data.cooperation_category);
          setPeriod(data.data.period);
          setPeriodUnit(data.data.period_unit);
          setPeriodDateStart(data.data.period_date_start);
          setPeriodDateEnd(data.data.period_date_end);
          setAggrementNumber(data.data.agreement_number_partner);
          setAggrementNumberInfo(data.data.agreement_number_kemkominfo);
          setSigninDate(data.data.signing_date);
          setDocument(data.data.document_file);
          setEmail(data.data.email);
        }
      } catch (error) {
        Swal.fire("Gagal", `${error.response.data.message}`, "error");
      }
    }
    setDataSingle(router.query.id, token);
    dispatch(cancelChangeCategory());
    dispatch(cancelChangeNamaLembaga());
  }, [dispatch, router.query.id, token]);

  useEffect(() => {
    dispatch(fetchListCooperationSelectById(token, cooperationC_id));
  }, [dispatch, allMK.idCooporationSelect, cooperationC_id, token]);

  useEffect(() => {
    dispatch(fetchDataEmail(token));
  }, [dispatch, allMK.institution_name, allMK.stateListMitra, token]);

  return (
    <PageWrapper>
      <div className="col-lg-12 col-xxl-12 order-1 order-xxl-2 px-0">
        <div className="card card-custom card-stretch gutter-b">
          <div className="card-header border-0">
            <h3 className="card-title font-weight-bolder text-dark titles-1">
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
              <p className="fz-16">{date}</p>

              <label
                htmlFor="staticEmail"
                className="col-form-label fz-14"
                style={{ color: "#6C6C6C" }}
              >
                Judul kerjasama
              </label>
              <p className="fz-16">{title}</p>

              <label
                htmlFor="staticEmail"
                className="col-form-label fz-14"
                style={{ color: "#6C6C6C" }}
              >
                Kategori kerjasama
              </label>
              <p className="fz-16">{cooperationID.name}</p>

              <label
                htmlFor="staticEmail"
                className="col-form-label fz-14"
                style={{ color: "#6C6C6C" }}
              >
                Periode Kerjasama
              </label>
              <p className="fz-16">
                {period}
                Tahun ({moment(periodDateStart).format("DD MMMM YYYY")}
                &nbsp;-&nbsp;
                {moment(periodDateEnd).format("DD MMMM YYYY")})
              </p>

              <label
                htmlFor="staticEmail"
                className="col-form-label fz-14"
                style={{ color: "#6C6C6C" }}
              >
                Nama Lembaga
              </label>
              <p className="fz-16">{isntitusiName}</p>

              <label
                htmlFor="staticEmail"
                className="col-form-label fz-14"
                style={{ color: "#6C6C6C" }}
              >
                Email
              </label>
              <p className="fz-16">{email}</p>

              <div className="row">
                <div className="col-12 col-xl-6">
                  <label
                    htmlFor="staticEmail"
                    className="col-form-label fz-14"
                    style={{ color: "#6C6C6C" }}
                  >
                    Nomor Perjanjian Lembaga
                  </label>
                  <p className="fz-16">{aggrementNumber}</p>
                </div>
                <div className="col-12 col-xl-6">
                  <label
                    htmlFor="staticEmail"
                    className="col-form-label fz-14"
                    style={{ color: "#6C6C6C" }}
                  >
                    Nomor Perjanjian KemKominfo
                  </label>
                  <p className="fz-16">{aggrementNumberInfo}</p>
                </div>
              </div>

              <label
                htmlFor="staticEmail"
                className="col-form-label fz-14"
                style={{ color: "#6C6C6C" }}
              >
                Tanggal tanda Tangan
              </label>
              <p className="fz-16">{signinDate}</p>
              <label
                htmlFor="staticEmail"
                className="col-form-label fz-14"
                style={{ color: "#6C6C6C" }}
              >
                Dokumen Kerjasama
              </label>

              <div className="border-bottom pb-6">
                <button
                  type="button"
                  className="btn bg-blue-secondary text-white rounded-full d-flex align-items-center"
                  onClick={() =>
                    window.open(
                      `https://dts-partnership-dev.s3.ap-southeast-1.amazonaws.com${document}`
                    )
                  }
                >
                  <Image
                    src="/assets/icon/download-2-fill.svg"
                    width={16}
                    height={16}
                    alt="imagess"
                  />{" "}
                  <p className="mb-0 ml-2">Unduh</p>
                </button>
              </div>

              {cooperationID === ""
                ? ""
                : cooperationID.data_content.map((items, i) => {
                    return (
                      <div
                        key={i}
                        className={`form-group ${
                          allMK.stateListKerjaSama.length !== 0 ? "d-none" : ""
                        }`}
                      >
                        <label
                          htmlFor="staticEmail"
                          className="col-form-label fz-14"
                          style={{ color: "#6C6C6C" }}
                        >
                          {items.cooperation_form}
                        </label>
                        <p className="fz-16">{items.form_content}</p>
                      </div>
                    );
                  })}
              {/* loop first end loop*/}

              {/* looping second */}
              {allMK.singleCooporationSelect.length === 0
                ? ""
                : allMK.singleCooporationSelect.data.option.map(
                    (items, index) => {
                      return (
                        <div
                          key={index}
                          className={`form-group row ${
                            allMK.stateListKerjaSama.length === 0
                              ? "d-none"
                              : ""
                          }`}
                        >
                          <label
                            htmlFor="staticEmail"
                            className="col-sm-2 col-form-label"
                          >
                            {items.cooperation_form}
                          </label>
                          <div className="col-sm-10">
                            <textarea
                              required
                              onChange={(e) => changeFormCooporation(index, e)}
                              name="cooperation"
                              id={index + 1}
                              cols="30"
                              rows="5"
                              className="form-control"
                              placeholder="Masukan Tujuan Kerjasama"
                            ></textarea>
                          </div>
                        </div>
                      );
                    }
                  )}
              {/* end looping second */}
              <div className="form-group">
                <div className="d-flex flex-column flex-sm-row justify-content-sm-end justify-content-start">
                  <Link
                    href={{
                      pathname:
                        "/partnership/mitra/detail-data-kerjasama-mitra",
                      query: { id: router.query.id },
                    }}
                    className="mr-2"
                  >
                    <a className="btn btn-sm btn-white btn-rounded-full text-blue-primary d-flex justify-content-center">
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

export default EditDokumentKerjasamaById;
