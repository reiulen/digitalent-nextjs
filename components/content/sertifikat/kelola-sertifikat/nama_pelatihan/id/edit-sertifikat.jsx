// #Next & React
import React, {
  useState,
  useEffect,
  useRef,
  createRef,
  useCallback,
} from "react";
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
  updateSertifikat,
} from "../../../../../../redux/actions/sertifikat/kelola-sertifikat.action";
import axios from "axios";
import * as moment from "moment";

export default function EditSertifikat({ token }) {
  const router = useRouter();
  const dispatch = useDispatch();
  // #Div Reference Lembar 1
  const { loading, error, certificate } = useSelector(
    state => state.singleCertificate
  );

  const { error: updateError, certificate: newCertificate } = useSelector(
    state => state.newCertificates
  );

  const divReference = useRef(null);
  const divReferenceSilabus = useRef(null);
  const [namaPeserta, setNamaPeserta] = useState("Nama Peserta");
  const [certificate_name, setCertificate_name] = useState(
    certificate.data.certificate.name || ""
  );
  const [signature, setSignature] = useState(certificate.data.signature); //ttd 1
  const [signatureSyllabus, setSignatureSyllabus] = useState(
    certificate.data.signature_syllabu
  ); //ttd 2
  const [date, setDate] = useState(new Date());
  // #Redux state

  // #Redux state
  const simpleValidator = useRef(new SimpleReactValidator({ locale: "id" }));

  // #START FORM DATA
  const [certificate_type, setCertificate_type] = useState(
    certificate.data.certificate.certificate_type || "1 lembar"
  );

  const [number_of_signatures, setNumber_of_signatures] = useState(
    certificate.data.certificate.number_of_signatures
  );

  // START SYLLABUS
  const [number_of_signature_syllabus, setNumber_of_signature_syllabus] =
    useState(1);

  const [syllabus, setSyllabus] = useState(
    certificate.data.certificate.syllabus || ["", ""]
  );

  // END SYLLABUS
  // #END FORM DATA
  const [tandaTanganSyllabusType, setTandaTanganSyllabusType] = useState([
    1, 1, 1, 1,
  ]);
  // RESET TTD
  useEffect(() => {
    setSignature(prev => {
      let newArr = [...prev];
      newArr.forEach(el => {
        el.set_position = 0;
      });
      return newArr;
    });
  }, [number_of_signatures]);

  useEffect(() => {
    setSignatureSyllabus(prev => {
      let newArr = [...prev];
      newArr.forEach(el => {
        el.set_position = 0;
      });
      return newArr;
    });
  }, [number_of_signature_syllabus]);

  // #START MODAL
  const [tandaTanganType, setTandaTanganType] = useState([1, 1, 1, 1]);
  const [tandaTangan, setTandaTangan] = useState("");
  const signCanvas = useRef({});

  const handleImageTandaTangan = (e, i) => {
    // console.log(e.target.name, "INI TARGET NAME", typeof e.target.name);
    if (e.target.name === "image") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          const data = reader.result;
          let newArr = [...signature];
          newArr[i]?.localSignature
            ? (newArr[i]["localSignature"] = data)
            : (newArr[i] = { ...newArr[i], localSignature: data });
          setSignature(newArr);
        }
      };
      if (e.target.files[0]) {
        reader.readAsDataURL(e.target.files[0]);
      }
    }
  };

  const handleCanvasTandaTangan = (e, i) => {
    const data = signCanvas.current.toDataURL();
    let newArr = [...signature];
    newArr[i]?.localSignature
      ? (newArr[i]["localSignature"] = data)
      : (newArr[i] = { ...newArr[i], localSignature: data });
    setSignature(newArr);
  };

  const handleClearCanvasTandaTangan = (e, i) => {
    let newArr = [...signature];
    newArr[i]?.localSignature
      ? (newArr[i]["localSignature"] = "")
      : (newArr[i] = { ...newArr[i], localSignature: "" });
    setSignature(newArr);
    signCanvas.current.clear();
  };
  // #END MODAL

  // #START LEMBAR 2
  const handleImageTandaTanganSyllabus = (e, index) => {
    if (e.target.name === "image") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          const data = reader.result;
          let newArr = [...signatureSyllabus];
          newArr[i]?.localSignature
            ? (newArr[i]["localSignature"] = data)
            : (newArr[i] = { ...newArr[i], localSignature: data });
          setSignatureSyllabus(newArr);
        }
      };
      if (e.target.files[0]) {
        reader.readAsDataURL(e.target.files[0]);
      }
    }
  };

  const handleCanvasTandaTanganSyllabus = (e, i) => {
    const data = signCanvas.current.toDataURL();
    let newArr = [...signatureSyllabus];
    newArr[i]?.localSignature
      ? (newArr[i]["localSignature"] = data)
      : (newArr[i] = { ...newArr[i], localSignature: data });
    setSignatureSyllabus(newArr);
  };

  const handleClearCanvasTandaTanganSyllabus = (e, i) => {
    let newArr = [...signatureSyllabus];
    newArr[i]?.localSignature
      ? (newArr[i]["localSignature"] = "")
      : (newArr[i] = { ...newArr[i], localSignature: "" });
    setSignatureSyllabus(newArr);
    signCanvas.current.clear();
  };
  // #END SECTION 2

  // # START BACKGROUND IMAGE 1
  const [background, setBackground] = useState(
    certificate.data.certificate.background || ""
  );

  const [localBackground, setLocalBackground] = useState("");

  const onChangeBackground = e => {
    const type = ["image/jpg", "image/png", "image/jpeg"];

    if (type.includes(e.target.files[0].type)) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setLocalBackground(reader.result);
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
  };
  // # END BACKGROUND IMAGE 1

  // # START BACKGROUND IMAGE 2
  const [background_syllabus, setBackground_syllabus] = useState(
    certificate.data.certificate.background_syllabus || ""
  );

  const [localBackgroundSyllabus, setLocalBackgroundSyllabus] = useState("");

  const onChangeBackgroundLembar2 = e => {
    const type = ["image/jpg", "image/png", "image/jpeg"];
    if (type.includes(e.target.files[0].type)) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setLocalBackgroundSyllabus(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      e.target.value = null;
      Swal.fire(
        "Oops !",
        "Data yang bisa dimasukkan hanya berupa data image.",
        "error"
      );
    }
  };

  const [, forceUpdate] = useState();

  const convertDivToPng = async div => {
    const data = await toPng(div, {
      cacheBust: true,
      canvasWidth: 842,
      canvasHeight: 595,
    });
    return data;
  };

  // # END IMAGE
  const handlePost = async (e, status) => {
    try {
      e.preventDefault();
      // console.log(simpleValidator.current.fields["Tanda tangan"])
      if (certificate_type == "1 lembar") {
        simpleValidator.current.fields.Jabatan = true;
        simpleValidator.current.fields.Nama = true;
        simpleValidator.current.fields["Tanda tangan"] = true;
      }

      const id = router.query.nama_pelatihan_id;

      if (simpleValidator.current.allValid()) {
        let formData = new FormData();
        setNamaPeserta("");

        formData.append("_method", "put");
        formData.append("name", certificate_name);
        formData.append("certificate_type", certificate_type);
        formData.append("number_of_signatures", number_of_signatures);
        formData.append(
          "number_of_signature_syllabus",
          number_of_signature_syllabus
        );

        if (localBackground) {
          formData.append("background", localBackground);
        }

        if (localBackgroundSyllabus) {
          formData.append("background_syllabus", localBackgroundSyllabus);
        }
        console.log("KONDISI DARI SIGNATURE PAS DI DISPATCH", signature);

        signature.forEach((item, i) => {
          if (item.localSignature) {
            formData.append(
              `signature_certificate_image[${i}]`,
              item.localSignature
            ); // img signature yang baru di taro
          } else {
            formData.append(
              `signature_certificate_image[${i}]`,
              item.signature
            );
          }
          formData.append(
            `signature_certificate_position[${i}]`,
            item.position
          ); //jabatan
          formData.append(
            `signature_certificate_set_position[${i}]`,
            item.set_position
          );
          formData.append(`signature_certificate_name[${i}]`, item.name);
        });

        if (certificate_type == "2 lembar") {
          const dataSyllabus = await convertDivToPng(
            divReferenceSilabus.current
          ); //convert bg 2
          formData.append("certificate_result_syllabus", dataSyllabus);

          signatureSyllabus.forEach((item, i) => {
            console.log(item, "ini items");
            if (item.localSignature) {
              formData.append(
                `signature_certificate_image_syllabus[${i}]`,
                item.localSignature
              ); // img signature yang baru di taro
            }
            formData.append(
              `signature_certificate_position_syllabus[${i}]`,
              item.position
            ); //jabatan
            formData.append(
              `signature_certificate_set_position_syllabus[${i}]`,
              item.set_position
            );
            formData.append(
              `signature_certificate_name_syllabus[${i}]`,
              item.name
            );
          });

          syllabus.forEach((item, i) => {
            formData.append(`syllabus[${i}]`, item);
          });
        }

        const data = await convertDivToPng(divReference.current); // convert bg 1
        formData.append("certificate_result", data);
        formData.append("status_migrate_id", status);

        dispatch(updateSertifikat(id, formData, token));

        router.push({
          pathname: `/sertifikat/kelola-sertifikat/${router.query.tema_pelatihan_id}`,
          query: { success: true },
        });
      } else {
        simpleValidator.current.showMessages();
        forceUpdate(1);
        Swal.fire("Oops !", "Isi data dengan benar.", "error");
      }
    } catch (e) {
      console.log(e, "Masuk sini errornya catch");
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

  const handleDelete = i => {
    let filterResult = syllabus.filter((items, index) => index !== i);
    setSyllabus(filterResult);
  };

  const handleAddInput = () => {
    setSyllabus([...syllabus, ""]);
  };

  console.log(signature);
  // useEffect(() => {
  //   console.log(signature, "signatureSyllabus brubah disini");
  // }, [signature]);

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
              <div className="mx-6 p-0">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Masukan Nama Sertifikat"
                  value={certificate_name || ""}
                  onChange={e => setCertificate_name(e.target.value)}
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
          <div className="card-body border-top">
            <div className="row p-0">
              {/* START COL */}
              <div
                className="border-primary border col-8 h-500px position-relative"
                // style={{ width: "842px" }}
              >
                <div className="p-0" ref={divReference}>
                  {localBackground ? (
                    <Image
                      src={localBackground}
                      alt="fitur"
                      // height={495}
                      // width={1400}
                      layout="fill"
                      objectFit="fill"
                    />
                  ) : background ? (
                    <Image
                      src={`${process.env.END_POINT_API_IMAGE_SERTIFIKAT}certificate/images/background/${background}`}
                      alt="fitur"
                      // height={495}
                      // width={1400}
                      layout="fill"
                      objectFit="fill"
                    />
                  ) : (
                    ""
                  )}
                  <div className="row align-items-center zindex-1">
                    <div className="position-relative">
                      <div
                        className="m-6 text-center px-4 border-2"
                        style={{
                          borderStyle: "dashed",
                        }}
                      >
                        Nomer Sertifikat
                      </div>
                    </div>
                    <div
                      className="col-12 text-center font-weight-normal p-0 justify-content-center"
                      style={{ marginTop: "-20px", width: "100%" }}
                    >
                      <label className="font-weight-boldest display-4 w-100 futura">
                        SERTIFIKAT
                      </label>
                      <div className="w-100">Diberikan kepada</div>
                      <div className="my-2">
                        <span
                          className="mx-2 px-2 font-size-h6 px-10 w-100"
                          style={{ borderStyle: namaPeserta ? "dashed" : "" }}
                        >
                          {namaPeserta ? namaPeserta : ""}
                        </span>
                      </div>
                      <div className="w-100">Atas Partisipasi sebagai</div>
                      <div className="font-weight-normal font-size-h2 w-100">
                        Peserta
                      </div>
                      <div className="w-100">Nama Pelatihan</div>
                      <div
                        className="text-center font-weight-bolder border-2 w-100"
                        style={{
                          fontSize: "20px",
                          textAlign: "center",
                          // fontWeight: "bold",
                        }}
                      >
                        {certificate?.data?.certificate?.theme?.name ||
                          "Tema Sertifikat"}
                      </div>
                      <div className="mt-2 w-100">
                        <span className="w-100">
                          Program{" "}
                          <span className="font-size-h6 font-weight-bold w-100">
                            {certificate?.data?.certificate?.academy.name ||
                              "Nama Akademi"}
                          </span>{" "}
                          Selama
                        </span>
                        <span
                          className="mx-2 px-2 border-2 w-100"
                          style={{ borderStyle: "dashed" }}
                        >
                          Waktu Pelatihan
                        </span>
                      </div>
                      <div className="mt-2 w-100">
                        <span>Digital Talent Scholarship</span>
                        <span
                          className="mx-2 px-2 border-2"
                          style={{ borderStyle: "dashed" }}
                        >
                          Tahun
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
                      >
                        {/* START MAP TTD */}
                        {[...Array(number_of_signatures)].map((el, i) => {
                          return (
                            <div
                              key={i}
                              style={{
                                transform: `translateX(${
                                  signature[i].set_position || 0
                                }%)`,
                                width: "156px",
                                height: "150px",
                              }}
                              className="col-3 p-0"
                            >
                              <div className="col">
                                <div
                                  className="col border-2 align-items-center justify-content-center d-flex position-relative"
                                  style={{
                                    borderStyle:
                                      signature[i]?.signature ||
                                      signature[i]?.localSignature
                                        ? ""
                                        : "dashed",
                                    height: "100px",
                                  }}
                                >
                                  {signature[i]?.localSignature ? (
                                    <Image
                                      src={signature[i]?.localSignature}
                                      layout="fill"
                                      alt={`Tanda tangan ${i + 1} `}
                                    />
                                  ) : signature[i]?.signature ? (
                                    <Image
                                      src={`${process.env.END_POINT_API_IMAGE_SERTIFIKAT}certificate/images/signature-certificate-images/${signature[i].signature}`}
                                      layout="fill"
                                      alt={`Tanda tangan ${i + 1} `}
                                    />
                                  ) : (
                                    "TTD"
                                  )}
                                </div>
                                <div
                                  className="border-2 text-center w-100"
                                  style={{
                                    borderStyle: signature[i]?.name
                                      ? ""
                                      : "dashed",
                                  }}
                                >
                                  {signature[i]?.name ? (
                                    <div
                                      dangerouslySetInnerHTML={{
                                        __html: signature[i]?.name,
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
                                    borderStyle: signature[i]?.position
                                      ? ""
                                      : "dashed",
                                  }}
                                >
                                  {signature[i]?.position ? (
                                    <div
                                      dangerouslySetInnerHTML={{
                                        __html: signature[i]?.position,
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
              <div className="col-4 font-weight-normal overflow-auto">
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
                      onChange={e =>
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
                                  //   style={{
                                  //     height: "400px",
                                  //   }}
                                >
                                  <div className="font-size-h5 mb-5">
                                    Penanda Tangan
                                  </div>
                                  <CKEditor
                                    editor={ClassicEditor}
                                    config={{
                                      toolbar: ["bold", "italic"],
                                    }}
                                    onReady={editor => {
                                      // You can store the "editor" and use when it is needed.
                                    }}
                                    data={signature[i]?.name}
                                    onChange={(event, editor) => {
                                      const data = editor.getData();
                                      let newArr = [...signature];
                                      newArr[i].name
                                        ? (newArr[i].name = data)
                                        : (newArr[i] = {
                                            ...newArr[i],
                                            name: data,
                                          });
                                      setSignature(newArr);
                                    }}
                                    onBlur={() =>
                                      simpleValidator.current.showMessageFor(
                                        "nama"
                                      )
                                    }
                                  />
                                  {simpleValidator.current.message(
                                    "nama",
                                    signature[i]?.name,
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
                                        onChange={e =>
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
                                        Choose file
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
                                            penColor: "rgb(66, 133, 244)",
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
                                          onClick={e =>
                                            handleCanvasTandaTangan(e, i)
                                          }
                                        >
                                          Buat Tanda Tangan
                                        </a>
                                        <button
                                          type="button"
                                          onClick={e => {
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
                                    signature[i]?.signature ||
                                      signature[i]?.localSignature,
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
                                    // config={editorConfig}
                                    onReady={editor => {
                                      // You can store the "editor" and use when it is needed.
                                    }}
                                    data={signature[i]?.position}
                                    onChange={(event, editor) => {
                                      const data = editor.getData();
                                      let newArr = [...signature];
                                      newArr[i]?.position
                                        ? (newArr[i]["position"] = data)
                                        : (newArr[i] = {
                                            ...newArr[i],
                                            position: data,
                                          });
                                      setSignature(newArr);
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
                                    signature[i]?.position,
                                    "required",
                                    {
                                      className: "text-danger mt-4",
                                    }
                                  )}
                                </div>
                                <div className="modal-footer">
                                  <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-dismiss="modal"
                                  >
                                    Tutup
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
                                    ? -156
                                    : number_of_signatures == 2
                                    ? -106
                                    : number_of_signatures == 3
                                    ? -22
                                    : -14
                                }
                                max={
                                  number_of_signatures == 1
                                    ? 156
                                    : number_of_signatures == 2
                                    ? 106
                                    : number_of_signatures == 3
                                    ? 22
                                    : 14
                                }
                                className="form-control"
                                value={signature[i]?.set_position || 0}
                                onChange={e => {
                                  let newArr = [...signature];
                                  newArr[i]?.set_position
                                    ? (newArr[i]["set_position"] =
                                        +e.target.value)
                                    : (newArr[i] = {
                                        ...newArr[i],
                                        set_position: +e.target.value,
                                      });
                                  setSignature(newArr);
                                }}
                              />

                              <input
                                type="range"
                                min={
                                  number_of_signatures == 1
                                    ? -156
                                    : number_of_signatures == 2
                                    ? -106
                                    : number_of_signatures == 3
                                    ? -22
                                    : -14
                                }
                                max={
                                  number_of_signatures == 1
                                    ? 156
                                    : number_of_signatures == 2
                                    ? 106
                                    : number_of_signatures == 3
                                    ? 22
                                    : 14
                                }
                                value={signature[i]?.set_position || 0}
                                className="text-white form-range form-control mx-5"
                                style={{
                                  cursor: "pointer",
                                  width: "100%",
                                }}
                                onChange={e => {
                                  let newArr = [...signature];
                                  newArr[i]?.set_position
                                    ? (newArr[i]["set_position"] =
                                        +e.target.value)
                                    : (newArr[i] = {
                                        ...newArr[i],
                                        set_position: +e.target.value,
                                      });
                                  setSignature(newArr);
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
                    onChange={e => onChangeBackground(e)}
                    accept="image/*"
                    style={{ display: "none" }}
                  />
                </div>
                <div className="position-relative">
                  <label>
                    <div className="mr-5">
                      <a
                        onClick={() => {
                          setLocalBackground("");
                          setBackground("");
                        }}
                        className="btn bg-blue-secondary text-white rounded-full font-weight-bolder px-10 py-4"
                      >
                        Reset Background
                      </a>
                    </div>
                  </label>
                </div>
              </div>
            </div>
            {certificate_type == "1 lembar" ? (
              <div className="d-lg-flex justify-content-end">
                <Link href="/sertifikat/master-sertifikat/tambah" passHref>
                  <a
                    className="btn btn-light-ghost-rounded-full px-6 font-weight-bolder px-5 py-3"
                    onClick={() => {
                      // console.log("klik batal");
                    }}
                  >
                    Batal
                  </a>
                </Link>

                <a
                  className="btn btn-outline-primary-rounded-full px-6 font-weight-bolder px-6 py-3 mx-5"
                  onClick={e => {
                    handlePost(e, 2); // 2 == draft
                  }}
                >
                  Simpan Draft
                </a>

                <a
                  className="btn btn-primary-rounded-full px-6 font-weight-bolder px-6 py-3"
                  onClick={e => {
                    handlePost(e, 1);
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
                <div className="border-primary p-0 border col-8 h-500px">
                  <div className="p-0" ref={divReferenceSilabus}>
                    {localBackgroundSyllabus ? (
                      <Image
                        src={localBackgroundSyllabus}
                        alt="fitur"
                        // height={495}
                        // width={1400}
                        layout="fill"
                        objectFit="fill"
                      />
                    ) : background_syllabus ? (
                      <Image
                        src={`${process.env.END_POINT_API_IMAGE_SERTIFIKAT}certificate/images/background-syllabus/${background_syllabus}`}
                        alt={`background Image ${background_syllabus}`}
                        // height={495}
                        // width={1400}
                        layout="fill"
                        objectFit="fill"
                      />
                    ) : (
                      ""
                    )}
                    <div
                      className="row align-items-center m-0"
                      style={{ width: "100%" }}
                    >
                      <div
                        className="pt-19 pl-19 zindex-1 col-10-"
                        style={{ height: "370px" }}
                      >
                        <div style={{ fontSize: "14px", fontWeight: "bold" }}>
                          Silabus yang di dapat
                        </div>
                        <div>
                          <ol className="col mt-4">
                            {syllabus
                              ? syllabus.map((e, i) => {
                                  return (
                                    <li
                                      className="p-0"
                                      key={i}
                                      style={{
                                        fontSize:
                                          syllabus.length <= 5
                                            ? "16px"
                                            : syllabus.length <= 10
                                            ? "12px"
                                            : syllabus.length <= 15
                                            ? "10px"
                                            : "6px",
                                      }}
                                    >
                                      {e}
                                    </li>
                                  );
                                })
                              : ""}
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
                        >
                          {/* START MAP TTD */}
                          {[...Array(number_of_signature_syllabus)].map(
                            (el, i) => {
                              return (
                                <div
                                  key={i}
                                  style={{
                                    transform: `translateX(${
                                      signatureSyllabus[i]?.set_position || 0
                                    }%)`,
                                    width: "156px",
                                    height: "150px",
                                  }}
                                  className="col-3 p-0"
                                >
                                  <div className="col">
                                    <div
                                      className="col border-2 align-items-center justify-content-center d-flex position-relative"
                                      style={{
                                        borderStyle:
                                          signatureSyllabus[i]?.signature ||
                                          signatureSyllabus[i]?.localSignature
                                            ? ""
                                            : "dashed",
                                        height: "100px",
                                      }}
                                    >
                                      {signatureSyllabus[i]?.localSignature ? (
                                        <Image
                                          src={
                                            signatureSyllabus[i]?.localSignature
                                          }
                                          layout="fill"
                                          alt={`Tanda tangan ${i + 1} `}
                                        />
                                      ) : signatureSyllabus[i]?.signature ? (
                                        <Image
                                          src={`${process.env.END_POINT_API_IMAGE_SERTIFIKAT}certificate/images/signature-certificate-images-syllabus/${signatureSyllabus[i]?.signature}`}
                                          layout="fill"
                                          alt={`Tanda tangan ${i + 1} `}
                                        />
                                      ) : (
                                        "TTD"
                                      )}
                                    </div>
                                    <div
                                      className="border-2 text-center w-100"
                                      style={{
                                        borderStyle: signatureSyllabus[i]?.name
                                          ? ""
                                          : "dashed",
                                      }}
                                    >
                                      {signatureSyllabus[i]?.name ? (
                                        <div
                                          dangerouslySetInnerHTML={{
                                            __html: signatureSyllabus[i]?.name,
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
                                        borderStyle: signatureSyllabus[i]
                                          ?.position
                                          ? ""
                                          : "dashed",
                                      }}
                                    >
                                      {signatureSyllabus[i]?.position ? (
                                        <div
                                          dangerouslySetInnerHTML={{
                                            __html:
                                              signatureSyllabus[i]?.position,
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
                <div className="col-4 font-weight-normal overflow-auto">
                  {/* END FORM Jenis Sertifikat */}
                  {/* START FORM Tanda tangan */}
                  <div className="form-group mb-2">
                    <label className=" col-form-label font-weight-bold">
                      Jumlah Tanda Tangan
                    </label>
                    <div>
                      <select
                        name="jumlah_tandatangan"
                        onChange={e =>
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
                      Syllabus
                    </label>
                    <div
                      className="card-toolbar"
                      data-target={`#modalSyllabus`}
                      data-toggle="modal"
                    >
                      <a className="btn bg-blue-secondary text-white rounded-full font-weight-bolder px-15 py-3">
                        Atur Syllabus
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
                                    //   style={{
                                    //     height: "400px",
                                    //   }}
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
                                      onReady={editor => {
                                        // You can store the "editor" and use when it is needed.
                                      }}
                                      data={signatureSyllabus[i]?.name}
                                      onChange={(event, editor) => {
                                        const data = editor.getData();
                                        let newArr = [...signatureSyllabus];
                                        newArr[i]?.name
                                          ? (newArr[i]["name"] = data)
                                          : (newArr[i] = {
                                              ...newArr[i],
                                              name: data,
                                            });
                                        setSignatureSyllabus(newArr);
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
                                          signatureSyllabus[i]?.name,
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
                                          onChange={e =>
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
                                          Choose file
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
                                              penColor: "rgb(66, 133, 244)",
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
                                            onClick={e =>
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
                                            onClick={e => {
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
                                          signatureSyllabus[i]
                                            ?.localSignature ||
                                            signatureSyllabus[i]?.signature,
                                          "required",
                                          { className: "text-danger mb-4" }
                                        )
                                      : ""}
                                    <div className="font-size-h5 mb-5">
                                      Jabatan Penanda Tangan
                                    </div>
                                    <CKEditor
                                      editor={ClassicEditor}
                                      // config={editorConfig}
                                      onReady={editor => {
                                        // You can store the "editor" and use when it is needed.
                                      }}
                                      data={signatureSyllabus[i]?.position}
                                      onChange={(event, editor) => {
                                        const data = editor.getData();
                                        let newArr = [...signatureSyllabus];
                                        newArr[i]?.position
                                          ? (newArr[i]["position"] = data)
                                          : (newArr[i] = {
                                              ...newArr[i],
                                              position: data,
                                            });
                                        setSignatureSyllabus(newArr);
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
                                          signatureSyllabus[i]?.position,
                                          "required",
                                          { className: "text-danger mt-4" }
                                        )
                                      : ""}
                                  </div>
                                  <div className="modal-footer">
                                    <button
                                      type="button"
                                      className="btn btn-secondary"
                                      data-dismiss="modal"
                                    >
                                      Tutup
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
                                      ? -156
                                      : number_of_signature_syllabus == 2
                                      ? -106
                                      : number_of_signature_syllabus == 3
                                      ? -22
                                      : -14
                                  }
                                  max={
                                    number_of_signature_syllabus == 1
                                      ? 156
                                      : number_of_signature_syllabus == 2
                                      ? 106
                                      : number_of_signature_syllabus == 3
                                      ? 22
                                      : 14
                                  }
                                  className="form-control"
                                  value={
                                    signatureSyllabus[i]?.set_position || 0
                                  }
                                  onChange={e => {
                                    let newArr = [...signatureSyllabus];
                                    newArr[i]?.set_position
                                      ? (newArr[i]["set_position"] =
                                          +e.target.value)
                                      : (newArr[i] = {
                                          ...newArr[i],
                                          set_position: +e.target.value,
                                        });
                                    setSignatureSyllabus(newArr);
                                  }}
                                />

                                <input
                                  type="range"
                                  min={
                                    number_of_signature_syllabus == 1
                                      ? -156
                                      : number_of_signature_syllabus == 2
                                      ? -106
                                      : number_of_signature_syllabus == 3
                                      ? -22
                                      : -14
                                  }
                                  max={
                                    number_of_signature_syllabus == 1
                                      ? 156
                                      : number_of_signature_syllabus == 2
                                      ? 106
                                      : number_of_signature_syllabus == 3
                                      ? 22
                                      : 14
                                  }
                                  value={
                                    signatureSyllabus[i]?.set_position || 0
                                  }
                                  className="text-white form-range form-control mx-5"
                                  style={{
                                    cursor: "pointer",
                                    width: "100%",
                                  }}
                                  onChange={e => {
                                    let newArr = [...signatureSyllabus];
                                    newArr[i]?.set_position
                                      ? (newArr[i]["set_position"] =
                                          +e.target.value)
                                      : (newArr[i] = {
                                          ...newArr[i],
                                          set_position: +e.target.value,
                                        });
                                    setSignatureSyllabus(newArr);
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
                      onChange={e => onChangeBackgroundLembar2(e)}
                      accept="image/*"
                      style={{ display: "none" }}
                    />
                  </div>
                  <div className="position-relative">
                    <label>
                      <div className="mr-5">
                        <a
                          onClick={() => {
                            setLocalBackgroundSyllabus("");
                            setBackground_syllabus("");
                          }}
                          className="btn bg-blue-secondary text-white rounded-full font-weight-bolder px-10 py-4"
                        >
                          Reset Background
                        </a>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
              {certificate_type == "2 lembar" ? (
                <div className="d-lg-flex justify-content-end">
                  <Link href="/sertifikat/master-sertifikat/tambah" passHref>
                    <a
                      className="btn btn-light-ghost-rounded-full px-6 font-weight-bolder px-5 py-3"
                      onClick={() => {
                        // console.log("klik batal");
                      }}
                    >
                      Batal
                    </a>
                  </Link>

                  <a
                    className="btn btn-outline-primary-rounded-full px-6 font-weight-bolder px-6 py-3 mx-5"
                    onClick={e => {
                      handlePost(e, 2); // 2 == draft
                    }}
                  >
                    Simpan Draft
                  </a>

                  <a
                    className="btn btn-primary-rounded-full px-6 font-weight-bolder px-6 py-3"
                    onClick={e => {
                      handlePost(e, 1);
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
                  Syllabus
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
                              index === 0
                                ? "Syllabus 1"
                                : `Syllabus ${index + 1}`
                            }
                            name={`cooperation${index}`}
                            type="text"
                            onChange={e => handleChange(e, index)}
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
                {syllabus && syllabus.length >= 25 ? (
                  ""
                ) : (
                  <div className="form-group d-flex align-items-center m-0">
                    <div
                      className="btn btn-outline-primary-rounded-full font-weight-bolder py-3 m-0"
                      onClick={() => handleAddInput()}
                    >
                      <i className="ri-add-fill mr-2 p-0 text-primary"></i>
                      Tambah Syllabus
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
    </PageWrapper>
  );
}
