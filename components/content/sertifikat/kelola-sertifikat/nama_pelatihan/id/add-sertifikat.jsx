// #Next & React
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
// #Page, Component & Library
import Image from "next/image";
import Swal from "sweetalert2";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import SignaturePad from "react-signature-pad-wrapper";
import SimpleReactValidator from "simple-react-validator";
import { useSelector } from "react-redux";
import PageWrapper from "../../../../../wrapper/page.wrapper";
import { toPng } from "html-to-image";
import { useDispatch } from "react-redux";
import {
  clearErrors,
  newSertifikat,
} from "../../../../../../redux/actions/sertifikat/kelola-sertifikat.action";
import * as moment from "moment";
import { Modal } from "react-bootstrap";

export default function TambahMasterSertifikat({ token }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { query } = router;

  // #Div Reference Lembar 1
  const divReference = useRef(null);
  const divReferenceSilabus = useRef(null);
  const [certificate_name, setCertificate_name] = useState("");
  const [namaPeserta, setNamaPeserta] = useState("Nama Peserta");
  const [confirmModal, setConfirmModal] = useState(false);

  const [date, setDate] = useState(new Date());

  // #Redux state
  const { certificate } = useSelector((state) => state.detailCertificates);

  const { error, certificate: newCertificate } = useSelector(
    (state) => state.newCertificates
  );

  useEffect(() => {
    if (newCertificate) {
      router.push({
        pathname: `/sertifikat/kelola-sertifikat/${query.theme_name}`,
        query: {
          id: query.theme_id,
          message: newCertificate.message,
          created: true,
        },
      });
    }
  }, [newCertificate, query.theme_name, query.theme_id, router]);

  // console.log(certificate)
  // #Redux state
  const simpleValidator = useRef(new SimpleReactValidator({ locale: "id" }));

  // #START FORM DATA
  const [certificate_type, setCertificate_type] = useState(
    certificate?.data?.pelatihan?.list[0]?.certificate_type || "1 lembar"
  );

  const [number_of_signatures, setNumber_of_signatures] = useState(1);
  const [
    signature_certificate_set_position,
    setSignature_certificate_set_position,
  ] = useState([]);

  const [signature_certificate_name, setSignature_certificate_name] = useState(
    []
  );
  const [signature_certificate_image, setSignature_certificate_image] =
    useState([]);

  const [signature_certificate_position, setSignature_certificate_position] =
    useState([]);

  // START SYLLABUS
  const [number_of_signature_syllabus, setNumber_of_signature_syllabus] =
    useState(1);
  const [syllabus, setSyllabus] = useState(["", ""]);

  const [
    signature_certificate_name_syllabus,
    setSignature_certificate_name_syllabus,
  ] = useState([]);
  const [
    signature_certificate_image_syllabus,
    setSignature_certificate_image_syllabus,
  ] = useState([]);
  const [
    signature_certificate_position_syllabus,
    setSignature_certificate_position_syllabus,
  ] = useState([]);
  const [
    signature_certificate_set_position_syllabus,
    setSignature_certificate_set_position_syllabus,
  ] = useState([]);
  // END SYLLABUS
  // #END FORM DATA
  const [tandaTanganSyllabusType, setTandaTanganSyllabusType] = useState([
    1, 1, 1, 1,
  ]);

  const [tandaTanganType, setTandaTanganType] = useState([1, 1, 1, 1]);
  const signCanvas = useRef({});

  const [imageName, setImageName] = useState([]);
  const [imageNameSyllabus, setImageNameSyllabus] = useState([]);
  const [background_syllabus, setBackground_syllabus] = useState("");
  const [background, setBackground] = useState("");

  const [nomerSertifikat, setNomerSertifikat] = useState("Nomor Sertifikat");
  const [tanggal, setTanggal] = useState("--/--/----");
  const [tahun, setTahun] = useState("----");

  // RESET TTD
  useEffect(() => {
    setSignature_certificate_set_position([0, 0, 0, 0]);
  }, [number_of_signatures]);

  useEffect(() => {
    setSignature_certificate_set_position_syllabus([0, 0, 0, 0]);
  }, [number_of_signature_syllabus]);

  const handleImageTandaTangan = (e, index) => {
    if (e.target.files[0].size > 5000000) {
      e.target.value = null;
      Swal.fire("Oops !", "Gambar maksimal 5 MB.", "error");
    } else {
      if (e.target.name === "image") {
        const reader = new FileReader();
        let arr = [...imageName];
        arr[index] = e.target.files[0].name;
        setImageName(arr);
        reader.onload = () => {
          if (reader.readyState === 2) {
            let newArr = [...signature_certificate_image];
            newArr[index] = reader.result;
            setSignature_certificate_image(newArr);
          }
        };
        if (e.target.files[0]) {
          reader.readAsDataURL(e.target.files[0]);
        }
      }
    }
  };

  const handleCanvasTandaTangan = (e, i) => {
    let arr = [...imageName];
    arr[i] = "";
    setImageName("");

    const data = signCanvas.current.toDataURL();
    let newArr = [...signature_certificate_image];
    newArr[i] = data;
    setSignature_certificate_image(newArr);
  };

  const handleClearCanvasTandaTangan = (e, i) => {
    let newArr = [...signature_certificate_image];
    newArr[i] = "";
    setSignature_certificate_image(newArr);
    signCanvas.current.clear();
  };
  // #END MODAL

  // #START LEMBAR 2
  const handleImageTandaTanganSyllabus = (e, index) => {
    if (e.target.files[0].size > 5000000) {
      e.target.value = null;
      Swal.fire("Oops !", "Gambar maksimal 5 MB.", "error");
    } else {
      if (e.target.name === "image") {
        const reader = new FileReader();
        let arr = [...imageNameSyllabus];
        arr[index] = e.target.files[0].name;
        setImageNameSyllabus(arr);

        reader.onload = () => {
          if (reader.readyState === 2) {
            let newArr = [...signature_certificate_image_syllabus];
            newArr[index] = reader.result;
            setSignature_certificate_image_syllabus(newArr);
          }
        };
        if (e.target.files[0]) {
          reader.readAsDataURL(e.target.files[0]);
        }
      }
    }
  };

  const handleCanvasTandaTanganSyllabus = (e, i) => {
    let arr = [...imageNameSyllabus];
    arr[i] = "";
    setImageNameSyllabus("");

    const data = signCanvas.current.toDataURL();
    let newArr = [...signature_certificate_image_syllabus];
    newArr[i] = data;
    setSignature_certificate_image_syllabus(newArr);
  };

  const handleClearCanvasTandaTanganSyllabus = (e, i) => {
    let newArr = [...signature_certificate_image_syllabus];
    newArr[i] = "";
    setSignature_certificate_image_syllabus(newArr);
    signCanvas.current.clear();
  };
  // #END SECTION 2

  // # START BACKGROUND IMAGE 1
  const onChangeBackground = (e) => {
    if (e.target.files[0].size > 5000000) {
      e.target.value = null;
      Swal.fire("Oops !", "Gambar maksimal 5 MB.", "error");
    } else {
      const type = ["image/jpg", "image/png", "image/jpeg"];

      if (type.includes(e.target.files[0].type)) {
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.readyState === 2) {
            setBackground(reader.result);
          }
        };
        reader.readAsDataURL(e.target.files[0]);
      } else {
        e.target.value = null;
        Swal.fire(
          "Oops !",
          "Data yang bisa dimasukkan hanya berupa data background.",
          "error"
        );
      }
    }
  };
  // # END BACKGROUND IMAGE 1

  // # START BACKGROUND IMAGE 2
  const onChangeBackgroundLembar2 = (e) => {
    if (e.target.files[0].size > 5000000) {
      e.target.value = null;
      Swal.fire("Oops !", "Gambar maksimal 5 MB.", "error");
    } else {
      const type = ["image/jpg", "image/png", "image/jpeg"];
      if (type.includes(e.target.files[0].type)) {
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.readyState === 2) {
            setBackground_syllabus(reader.result);
          }
        };
        reader.readAsDataURL(e.target.files[0]);
      } else {
        e.target.value = null;
        Swal.fire(
          "Oops !",
          "Data yang bisa dimasukkan hanya berupa data background.",
          "error"
        );
      }
    }
  };
  const [, forceUpdate] = useState();

  const convertDivToPng = async (div) => {
    const data = await toPng(div, {
      cacheBust: true,
      canvasWidth: 842,
      canvasHeight: 595,
      backgroundColor: "white",
    });
    return data;
  };

  // # END IMAGE
  const handlePost = async (e, status) => {
    const currentData = certificate.data.pelatihan.list.filter(
      (el) => el.id == query.id
    );
    const id = {
      training_id: currentData[0].training_id,
      theme_id: currentData[0].theme_id,
      academy_id: currentData[0].academy_id,
    };
    try {
      e.preventDefault();
      if (certificate_type == "1 lembar") {
        simpleValidator.current.fields.Jabatan = true;
        simpleValidator.current.fields.Nama = true;
        simpleValidator.current.fields["Tanda tangan"] = true;
      }

      if (simpleValidator.current.allValid()) {
        let formData = new FormData();
        if (status == 1) {
          setTahun("");
          setTanggal("");
          setNamaPeserta("");
          setNomerSertifikat("");
          const data = await convertDivToPng(divReference.current); // convert bg 1
          formData.append("certificate_result", data);
        }

        formData.append("name", certificate_name);
        formData.append("certificate_type", certificate_type);
        formData.append("number_of_signatures", number_of_signatures);

        formData.append(
          "number_of_signature_syllabus",
          number_of_signature_syllabus
        );

        formData.append("background", background);
        formData.append("background_syllabus", background_syllabus);
        // bagian image2

        for (let i = 0; i < number_of_signatures; i++) {
          formData.append(
            `signature_certificate_name[${i}]`,
            signature_certificate_name[i]
          );
          formData.append(
            `signature_certificate_position[${i}]`,
            signature_certificate_position[i]
          );
          formData.append(
            `signature_certificate_set_position[${i}]`,
            signature_certificate_set_position[i]
          );
          formData.append(
            `signature_certificate_image[${i}]`,
            signature_certificate_image[i]
          );
        }

        if (certificate_type == "2 lembar") {
          if (status == 1) {
            const dataSyllabus = await convertDivToPng(
              divReferenceSilabus.current
            ); //convert bg 2
            formData.append("certificate_result_syllabus", dataSyllabus);
          }
          for (let i = 0; i < number_of_signature_syllabus; i++) {
            formData.append(
              `signature_certificate_name_syllabus[${i}]`,
              signature_certificate_name_syllabus[i]
            );
            formData.append(
              `signature_certificate_position_syllabus[${i}]`,
              signature_certificate_position_syllabus[i]
            );
            formData.append(
              `signature_certificate_set_position_syllabus[${i}]`,
              signature_certificate_set_position_syllabus[i]
            );
            formData.append(
              `signature_certificate_image_syllabus[${i}]`,
              signature_certificate_image_syllabus[i]
            );
          }
        }

        syllabus.forEach((item, i) => {
          formData.append(`syllabus[${i}]`, item);
        });

        formData.append("status_migrate_id", status);

        dispatch(newSertifikat(id, formData, token));
      } else {
        simpleValidator.current.showMessages();
        forceUpdate(1);
        Swal.fire("Oops !", "Isi data dengan benar.", "error");
      }
    } catch (error) {
      notify(error.response.data.message);
    }
  };

  const handleResetError = () => {
    if (error) {
      dispatch(clearErrors());
    }
  };

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...syllabus];
    list[index] = value;
    setSyllabus(list);
  };

  const handleDelete = (i) => {
    let filterResult = syllabus.filter((items, index) => index !== i);
    setSyllabus(filterResult);
  };

  const handleAddInput = () => {
    setSyllabus([...syllabus, ""]);
  };

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
        <div className="card card-custom card-stretch gutter-b">
          {/* START HEADER */}
          <div className="card-header border-0 d-flex justify-content-lg-between row p-10">
            <div className="card-title d-flex my-auto">
              <div className="text-dark">Nama Sertifikat :</div>
              <div className="px-6 p-0 w-100">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Masukan Nama Sertifikat"
                  onChange={(e) => setCertificate_name(e.target.value)}
                  onBlur={() => {
                    simpleValidator.current.showMessageFor("nama sertifikat");
                  }}
                />
                {simpleValidator.current.message(
                  "nama sertifikat",
                  certificate_name,
                  "required",
                  { className: "text-danger font-size-sm mt-4" }
                )}
              </div>
            </div>
          </div>
          {/* END HEADER */}
          {/* START BODY */}
          <div className="card-body border-top" style={{ width: "100%" }}>
            <div className="row p-0 ">
              {/* START COL */}
              <div
                className="border-primary border col-lg-8 col-12 position-relative"
                style={{ fontSize: "100%" }}
              >
                <div className="p-0 col-12" ref={divReference}>
                  {background ? (
                    <img
                      src={background}
                      alt="Background"
                      className="position-absolute w-100 h-100"
                    />
                  ) : (
                    ""
                  )}
                  <div
                    className="row align-items-center m-0"
                    style={{ width: "100%" }}
                  >
                    <div className="position-relative">
                      <div
                        className="m-6 text-center d-flex align-items-center px-4 border-2"
                        style={{ height: "20px" }}
                      >
                        {nomerSertifikat}
                      </div>
                    </div>
                    <div
                      className={`col-12 text-center font-weight-normal p-0 justify-content-center `}
                    >
                      <label className="font-weight-boldest w-100 responsive-font-size-sertifikat">
                        SERTIFIKAT
                      </label>
                      <div className="w-100">Diberikan kepada</div>
                      <div className="my-2">
                        <span
                          className="mx-2 px-2 px-10 w-100 font-weight-bold responsive-font-size-nama-peserta"
                          style={{
                            height: "29px",
                          }}
                        >
                          {namaPeserta ? namaPeserta : ""}
                        </span>
                      </div>
                      <div className="w-100">Atas Partisipasi sebagai</div>
                      <div
                        className="font-weight-bolder w-100"
                        style={{ fontSize: "125%" }}
                      >
                        Peserta
                      </div>
                      <div className="w-100">Nama Pelatihan</div>
                      <div
                        className="text-center font-weight-bolder w-100 "
                        style={{ fontSize: "125%" }}
                      >
                        {certificate?.data.tema.name || "Tema Sertifikat"}
                      </div>
                      <div className="mt-2 w-100">
                        <span className="w-100">
                          Program{" "}
                          <span className="font-weight-boldest w-100">
                            {certificate?.data?.pelatihan.list[0]?.academy.name}
                          </span>{" "}
                          Selama
                        </span>
                        <span
                          className="mx-2 px-2 border-2 w-100"
                          style={{ width: "19px" }}
                        >
                          {tanggal}
                        </span>
                      </div>
                      <div className="mt-2 w-100">
                        <span>Digital Talent Scholarship</span>
                        <span
                          className="mx-2 px-2 border-2"
                          style={{ width: "19px" }}
                        >
                          {tahun}
                        </span>
                      </div>
                      <div className="my-4 w-100 text-center">
                        <span className="mx-2 px-2 border-2">
                          Jakarta {moment(date).format("DD/MM/YYYY")}
                        </span>
                      </div>
                      <div
                        className={
                          number_of_signatures < 3
                            ? " justify-content-center m-0 p-0 d-flex w-100"
                            : " justify-content-around  m-0 p-0 d-flex w-100"
                        }
                        style={{ width: "100%", height: "100%" }}
                      >
                        {/* START MAP TTD */}
                        {[...Array(number_of_signatures)].map((el, i) => {
                          return (
                            <div
                              key={i}
                              style={{
                                transform: `translateX(${signature_certificate_set_position[i]}%)`,
                                width: "156px",
                                height: "150px",
                              }}
                              className="col-3 p-0 px-lg-4"
                            >
                              <div className="col p-0 ">
                                <div
                                  className="col border-2 align-items-center justify-content-center d-flex position-relative"
                                  style={{
                                    borderStyle: signature_certificate_image[i]
                                      ? ""
                                      : "dashed",
                                    height: "100px",
                                  }}
                                >
                                  {signature_certificate_image[i] ? (
                                    <img
                                      src={signature_certificate_image[i]}
                                      layout="fill"
                                      alt={`Tanda tangan ${i + 1} `}
                                      className="position-absolute w-100 h-100"
                                    />
                                  ) : (
                                    "TTD"
                                  )}
                                </div>
                                <div
                                  className="border-2 text-center w-100"
                                  style={{
                                    borderStyle: signature_certificate_name[i]
                                      ? ""
                                      : "dashed",
                                  }}
                                >
                                  {signature_certificate_name[i] ? (
                                    <div
                                      dangerouslySetInnerHTML={{
                                        __html: signature_certificate_name[i],
                                      }}
                                      className="my-auto m-0 p-0 test"
                                      style={{ margin: "0px" }}
                                    ></div>
                                  ) : (
                                    "Nama"
                                  )}
                                </div>
                                <div
                                  className="border-2 text-center w-100"
                                  style={{
                                    borderStyle: signature_certificate_position[
                                      i
                                    ]
                                      ? ""
                                      : "dashed",
                                  }}
                                >
                                  {signature_certificate_position[i] ? (
                                    <div
                                      dangerouslySetInnerHTML={{
                                        __html:
                                          signature_certificate_position[i],
                                      }}
                                      className="my-auto m-0 p-0"
                                      style={{ margin: "0px" }}
                                    ></div>
                                  ) : (
                                    "Jabatan"
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* END COL */}
              {/* START FORM Jenis Sertifikat */}
              <div className="col-lg-4 col-12 font-weight-normal tandatangan mt-lg-0 mt-10">
                <div className="form-group">
                  <label
                    htmlFor="Jenis Sertifikat"
                    className="font-weight-bold font-size-h5"
                  >
                    Jenis Sertifikat
                  </label>
                  <div className="d-flex justify-content-start">
                    <div className="col-6 form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="method"
                        value="1"
                        checked={certificate_type == "1 lembar"}
                        onChange={() => setCertificate_type("1 lembar")}
                      />
                      <label className="form-check-label">1 Lembar</label>
                    </div>
                    <div className="col-6 form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="method"
                        value="2"
                        checked={certificate_type == "2 lembar"}
                        onChange={() => setCertificate_type("2 lembar")}
                      />
                      <label className="form-check-label">2 Lembar</label>
                    </div>
                  </div>
                </div>
                {/* END FORM Jenis Sertifikat */}
                {/* START FORM Tanda tangan */}
                <div className="form-group mb-2">
                  <label className=" col-form-label font-weight-bold">
                    Jumlah Tanda Tangan
                  </label>
                  <div>
                    <select
                      name="jumlah_tandatangan"
                      onChange={(e) =>
                        setNumber_of_signatures(Number(e.target.value))
                      }
                      className="form-control"
                    >
                      <option defaultValue={1} value={1}>
                        1 Tanda Tangan
                      </option>
                      <option value={2}>2 Tanda Tangan</option>
                      <option value={3}>3 Tanda Tangan</option>
                      <option value={4}>4 Tanda Tangan</option>
                    </select>
                  </div>
                </div>
                {/* END FORM Tanda Tangan */}
                {/* START TANDA TANGAN SLIDER */}
                <div className="justify-content-center h-100px align-items-center">
                  {/* START MAP TTD */}
                  {[...Array(number_of_signatures)].map((el, i) => {
                    return (
                      <div key={i} className="d-flex justify-content-start">
                        <div className="col-12 p-0">
                          <div className="py-5">
                            {`Atur Tanda tangan - ${i + 1}`}
                          </div>
                          <div
                            className="card-toolbar"
                            data-target={`#modalTTD${i}`}
                            data-toggle="modal"
                          >
                            <a className="btn bg-blue-secondary text-white rounded-full font-weight-bolder px-15 py-3">
                              <i className="ri-pencil-fill text-white"></i>
                              Atur Tanda Tangan
                            </a>
                          </div>

                          {/* START MODAL */}
                          <div
                            className="modal fade"
                            id={`modalTTD${i}`}
                            tabIndex="-1"
                            role="dialog"
                            aria-labelledby="exampleModalCenterTitle"
                            aria-hidden="true"
                          >
                            <div
                              className="modal-dialog modal-dialog-centered"
                              role="document"
                            >
                              <div className="modal-content">
                                <div className="modal-header">
                                  <h5
                                    className="modal-title"
                                    id="exampleModalLongTitle"
                                  >
                                    Tanda Tangan - {i + 1}
                                  </h5>
                                  <button
                                    type="button"
                                    className="close"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                  >
                                    <span aria-hidden="true">&times;</span>
                                  </button>
                                </div>
                                <div
                                  className="modal-body"
                                  id="sertifikat-ck-editor"
                                >
                                  <div className="font-size-h5 mb-5">
                                    Penanda Tangan
                                  </div>
                                  <CKEditor
                                    editor={ClassicEditor}
                                    config={{
                                      toolbar: ["bold", "italic", "underline"],
                                    }}
                                    data={signature_certificate_name[i]}
                                    onChange={(event, editor) => {
                                      const data = editor.getData();
                                      let newArr = [
                                        ...signature_certificate_name,
                                      ];
                                      newArr[i] = data;
                                      setSignature_certificate_name(newArr);
                                    }}
                                    onBlur={() =>
                                      simpleValidator.current.showMessageFor(
                                        "nama"
                                      )
                                    }
                                  />
                                  {simpleValidator.current.message(
                                    "nama",
                                    signature_certificate_name[i],
                                    "required",
                                    {
                                      className: "text-danger mt-4",
                                    }
                                  )}
                                  <div className="font-size-h5 my-5">
                                    Tanda Tangan
                                  </div>
                                  <div className="d-flex justify-content-start">
                                    <div className="col-6 form-check form-check-inline">
                                      <input
                                        className="form-check-input"
                                        type="radio"
                                        name={`tandaTanganType${i}`}
                                        value="1"
                                        checked={tandaTanganType[i] == 1}
                                        onChange={() => {
                                          let newArr = [...tandaTanganType];
                                          newArr[i] = 1;
                                          setTandaTanganType(newArr);
                                        }}
                                      />
                                      <label className="form-check-label">
                                        Manual
                                      </label>
                                    </div>
                                    <div className="col-6 form-check form-check-inline">
                                      <input
                                        className="form-check-input"
                                        type="radio"
                                        name={`tandaTanganType${i}`}
                                        value="2"
                                        checked={tandaTanganType[i] == 2}
                                        onChange={() => {
                                          let newArr = [...tandaTanganType];
                                          newArr[i] = 2;
                                          setTandaTanganType(newArr);
                                        }}
                                      />
                                      <label className="form-check-label">
                                        Digital
                                      </label>
                                    </div>
                                  </div>
                                  {tandaTanganType[i] == 1 ? (
                                    <div className="custom-file my-5">
                                      <input
                                        type="file"
                                        className="custom-file-input"
                                        name="image"
                                        onChange={(e) =>
                                          handleImageTandaTangan(e, i)
                                        }
                                        onBlur={() =>
                                          simpleValidator.current.showMessageFor(
                                            "tanda tangan"
                                          )
                                        }
                                        accept="image/png, image/jpeg , image/jpg"
                                      />
                                      <label
                                        className="custom-file-label"
                                        htmlFor="customFile"
                                      >
                                        {imageName[i]
                                          ? imageName[i]
                                          : "Choose File"}
                                      </label>
                                    </div>
                                  ) : (
                                    <>
                                      <div
                                        style={{
                                          background: "#FFFFFF",
                                          boxShadow:
                                            "inset 10px 10px 40px rgba(0, 0, 0, 0.08)",
                                          borderRadius: "10px",
                                        }}
                                      >
                                        <SignaturePad
                                          ref={signCanvas}
                                          options={{
                                            minWidth: 1,
                                            maxWidth: 3,
                                            penColor: "black",
                                          }}
                                          onBlur={() =>
                                            simpleValidator.current.showMessageFor(
                                              "tanda tangan"
                                            )
                                          }
                                        />
                                      </div>
                                      <div className="d-flex align-items-center my-5">
                                        <a
                                          className="btn btn-sm btn-rounded-full text-blue-primary border-primary mr-5"
                                          onClick={(e) =>
                                            handleCanvasTandaTangan(e, i)
                                          }
                                        >
                                          Buat Tanda Tangan
                                        </a>
                                        <button
                                          type="button"
                                          onClick={(e) => {
                                            handleClearCanvasTandaTangan(e, i);
                                          }}
                                          className="btn btn-sm btn-rounded-full bg-yellow-primary text-white"
                                        >
                                          Buat Ulang Tanda Tangan
                                        </button>
                                      </div>
                                    </>
                                  )}
                                  {simpleValidator.current.message(
                                    "tanda tangan",
                                    signature_certificate_image[i],
                                    "required",
                                    {
                                      className: "text-danger mb-4",
                                    }
                                  )}
                                  <div className="font-size-h5 mb-5">
                                    Jabatan Penanda Tangan
                                  </div>
                                  <CKEditor
                                    editor={ClassicEditor}
                                    data={signature_certificate_position[i]}
                                    onChange={(event, editor) => {
                                      const data = editor.getData();
                                      let newArr = [
                                        ...signature_certificate_position,
                                      ];
                                      newArr[i] = data;
                                      setSignature_certificate_position(newArr);
                                    }}
                                    className="h-25"
                                    onBlur={() =>
                                      simpleValidator.current.showMessageFor(
                                        "jabatan"
                                      )
                                    }
                                  />
                                  {simpleValidator.current.message(
                                    "jabatan",
                                    signature_certificate_position[i],
                                    "required",
                                    {
                                      className: "text-danger mt-4",
                                    }
                                  )}
                                </div>

                                <div className="modal-footer">
                                  <button
                                    type="button"
                                    className="btn btn-light-ghost-rounded-full"
                                    data-dismiss="modal"
                                  >
                                    Batal
                                  </button>
                                  <button
                                    type="button"
                                    data-dismiss="modal"
                                    className="btn btn-primary-rounded-full"
                                  >
                                    Simpan
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* END MODAL */}
                          <div className="row align-items-center py-5 justify-content-center">
                            <div className="col-12">Atur Posisi</div>
                            <div className="col-12 d-flex py-5 px-4 ">
                              <input
                                type="number"
                                min={
                                  number_of_signatures == 1
                                    ? -151
                                    : number_of_signatures == 2
                                    ? -101
                                    : number_of_signatures == 3
                                    ? -17
                                    : -14
                                }
                                max={
                                  number_of_signatures == 1
                                    ? 151
                                    : number_of_signatures == 2
                                    ? 101
                                    : number_of_signatures == 3
                                    ? 17
                                    : 14
                                }
                                className="form-control"
                                value={signature_certificate_set_position[i]}
                                onChange={(e) => {
                                  let newArr = [
                                    ...signature_certificate_set_position,
                                  ];
                                  newArr[i] = +e.target.value;
                                  setSignature_certificate_set_position(newArr);
                                }}
                              />

                              <input
                                type="range"
                                min={
                                  number_of_signatures == 1
                                    ? -151
                                    : number_of_signatures == 2
                                    ? -101
                                    : number_of_signatures == 3
                                    ? -17
                                    : -14
                                }
                                max={
                                  number_of_signatures == 1
                                    ? 151
                                    : number_of_signatures == 2
                                    ? 101
                                    : number_of_signatures == 3
                                    ? 17
                                    : 14
                                }
                                value={signature_certificate_set_position[i]}
                                className="text-white form-range form-control mx-5"
                                style={{
                                  cursor: "pointer",
                                  width: "100%",
                                }}
                                onChange={(e) => {
                                  let newArr = [
                                    ...signature_certificate_set_position,
                                  ];
                                  newArr[i] = +e.target.value;
                                  setSignature_certificate_set_position(newArr);
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                {/* END TANDA TANGAN SLIDER */}
              </div>
              <div className="row mt-10 col-12">
                <div className="position-relative">
                  <label htmlFor="InputFile">
                    <div className="mr-5">
                      <a className="btn bg-blue-secondary text-white rounded-full font-weight-bolder px-10 py-4">
                        Unggah Background
                      </a>
                    </div>
                  </label>
                  <input
                    type="file"
                    name="background"
                    className="custom-file-input"
                    id="InputFile"
                    onChange={(e) => onChangeBackground(e)}
                    accept="image/*"
                    style={{ display: "none" }}
                  />
                </div>
                {background ? (
                  <div className="position-relative">
                    <label>
                      <div className="mr-5">
                        <a
                          onClick={() => {
                            setBackground("");
                          }}
                          className="btn bg-blue-secondary text-white rounded-full font-weight-bolder px-10 py-4"
                        >
                          Reset Background
                        </a>
                      </div>
                    </label>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
            {certificate_type == "1 lembar" ? (
              <div className="row justify-content-lg-end justify-content-center">
                <Link
                  href={`/sertifikat/kelola-sertifikat/${query.theme_name}?id=${query.theme_id}`}
                  passHref
                >
                  <a className="btn btn-light-ghost-rounded-full px-6 font-weight-bolder px-5 py-3 col-lg-2 col-md-3 col-12 mt-5 mt-md-0">
                    Batal
                  </a>
                </Link>

                <a
                  className="btn btn-outline-primary-rounded-full px-6 font-weight-bolder px-6 py-3 mx-5 col-lg-2 col-md-3 col-12 mt-5 mt-md-0 w-50"
                  onClick={(e) => {
                    handlePost(e, 2); // 2 == draft
                  }}
                >
                  Simpan Draft
                </a>
                {/* </Link> */}

                <a
                  className="btn btn-primary-rounded-full px-6 font-weight-bolder px-6 py-3 col-md-3 col-lg-2 col-12 mt-5 mt-md-0"
                  onClick={(e) => {
                    setConfirmModal(true);
                  }}
                >
                  Publish
                </a>
              </div>
            ) : (
              ""
            )}
          </div>

          {/* END BODY */}
        </div>
        {/* START SECTION 2 */}
        {certificate_type == "2 lembar" ? (
          <div className="card card-custom card-stretch gutter-b">
            {/* START BODY */}
            <div className="card-body border-top">
              <div className="row p-0">
                {/* START COL */}
                <div
                  className="border-primary p-0 border col-lg-8 col-12"
                  style={{ width: "100%" }}
                >
                  <div className="p-0" ref={divReferenceSilabus}>
                    {background_syllabus ? (
                      <img
                        src={background_syllabus}
                        alt="Background Silabus"
                        layout="fill"
                        objectFit="fill"
                        className="position-absolute w-100 h-100"
                      />
                    ) : (
                      ""
                    )}
                    <div
                      className="row align-items-center m-0"
                      style={{ width: "100%" }}
                    >
                      <div
                        className="pt-19 pl-19 zindex-1 col-12"
                        style={{ height: "370px" }}
                      >
                        <div style={{ fontSize: "120%", fontWeight: "bold" }}>
                          Silabus yang didapat
                        </div>
                        <div>
                          <ol className="col mt-4">
                            {syllabus &&
                              syllabus.map((e, i) => {
                                return (
                                  <li
                                    className="p-0"
                                    key={i}
                                    style={{
                                      fontSize:
                                        syllabus.length <= 5
                                          ? "120%"
                                          : syllabus.length <= 10
                                          ? "90%"
                                          : syllabus.length <= 15
                                          ? "80%"
                                          : "50%",
                                    }}
                                  >
                                    {e}
                                  </li>
                                );
                              })}
                          </ol>
                        </div>
                      </div>
                      <div
                        className="col-12 text-center font-weight-normal p-0 justify-content-center"
                        style={{
                          marginTop: "-20px",
                          width: "100%",
                          height: "100%",
                        }}
                      >
                        <div
                          className={
                            number_of_signature_syllabus < 3
                              ? " justify-content-center m-0 p-0 d-flex w-100"
                              : " justify-content-around  m-0 p-0 d-flex w-100"
                          }
                          style={{ width: "100%", height: "100%" }}
                        >
                          {/* START MAP TTD */}
                          {[...Array(number_of_signature_syllabus)].map(
                            (el, i) => {
                              return (
                                <div
                                  key={i}
                                  style={{
                                    transform: `translateX(${signature_certificate_set_position_syllabus[i]}%)`,
                                    width: "151px",
                                    height: "150px",
                                  }}
                                  className="col-3 p-0 px-lg-4"
                                >
                                  <div className="col p-0 ">
                                    <div
                                      className="col border-2 align-items-center justify-content-center d-flex position-relative"
                                      style={{
                                        borderStyle:
                                          signature_certificate_image_syllabus[
                                            i
                                          ]
                                            ? ""
                                            : "dashed",
                                        height: "100px",
                                      }}
                                    >
                                      {signature_certificate_image_syllabus[
                                        i
                                      ] ? (
                                        <img
                                          src={
                                            signature_certificate_image_syllabus[
                                              i
                                            ]
                                          }
                                          layout="fill"
                                          alt={`Tanda tangan ${i + 1} `}
                                          className="position-absolute w-100 h-100"
                                        />
                                      ) : (
                                        "TTD"
                                      )}
                                    </div>
                                    <div
                                      className="border-2 text-center w-100"
                                      style={{
                                        borderStyle:
                                          signature_certificate_name_syllabus[i]
                                            ? ""
                                            : "dashed",
                                      }}
                                    >
                                      {signature_certificate_name_syllabus[
                                        i
                                      ] ? (
                                        <div
                                          dangerouslySetInnerHTML={{
                                            __html:
                                              signature_certificate_name_syllabus[
                                                i
                                              ],
                                          }}
                                          className="my-auto m-0 p-0 test"
                                          style={{ margin: "0px" }}
                                        ></div>
                                      ) : (
                                        "Nama"
                                      )}
                                    </div>
                                    <div
                                      className="border-2 text-center w-100"
                                      style={{
                                        borderStyle:
                                          signature_certificate_position_syllabus[
                                            i
                                          ]
                                            ? ""
                                            : "dashed",
                                      }}
                                    >
                                      {signature_certificate_position_syllabus[
                                        i
                                      ] ? (
                                        <div
                                          dangerouslySetInnerHTML={{
                                            __html:
                                              signature_certificate_position_syllabus[
                                                i
                                              ],
                                          }}
                                          className="my-auto m-0 p-0"
                                          style={{ margin: "0px" }}
                                        ></div>
                                      ) : (
                                        "Jabatan"
                                      )}
                                    </div>
                                  </div>
                                </div>
                              );
                            }
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* END COL */}
                {/* START FORM Jenis Sertifikat */}
                <div className="col-lg-4 col-12 font-weight-normal tandatangan mt-lg-0 mt-10">
                  {/* END FORM Jenis Sertifikat */}
                  {/* START FORM Tanda tangan */}
                  <div className="form-group mb-2">
                    <label className=" col-form-label font-weight-bold">
                      Jumlah Tanda Tangan
                    </label>
                    <div>
                      <select
                        name="jumlah_tandatangan"
                        onChange={(e) =>
                          setNumber_of_signature_syllabus(
                            Number(e.target.value)
                          )
                        }
                        className="form-control"
                      >
                        <option value={1} defaultValue={1}>
                          1 Tanda Tangan
                        </option>
                        <option value={2}>2 Tanda Tangan</option>
                        <option value={3}>3 Tanda Tangan</option>
                        <option value={4}>4 Tanda Tangan</option>
                      </select>
                    </div>
                    <label className=" col-form-label font-weight-bold">
                      Silabus
                    </label>
                    <div
                      className="card-toolbar"
                      data-target={`#modalSyllabus`}
                      data-toggle="modal"
                    >
                      <a className="btn bg-blue-secondary text-white rounded-full font-weight-bolder px-15 py-3">
                        Atur Silabus
                      </a>
                    </div>
                  </div>
                  {/* END FORM Tanda Tangan */}
                  {/* START TANDA TANGAN SLIDER */}
                  <div className="justify-content-center h-100px align-items-center">
                    {/* START MAP TTD */}
                    {[...Array(number_of_signature_syllabus)].map((el, i) => {
                      return (
                        <div key={i} className="d-flex justify-content-start">
                          <div className="col-12 p-0">
                            <div className="py-5">
                              {`Atur Tanda tangan - ${i + 1}`}
                            </div>

                            <div
                              className="card-toolbar"
                              data-target={`#modalTTDSyllabus${i}`}
                              data-toggle="modal"
                            >
                              <a className="btn bg-blue-secondary text-white rounded-full font-weight-bolder px-15 py-3">
                                <i className="ri-pencil-fill text-white"></i>
                                Atur Tanda Tangan
                              </a>
                            </div>

                            {/* START MODAL */}
                            <div
                              className="modal fade"
                              id={`modalTTDSyllabus${i}`}
                              tabIndex="-1"
                              role="dialog"
                              aria-labelledby="exampleModalCenterTitle"
                              aria-hidden="true"
                            >
                              <div
                                className="modal-dialog modal-dialog-centered"
                                role="document"
                              >
                                <div className="modal-content">
                                  <div className="modal-header">
                                    <h5
                                      className="modal-title"
                                      id="exampleModalLongTitle"
                                    >
                                      Tanda Tangan - {i + 1}
                                    </h5>
                                    <button
                                      type="button"
                                      className="close"
                                      data-dismiss="modal"
                                      aria-label="Close"
                                    >
                                      <span aria-hidden="true">&times;</span>
                                    </button>
                                  </div>
                                  <div
                                    className="modal-body"
                                    id="syllabus-ck-editor"
                                  >
                                    <div className="font-size-h5 mb-5">
                                      Penanda Tangan
                                    </div>
                                    <CKEditor
                                      editor={ClassicEditor}
                                      config={{
                                        toolbar: [
                                          "bold",
                                          "italic",
                                          "underline",
                                        ],
                                      }}
                                      data={
                                        signature_certificate_name_syllabus[i]
                                      }
                                      onChange={(event, editor) => {
                                        const data = editor.getData();
                                        let newArr = [
                                          ...signature_certificate_name_syllabus,
                                        ];
                                        newArr[i] = data;
                                        setSignature_certificate_name_syllabus(
                                          newArr
                                        );
                                      }}
                                      className="h-25"
                                      onBlur={() => {
                                        if (certificate_type == "2 lembar") {
                                          simpleValidator.current.showMessageFor(
                                            "Nama"
                                          );
                                        }
                                      }}
                                    />
                                    {certificate_type == "2 lembar"
                                      ? simpleValidator.current.message(
                                          "Nama",
                                          signature_certificate_name_syllabus[
                                            i
                                          ],
                                          "required",
                                          {
                                            className: "text-danger mt-4",
                                          }
                                        )
                                      : ""}
                                    <div className="font-size-h5 my-5">
                                      Tanda Tangan
                                    </div>
                                    <div className="d-flex justify-content-start">
                                      <div className="col-6 form-check form-check-inline">
                                        <input
                                          className="form-check-input"
                                          type="radio"
                                          name={`tandaTanganSyllabusType${i}`}
                                          value="1"
                                          checked={
                                            tandaTanganSyllabusType[i] == 1
                                          }
                                          onChange={() => {
                                            let newArr = [
                                              ...tandaTanganSyllabusType,
                                            ];
                                            newArr[i] = 1;
                                            setTandaTanganSyllabusType(newArr);
                                          }}
                                        />
                                        <label className="form-check-label">
                                          Manual
                                        </label>
                                      </div>
                                      <div className="col-6 form-check form-check-inline">
                                        <input
                                          className="form-check-input"
                                          type="radio"
                                          name={`tandaTanganSyllabusType${i}`}
                                          value="2"
                                          checked={
                                            tandaTanganSyllabusType[i] == 2
                                          }
                                          onChange={() => {
                                            let newArr = [
                                              ...tandaTanganSyllabusType,
                                            ];
                                            newArr[i] = 2;
                                            setTandaTanganSyllabusType(newArr);
                                          }}
                                        />
                                        <label className="form-check-label">
                                          Digital
                                        </label>
                                      </div>
                                    </div>
                                    {tandaTanganSyllabusType[i] == 1 ? (
                                      <div className="custom-file my-5">
                                        <input
                                          type="file"
                                          className="custom-file-input"
                                          name="image"
                                          onChange={(e) =>
                                            handleImageTandaTanganSyllabus(e, i)
                                          }
                                          accept="image/png, image/jpeg , image/jpg"
                                          onBlur={() => {
                                            if (
                                              certificate_type == "2 lembar"
                                            ) {
                                              simpleValidator.current.showMessageFor(
                                                "Tanda tangan"
                                              );
                                            }
                                          }}
                                        />
                                        <label
                                          className="custom-file-label"
                                          htmlFor="customFile"
                                        >
                                          {imageNameSyllabus[i]
                                            ? imageNameSyllabus[i]
                                            : "Choose File"}
                                        </label>
                                      </div>
                                    ) : (
                                      <>
                                        <div
                                          style={{
                                            background: "#FFFFFF",
                                            boxShadow:
                                              "inset 10px 10px 40px rgba(0, 0, 0, 0.08)",
                                            borderRadius: "10px",
                                          }}
                                        >
                                          <SignaturePad
                                            ref={signCanvas}
                                            options={{
                                              minWidth: 1,
                                              maxWidth: 3,
                                              penColor: "black",
                                            }}
                                            onBlur={() => {
                                              if (
                                                certificate_type == "2 lembar"
                                              ) {
                                                simpleValidator.current.showMessageFor(
                                                  "Tanda tangan"
                                                );
                                              }
                                            }}
                                          />
                                        </div>

                                        <div className="d-flex align-items-center my-5">
                                          <a
                                            className="btn btn-sm btn-rounded-full text-blue-primary border-primary mr-5"
                                            onClick={(e) =>
                                              handleCanvasTandaTanganSyllabus(
                                                e,
                                                i
                                              )
                                            }
                                          >
                                            Buat Tanda Tangan
                                          </a>
                                          <button
                                            type="button"
                                            onClick={(e) => {
                                              handleClearCanvasTandaTanganSyllabus(
                                                e,
                                                i
                                              );
                                            }}
                                            className="btn btn-sm btn-rounded-full bg-yellow-primary text-white"
                                          >
                                            Buat Ulang Tanda Tangan
                                          </button>
                                        </div>
                                      </>
                                    )}
                                    {certificate_type == "2 lembar"
                                      ? simpleValidator.current.message(
                                          "Tanda tangan",
                                          signature_certificate_image_syllabus[
                                            i
                                          ],
                                          "required",
                                          { className: "text-danger mb-4" }
                                        )
                                      : ""}
                                    <div className="font-size-h5 mb-5">
                                      Jabatan Penanda Tangan
                                    </div>
                                    <CKEditor
                                      editor={ClassicEditor}
                                      data={
                                        signature_certificate_position_syllabus[
                                          i
                                        ]
                                      }
                                      onChange={(event, editor) => {
                                        const data = editor.getData();
                                        let newArr = [
                                          ...signature_certificate_position_syllabus,
                                        ];
                                        newArr[i] = data;
                                        setSignature_certificate_position_syllabus(
                                          newArr
                                        );
                                      }}
                                      className="h-25"
                                      onBlur={() => {
                                        if (certificate_type == "2 lembar") {
                                          simpleValidator.current.showMessageFor(
                                            "Jabatan"
                                          );
                                        }
                                      }}
                                    />
                                    {certificate_type == "2 lembar"
                                      ? simpleValidator.current.message(
                                          "Jabatan",
                                          signature_certificate_position_syllabus[
                                            i
                                          ],
                                          "required",
                                          { className: "text-danger mt-4" }
                                        )
                                      : ""}
                                  </div>
                                  <div className="modal-footer">
                                    <button
                                      type="button"
                                      className="btn btn-light-ghost-rounded-full"
                                      data-dismiss="modal"
                                    >
                                      Batal
                                    </button>
                                    <button
                                      type="button"
                                      data-dismiss="modal"
                                      className="btn btn-primary-rounded-full"
                                    >
                                      Simpan
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {/* END MODAL */}
                            <div className="row align-items-center py-5 justify-content-center">
                              <div className="col-12">Atur Posisi</div>
                              <div className="col-12 d-flex py-5 px-4 ">
                                <input
                                  type="number"
                                  min={
                                    number_of_signature_syllabus == 1
                                      ? -151
                                      : number_of_signature_syllabus == 2
                                      ? -101
                                      : number_of_signature_syllabus == 3
                                      ? -17
                                      : -14
                                  }
                                  max={
                                    number_of_signature_syllabus == 1
                                      ? 151
                                      : number_of_signature_syllabus == 2
                                      ? 101
                                      : number_of_signature_syllabus == 3
                                      ? 17
                                      : 14
                                  }
                                  className="form-control"
                                  value={
                                    signature_certificate_set_position_syllabus[
                                      i
                                    ]
                                  }
                                  onChange={(e) => {
                                    let newArr = [
                                      ...signature_certificate_set_position_syllabus,
                                    ];
                                    newArr[i] = +e.target.value;
                                    setSignature_certificate_set_position_syllabus(
                                      newArr
                                    );
                                  }}
                                />

                                <input
                                  type="range"
                                  min={
                                    number_of_signature_syllabus == 1
                                      ? -151
                                      : number_of_signature_syllabus == 2
                                      ? -101
                                      : number_of_signature_syllabus == 3
                                      ? -17
                                      : -14
                                  }
                                  max={
                                    number_of_signature_syllabus == 1
                                      ? 151
                                      : number_of_signature_syllabus == 2
                                      ? 101
                                      : number_of_signature_syllabus == 3
                                      ? 17
                                      : 14
                                  }
                                  value={
                                    signature_certificate_set_position_syllabus[
                                      i
                                    ]
                                  }
                                  className="text-white form-range form-control mx-5"
                                  style={{
                                    cursor: "pointer",
                                    width: "100%",
                                  }}
                                  onChange={(e) => {
                                    let newArr = [
                                      ...signature_certificate_set_position_syllabus,
                                    ];
                                    newArr[i] = +e.target.value;
                                    setSignature_certificate_set_position_syllabus(
                                      newArr
                                    );
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  {/* END TANDA TANGAN SLIDER */}
                </div>
                <div className="row mt-10 col-12">
                  <div className="position-relative">
                    <label htmlFor="InputFile2">
                      <div className="mr-5">
                        <a className="btn bg-blue-secondary text-white rounded-full font-weight-bolder px-10 py-4">
                          Unggah Background
                        </a>
                      </div>
                    </label>
                    <input
                      type="file"
                      name="background2"
                      id="InputFile2"
                      className="custom-file-input"
                      onChange={(e) => onChangeBackgroundLembar2(e)}
                      accept="image/*"
                      style={{ display: "none" }}
                    />
                  </div>
                  {background_syllabus ? (
                    <div className="position-relative">
                      <label>
                        <div className="mr-5">
                          <a
                            onClick={() => {
                              setBackground_syllabus("");
                            }}
                            className="btn bg-blue-secondary text-white rounded-full font-weight-bolder px-10 py-4"
                          >
                            Reset Background
                          </a>
                        </div>
                      </label>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              {certificate_type == "2 lembar" ? (
                <div className="row justify-content-lg-end justify-content-center">
                  <Link
                    href={`/sertifikat/kelola-sertifikat/${query.theme_name}?id=${query.theme_id}`}
                    passHref
                  >
                    <a className="btn btn-light-ghost-rounded-full px-6 font-weight-bolder px-5 py-3 col-lg-2 col-md-3 col-12 mt-5 mt-md-0">
                      Batal
                    </a>
                  </Link>

                  <a
                    className="btn btn-outline-primary-rounded-full px-6 font-weight-bolder px-6 py-3 mx-5 col-lg-2 col-md-3 col-12 mt-5 mt-md-0 w-50"
                    onClick={(e) => {
                      handlePost(e, 2); // 2 == draft
                    }}
                  >
                    Simpan Draft
                  </a>

                  <a
                    className="btn btn-primary-rounded-full px-6 font-weight-bolder px-6 py-3 col-md-3 col-lg-2 col-12 mt-5 mt-md-0"
                    onClick={(e) => {
                      setConfirmModal(true);
                    }}
                  >
                    Publish
                  </a>
                </div>
              ) : (
                ""
              )}
            </div>
            {/* END BODY */}
          </div>
        ) : (
          <div></div>
        )}

        {/* START MODAL SYLLABUS*/}
        <div
          className="modal fade"
          id={`modalSyllabus`}
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">
                  Silabus
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {syllabus.map((syllabus, index) => {
                  return (
                    <div className="form-group" key={index}>
                      <div className="row align-items-center">
                        <div className="col-10 h-100">
                          <input
                            required
                            placeholder={
                              index === 0 ? "Silabus 1" : `Silabus ${index + 1}`
                            }
                            name={`cooperation${index}`}
                            type="text"
                            onChange={(e) => handleChange(e, index)}
                            className="form-control"
                            value={syllabus}
                          />
                        </div>
                        {index === 0 ? (
                          ""
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleDelete(index)}
                            className="btn bg-danger"
                            style={{ height: "38px" }}
                          >
                            <svg
                              style={{ bottom: "2px" }}
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              width="20"
                              height="20"
                            >
                              <path fill="none" d="M0 0h24v24H0z" />
                              <path
                                d="M17 6h5v2h-2v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8H2V6h5V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3zm1 2H6v12h12V8zm-9 3h2v6H9v-6zm4 0h2v6h-2v-6zM9 4v2h6V4H9z"
                                fill="#ffffff"
                              />
                            </svg>
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
                {syllabus.length >= 25 ? (
                  ""
                ) : (
                  <div className="form-group d-flex align-items-center m-0">
                    <div
                      className="btn btn-outline-primary-rounded-full font-weight-bolder py-3 m-0"
                      onClick={() => handleAddInput()}
                    >
                      <i className="ri-add-fill mr-2 p-0 text-primary"></i>
                      Tambah Silabus
                    </div>
                  </div>
                )}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  data-dismiss="modal"
                  className="btn btn-light-ghost-rounded-full px-6 font-weight-bolder px-5 py-3"
                >
                  Tutup
                </button>
                <button
                  type="button"
                  data-dismiss="modal"
                  className="btn btn-primary-rounded-full px-6 font-weight-bolder px-6 py-3"
                >
                  Simpan
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* END MODAL SYLLABUS */}
      </div>
      <>
        <Modal show={confirmModal} centered>
          <Modal.Body className="px-10">
            <div className="row justify-content-center ">
              <i className="ri-error-warning-line ri-8x text-warning col-12 text-center"></i>
              <div className="font-size-h1 font-weight-bolder">
                Publish Sertifikat?
              </div>
              <div className="text-center">
                Pastikan desain sertifikat telah benar. Sertifikat yang telah
                dipublish tidak dapat diubah kembali
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer className="pb-10 pt-8 d-flex justify-content-center">
            <button
              className="btn btn-light-ghost-rounded-full px-6 font-weight-bolder px-5 py-3"
              onClick={() => {
                setConfirmModal(!confirmModal);
              }}
            >
              Batal
            </button>
            <a
              className="btn btn-primary-rounded-full px-6 font-weight-bolder px-6 py-3 text-center"
              onClick={(e) => {
                setConfirmModal(false);
                handlePost(e, 1);
              }}
            >
              Publish
            </a>
          </Modal.Footer>
        </Modal>
      </>
    </PageWrapper>
  );
}
