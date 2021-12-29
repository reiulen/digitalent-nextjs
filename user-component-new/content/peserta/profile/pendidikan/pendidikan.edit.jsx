/* eslint-disable react-hooks/rules-of-hooks */
import React, { useRef, useState, useEffect } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import Select, { components } from "react-select";
import Swal from "sweetalert2";
import SimpleReactValidator from "simple-react-validator";
import { useDispatch, useSelector } from "react-redux";
import style from "../style.module.css";

import {
  updateProfilePendidikan,
  clearErrors,
  getProfilePendidikan,
  getDataAsalSekolah,
  updateWizzardStatus,
} from "../../../../../redux/actions/pelatihan/profile.actions";
import { UPDATE_PENDIDIKAN_RESET } from "../../../../../redux/types/pelatihan/profile.type";
import {
  helperRegexNumberIpk,
  helperRegexNumber,
  helperRemoveZeroFromIndex0,
  SweatAlert,
} from "../../../../../utils/middleware/helper";
import moment from "moment";
import { useRouter } from "next/router";

const PendidikanEdit = ({ funcViewEdit, token, wizzard }) => {
  const dispatch = useDispatch();
  const simpleValidator = useRef(new SimpleReactValidator({ 
    locale: "id" 
  }));
  const [, forceUpdate] = useState();
  const router = useRouter();
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
    loading: loadingUpdateData,
    success: successUpdateData,
  } = useSelector((state) => state.updatePendidikan);

  const {
		error: errorStatusWizzard,
		loading: loadingStatusWizzard,
		success: successStatusWizard,
	} = useSelector((state) => state.updateStatusWizzard);

  const [jengjangPendidikan, setJenjangPendidikan] = useState(
    (pendidikan && {
      value: pendidikan.jenjang,
      label: pendidikan.jenjang,
    }) || {
      value: "",
      label: "Silahkan Pilih Jenjang Pendidikan",
    }
  );

  const [asalSekolah, setAsalSekolah] = useState(
    (pendidikan && pendidikan.asal_pendidikan) || ""
  );
  const [lainya, setLainya] = useState((pendidikan && pendidikan.lainya) || "");
  const [asalInstitusi, setAsalInstitusi] = useState(
    (pendidikan && pendidikan.asal_pendidikan) || ""
  );
  const [programStudi, setProgramStudi] = useState(
    (pendidikan && pendidikan.program_studi) || ""
  );
  const [ipk, setIpk] = useState((pendidikan && pendidikan.ipk) || null);
  const [tahunMasuk, setTahunMasuk] = useState(
    (pendidikan && pendidikan.tahun_masuk) || ""
  );

  const [ijazahName, setIjazahName] = useState(
    pendidikan ? pendidikan?.ijasah?.split("/ijasah/") : "Belum ada file"
  );
  // const [ijazah, setIjazah] = useState("");
  const [ijazah, setIjazah] = useState(pendidikan?.ijasah ? pendidikan.ijasah : "");
  const [ijazahPreview, setIjazahPreview] = useState("");

  const [dataSearch, setDataSearch] = useState([]);
  const optionsJenjangPendidikan = [];
  if (dataPendidikan) {
    for (let index = 0; index < dataPendidikan?.data?.length; index++) {
      let val = {
        value: dataPendidikan.data[index].id,
        label: dataPendidikan.data[index].label,
      };
      optionsJenjangPendidikan.push(val);
    }
  }
  const [showInputCollegeName, setShowInputCollegeName] = useState(false);
  const [errorOnIpk, setErrorOnIpk] = useState (false)
  const validateLetter = /[a-zA-Z]/;

  const NoOptionsMessage = (props) => {
    return (
      <components.NoOptionsMessage {...props}>
        <p className="text-left">
          Silahkan pilih Nama Institusi Pendidikan Lainnya bila Nama Institusi
          Pendidikan Anda tidak muncul..
        </p>
      </components.NoOptionsMessage>
    );
  };

  useEffect(() => {
    dispatch(getDataAsalSekolah(token));

    if (errorUpdateData) {
      // SweatAlert("Gagal", errorUpdateData, "error");
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Isi data dengan benar !",
      });
      dispatch(clearErrors());
    }

    if (successUpdateData) {
      SweatAlert("Berhasil", "Berhasil Update Data", "success");
      dispatch({ type: UPDATE_PENDIDIKAN_RESET });
      if (wizzard) {
        router.push("/peserta/wizzard/pekerjaan");
      } else {
        funcViewEdit(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    successUpdateData,
    errorUpdateData,
    dispatch,
    jengjangPendidikan.value,
    funcViewEdit,
    token,
    asalSekolah,
  ]);

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

  const onChangeAsalSekolah = (text) => {
    if (text === "Nama Institusi Lainnya..") {
      setShowInputCollegeName(true);
      setAsalSekolah("Nama Institusi Lainnya..");
    } else {
      setShowInputCollegeName(false);
      setAsalSekolah(text);
    }
  };

  const onChangeIjazah = (e) => {
    const type = ["image/jpg", "image/png", "image/jpeg", "application/pdf"];
    if (e.target.files[0]) {
      if (type.includes(e.target.files[0].type)) {
        if (e.target.files[0].size > 5000000) {
          e.target.value = null;
          Swal.fire("Oops !", "Ukuran file maksimal 5 MB.", "error");
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
          "Data yang bisa dimasukkan hanya berupa data gambar atau pdf.",
          "error"
        );
      }
    }
  };

  const stepBack = async () => {
    let status = 2

    const data = await dispatch (updateWizzardStatus(status, token))

    if (data?.status === true){
      router.push("/peserta/wizzard/alamat");

    } else {
      SweatAlert("Gagal", errorStatusWizzard, "error");
			dispatch(clearErrors());
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let data = {};
    if (
      !asalSekolah.includes("Lainnya") ||
      jengjangPendidikan.label != "SMA/Sederajat"
    ) {
      simpleValidator.current.fields["sekolah lainnya"] = true;
    }
    // if(asalSekolah.includes(''))
    if (jengjangPendidikan.label.includes("Tidak Sekolah")) {
      simpleValidator.current.fields["asal sekolah"] = true;
      simpleValidator.current.fields["ijazah"] = true;
      simpleValidator.current.fields["ipk"] = true;
      simpleValidator.current.fields["lainya"] = true;
      simpleValidator.current.fields["program studi"] = true;
      simpleValidator.current.fields["sekolah lainnya"] = true;
      simpleValidator.current.fields["tahun masuk"] = true;
    }

    if (
      jengjangPendidikan.label === "D3" ||
      jengjangPendidikan.label === "D4" ||
      jengjangPendidikan.label === "S1" ||
      jengjangPendidikan.label === "S2" ||
      jengjangPendidikan.label === "S3"
    ){
      simpleValidator.current.fields["lainya ( sekolah/ pt )"] = true;
      simpleValidator.current.errorMessages["lainya ( sekolah/ pt )"] = null;
    }

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
          wizard: 4,
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
          wizard: 4,
        };
      } else if (jengjangPendidikan.label === "SMA/Sederajat") {
        if (!sekolahLainnya) {
          data = {
            jenjang: jengjangPendidikan.label,
            asal_pendidikan: asalSekolah,
            lainya: "-",
            program_studi: "0",
            ipk: "0",
            tahun_masuk: parseInt(tahunMasuk),
            ijasah: ijazah,
            wizard: 4,
          };
        } else {
          data = {
            jenjang: jengjangPendidikan.label,
            asal_pendidikan: sekolahLainnya,
            lainya: "-",
            program_studi: "0",
            ipk: "0",
            tahun_masuk: parseInt(tahunMasuk),
            ijasah: ijazah,
            wizard: 4,
          };
        }
      } else if (
        jengjangPendidikan.label === "D3" ||
        jengjangPendidikan.label === "D4" ||
        jengjangPendidikan.label === "S1" ||
        jengjangPendidikan.label === "S2" ||
        jengjangPendidikan.label === "S3"
      ) {
        if (asalSekolah !== "Nama Institusi Lainnya..") {
          data = {
            jenjang: jengjangPendidikan.label,
            asal_pendidikan: asalSekolah,
            lainya: "-",
            program_studi: programStudi,
            ipk: `${ipk}`,
            tahun_masuk: parseInt(tahunMasuk),
            ijasah: ijazah,
            wizard: 4,
          };
        } else {
          data = {
            jenjang: jengjangPendidikan.label,
            asal_pendidikan: asalInstitusi,
            lainya: "-",
            program_studi: programStudi,
            ipk: `${ipk}`,
            tahun_masuk: parseInt(tahunMasuk),
            ijasah: ijazah,
            wizard: 4,
          };
        }
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
      setErrorOnIpk(false)

    } else {
      setErrorOnIpk(true)
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

  const [lainnya, setLainnya] = useState(false);
  const [sekolahLainnya, setSekolahLainnya] = useState("");

  useEffect(() => {
    if (asalSekolah.includes("Lainnya")) {
      setLainnya(true);
    } else {
      setSekolahLainnya("");
      setLainnya(false);
    }
  }, [asalSekolah]);

  const [optionsAsalSekolah, setOptionsAsalSekolah] = useState([]);
  const [inputSekolah, setInputSekolah] = useState("");

  useEffect(() => {
    setOptionsAsalSekolah((prev) => {
      let arr = [];
      arr.push({ value: "", label: "Nama Institusi Lainnya.." });
      dataAsalSekolah.map((item) => {
        arr.push({ label: item.label, value: item.id });
      });
      return arr;
    });
  }, [dataAsalSekolah]);

  useEffect(() => {
    if (inputSekolah.length > 3) {
      setTimeout(() => {
        dispatch(getDataAsalSekolah(token, inputSekolah));
      }, 1000);
    }
  }, [inputSekolah]);

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
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formGridAdress1">
                  <Form.Label>Asal Sekolah / Perguruan Tinggi</Form.Label>
                  <div className="position-relative" style={{ zIndex: "4" }}>
                    <Select
                      // list="data"
                      placeholder={asalSekolah || "Pilih Sekolah"}
                      options={optionsAsalSekolah}
                      onInputChange={(e) => {
                        setInputSekolah(e);
                      }}
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
                    // asalSekolah === null ? "required" : "",
                    "required",
                    {
                      className: "text-danger",
                    }
                  )}
                </Form.Group>
              </Col>
              {lainnya && (
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formGridAddress1">
                    <Form.Label>Nama Institusi Pendidikan</Form.Label>
                    <Form.Control
                      placeholder="Silahkan Masukkan Nama Institusi"
                      onChange={(e) => {
                        setSekolahLainnya(e.target.value);
                      }}
                      type="text"
                    />
                    {simpleValidator.current.message(
                      "sekolah lainnya",
                      sekolahLainnya,
                      "required",
                      {
                        className: "text-danger",
                      }
                    )}
                  </Form.Group>
                </Col>
              )}
            </Row>
          )}

          {jengjangPendidikan.label === "D3" && showInputCollegeName === false && (
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
                    onInputChange={(e) => {
                      setInputSekolah(e);
                    }}
                    selectedValue={asalSekolah}
                    onChange={(e) => {
                      onChangeAsalSekolah(e.label);
                    }}
                    components={{ NoOptionsMessage }}
                  />
                </div>
                {simpleValidator.current.message(
                  "asal sekolah",
                  asalSekolah,
                  // asalSekolah === null ? "required" : "",
                  "required",
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
                  placeholder={"Silahkan Masukkan Program Studi"}
                  value={programStudi === "0" ? "-" : programStudi}
                  onChange={(e) => setProgramStudi(e.target.value)}
                  onBlur={() =>
                    simpleValidator.current.showMessageFor("program studi")
                  }
                />
                {simpleValidator.current.message(
                  "program studi",
                  programStudi,
                  // programStudi === null ? "required" : "",
                  "required",
                  {
                    className: "text-danger",
                  }
                )}
              </Form.Group>
            </Row>
          )}

          {/* Jika Asal Sekolah Tidak Ada */}
          {jengjangPendidikan.label === "D3" && showInputCollegeName === true && (
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
                    onInputChange={(e) => {
                      setInputSekolah(e);
                    }}
                    selectedValue={asalSekolah}
                    onChange={(e) => {
                      onChangeAsalSekolah(e.label);
                    }}
                    components={{ NoOptionsMessage }}
                  />
                </div>
                {simpleValidator.current.message(
                  "asal sekolah",
                  asalSekolah,
                  // asalSekolah === null ? "required" : "",
                  "required",
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
                <Form.Label>Nama Institusi Pendidikan</Form.Label>
                <Form.Control
                  placeholder={"Silahkan Masukkan Nama Institusi Pendidikan"}
                  value={asalInstitusi}
                  onChange={(e) => setAsalInstitusi(e.target.value)}
                  onBlur={() =>
                    simpleValidator.current.showMessageFor("nama institusi")
                  }
                />
                {simpleValidator.current.message(
                  "nama institusi",
                  asalInstitusi,
                  // asalInstitusi === null ? "required" : "",
                  "required",
                  {
                    className: "text-danger",
                  }
                )}
              </Form.Group>
            </Row>
          )}

          {jengjangPendidikan.label === "D4" && showInputCollegeName === false && (
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
                    onInputChange={(e) => {
                      setInputSekolah(e);
                    }}
                    selectedValue={asalSekolah}
                    onChange={(e) => {
                      onChangeAsalSekolah(e.label);
                    }}
                    components={{ NoOptionsMessage }}
                  />
                </div>
                {simpleValidator.current.message(
                  "asal sekolah",
                  asalSekolah,
                  // asalSekolah === null ? "required" : "",
                  "required",
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
                  placeholder={"Silahkan Masukkan Program Studi"}
                  value={programStudi === "0" ? "-" : programStudi}
                  onChange={(e) => setProgramStudi(e.target.value)}
                  onBlur={() =>
                    simpleValidator.current.showMessageFor("program studi")
                  }
                />
                {simpleValidator.current.message(
                  "program studi",
                  programStudi,
                  // programStudi === null ? "required" : "",
                  "required",
                  {
                    className: "text-danger",
                  }
                )}
              </Form.Group>
            </Row>
          )}

          {/* Jika Asal Sekolah Tidak Ada */}
          {jengjangPendidikan.label === "D4" && showInputCollegeName === true && (
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
                    onInputChange={(e) => {
                      setInputSekolah(e);
                    }}
                    selectedValue={asalSekolah}
                    onChange={(e) => {
                      onChangeAsalSekolah(e.label);
                    }}
                    components={{ NoOptionsMessage }}
                  />
                </div>
                {simpleValidator.current.message(
                  "asal sekolah",
                  asalSekolah,
                  // asalSekolah === null ? "required" : "",
                  "required",
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
                <Form.Label>Nama Institusi Pendidikan</Form.Label>
                <Form.Control
                  placeholder={"Silahkan Masukkan Nama Institusi Pendidikan"}
                  value={asalInstitusi}
                  onChange={(e) => setAsalInstitusi(e.target.value)}
                  onBlur={() =>
                    simpleValidator.current.showMessageFor("nama institusi")
                  }
                />
                {simpleValidator.current.message(
                  "nama institusi",
                  asalInstitusi,
                  // asalInstitusi === null ? "required" : "",
                  "required",
                  {
                    className: "text-danger",
                  }
                )}
              </Form.Group>
            </Row>
          )}

          {jengjangPendidikan.label === "S1" && showInputCollegeName === false && (
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
                    onInputChange={(e) => {
                      setInputSekolah(e);
                    }}
                    selectedValue={asalSekolah}
                    onChange={(e) => {
                      onChangeAsalSekolah(e.label);
                    }}
                    components={{ NoOptionsMessage }}
                  />
                </div>
                {simpleValidator.current.message(
                  "asal sekolah",
                  asalSekolah,
                  // asalSekolah === null ? "required" : "",
                  "required",
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
                  placeholder={"Silahkan Masukkan Program Studi"}
                  value={programStudi === "0" ? "-" : programStudi}
                  onChange={(e) => setProgramStudi(e.target.value)}
                  onBlur={() =>
                    simpleValidator.current.showMessageFor("program studi")
                  }
                />
                {simpleValidator.current.message(
                  "program studi",
                  programStudi,
                  // programStudi === null ? "required" : "",
                  "required",
                  {
                    className: "text-danger",
                  }
                )}
              </Form.Group>
            </Row>
          )}

          {/* Jika Asal Sekolah Tidak Ada */}
          {jengjangPendidikan.label === "S1" && showInputCollegeName === true && (
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
                    onInputChange={(e) => {
                      setInputSekolah(e);
                    }}
                    selectedValue={asalSekolah}
                    onChange={(e) => {
                      onChangeAsalSekolah(e.label);
                    }}
                    components={{ NoOptionsMessage }}
                  />
                </div>
                {simpleValidator.current.message(
                  "asal sekolah",
                  asalSekolah,
                  // asalSekolah === null ? "required" : "",
                  "required",
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
                <Form.Label>Nama Institusi Pendidikan</Form.Label>
                <Form.Control
                  placeholder={"Silahkan Masukkan Nama Institusi Pendidikan"}
                  value={asalInstitusi}
                  onChange={(e) => setAsalInstitusi(e.target.value)}
                  onBlur={() =>
                    simpleValidator.current.showMessageFor("nama institusi")
                  }
                />
                {simpleValidator.current.message(
                  "nama institusi",
                  asalInstitusi,
                  // asalInstitusi === null ? "required" : "",
                  "required",
                  {
                    className: "text-danger",
                  }
                )}
              </Form.Group>
            </Row>
          )}

          {jengjangPendidikan.label === "S2" && showInputCollegeName === false && (
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
                    onInputChange={(e) => {
                      setInputSekolah(e);
                    }}
                    selectedValue={asalSekolah}
                    onChange={(e) => {
                      onChangeAsalSekolah(e.label);
                    }}
                    components={{ NoOptionsMessage }}
                  />
                </div>
                {simpleValidator.current.message(
                  "asal sekolah",
                  asalSekolah,
                  // asalSekolah === null ? "required" : "",
                  "required",
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
                  placeholder={"Silahkan Masukkan Program Studi"}
                  value={programStudi === "0" ? "-" : programStudi}
                  onChange={(e) => setProgramStudi(e.target.value)}
                  onBlur={() =>
                    simpleValidator.current.showMessageFor("program studi")
                  }
                />
                {simpleValidator.current.message(
                  "program studi",
                  programStudi,
                  // programStudi === null ? "required" : "",
                  "required",
                  {
                    className: "text-danger",
                  }
                )}
              </Form.Group>
            </Row>
          )}

          {/* Jika asal sekolah tidak ada */}
          {jengjangPendidikan.label === "S2" && showInputCollegeName === true && (
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
                    onInputChange={(e) => {
                      setInputSekolah(e);
                    }}
                    selectedValue={asalSekolah}
                    onChange={(e) => {
                      onChangeAsalSekolah(e.label);
                    }}
                    components={{ NoOptionsMessage }}
                  />
                </div>
                {simpleValidator.current.message(
                  "asal sekolah",
                  asalSekolah,
                  // asalSekolah === null ? "required" : "",
                  "required",
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
                <Form.Label>Nama Institusi Pendidikan</Form.Label>
                <Form.Control
                  placeholder={"Silahkan Masukkan Nama Institusi Pendidikan"}
                  value={asalInstitusi}
                  onChange={(e) => setAsalInstitusi(e.target.value)}
                  onBlur={() =>
                    simpleValidator.current.showMessageFor("nama institusi")
                  }
                />
                {simpleValidator.current.message(
                  "nama institusi",
                  asalInstitusi,
                  // asalInstitusi === null ? "required" : "",
                  "required",
                  {
                    className: "text-danger",
                  }
                )}
              </Form.Group>
            </Row>
          )}

          {jengjangPendidikan.label === "S3" && showInputCollegeName === false && (
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
                    onInputChange={(e) => {
                      setInputSekolah(e);
                    }}
                    selectedValue={asalSekolah}
                    onChange={(e) => {
                      onChangeAsalSekolah(e.label);
                    }}
                    components={{ NoOptionsMessage }}
                  />
                </div>
                {simpleValidator.current.message(
                  "asal sekolah",
                  asalSekolah,
                  // asalSekolah === null ? "required" : "",
                  "required",
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
                  placeholder={"Silahkan Masukkan Program Studi"}
                  value={programStudi === "0" ? "-" : programStudi}
                  onChange={(e) => setProgramStudi(e.target.value)}
                  onBlur={() =>
                    simpleValidator.current.showMessageFor("program studi")
                  }
                />
                {simpleValidator.current.message(
                  "program studi",
                  programStudi,
                  // programStudi === null ? "required" : "",
                  "required",
                  {
                    className: "text-danger",
                  }
                )}
              </Form.Group>
            </Row>
          )}

          {/* Asal Sekolah Tidak Ada */}
          {jengjangPendidikan.label === "S3" && showInputCollegeName === true && (
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
                    onInputChange={(e) => {
                      setInputSekolah(e);
                    }}
                    selectedValue={asalSekolah}
                    onChange={(e) => {
                      onChangeAsalSekolah(e.label);
                    }}
                    components={{ NoOptionsMessage }}
                  />
                </div>
                {simpleValidator.current.message(
                  "asal sekolah",
                  asalSekolah,
                  // asalSekolah === null ? "required" : "",
                  "required",
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
                <Form.Label>Nama Institusi Pendidikan</Form.Label>
                <Form.Control
                  placeholder={"Silahkan Masukkan Nama Institusi Pendidikan"}
                  value={asalInstitusi}
                  onChange={(e) => setAsalInstitusi(e.target.value)}
                  onBlur={() =>
                    simpleValidator.current.showMessageFor("nama institusi")
                  }
                />
                {simpleValidator.current.message(
                  "nama institusi",
                  asalInstitusi,
                  // asalInstitusi === null ? "required" : "",
                  "required",
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
                placeholder="Silahkan Masukkan Lainnya ( Sekolah / PT)"
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
                // lainya === null ? "required" : "",
                "required",
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
                placeholder="Silahkan Masukkan Lainnya ( Sekolah / PT)"
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
                // lainya === null ? "required" : "",
                "required",
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
                placeholder="Silahkan Masukkan Lainnya ( Sekolah / PT)"
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
                // lainya === null ? "required" : "",
                "required",
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
                  placeholder="Silahkan Masukkan Tahun Masuk"
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
                  Masukkan Maksimal dan Minimal 4 Angka, Contoh : 2020
                </span>
                {simpleValidator.current.message(
                  "tahun masuk",
                  tahunMasuk,
                  // tahunMasuk === null ? "" : "required|integer",
                  "required",
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
                  placeholder="Silahkan Masukkan Tahun Masuk"
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
                  Masukkan Maksimal dan Minimal 4 Angka, Contoh : 2020
                </span>
                {simpleValidator.current.message(
                  "tahun masuk",
                  tahunMasuk,
                  // tahunMasuk === null ? "" : "required|integer",
                  "required",
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
                  placeholder="Silahkan Masukkan Tahun Masuk"
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
                  Masukkan Maksimal dan Minimal 4 Angka, Contoh : 2020
                </span>
                {simpleValidator.current.message(
                  "tahun masuk",
                  tahunMasuk,
                  // tahunMasuk === null ? "" : "required|integer",
                  "required",
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
                  placeholder="Silahkan Masukkan Tahun Masuk"
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
                  Masukkan Maksimal dan Minimal 4 Angka, Contoh : 2020
                </span>
                {simpleValidator.current.message(
                  "tahun masuk",
                  tahunMasuk,
                  // tahunMasuk === null ? "" : "required|integer",
                  "required",
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
                    accept="image/png, image/jpeg, image/jpg, application/pdf"
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
                      // ijazah === null ? "required" : "",
                      "required",
                      {
                        className: "text-danger",
                      }
                    )}
                  </label>
                </div>
              </div>
              <small className="text-muted">
                *JPG/JPEG/PNG/PDF (Maksimal ukuran file 5 MB)
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
                    accept="image/png, image/jpeg, image/jpg, application/pdf"
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
                      // ijazah === null ? "required" : "",
                      "required",
                      {
                        className: "text-danger",
                      }
                    )}
                  </label>
                </div>
              </div>
              <small className="text-muted">
                *JPG/JPEG/PNG/PDF (Maksimal ukuran file 5 MB)
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
                    accept="image/png, image/jpeg, image/jpg, application/pdf"
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
                      // ijazah === null ? "required" : "",
                      "required",
                      {
                        className: "text-danger",
                      }
                    )}
                  </label>
                </div>
              </div>
              <small className="text-muted">
                *JPG/JPEG/PNG/PDF (Maksimal ukuran file 5 MB)
              </small>
            </div>
          )}

          {jengjangPendidikan.label === "D3" && showInputCollegeName === false && (
            <Row className="mb-3">
              <Form.Group as={Col} md={6} controlId="formGridIpk">
                <Form.Label>IPK</Form.Label>
                <Form.Control
                  minLength={0}
                  maxLength={4}
                  type="text"
                  placeholder="Silahkan Masukkan IPK"
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
                  Gunakan titik "." dengan dua angka di belakang titik - Contoh : 3.75
                </span>
                {/* {
                  errorOnIpk === true ? 
                    <div className="text-danger">
                      ipk harus menggunakan angka
                    </div>
                  :
                    simpleValidator.current.message(
                      "ipk",
                      ipk,
                      `required`,
                      {
                        className: "text-danger",
                      }
                )} */}
                {
                  simpleValidator.current.message(
                    "ipk",
                    ipk,
                    `required`,
                    {
                      className: "text-danger",
                    }
                  )
                }
            
              </Form.Group>
              
              <Form.Group as={Col} md={6} controlId="formGridTahun">
                <Form.Label>Tahun Masuk</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Silahkan Masukkan Tahun Masuk"
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
                  Masukkan Maksimal dan Minimal 4 Angka, Contoh : 2020
                </span>
                {simpleValidator.current.message(
                  "tahun masuk",
                  tahunMasuk,
                  // tahunMasuk === null ? "required|integer" : "",
                  "required|integer",
                  {
                    className: "text-danger",
                  }
                )}
              </Form.Group>
            </Row>
          )}

          {/* Jika Asal Sekolah Tidak Ada */}
          {jengjangPendidikan.label === "D3" && showInputCollegeName === true && (
            <Row className="mb-3">
              <Form.Group
                as={Col}
                md={6}
                className="mb-3"
                controlId="formGridAddress1"
              >
                <Form.Label>Program Studi</Form.Label>
                <Form.Control
                  placeholder={"Silahkan Masukkan Program Studi"}
                  value={programStudi === "0" ? "-" : programStudi}
                  onChange={(e) => setProgramStudi(e.target.value)}
                  onBlur={() =>
                    simpleValidator.current.showMessageFor("program studi")
                  }
                />
                {simpleValidator.current.message(
                  "program studi",
                  programStudi,
                  // programStudi === null ? "required" : "",
                  "required",
                  {
                    className: "text-danger",
                  }
                )}
              </Form.Group>
              <Form.Group as={Col} md={6} controlId="formGridIpk">
                <Form.Label>IPK</Form.Label>
                <Form.Control
                  minLength={0}
                  maxLength={4}
                  type="text"
                  placeholder="Silahkan Masukkan IPK"
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
                  // ipk === null ? "required|integer" : "",
                  "required",
                  {
                    className: "text-danger",
                  }
                )}
              </Form.Group>
            </Row>
          )}

          {jengjangPendidikan.label === "D4" && showInputCollegeName === false && (
            <Row className="mb-3">
              <Form.Group as={Col} md={6} controlId="formGridIpk">
                <Form.Label>IPK</Form.Label>
                <Form.Control
                  minLength={0}
                  maxLength={4}
                  type="text"
                  placeholder="Silahkan Masukkan IPK"
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
                  // ipk === null ? "required|integer" : "",
                  "required",
                  {
                    className: "text-danger",
                  }
                )}
              </Form.Group>
              <Form.Group as={Col} md={6} controlId="formGridTahun">
                <Form.Label>Tahun Masuk</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Silahkan Masukkan Tahun Masuk"
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
                  Masukkan Maksimal dan Minimal 4 Angka, Contoh : 2020
                </span>
                {simpleValidator.current.message(
                  "tahun masuk",
                  tahunMasuk,
                  // tahunMasuk === null ? "required|integer" : "",
                  "required|integer",
                  {
                    className: "text-danger",
                  }
                )}
              </Form.Group>
            </Row>
          )}

          {/* Jika Asal Sekolah Tidak Ada */}
          {jengjangPendidikan.label === "D4" && showInputCollegeName === true && (
            <Row className="mb-3">
              <Form.Group
                as={Col}
                md={6}
                className="mb-3"
                controlId="formGridAddress1"
              >
                <Form.Label>Program Studi</Form.Label>
                <Form.Control
                  placeholder={"Silahkan Masukkan Program Studi"}
                  value={programStudi === "0" ? "-" : programStudi}
                  onChange={(e) => setProgramStudi(e.target.value)}
                  onBlur={() =>
                    simpleValidator.current.showMessageFor("program studi")
                  }
                />
                {simpleValidator.current.message(
                  "program studi",
                  programStudi,
                  // programStudi === null ? "required" : "",
                  "required",
                  {
                    className: "text-danger",
                  }
                )}
              </Form.Group>
              <Form.Group as={Col} md={6} controlId="formGridIpk">
                <Form.Label>IPK</Form.Label>
                <Form.Control
                  minLength={0}
                  maxLength={4}
                  type="text"
                  placeholder="Silahkan Masukkan IPK"
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
                  // ipk === null ? "required|integer" : "",
                  "required",
                  {
                    className: "text-danger",
                  }
                )}
              </Form.Group>
            </Row>
          )}

          {jengjangPendidikan.label === "S1" && showInputCollegeName === false && (
            <Row className="mb-3">
              <Form.Group as={Col} md={6} controlId="formGridIpk">
                <Form.Label>IPK</Form.Label>
                <Form.Control
                  minLength={0}
                  maxLength={4}
                  type="text"
                  placeholder="Silahkan Masukkan IPK"
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
                  // ipk === null ? "required|integer" : "",
                  "required",
                  {
                    className: "text-danger",
                  }
                )}
              </Form.Group>
              <Form.Group as={Col} md={6} controlId="formGridTahun">
                <Form.Label>Tahun Masuk</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Silahkan Masukkan Tahun Masuk"
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
                  Masukkan Maksimal dan Minimal 4 Angka, Contoh : 2020
                </span>
                {simpleValidator.current.message(
                  "tahun masuk",
                  tahunMasuk,
                  // tahunMasuk === null ? "required|integer" : "",
                  "required|integer",
                  {
                    className: "text-danger",
                  }
                )}
              </Form.Group>
            </Row>
          )}

          {/* Jika Asal Sekolah Tidak Ada */}
          {jengjangPendidikan.label === "S1" && showInputCollegeName === true && (
            <Row className="mb-3">
              <Form.Group
                as={Col}
                md={6}
                className="mb-3"
                controlId="formGridAddress1"
              >
                <Form.Label>Program Studi</Form.Label>
                <Form.Control
                  placeholder={"Silahkan Masukkan Program Studi"}
                  value={programStudi === "0" ? "-" : programStudi}
                  onChange={(e) => setProgramStudi(e.target.value)}
                  onBlur={() =>
                    simpleValidator.current.showMessageFor("program studi")
                  }
                />
                {simpleValidator.current.message(
                  "program studi",
                  programStudi,
                  // programStudi === null ? "required" : "",
                  "required",
                  {
                    className: "text-danger",
                  }
                )}
              </Form.Group>
              <Form.Group as={Col} md={6} controlId="formGridIpk">
                <Form.Label>IPK</Form.Label>
                <Form.Control
                  minLength={0}
                  maxLength={4}
                  type="text"
                  placeholder="Silahkan Masukkan IPK"
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
                  // ipk === null ? "required|integer" : "",
                  "required",
                  {
                    className: "text-danger",
                  }
                )}
               
              </Form.Group>
            </Row>
          )}

          {jengjangPendidikan.label === "S2" && showInputCollegeName === false && (
            <Row className="mb-3">
              <Form.Group as={Col} md={6} controlId="formGridIpk">
                <Form.Label>IPK</Form.Label>
                <Form.Control
                  minLength={0}
                  maxLength={4}
                  type="text"
                  placeholder="Silahkan Masukkan IPK"
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
                  // ipk === null ? "required|integer" : "",
                  "required",
                  {
                    className: "text-danger",
                  }
                )}
                
              </Form.Group>
              <Form.Group as={Col} md={6} controlId="formGridTahun">
                <Form.Label>Tahun Masuk</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Silahkan Masukkan Tahun Masuk"
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
                  Masukkan Maksimal dan Minimal 4 Angka, Contoh : 2020
                </span>
                {simpleValidator.current.message(
                  "tahun masuk",
                  tahunMasuk,
                  // tahunMasuk === null ? "required|integer" : "",
                  "required|integer",
                  {
                    className: "text-danger",
                  }
                )}
              </Form.Group>
            </Row>
          )}

          {/* Jika Asal Sekolah Tidak Ada */}
          {jengjangPendidikan.label === "S2" && showInputCollegeName === true && (
            <Row className="mb-3">
              <Form.Group
                as={Col}
                md={6}
                className="mb-3"
                controlId="formGridAddress1"
              >
                <Form.Label>Program Studi</Form.Label>
                <Form.Control
                  placeholder={"Silahkan Masukkan Program Studi"}
                  value={programStudi === "0" ? "-" : programStudi}
                  onChange={(e) => setProgramStudi(e.target.value)}
                  onBlur={() =>
                    simpleValidator.current.showMessageFor("program studi")
                  }
                />
                {simpleValidator.current.message(
                  "program studi",
                  programStudi,
                  // programStudi === null ? "required" : "",
                  "required|integer",
                  {
                    className: "text-danger",
                  }
                )}
              </Form.Group>
              <Form.Group as={Col} md={6} controlId="formGridIpk">
                <Form.Label>IPK</Form.Label>
                <Form.Control
                  minLength={0}
                  maxLength={4}
                  type="text"
                  placeholder="Silahkan Masukkan IPK"
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
                  // ipk === null ? "required|integer" : "",
                  "required",
                  {
                    className: "text-danger",
                  }
                )}
                
              </Form.Group>
            </Row>
          )}

          {jengjangPendidikan.label === "S3" && showInputCollegeName === false && (
            <Row className="mb-3">
              <Form.Group as={Col} md={6} controlId="formGridIpk">
                <Form.Label>IPK</Form.Label>
                <Form.Control
                  minLength={0}
                  maxLength={4}
                  type="text"
                  placeholder="Silahkan Masukkan IPK"
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
                  // ipk === null ? "required|integer" : "",
                  "required",
                  {
                    className: "text-danger",
                  }
                )}
                
              </Form.Group>
              <Form.Group as={Col} md={6} controlId="formGridTahun">
                <Form.Label>Tahun Masuk</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Silahkan Masukkan Tahun Masuk"
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
                  Masukkan Maksimal dan Minimal 4 Angka, Contoh : 2020
                </span>
                {simpleValidator.current.message(
                  "tahun masuk",
                  tahunMasuk,
                  // tahunMasuk === null ? "required|integer" : "",
                  "required|integer",
                  {
                    className: "text-danger",
                  }
                )}
              </Form.Group>
            </Row>
          )}

          {/* Jika Asal Sekolah Tidak Ada */}
          {jengjangPendidikan.label === "S3" && showInputCollegeName === true && (
            <Row className="mb-3">
              <Form.Group
                as={Col}
                md={6}
                className="mb-3"
                controlId="formGridAddress1"
              >
                <Form.Label>Program Studi</Form.Label>
                <Form.Control
                  placeholder={"Silahkan Masukkan Program Studi"}
                  value={programStudi === "0" ? "-" : programStudi}
                  onChange={(e) => setProgramStudi(e.target.value)}
                  onBlur={() =>
                    simpleValidator.current.showMessageFor("program studi")
                  }
                />
                {simpleValidator.current.message(
                  "program studi",
                  programStudi,
                  // programStudi === null ? "required" : "",
                  "required",
                  {
                    className: "text-danger",
                  }
                )}
              </Form.Group>
              
              <Form.Group as={Col} md={6} controlId="formGridIpk">
                <Form.Label>IPK</Form.Label>
                <Form.Control
                  minLength={0}
                  maxLength={4}
                  type="text"
                  placeholder="Silahkan Masukkan IPK"
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
                  // ipk === null ? "required|integer" : "",
                  "required",
                  {
                    className: "text-danger",
                  }
                )}
                
              </Form.Group>
            </Row>
          )}

          {jengjangPendidikan.label === "D3" && showInputCollegeName === false && (
            <div className="form-group">
              <label className="col-form-label">Unggah Ijazah</label>
              <div className="d-flex">
                <div className="custom-file">
                  <input
                    type="file"
                    className="custom-file-input"
                    name="question_image"
                    accept="image/png, image/jpeg, image/jpg, application/pdf"
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
                      // ijazah === null ? "required" : "",
                      "required",
                      {
                        className: "text-danger",
                      }
                    )}
                  </label>
                </div>
              </div>
              <small className="text-muted">
                *JPG/JPEG/PNG/PDF (Maksimal ukuran file 5 MB)
              </small>
            </div>
          )}

          {/* Jika Asal Sekolah Tidak Ada */}
          {jengjangPendidikan.label === "D3" && showInputCollegeName === true && (
            <Row className="mb-3">
              <Form.Group as={Col} md={6} controlId="formGridTahun">
                <Form.Label>Tahun Masuk</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Silahkan Masukkan Tahun Masuk"
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
                  Masukkan Maksimal dan Minimal 4 Angka, Contoh : 2020
                </span>
                {simpleValidator.current.message(
                  "tahun masuk",
                  tahunMasuk,
                  // tahunMasuk === null ? "required|integer" : "",
                  "required|integer",
                  {
                    className: "text-danger",
                  }
                )}
              </Form.Group>

              <Form.Group as={Col} md={6} controlId="formGridIjazah">
                <Form.Label>Unggah Ijazah</Form.Label>
                <Form.Control
                  type="file"
                  className="custom-file-input"
                  name="question_image"
                  accept="image/png, image/jpeg, image/jpg, application/pdf"
                  onChange={onChangeIjazah}
                  onBlur={() =>
                    simpleValidator.current.showMessageFor("ijazah")
                  }
                />
                <label
                  className="custom-file-label mt-8 mx-3"
                  htmlFor="customFile"
                >
                  {ijazahName}
                </label>
                <label>
                  {simpleValidator.current.message(
                    "ijazah",
                    ijazah,
                    // ijazah === null ? "required" : "",
                    "required",
                    {
                      className: "text-danger",
                    }
                  )}
                </label>
                <small className="text-muted">
                  *JPG/JPEG/PNG/PDF (Maksimal ukuran file 5 MB)
                </small>
              </Form.Group>
            </Row>
          )}

          {jengjangPendidikan.label === "D4" && showInputCollegeName === false && (
            <div className="form-group">
              <label className="col-form-label">Unggah Ijazah</label>
              <div className="d-flex">
                <div className="custom-file">
                  <input
                    type="file"
                    className="custom-file-input"
                    name="question_image"
                    accept="image/png, image/jpeg, image/jpg, application/pdf"
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
                      // ijazah === null ? "required" : "",
                      "required",
                      {
                        className: "text-danger",
                      }
                    )}
                  </label>
                </div>
              </div>
              <small className="text-muted">
                *JPG/JPEG/PNG/PDF (Maksimal ukuran file 5 MB)
              </small>
            </div>
          )}

          {/* Jika Asal Sekolah Tidak Ada */}
          {jengjangPendidikan.label === "D4" && showInputCollegeName === true && (
            <Row className="mb-3">
              <Form.Group as={Col} md={6} controlId="formGridTahun">
                <Form.Label>Tahun Masuk</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Silahkan Masukkan Tahun Masuk"
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
                  Masukkan Maksimal dan Minimal 4 Angka, Contoh : 2020
                </span>
                {simpleValidator.current.message(
                  "tahun masuk",
                  tahunMasuk,
                  // tahunMasuk === null ? "required|integer" : "",
                  "required|integer",
                  {
                    className: "text-danger",
                  }
                )}
              </Form.Group>

              <Form.Group as={Col} md={6} controlId="formGridIjazah">
                <Form.Label>Unggah Ijazah</Form.Label>
                <Form.Control
                  type="file"
                  className="custom-file-input"
                  name="question_image"
                  accept="image/png, image/jpeg, image/jpg, application/pdf"
                  onChange={onChangeIjazah}
                  onBlur={() =>
                    simpleValidator.current.showMessageFor("ijazah")
                  }
                />
                <label
                  className="custom-file-label mt-8 mx-3"
                  htmlFor="customFile"
                >
                  {ijazahName}
                </label>
                <label>
                  {simpleValidator.current.message(
                    "ijazah",
                    ijazah,
                    // ijazah === null ? "required" : "",
                    ijazah ? "" : "required",
                    {
                      className: "text-danger",
                    }
                  )}
                </label>
                <small className="text-muted">
                  *JPG/JPEG/PNG/PDF (Maksimal ukuran file 5 MB)
                </small>
              </Form.Group>
            </Row>
          )}

          {jengjangPendidikan.label === "S1" && showInputCollegeName === false && (
            <div className="form-group">
              <label className="col-form-label">Unggah Ijazah</label>
              <div className="d-flex">
                <div className="custom-file">
                  <input
                    type="file"
                    className="custom-file-input"
                    name="question_image"
                    accept="image/png, image/jpeg, image/jpg, application/pdf"
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
                      // ijazah === null ? "required" : "",
                      ijazah ? "" : "required",
                      {
                        className: "text-danger",
                      }
                    )}
                  </label>
                </div>
              </div>
              <small className="text-muted">
                *JPG/JPEG/PNG/PDF (Maksimal ukuran file 5 MB)
              </small>
            </div>
          )}

          {/* Jika Asal Sekolah Tidak Ada */}
          {jengjangPendidikan.label === "S1" && showInputCollegeName === true && (
            <Row className="mb-3">
              <Form.Group as={Col} md={6} controlId="formGridTahun">
                <Form.Label>Tahun Masuk</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Silahkan Masukkan Tahun Masuk"
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
                  Masukkan Maksimal dan Minimal 4 Angka, Contoh : 2020
                </span>
                {simpleValidator.current.message(
                  "tahun masuk",
                  tahunMasuk,
                  // tahunMasuk === null ? "required|integer" : "",
                  tahunMasuk ? "" : "required|integer",
                  {
                    className: "text-danger",
                  }
                )}
              </Form.Group>

              <Form.Group as={Col} md={6} controlId="formGridIjazah">
                <Form.Label>Unggah Ijazah</Form.Label>
                <Form.Control
                  type="file"
                  className="custom-file-input"
                  name="question_image"
                  accept="image/png, image/jpeg, image/jpg, application/pdf"
                  onChange={onChangeIjazah}
                  onBlur={() =>
                    simpleValidator.current.showMessageFor("ijazah")
                  }
                />
                <label
                  className="custom-file-label mt-8 mx-3"
                  htmlFor="customFile"
                >
                  {ijazahName}
                </label>
                <label>
                  {simpleValidator.current.message(
                    "ijazah",
                    ijazah,
                    // ijazah === null ? "required" : "",
                    ijazah ? "" : "required",
                    {
                      className: "text-danger",
                    }
                  )}
                </label>
                <small className="text-muted">
                  *JPG/JPEG/PNG/PDF (Maksimal ukuran file 5 MB)
                </small>
              </Form.Group>
            </Row>
          )}

          {jengjangPendidikan.label === "S2" && showInputCollegeName === false && (
            <div className="form-group">
              <label className="col-form-label">Unggah Ijazah</label>
              <div className="d-flex">
                <div className="custom-file">
                  <input
                    type="file"
                    className="custom-file-input"
                    name="question_image"
                    accept="image/png, image/jpeg, image/jpg, application/pdf"
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
                      // ijazah === null ? "required" : "",
                      ijazah ? "" : "required",
                      {
                        className: "text-danger",
                      }
                    )}
                  </label>
                </div>
              </div>
              <small className="text-muted">
                *JPG/JPEG/PNG/PDF (Maksimal ukuran file 5 MB)
              </small>
            </div>
          )}

          {/* Jika Asal Sekolah Tidak Ada */}
          {jengjangPendidikan.label === "S2" && showInputCollegeName === true && (
            <Row className="mb-3">
              <Form.Group as={Col} md={6} controlId="formGridTahun">
                <Form.Label>Tahun Masuk</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Silahkan Masukkan Tahun Masuk"
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
                  Masukkan Maksimal dan Minimal 4 Angka, Contoh : 2020
                </span>
                {simpleValidator.current.message(
                  "tahun masuk",
                  tahunMasuk,
                  // tahunMasuk === null ? "required|integer" : "",
                  tahunMasuk ? "" : "required|integer",
                  {
                    className: "text-danger",
                  }
                )}
              </Form.Group>

              <Form.Group as={Col} md={6} controlId="formGridIjazah">
                <Form.Label>Unggah Ijazah</Form.Label>
                <Form.Control
                  type="file"
                  className="custom-file-input"
                  name="question_image"
                  accept="image/png, image/jpeg, image/jpg, application/pdf"
                  onChange={onChangeIjazah}
                  onBlur={() =>
                    simpleValidator.current.showMessageFor("ijazah")
                  }
                />
                <label
                  className="custom-file-label mt-8 mx-3"
                  htmlFor="customFile"
                >
                  {ijazahName}
                </label>
                <label>
                  {simpleValidator.current.message(
                    "ijazah",
                    ijazah,
                    // ijazah === null ? "required" : "",
                    ijazah ? "" : "required",
                    {
                      className: "text-danger",
                    }
                  )}
                </label>
                <small className="text-muted">
                  *JPG/JPEG/PNG/PDF (Maksimal ukuran file 5 MB)
                </small>
              </Form.Group>
            </Row>
          )}

          {jengjangPendidikan.label === "S3" && showInputCollegeName === false && (
            <div className="form-group">
              <label className="col-form-label">Unggah Ijazah</label>
              <div className="d-flex">
                <div className="custom-file">
                  <input
                    type="file"
                    className="custom-file-input"
                    name="question_image"
                    accept="image/png, image/jpeg, image/jpg, application/pdf"
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
                      // ijazah === null ? "required" : "",
                      ijazah ? "" : "required",
                      {
                        className: "text-danger",
                      }
                    )}
                  </label>
                </div>
              </div>
              <small className="text-muted">
                *JPG/JPEG/PNG/PDF (Maksimal ukuran file 5 MB)
              </small>
            </div>
          )}

          {/* Jika Asal Sekolah Tidak Ada */}
          {jengjangPendidikan.label === "S3" && showInputCollegeName === true && (
            <Row className="mb-3">
              <Form.Group as={Col} md={6} controlId="formGridTahun">
                <Form.Label>Tahun Masuk</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Silahkan Masukkan Tahun Masuk"
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
                  Masukkan Maksimal dan Minimal 4 Angka, Contoh : 2020
                </span>
                {simpleValidator.current.message(
                  "tahun masuk",
                  tahunMasuk,
                  // tahunMasuk === null ? "required|integer" : "",
                  tahunMasuk ? "" : "required|integer",
                  {
                    className: "text-danger",
                  }
                )}
              </Form.Group>

              <Form.Group as={Col} md={6} controlId="formGridIjazah">
                <Form.Label>Unggah Ijazah</Form.Label>
                <Form.Control
                  type="file"
                  className="custom-file-input"
                  name="question_image"
                  accept="image/png, image/jpeg, image/jpg, application/pdf"
                  onChange={onChangeIjazah}
                  onBlur={() =>
                    simpleValidator.current.showMessageFor("ijazah")
                  }
                />
                <label
                  className="custom-file-label mt-8 mx-3"
                  htmlFor="customFile"
                >
                  {ijazahName}
                </label>
                <label>
                  {simpleValidator.current.message(
                    "ijazah",
                    ijazah,
                    // ijazah === null ? "required" : "",
                    ijazah ? "" : "required",
                    {
                      className: "text-danger",
                    }
                  )}
                </label>
                <small className="text-muted">
                  *JPG/JPEG/PNG/PDF (Maksimal ukuran file 5 MB)
                </small>
              </Form.Group>
            </Row>
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
							className={`${style.button_profile_batal} rounded-xl mr-2`}
							type="button"
							onClick={() => stepBack()}
							disabled={loadingStatusWizzard ? true : false}
						>
							Kembali
						</Button>
            <Button
              className={`${style.button_profile_simpan} rounded-xl`}
              type="submit"
              disabled = {loadingUpdateData ? true : false}
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
