/* eslint-disable react-hooks/rules-of-hooks */
import React, { useRef, useState, useEffect } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import Select from "react-select";
import Swal from "sweetalert2";
import SimpleReactValidator from "simple-react-validator";
import { useDispatch, useSelector } from "react-redux";
import style from "../style.module.css";

import {
  updateProfilePendidikan,
  clearErrors,
  getProfilePendidikan,
  getDataAsalSekolah,
} from "../../../../../redux/actions/pelatihan/profile.actions";
import { UPDATE_PENDIDIKAN_RESET } from "../../../../../redux/types/pelatihan/profile.type";
import {
  helperRegexNumberIpk,
  helperRegexNumber,
  helperRemoveZeroFromIndex0,
  SweatAlert,
} from "../../../../../utils/middleware/helper";
import moment from "moment";

const PendidikanEdit = ({ funcViewEdit, token, wizzard }) => {
  const dispatch = useDispatch();
  const simpleValidator = useRef(new SimpleReactValidator({ locale: "id" }));
  const [, forceUpdate] = useState();

  const { data: dataAsalSekolah } = useSelector(
    (state) => state.getAsalSekolah
  );

  const { error: errorPendidikan, data: dataPendidikan } = useSelector(
    (state) => state.drowpdownPendidikan
  );
  const { error: errorPendidikanData, pendidikan } = useSelector(
    (state) => state.dataPendidikan
  );

  const {
    error: errorUpdateData,
    loading,
    success,
  } = useSelector((state) => state.updatePendidikan);

  const [jengjangPendidikan, setJenjangPendidikan] = useState(
    (pendidikan && {
      value: pendidikan.jenjang,
      label: pendidikan.jenjang,
    }) || {
      value: "",
      label: "",
    }
  );

  const [asalSekolah, setAsalSekolah] = useState(
    (pendidikan && pendidikan.asal_pendidikan) || ""
  );
  const [lainya, setLainya] = useState((pendidikan && pendidikan.lainya) || "");
  const [programStudi, setProgramStudi] = useState(
    (pendidikan && pendidikan.program_studi) || ""
  );
  const [ipk, setIpk] = useState((pendidikan && pendidikan.ipk) || "");
  const [tahunMasuk, setTahunMasuk] = useState(
    (pendidikan && pendidikan.tahun_masuk) || ""
  );

  const [ijazahName, setIjazahName] = useState(
    pendidikan ? pendidikan.ijasah.split("/ijasah/") : "Belum ada file"
  );
  const [ijazah, setIjazah] = useState("");
  const [ijazahPreview, setIjazahPreview] = useState("");

  const [dataSearch, setDataSearch] = useState([]);
  const optionsJenjangPendidikan = [];
  if (dataPendidikan) {
    for (let index = 0; index < dataPendidikan.data.length; index++) {
      let val = {
        value: dataPendidikan.data[index].id,
        label: dataPendidikan.data[index].label,
      };
      optionsJenjangPendidikan.push(val);
    }
  }

  useEffect(() => {
    dispatch(getDataAsalSekolah(token));

    if (errorUpdateData) {
      SweatAlert("Gagal", errorUpdateData, "error");
      dispatch(clearErrors());
    }

    if (success) {
      SweatAlert("Berhasil", "Berhasil Update Data", "success");
      dispatch({ type: UPDATE_PENDIDIKAN_RESET });
      if (wizzard) {
        funcViewEdit(4);
      } else {
        funcViewEdit(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    success,
    errorUpdateData,
    dispatch,
    jengjangPendidikan.value,
    funcViewEdit,
    token,
    asalSekolah,
  ]);

  const optionsAsalSekolah = [];

  dataAsalSekolah &&
    dataAsalSekolah.map((item) => {
      optionsAsalSekolah.push({
        value: item.id,
        label: item.label,
      });
    });
  const searchAsal = (word) => {
    let array = [];
    const searchData = getAsalSekolah;
    searchData.filter((data, index) => {
      if (data.value.toLowerCase().includes(word.toLowerCase())) {
        array.push(data);
      }
    });
    setDataSearch(array);
  };

  const onChangeIjazah = (e) => {
    const type = ["image/jpeg", "image/jpg", "application/pdf"];
    if (e.target.files[0]) {
      if (type.includes(e.target.files[0].type)) {
        if (e.target.files[0].size > 5000000) {
          e.target.value = null;
          Swal.fire("Oops !", "Gambar maksimal 5 MB.", "error");
        } else {
          const reader = new FileReader();
          reader.onload = () => {
            if (reader.readyState === 2) {
              setIjazah(reader.result);
            }
          };
          reader.readAsDataURL(e.target.files[0]);
          setIjazahPreview(e.target.files[0]);
          setIjazahName(e.target.files[0].name);
        }
      } else {
        e.target.value = null;
        Swal.fire(
          "Oops !",
          "Data yang bisa dimasukkan hanya berupa data jpg atau pdf.",
          "error"
        );
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let data = {};
    if (simpleValidator.current.allValid()) {
      if (jengjangPendidikan.label === "Tidak Sekolah") {
        data = {
          jenjang: jengjangPendidikan.label,
          asal_pendidikan: "-",
          lainya: "-",
          program_studi: "-",
          ipk: "0",
          tahun_masuk: parseInt("1"),
          ijasah: "",
        };
      } else if (
        jengjangPendidikan.label === "TK" ||
        jengjangPendidikan.label === "SD/Sederajat" ||
        jengjangPendidikan.label === "SMP/Sederajat"
      ) {
        data = {
          jenjang: jengjangPendidikan.label,
          asal_pendidikan: "0",
          lainya,
          program_studi: "0",
          ipk: "0",
          tahun_masuk: parseInt(tahunMasuk),
          ijasah: ijazah,
        };
      } else if (jengjangPendidikan.label === "SMA/Sederajat") {
        data = {
          jenjang: jengjangPendidikan.label,
          asal_pendidikan: asalSekolah,
          lainya: "-",
          program_studi: "0",
          ipk: "0",
          tahun_masuk: parseInt(tahunMasuk),
          ijasah: ijazah,
        };
      } else if (
        jengjangPendidikan.label === "D3" ||
        jengjangPendidikan.label === "D4" ||
        jengjangPendidikan.label === "S1" ||
        jengjangPendidikan.label === "S2" ||
        jengjangPendidikan.label === "S3"
      ) {
        data = {
          jenjang: jengjangPendidikan.label,
          asal_pendidikan: asalSekolah,
          lainya: "-",
          program_studi: programStudi,
          ipk: `${ipk}`,
          tahun_masuk: parseInt(tahunMasuk),
          ijasah: ijazah,
        };
      }
      dispatch(updateProfilePendidikan(data, token));
      window.scrollTo(0, 0);
    } else {
      simpleValidator.current.showMessages();
      forceUpdate(1);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Isi data dengan benar !",
      });
    }
  };

  useEffect(() => {
    if (tahunMasuk > moment().year()) {
      setTahunMasuk(moment().year());
    }
  }, [tahunMasuk]);

  useEffect(() => {
    const validateIpk = /^[0-9]+\.[0-9][0-9][0-9][0-9]$/;
    if (ipk >= 4) {
      setIpk(4);
    }
    if (validateIpk.test(ipk)) {
      setIpk(Math.round(ipk));
    }
    const target = document.getElementById("formGridIpk");
    if (target) {
      target.onkeydown = (e) => {
        if (e.code == "Minus") {
          return false;
        }
        if (e.code == "NumpadAdd") {
          return false;
        }
        if (e.code == "NumpadSubtract") {
          return false;
        }
        if (e.code == "Equal") {
          return false;
        }
        if (e.code == "Comma") {
          return false;
        }
      };
    }
  }, [ipk]);

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <div className="informasi-pribadi">
          <h3 className="font-weight-bolder mb-5">Pendidikan Terakhir</h3>
          <Form.Group className="mb-3" controlId="formGridAddress1">
            <Form.Label>Jenjang Pendidikan</Form.Label>
            <div className="position-relative" style={{ zIndex: "5" }}>
              <Select
                placeholder={
                  (pendidikan && pendidikan.jenjang) ||
                  "Silahkan Pilih Asal Jenjang Pendidikan"
                }
                options={optionsJenjangPendidikan}
                defaultValue={jengjangPendidikan}
                onChange={(e) =>
                  setJenjangPendidikan({ label: e.label, value: e.value })
                }
                onBlur={() =>
                  simpleValidator.current.showMessageFor("jenjang pendidikan")
                }
              />
            </div>
            {simpleValidator.current.message(
              "jenjang pendidikan",
              jengjangPendidikan,
              "required",
              {
                className: "text-danger",
              }
            )}
          </Form.Group>
          {jengjangPendidikan.value === 19 && <div className=""></div>}
          {jengjangPendidikan.label === "SMA/Sederajat" && (
            <Form.Group className="mb-3" controlId="formGridAdress1">
              <Form.Label>Asal Sekolah / Perguruan Tinggi</Form.Label>
              <div className="position-relative" style={{ zIndex: "4" }}>
                <Select
                  // list="data"
                  placeholder={asalSekolah || "Pilih Sekolah"}
                  options={optionsAsalSekolah}
                  // className="form-control"
                  defaultValue={asalSekolah}
                  onChange={(e) => {
                    setAsalSekolah(e.label);
                  }}
                />
              </div>
              {simpleValidator.current.message(
                "asal sekolah",
                asalSekolah,
                asalSekolah === null ? "required" : "",
                {
                  className: "text-danger",
                }
              )}
            </Form.Group>
          )}
          {jengjangPendidikan.label === "D3" && (
            <Row>
              <Form.Group
                as={Col}
                md={6}
                className="mb-3"
                controlId="formGridAdress1"
              >
                <Form.Label>Asal Sekolah / Perguruan Tinggi</Form.Label>
                <div className="position-relative" style={{ zIndex: "4" }}>
                  <Select
                    placeholder={asalSekolah || "Pilih Sekolah"}
                    options={optionsAsalSekolah}
                    selectedValue={asalSekolah}
                    onChange={(e) => {
                      setAsalSekolah(e.label);
                    }}
                  />
                </div>
                {simpleValidator.current.message(
                  "asal sekolah",
                  asalSekolah,
                  asalSekolah === null ? "required" : "",
                  {
                    className: "text-danger",
                  }
                )}
              </Form.Group>
              <Form.Group
                as={Col}
                md={6}
                className="mb-3"
                controlId="formGridAddress1"
              >
                <Form.Label>Program Studi</Form.Label>
                <Form.Control
                  placeholder={
                    programStudi === "0" && "Silahkan Masukan Program Studi"
                  }
                  value={programStudi === "0" ? "-" : programStudi}
                  onChange={(e) => setProgramStudi(e.target.value)}
                  onBlur={() =>
                    simpleValidator.current.showMessageFor("program studi")
                  }
                />
                {simpleValidator.current.message(
                  "program studi",
                  programStudi,
                  programStudi === null ? "required" : "",
                  {
                    className: "text-danger",
                  }
                )}
              </Form.Group>
            </Row>
          )}
          {jengjangPendidikan.label === "D4" && (
            <Row>
              <Form.Group
                as={Col}
                md={6}
                className="mb-3"
                controlId="formGridAdress1"
              >
                <Form.Label>Asal Sekolah / Perguruan Tinggi</Form.Label>
                <div className="position-relative" style={{ zIndex: "4" }}>
                  <Select
                    placeholder={asalSekolah || "Pilih Sekolah"}
                    options={optionsAsalSekolah}
                    selectedValue={asalSekolah}
                    onChange={(e) => {
                      setAsalSekolah(e.label);
                    }}
                  />
                </div>
                {simpleValidator.current.message(
                  "asal sekolah",
                  asalSekolah,
                  asalSekolah === null ? "required" : "",
                  {
                    className: "text-danger",
                  }
                )}
              </Form.Group>
              <Form.Group
                as={Col}
                md={6}
                className="mb-3"
                controlId="formGridAddress1"
              >
                <Form.Label>Program Studi</Form.Label>
                <Form.Control
                  placeholder={
                    programStudi === "0" && "Silahkan Masukan Program Studi"
                  }
                  value={programStudi === "0" ? "-" : programStudi}
                  onChange={(e) => setProgramStudi(e.target.value)}
                  onBlur={() =>
                    simpleValidator.current.showMessageFor("program studi")
                  }
                />
                {simpleValidator.current.message(
                  "program studi",
                  programStudi,
                  programStudi === null ? "required" : "",
                  {
                    className: "text-danger",
                  }
                )}
              </Form.Group>
            </Row>
          )}
          {jengjangPendidikan.label === "S1" && (
            <Row>
              <Form.Group
                as={Col}
                md={6}
                className="mb-3"
                controlId="formGridAdress1"
              >
                <Form.Label>Asal Sekolah / Perguruan Tinggi</Form.Label>
                <div className="position-relative" style={{ zIndex: "4" }}>
                  <Select
                    placeholder="Pilih Sekolah"
                    options={optionsAsalSekolah}
                    defaultValue={asalSekolah}
                    onChange={(e) => {
                      setAsalSekolah(e.label);
                    }}
                  />
                </div>
                {simpleValidator.current.message(
                  "asal sekolah",
                  asalSekolah,
                  asalSekolah === null ? "required" : "",
                  {
                    className: "text-danger",
                  }
                )}
              </Form.Group>
              <Form.Group
                as={Col}
                md={6}
                className="mb-3"
                controlId="formGridAddress1"
              >
                <Form.Label>Program Studi</Form.Label>
                <Form.Control
                  placeholder={
                    programStudi === "0" && "Silahkan Masukan Program Studi"
                  }
                  value={programStudi === "0" ? "-" : programStudi}
                  onChange={(e) => setProgramStudi(e.target.value)}
                  onBlur={() =>
                    simpleValidator.current.showMessageFor("program studi")
                  }
                />
                {simpleValidator.current.message(
                  "program studi",
                  programStudi,
                  programStudi === null ? "required" : "",
                  {
                    className: "text-danger",
                  }
                )}
              </Form.Group>
            </Row>
          )}
          {jengjangPendidikan.label === "S2" && (
            <Row>
              <Form.Group
                as={Col}
                md={6}
                className="mb-3"
                controlId="formGridAdress1"
              >
                <Form.Label>Asal Sekolah / Perguruan Tinggi</Form.Label>
                <div className="position-relative" style={{ zIndex: "4" }}>
                  <Select
                    placeholder="Pilih Sekolah"
                    options={
                      dataAsalSekolah &&
                      dataAsalSekolah.map((item, index) => {
                        return { value: item.id, label: item.label };
                      })
                    }
                    defaultValue={asalSekolah}
                    onChange={(e) => {
                      setAsalSekolah(e.label);
                    }}
                  />
                </div>
                {simpleValidator.current.message(
                  "asal sekolah",
                  asalSekolah,
                  asalSekolah === null ? "required" : "",
                  {
                    className: "text-danger",
                  }
                )}
              </Form.Group>
              <Form.Group
                as={Col}
                md={6}
                className="mb-3"
                controlId="formGridAddress1"
              >
                <Form.Label>Program Studi</Form.Label>
                <Form.Control
                  placeholder={
                    programStudi === "0" && "Silahkan Masukan Program Studi"
                  }
                  value={programStudi === "0" ? "-" : programStudi}
                  onChange={(e) => setProgramStudi(e.target.value)}
                  onBlur={() =>
                    simpleValidator.current.showMessageFor("program studi")
                  }
                />
                {simpleValidator.current.message(
                  "program studi",
                  programStudi,
                  programStudi === null ? "required" : "",
                  {
                    className: "text-danger",
                  }
                )}
              </Form.Group>
            </Row>
          )}
          {jengjangPendidikan.label === "S3" && (
            <Row>
              <Form.Group
                as={Col}
                md={6}
                className="mb-3"
                controlId="formGridAdress1"
              >
                <Form.Label>Asal Sekolah / Perguruan Tinggi</Form.Label>
                <div className="position-relative" style={{ zIndex: "4" }}>
                  <Select
                    placeholder="Pilih Sekolah"
                    options={
                      dataAsalSekolah &&
                      dataAsalSekolah.map((item, index) => {
                        return { value: item.id, label: item.label };
                      })
                    }
                    defaultValue={asalSekolah}
                    onChange={(e) => {
                      setAsalSekolah(e.label);
                    }}
                  />
                </div>
                {simpleValidator.current.message(
                  "asal sekolah",
                  asalSekolah,
                  asalSekolah === null ? "required" : "",
                  {
                    className: "text-danger",
                  }
                )}
              </Form.Group>
              <Form.Group
                as={Col}
                md={6}
                className="mb-3"
                controlId="formGridAddress1"
              >
                <Form.Label>Program Studi</Form.Label>
                <Form.Control
                  placeholder={
                    programStudi === "0" && "Silahkan Masukan Program Studi"
                  }
                  value={programStudi === "0" ? "-" : programStudi}
                  onChange={(e) => setProgramStudi(e.target.value)}
                  onBlur={() =>
                    simpleValidator.current.showMessageFor("program studi")
                  }
                />
                {simpleValidator.current.message(
                  "program studi",
                  programStudi,
                  programStudi === null ? "required" : "",
                  {
                    className: "text-danger",
                  }
                )}
              </Form.Group>
            </Row>
          )}
          {jengjangPendidikan.label === "TK" && (
            <Form.Group className="mb-3" controlId="formGridAddress1">
              <Form.Label>Lainnya ( Sekolah / PT)</Form.Label>
              <Form.Control
                placeholder="Silahkan Masukan Lainnya ( Sekolah / PT)"
                value={lainya}
                onChange={(e) => setLainya(e.target.value)}
                onBlur={() =>
                  simpleValidator.current.showMessageFor(
                    "lainya ( sekolah/ pt )"
                  )
                }
              />
              {simpleValidator.current.message(
                "lainya ( sekolah/ pt )",
                lainya,
                lainya === null ? "required" : "",
                {
                  className: "text-danger",
                }
              )}
            </Form.Group>
          )}
          {jengjangPendidikan.label === "SD/Sederajat" && (
            <Form.Group className="mb-3" controlId="formGridAddress1">
              <Form.Label>Lainnya ( Sekolah / PT)</Form.Label>
              <Form.Control
                placeholder="Silahkan Masukan Lainnya ( Sekolah / PT)"
                value={lainya}
                onChange={(e) => setLainya(e.target.value)}
                onBlur={() =>
                  simpleValidator.current.showMessageFor(
                    "lainya ( sekolah/ pt )"
                  )
                }
              />
              {simpleValidator.current.message(
                "lainya ( sekolah/ pt )",
                lainya,
                lainya === null ? "required" : "",
                {
                  className: "text-danger",
                }
              )}
            </Form.Group>
          )}
          {jengjangPendidikan.label === "SMP/Sederajat" && (
            <Form.Group className="mb-3" controlId="formGridAddress1">
              <Form.Label>Lainnya ( Sekolah / PT)</Form.Label>
              <Form.Control
                placeholder="Silahkan Masukan Lainnya ( Sekolah / PT)"
                value={lainya}
                onChange={(e) => setLainya(e.target.value)}
                onBlur={() =>
                  simpleValidator.current.showMessageFor(
                    "lainya ( sekolah/ pt )"
                  )
                }
              />
              {simpleValidator.current.message(
                "lainya ( sekolah/ pt )",
                lainya,
                lainya === null ? "required" : "",
                {
                  className: "text-danger",
                }
              )}
            </Form.Group>
          )}
          {jengjangPendidikan.label === "TK" && (
            <Row className="mb-3">
              <Form.Group as={Col} md={6} controlId="formGridTahun">
                <Form.Label>Tahun Masuk</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Silahkan Masukan Tahun Masuk"
                  value={tahunMasuk === 1 ? "-" : tahunMasuk}
                  onChange={(e) => {
                    if (
                      e.target.value === "" ||
                      helperRegexNumber.test(e.target.value)
                    ) {
                      helperRemoveZeroFromIndex0(e.target.value, setTahunMasuk);
                    }
                  }}
                  maxLength={4}
                  minLength={4}
                  onBlur={() =>
                    simpleValidator.current.showMessageFor("tahun masuk")
                  }
                />
                <span className="text-muted">
                  Masukan Maksimal dan Minimal 4 Angka, Contoh : 2020
                </span>
                {simpleValidator.current.message(
                  "tahun masuk",
                  tahunMasuk,
                  tahunMasuk === null ? "" : "required|integer",
                  {
                    className: "text-danger",
                  }
                )}
              </Form.Group>
            </Row>
          )}
          {jengjangPendidikan.label === "SD/Sederajat" && (
            <Row className="mb-3">
              <Form.Group as={Col} md={6} controlId="formGridTahun">
                <Form.Label>Tahun Masuk</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Silahkan Masukan Tahun Masuk"
                  value={tahunMasuk === 1 ? "-" : tahunMasuk}
                  onChange={(e) => {
                    if (
                      e.target.value === "" ||
                      helperRegexNumber.test(e.target.value)
                    ) {
                      helperRemoveZeroFromIndex0(e.target.value, setTahunMasuk);
                    }
                  }}
                  maxLength={4}
                  minLength={4}
                  onBlur={() =>
                    simpleValidator.current.showMessageFor("tahun masuk")
                  }
                />
                <span className="text-muted">
                  Masukan Maksimal dan Minimal 4 Angka, Contoh : 2020
                </span>
                {simpleValidator.current.message(
                  "tahun masuk",
                  tahunMasuk,
                  tahunMasuk === null ? "" : "required|integer",
                  {
                    className: "text-danger",
                  }
                )}
              </Form.Group>
            </Row>
          )}
          {jengjangPendidikan.label === "SMP/Sederajat" && (
            <Row className="mb-3">
              <Form.Group as={Col} md={6} controlId="formGridTahun">
                <Form.Label>Tahun Masuk</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Silahkan Masukan Tahun Masuk"
                  value={tahunMasuk === 1 ? "-" : tahunMasuk}
                  onChange={(e) => {
                    if (
                      e.target.value === "" ||
                      helperRegexNumber.test(e.target.value)
                    ) {
                      helperRemoveZeroFromIndex0(e.target.value, setTahunMasuk);
                    }
                  }}
                  maxLength={4}
                  minLength={4}
                  onBlur={() =>
                    simpleValidator.current.showMessageFor("tahun masuk")
                  }
                />
                <span className="text-muted">
                  Masukan Maksimal dan Minimal 4 Angka, Contoh : 2020
                </span>
                {simpleValidator.current.message(
                  "tahun masuk",
                  tahunMasuk,
                  tahunMasuk === null ? "" : "required|integer",
                  {
                    className: "text-danger",
                  }
                )}
              </Form.Group>
            </Row>
          )}
          {jengjangPendidikan.label === "SMA/Sederajat" && (
            <Row className="mb-3">
              <Form.Group as={Col} md={6} controlId="formGridTahun">
                <Form.Label>Tahun Masuk</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Silahkan Masukan Tahun Masuk"
                  value={tahunMasuk === 1 ? "-" : tahunMasuk}
                  onChange={(e) => {
                    if (
                      e.target.value === "" ||
                      helperRegexNumber.test(e.target.value)
                    ) {
                      helperRemoveZeroFromIndex0(e.target.value, setTahunMasuk);
                    }
                  }}
                  maxLength={4}
                  minLength={4}
                  onBlur={() =>
                    simpleValidator.current.showMessageFor("tahun masuk")
                  }
                />
                <span className="text-muted">
                  Masukan Maksimal dan Minimal 4 Angka, Contoh : 2020
                </span>
                {simpleValidator.current.message(
                  "tahun masuk",
                  tahunMasuk,
                  tahunMasuk === null ? "" : "required|integer",
                  {
                    className: "text-danger",
                  }
                )}
              </Form.Group>
            </Row>
          )}
          {jengjangPendidikan.label === "SD/Sederajat" && (
            <div className="form-group">
              <label className="col-form-label">Unggah Ijazah</label>
              <div className="d-flex">
                <div className="custom-file">
                  <input
                    type="file"
                    className="custom-file-input"
                    name="question_image"
                    accept="image/jpeg , image/jpg ,application/pdf"
                    onChange={onChangeIjazah}
                    onBlur={() =>
                      simpleValidator.current.showMessageFor("ijazah")
                    }
                  />
                  <label className="custom-file-label" htmlFor="customFile">
                    {ijazahName}
                  </label>
                  <label style={{ marginTop: "15px" }}>
                    {simpleValidator.current.message(
                      "ijazah",
                      ijazah,
                      ijazah === null ? "required" : "",
                      {
                        className: "text-danger",
                      }
                    )}
                  </label>
                </div>
              </div>
              <small className="text-muted">
                *JPG/JPEG/PDF (Maksimal ukuran file 5 MB)
              </small>
            </div>
          )}
          {jengjangPendidikan.label === "SMP/Sederajat" && (
            <div className="form-group">
              <label className="col-form-label">Unggah Ijazah</label>
              <div className="d-flex">
                <div className="custom-file">
                  <input
                    type="file"
                    className="custom-file-input"
                    name="question_image"
                    accept="image/jpeg , image/jpg ,application/pdf"
                    onChange={onChangeIjazah}
                    onBlur={() =>
                      simpleValidator.current.showMessageFor("ijazah")
                    }
                  />
                  <label className="custom-file-label" htmlFor="customFile">
                    {ijazahName}
                  </label>
                  <label style={{ marginTop: "15px" }}>
                    {simpleValidator.current.message(
                      "ijazah",
                      ijazah,
                      ijazah === null ? "required" : "",
                      {
                        className: "text-danger",
                      }
                    )}
                  </label>
                </div>
              </div>
              <small className="text-muted">
                *JPG/JPEG/PDF (Maksimal ukuran file 5 MB)
              </small>
            </div>
          )}
          {jengjangPendidikan.label === "SMA/Sederajat" && (
            <div className="form-group">
              <label className="col-form-label">Unggah Ijazah</label>
              <div className="d-flex">
                <div className="custom-file">
                  <input
                    type="file"
                    className="custom-file-input"
                    name="question_image"
                    accept="image/jpeg , image/jpg ,application/pdf"
                    onChange={onChangeIjazah}
                    onBlur={() =>
                      simpleValidator.current.showMessageFor("ijazah")
                    }
                  />
                  <label className="custom-file-label" htmlFor="customFile">
                    {ijazahName}
                  </label>
                  <label style={{ marginTop: "15px" }}>
                    {simpleValidator.current.message(
                      "ijazah",
                      ijazah,
                      ijazah === null ? "required" : "",
                      {
                        className: "text-danger",
                      }
                    )}
                  </label>
                </div>
              </div>
              <small className="text-muted">
                *JPG/JPEG/PDF (Maksimal ukuran file 5 MB)
              </small>
            </div>
          )}

          {jengjangPendidikan.label === "D3" && (
            <Row className="mb-3">
              <Form.Group as={Col} md={6} controlId="formGridIpk">
                <Form.Label>IPK</Form.Label>
                <Form.Control
                  minLength={0}
                  maxLength={4}
                  type="text"
                  placeholder="Silahkan Masukan IPK"
                  value={ipk === "0" ? "-" : ipk}
                  onChange={(e) => {
                    if (
                      e.target.value === "" ||
                      helperRegexNumberIpk.test(e.target.value)
                    ) {
                      helperRemoveZeroFromIndex0(e.target.value, setIpk);
                    }
                  }}
                  onBlur={() => simpleValidator.current.showMessageFor("ipk")}
                />
                <span className="text-muted">
                  Gunakan titik "." - Contoh : 3.75
                </span>
                {simpleValidator.current.message(
                  "ipk",
                  ipk,
                  ipk === null ? "required|integer" : "",
                  {
                    className: "text-danger",
                  }
                )}
              </Form.Group>
              <Form.Group as={Col} md={6} controlId="formGridTahun">
                <Form.Label>Tahun Masuk</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Silahkan Masukan Tahun Masuk"
                  value={tahunMasuk === 1 ? "-" : tahunMasuk}
                  onChange={(e) => {
                    if (
                      e.target.value === "" ||
                      helperRegexNumber.test(e.target.value)
                    ) {
                      helperRemoveZeroFromIndex0(e.target.value, setTahunMasuk);
                    }
                  }}
                  maxLength={4}
                  minLength={4}
                  onBlur={() =>
                    simpleValidator.current.showMessageFor("tahun masuk")
                  }
                />
                <span className="text-muted">
                  Masukan Maksimal dan Minimal 4 Angka, Contoh : 2020
                </span>
                {simpleValidator.current.message(
                  "tahun masuk",
                  tahunMasuk,
                  tahunMasuk === null ? "required|integer" : "",
                  {
                    className: "text-danger",
                  }
                )}
              </Form.Group>
            </Row>
          )}

          {jengjangPendidikan.label === "D4" && (
            <Row className="mb-3">
              <Form.Group as={Col} md={6} controlId="formGridIpk">
                <Form.Label>IPK</Form.Label>
                <Form.Control
                  minLength={0}
                  maxLength={4}
                  type="text"
                  placeholder="Silahkan Masukan IPK"
                  value={ipk === "0" ? "-" : ipk}
                  onChange={(e) => {
                    if (
                      e.target.value === "" ||
                      helperRegexNumberIpk.test(e.target.value)
                    ) {
                      helperRemoveZeroFromIndex0(e.target.value, setIpk);
                    }
                  }}
                  onBlur={() => simpleValidator.current.showMessageFor("ipk")}
                />
                <span className="text-muted">
                  Gunakan titik "." - Contoh : 3.75
                </span>
                {simpleValidator.current.message(
                  "ipk",
                  ipk,
                  ipk === null ? "required|integer" : "",
                  {
                    className: "text-danger",
                  }
                )}
              </Form.Group>
              <Form.Group as={Col} md={6} controlId="formGridTahun">
                <Form.Label>Tahun Masuk</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Silahkan Masukan Tahun Masuk"
                  value={tahunMasuk === 1 ? "-" : tahunMasuk}
                  onChange={(e) => {
                    if (
                      e.target.value === "" ||
                      helperRegexNumber.test(e.target.value)
                    ) {
                      helperRemoveZeroFromIndex0(e.target.value, setTahunMasuk);
                    }
                  }}
                  maxLength={4}
                  minLength={4}
                  onBlur={() =>
                    simpleValidator.current.showMessageFor("tahun masuk")
                  }
                />
                <span className="text-muted">
                  Masukan Maksimal dan Minimal 4 Angka, Contoh : 2020
                </span>
                {simpleValidator.current.message(
                  "tahun masuk",
                  tahunMasuk,
                  tahunMasuk === null ? "required|integer" : "",
                  {
                    className: "text-danger",
                  }
                )}
              </Form.Group>
            </Row>
          )}
          {jengjangPendidikan.label === "S1" && (
            <Row className="mb-3">
              <Form.Group as={Col} md={6} controlId="formGridIpk">
                <Form.Label>IPK</Form.Label>
                <Form.Control
                  minLength={0}
                  maxLength={4}
                  type="text"
                  placeholder="Silahkan Masukan IPK"
                  value={ipk === "0" ? "-" : ipk}
                  onChange={(e) => {
                    if (
                      e.target.value === "" ||
                      helperRegexNumberIpk.test(e.target.value)
                    ) {
                      helperRemoveZeroFromIndex0(e.target.value, setIpk);
                    }
                  }}
                  onBlur={() => simpleValidator.current.showMessageFor("ipk")}
                />
                <span className="text-muted">
                  Gunakan titik "." - Contoh : 3.75
                </span>
                {simpleValidator.current.message(
                  "ipk",
                  ipk,
                  ipk === null ? "required|integer" : "",
                  {
                    className: "text-danger",
                  }
                )}
              </Form.Group>
              <Form.Group as={Col} md={6} controlId="formGridTahun">
                <Form.Label>Tahun Masuk</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Silahkan Masukan Tahun Masuk"
                  value={tahunMasuk === 1 ? "-" : tahunMasuk}
                  onChange={(e) => {
                    if (
                      e.target.value === "" ||
                      helperRegexNumber.test(e.target.value)
                    ) {
                      helperRemoveZeroFromIndex0(e.target.value, setTahunMasuk);
                    }
                  }}
                  maxLength={4}
                  minLength={4}
                  onBlur={() =>
                    simpleValidator.current.showMessageFor("tahun masuk")
                  }
                />
                <span className="text-muted">
                  Masukan Maksimal dan Minimal 4 Angka, Contoh : 2020
                </span>
                {simpleValidator.current.message(
                  "tahun masuk",
                  tahunMasuk,
                  tahunMasuk === null ? "required|integer" : "",
                  {
                    className: "text-danger",
                  }
                )}
              </Form.Group>
            </Row>
          )}
          {jengjangPendidikan.label === "S2" && (
            <Row className="mb-3">
              <Form.Group as={Col} md={6} controlId="formGridIpk">
                <Form.Label>IPK</Form.Label>
                <Form.Control
                  minLength={0}
                  maxLength={4}
                  type="text"
                  placeholder="Silahkan Masukan IPK"
                  value={ipk === "0" ? "-" : ipk}
                  onChange={(e) => {
                    if (
                      e.target.value === "" ||
                      helperRegexNumberIpk.test(e.target.value)
                    ) {
                      helperRemoveZeroFromIndex0(e.target.value, setIpk);
                    }
                  }}
                  onBlur={() => simpleValidator.current.showMessageFor("ipk")}
                />
                <span className="text-muted">
                  Gunakan titik "." - Contoh : 3.75
                </span>
                {simpleValidator.current.message(
                  "ipk",
                  ipk,
                  ipk === null ? "required|integer" : "",
                  {
                    className: "text-danger",
                  }
                )}
              </Form.Group>
              <Form.Group as={Col} md={6} controlId="formGridTahun">
                <Form.Label>Tahun Masuk</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Silahkan Masukan Tahun Masuk"
                  value={tahunMasuk === 1 ? "-" : tahunMasuk}
                  onChange={(e) => {
                    if (
                      e.target.value === "" ||
                      helperRegexNumber.test(e.target.value)
                    ) {
                      helperRemoveZeroFromIndex0(e.target.value, setTahunMasuk);
                    }
                  }}
                  maxLength={4}
                  minLength={4}
                  onBlur={() =>
                    simpleValidator.current.showMessageFor("tahun masuk")
                  }
                />
                <span className="text-muted">
                  Masukan Maksimal dan Minimal 4 Angka, Contoh : 2020
                </span>
                {simpleValidator.current.message(
                  "tahun masuk",
                  tahunMasuk,
                  tahunMasuk === null ? "required|integer" : "",
                  {
                    className: "text-danger",
                  }
                )}
              </Form.Group>
            </Row>
          )}
          {jengjangPendidikan.label === "S3" && (
            <Row className="mb-3">
              <Form.Group as={Col} md={6} controlId="formGridIpk">
                <Form.Label>IPK</Form.Label>
                <Form.Control
                  minLength={0}
                  maxLength={4}
                  type="text"
                  placeholder="Silahkan Masukan IPK"
                  value={ipk === "0" ? "-" : ipk}
                  onChange={(e) => {
                    if (
                      e.target.value === "" ||
                      helperRegexNumberIpk.test(e.target.value)
                    ) {
                      helperRemoveZeroFromIndex0(e.target.value, setIpk);
                    }
                  }}
                  onBlur={() => simpleValidator.current.showMessageFor("ipk")}
                />
                <span className="text-muted">
                  Gunakan titik "." - Contoh : 3.75
                </span>
                {simpleValidator.current.message(
                  "ipk",
                  ipk,
                  ipk === null ? "required|integer" : "",
                  {
                    className: "text-danger",
                  }
                )}
              </Form.Group>
              <Form.Group as={Col} md={6} controlId="formGridTahun">
                <Form.Label>Tahun Masuk</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Silahkan Masukan Tahun Masuk"
                  value={tahunMasuk === 1 ? "-" : tahunMasuk}
                  onChange={(e) => {
                    if (
                      e.target.value === "" ||
                      helperRegexNumber.test(e.target.value)
                    ) {
                      helperRemoveZeroFromIndex0(e.target.value, setTahunMasuk);
                    }
                  }}
                  maxLength={4}
                  minLength={4}
                  onBlur={() =>
                    simpleValidator.current.showMessageFor("tahun masuk")
                  }
                />
                <span className="text-muted">
                  Masukan Maksimal dan Minimal 4 Angka, Contoh : 2020
                </span>
                {simpleValidator.current.message(
                  "tahun masuk",
                  tahunMasuk,
                  tahunMasuk === null ? "required|integer" : "",
                  {
                    className: "text-danger",
                  }
                )}
              </Form.Group>
            </Row>
          )}
          {jengjangPendidikan.label === "D3" && (
            <div className="form-group">
              <label className="col-form-label">Unggah Ijazah</label>
              <div className="d-flex">
                <div className="custom-file">
                  <input
                    type="file"
                    className="custom-file-input"
                    name="question_image"
                    accept="image/jpeg , image/jpg ,application/pdf"
                    onChange={onChangeIjazah}
                    onBlur={() =>
                      simpleValidator.current.showMessageFor("ijazah")
                    }
                  />
                  <label className="custom-file-label" htmlFor="customFile">
                    {ijazahName}
                  </label>
                  <label style={{ marginTop: "15px" }}>
                    {simpleValidator.current.message(
                      "ijazah",
                      ijazah,
                      ijazah === null ? "required" : "",
                      {
                        className: "text-danger",
                      }
                    )}
                  </label>
                </div>
              </div>
              <small className="text-muted">
                *JPG/JPEG/PDF (Maksimal ukuran file 5 MB)
              </small>
            </div>
          )}
          {jengjangPendidikan.label === "D4" && (
            <div className="form-group">
              <label className="col-form-label">Unggah Ijazah</label>
              <div className="d-flex">
                <div className="custom-file">
                  <input
                    type="file"
                    className="custom-file-input"
                    name="question_image"
                    accept="image/jpeg , image/jpg ,application/pdf"
                    onChange={onChangeIjazah}
                    onBlur={() =>
                      simpleValidator.current.showMessageFor("ijazah")
                    }
                  />
                  <label className="custom-file-label" htmlFor="customFile">
                    {ijazahName}
                  </label>
                  <label style={{ marginTop: "15px" }}>
                    {simpleValidator.current.message(
                      "ijazah",
                      ijazah,
                      ijazah === null ? "required" : "",
                      {
                        className: "text-danger",
                      }
                    )}
                  </label>
                </div>
              </div>
              <small className="text-muted">
                *JPG/JPEG/PDF (Maksimal ukuran file 5 MB)
              </small>
            </div>
          )}
          {jengjangPendidikan.label === "S1" && (
            <div className="form-group">
              <label className="col-form-label">Unggah Ijazah</label>
              <div className="d-flex">
                <div className="custom-file">
                  <input
                    type="file"
                    className="custom-file-input"
                    name="question_image"
                    accept="image/jpeg , image/jpg ,application/pdf"
                    onChange={onChangeIjazah}
                    onBlur={() =>
                      simpleValidator.current.showMessageFor("ijazah")
                    }
                  />
                  <label className="custom-file-label" htmlFor="customFile">
                    {ijazahName}
                  </label>
                  <label style={{ marginTop: "15px" }}>
                    {simpleValidator.current.message(
                      "ijazah",
                      ijazah,
                      ijazah === null ? "required" : "",
                      {
                        className: "text-danger",
                      }
                    )}
                  </label>
                </div>
              </div>
              <small className="text-muted">
                *JPG/JPEG/PDF (Maksimal ukuran file 5 MB)
              </small>
            </div>
          )}
          {jengjangPendidikan.label === "S2" && (
            <div className="form-group">
              <label className="col-form-label">Unggah Ijazah</label>
              <div className="d-flex">
                <div className="custom-file">
                  <input
                    type="file"
                    className="custom-file-input"
                    name="question_image"
                    accept="image/jpeg , image/jpg ,application/pdf"
                    onChange={onChangeIjazah}
                    onBlur={() =>
                      simpleValidator.current.showMessageFor("ijazah")
                    }
                  />
                  <label className="custom-file-label" htmlFor="customFile">
                    {ijazahName}
                  </label>
                  <label style={{ marginTop: "15px" }}>
                    {simpleValidator.current.message(
                      "ijazah",
                      ijazah,
                      ijazah === null ? "required" : "",
                      {
                        className: "text-danger",
                      }
                    )}
                  </label>
                </div>
              </div>
              <small className="text-muted">
                *JPG/JPEG/PDF (Maksimal ukuran file 5 MB)
              </small>
            </div>
          )}
          {jengjangPendidikan.label === "S3" && (
            <div className="form-group">
              <label className="col-form-label">Unggah Ijazah</label>
              <div className="d-flex">
                <div className="custom-file">
                  <input
                    type="file"
                    className="custom-file-input"
                    name="question_image"
                    accept="image/jpeg , image/jpg ,application/pdf"
                    onChange={onChangeIjazah}
                    onBlur={() =>
                      simpleValidator.current.showMessageFor("ijazah")
                    }
                  />
                  <label className="custom-file-label" htmlFor="customFile">
                    {ijazahName}
                  </label>
                  <label style={{ marginTop: "15px" }}>
                    {simpleValidator.current.message(
                      "ijazah",
                      ijazah,
                      ijazah === null ? "required" : "",
                      {
                        className: "text-danger",
                      }
                    )}
                  </label>
                </div>
              </div>
              <small className="text-muted">
                *JPG/JPEG/PDF (Maksimal ukuran file 5 MB)
              </small>
            </div>
          )}
        </div>
        {!wizzard ? (
          <div className="button-aksi mt-5 float-right">
            <Button
              className={`${style.button_profile_batal} rounded-xl mr-2`}
              type="button"
              onClick={() => funcViewEdit(false)}
            >
              Batal
            </Button>
            <Button
              className={`${style.button_profile_simpan} rounded-xl`}
              type="submit"
            >
              Simpan
            </Button>
          </div>
        ) : (
          <div className="button-aksi mt-5 float-right">
            <Button
              className={`${style.button_profile_simpan} rounded-xl`}
              type="submit"
            >
              Lanjut
            </Button>
          </div>
        )}
      </Form>
    </>
  );
};

export default PendidikanEdit;
