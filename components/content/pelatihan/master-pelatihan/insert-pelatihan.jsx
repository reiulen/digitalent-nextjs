// #Next & React
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
// #Page, Component & Library
import PageWrapper from "../../../wrapper/page.wrapper";

// #Icon
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  getAllSertifikat,
  searchKeyword,
  setValueAcademy,
  setValueTheme,
} from "../../../../redux/actions/sertifikat/kelola-sertifikat.action";
import { RESET_VALUE_FILTER } from "../../../../redux/types/sertifikat/kelola-sertifikat.type";

import { Card } from "react-bootstrap";
export default function MasterPelatihan({ token }) {
  const router = useRouter();
  const dispatch = useDispatch();

  const { loading, error, certificate, academyOptions, themeOptions } =
    useSelector((state) => state.allCertificates);

  const allCertificates = useSelector((state) => state.allCertificates);
  const [academy, setAcademy] = useState("");
  const [temaPelatihan, setTemaPelatihan] = useState("");
  const [disable, setDisable] = useState(true);
  const [dataTemaPelatihan, setDataTemaPelatihan] = useState([]);
  const [dataAcademy, setDataAcademy] = useState([]);
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(null);

  let selectRefAkademi = null;
  let temaRef = null;

  const resetValueSort = (e) => {
    e.preventDefault();
    temaRef.select.clearValue();
    selectRefAkademi.select.clearValue();
    setDisable(true);
    dispatch({ type: RESET_VALUE_FILTER });
  };

  useEffect(() => {
    let arr = [];
    academyOptions.forEach((el) => {
      arr.push({ id: el.id, value: el.name, label: el.name });
    });
    setDataAcademy(arr);
  }, [academyOptions]);

  useEffect(() => {
    const filteredTheme = themeOptions.filter(
      (items) => items.id == academy?.id
    );
    const data = filteredTheme.map((el) => {
      return { ...el, value: el.name, label: el.name };
    });
    setDataTemaPelatihan(data);
  }, [academy, themeOptions]);

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(searchKeyword(search));
  };

  const handleSelectAcademy = (e) => {
    setAcademy(e);
    setDisable(false);
    temaRef.select.clearValue();
  };

  const handleFilter = (e) => {
    e.preventDefault();
    if (!academy && !temaPelatihan) {
      Swal.fire(
        "Oops !",
        "Harap memilih kategori Akademi atau Tema pelatihan terlebih dahulu.",
        "error"
      );
    } else {
      if (academy) {
        dispatch(setValueAcademy(academy.value));
      }
      if (temaPelatihan) {
        dispatch(setValueTheme(temaPelatihan.value));
      }
    }
  };

  const handleResetError = () => {
    if (error) {
      dispatch(clearErrors);
    }
  };

  useEffect(() => {
    dispatch(getAllSertifikat(token));
  }, [
    dispatch,
    token,
    allCertificates.keyword,
    allCertificates.page,
    allCertificates.theme,
    allCertificates.academy,
    allCertificates.limit,
  ]);

  const list = [
    {
      no: 1,
      id_pelatihan: "C001",
      name: "Nama Form Pendaftaran",
      status: "listed",
    },
    {
      no: 2,
      id_pelatihan: "C002",
      name: "Nama Form Pendaftaran",
      status: "listed",
    },
    {
      no: 3,
      id_pelatihan: "C003",
      name: "Nama Form Pendaftaran",
      status: "unlisted",
    },
    {
      no: 4,
      id_pelatihan: "C004",
      name: "Nama Form Pendaftaran",
      status: "listed",
    },
  ];

  const [radio, setRadio] = useState(1);
  const [judul, setJudul] = useState("");

  useEffect(() => {
    console.log(judul);
  }, [judul]);

  return (
    <PageWrapper>
      {/* error START */}
      {error ? (
        <div
          className="alert alert-custom alert-light-danger fade show mb-5"
          role="alert"
        >
          <div className="alert-icon">
            <i className="flaticon-warning"></i>
          </div>
          <div className="alert-text">{error}</div>
          <div className="alert-close">
            <button
              type="button"
              className="close"
              data-dismiss="alert"
              aria-label="Close"
              onClick={handleResetError}
            >
              <span aria-hidden="true">
                <i className="ki ki-close"></i>
              </span>
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
      {/* error END */}
      <div className="col-lg-12 order-1 px-0">
        <Card className="card-custom card-stretch gutter-b">
          <Card.Header className="card-header border-0">
            <h3 className="card-title font-weight-bolder text-dark">
              Tambah Form Pendaftaran
            </h3>
          </Card.Header>

          <Card.Body className="pt-0">
            <p>Tambah Form</p>
            <div className="d-flex justify-content-start">
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="method"
                  value="1"
                  checked={radio == 1}
                  onChange={() => setRadio(1)}
                />
                <label className="form-check-label">Buat Manual</label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="method"
                  value="2"
                  checked={radio == 2}
                  onChange={() => setRadio(2)}
                />
                <label className="form-check-label">Copy Form</label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="method"
                  value="2"
                  checked={radio == 2}
                  onChange={() => setRadio(3)}
                />
                <label className="form-check-label">Copy & edit form</label>
              </div>
            </div>
            <div className="mt-8 mb-3">Judul Form</div>
            <input
              className="form-control"
              placeholder="Silahkan Masukkan Judul Form"
              onChange={(e) => setJudul(e.currentTarget.value)}
            />
          </Card.Body>
        </Card>
      </div>
    </PageWrapper>
  );
}
