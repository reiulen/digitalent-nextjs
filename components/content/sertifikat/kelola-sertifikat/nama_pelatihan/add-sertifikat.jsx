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
import PageWrapper from "../../../../wrapper/page.wrapper";
import * as htmlToImage from "html-to-image";
import domtoimage from "dom-to-image";
import { toPng } from "html-to-image";

export default function TambahMasterSertifikat() {
  const router = useRouter();

  // #Div Reference Lembar 1
  const divReference = useRef(null);
  const [divImage, setDivImage] = useState(null);
  // #Div Reference Lembar 1

  // #Div Reference Lembar 2
  const divReferenceSilabus = useRef(null);
  // #Div Reference Lembar 2

  // #Redux state
  const { loading, error, certificate } = useSelector(
    state => state.detailCertificates
  );
  // console.log(certificate);
  // #Redux state

  const [signature, setSignature] = useState(1);
  const editorConfig = {
    toolbar: ["bold", "italic", "link", "redo", "numberedList", "bulletedList"],
  };
  const simpleValidator = useRef(new SimpleReactValidator({ locale: "id" }));
  // #START FORM DATA
  const [lembarValue, setLembarValue] = useState(1);
  const [jumlahTandaTangan, setJumlahTandaTangan] = useState(1);
  const [tandaTanganSlider, setTandaTanganSlider] = useState([0, 0, 0, 0]);
  // #END FORM DATA
  useEffect(() => {
    // console.log(Array(jumlahTandaTangan));
    // console.log(typeof jumlahTandaTangan, jumlahTandaTangan);
    setTandaTanganSlider([0, 0, 0, 0]);
  }, [jumlahTandaTangan]);

  // #START MODAL
  const [tandaTanganType, setTandaTanganType] = useState([1, 1, 1, 1]);
  const [tandaTangan, setTandaTangan] = useState("");
  const [person, setPerson] = useState([
    { name: "", jabatan: "", image: "" },
    { name: "", jabatan: "", image: "" },
    { name: "", jabatan: "", image: "" },
    { name: "", jabatan: "", image: "" },
  ]);

  const signCanvas = useRef({});
  const handleImageTandaTangan = (e, index) => {
    console.log(e.target.name, "INI TARGET NAME", typeof e.target.name);
    if (e.target.name === "image") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          let newArr = [...person];
          newArr[index].image = reader.result;
          setPerson(newArr);
        }
      };
      if (e.target.files[0]) {
        reader.readAsDataURL(e.target.files[0]);
      }
    }
  };

  const handleCanvasTandaTangan = (e, i) => {
    const data = signCanvas.current.toDataURL();
    let newArr = [...person];
    newArr[i].image = data;
    setPerson(newArr);
  };

  const handleClearCanvasTandaTangan = (e, i) => {
    let newArr = [...person];
    newArr[i].image = "";
    setPerson(newArr);
    signCanvas.current.clear();
  };
  // #END MODAL

  // #START LEMBAR 2
  const [tandaTanganSyllabusSlider, setTandaTanganSyllabusSlider] = useState([
    0, 0, 0, 0,
  ]);
  const [tandaTanganSyllabusType, setTandaTanganSyllabusType] = useState([
    1, 1, 1, 1,
  ]);

  const [jumlahTandaTanganSyllabus, setJumlahTandaTanganSyllabus] = useState(1);
  const [personSyllabus, setPersonSyllabus] = useState([
    { name: "", jabatan: "", image: "" },
    { name: "", jabatan: "", image: "" },
    { name: "", jabatan: "", image: "" },
    { name: "", jabatan: "", image: "" },
  ]);

  const handleImageTandaTanganSyllabus = (e, index) => {
    if (e.target.name === "image") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          let newArr = [...personSyllabus];
          newArr[index].image = reader.result;
          setPersonSyllabus(newArr);
        }
      };
      if (e.target.files[0]) {
        reader.readAsDataURL(e.target.files[0]);
      }
    }
  };
  const handleCanvasTandaTanganSyllabus = (e, i) => {
    const data = signCanvas.current.toDataURL();
    let newArr = [...personSyllabus];
    newArr[i].image = data;
    setPersonSyllabus(newArr);
  };

  const handleClearCanvasTandaTanganSyllabus = (e, i) => {
    let newArr = [...personSyllabus];
    newArr[i].image = "";
    setPersonSyllabus(newArr);
    signCanvas.current.clear();
  };
  const [silabusData, setSilabusData] = useState([
    "Silabus A",
    "Silabus B",
    "Silabus C",
    "Silabus D",
    "Silabus E",
    "Silabus F",
    "Silabus G",
    "Silabus H",
    "Silabus I",
    "Silabus J",
    "Silabus E",
    "Silabus F",
    "Silabus G",
    "Silabus H",
  ]);
  // #END SECTION 2

  // # START IMAGE 1
  const [background, setBackground] = useState("");
  const onChangeBackground = e => {
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
  };
  // # END IMAGE

  // # START IMAGE 2
  const [backgroundLembar2, setBackgroundLembar2] = useState("");
  const onChangeBackgroundLembar2 = e => {
    const type = ["image/jpg", "image/png", "image/jpeg"];
    if (type.includes(e.target.files[0].type)) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setBackgroundLembar2(reader.result);
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
  // # END IMAGE

  useEffect(() => {
    // console.log(Array(jumlahTandaTangan));
    // console.log(typeof jumlahTandaTangan, jumlahTandaTangan);
    setTandaTanganSyllabusSlider([0, 0, 0, 0]);
  }, [jumlahTandaTanganSyllabus]);

  const [limit, setLimit] = useState(null);

  let { page = 1, keyword, success } = router.query;

  const handleDraft = () => {
    console.log(person);
    console.log(background);
    console.log(personSyllabus);
    console.log(backgroundLembar2);
  };

  const handlePublish = useCallback(() => {
    if (divReference.current === null) {
      return;
    }
    toPng(divReferenceSilabus.current, {
      cacheBust: true,
      canvasWidth: 842,
      canvasHeight: 595,
    })
      .then(image => {
        const link = document.createElement("a");
        link.download = "my-image-name2.png";
        link.href = image;
        link.click();
        console.log("ini imagenya", image); //dari sini gw post pokoknya namanya gatau
        // setDivImage(divReference.current);
      })
      .catch(err => {
        console.log(err);
      });

    toPng(divReference.current, {
      cacheBust: true,
      canvasWidth: 842,
      canvasHeight: 595,
    })
      .then(image => {
        const link = document.createElement("a");
        link.download = "my-image-name.png";
        link.href = image;
        link.click();
        setDivImage(divReference.current);
      })
      .catch(err => {
        console.log(err);
      });
  }, [divReference, divReferenceSilabus]);

  return (
    <PageWrapper>
      {/* error START */}
      {/* error END */}
      <div className="col-lg-12 order-1 px-0">
        <div className="card card-custom card-stretch gutter-b">
          {/* START HEADER */}
          <div className="card-header border-0 d-flex justify-content-lg-between row my-auto py-10">
            <div className="card-title d-flex">
              <div className="text-dark">Nama Sertifikat :</div>
              <div className="mx-6">
                <div
                  type="text"
                  className="form-control "
                  placeholder="Masukan Nama Sertifikat"
                  // onChange={e => setSearch(e.target.value)}
                >
                  {certificate.theme}
                </div>
              </div>
            </div>
            <div className="card-toolbar">
              <Link href="/sertifikat/master-sertifikat/tambah">
                <a
                  className="btn btn-light-ghost-rounded-full px-6 font-weight-bolder px-5 py-3"
                  onClick={() => {
                    console.log("klik batal");
                  }}
                >
                  Batal
                </a>
              </Link>
              {/* <Link href="/sertifikat/master-sertifikat/tambah"> */}
              <a
                className="btn btn-outline-primary-rounded-full px-6 font-weight-bolder px-6 py-3 mx-5"
                onClick={() => {
                  handleDraft();
                }}
              >
                Simpan Draft
              </a>
              <a
                className="btn btn-primary-rounded-full px-6 font-weight-bolder px-6 py-3"
                onClick={() => {
                  handlePublish();
                }}
              >
                Simpan
              </a>
              {/* </Link> */}
            </div>
          </div>
          {/* END HEADER */}
          {/* START BODY */}
          <div className="card-body border-top">
            <div className="row p-0">
              {/* START COL */}
              <div
                className="border-primary border col-8 h-500px"
                // style={{ width: "842px" }}
              >
                <div className="p-0" ref={divReference}>
                  {background ? (
                    <Image
                      src={background}
                      alt="fitur"
                      // height={495}
                      // width={1400}
                      layout="fill"
                      objectFit="cover"
                    />
                  ) : (
                    ""
                  )}
                  <div className="row align-items-center zindex-1">
                    <div className="position-relative">
                      <input
                        type="text"
                        className="m-6 text-center"
                        placeholder="Nomor Sertifikat"
                        style={{
                          borderStyle: "dashed",
                        }}
                      />
                    </div>
                    <div
                      className="col-12 text-center font-weight-normal p-0 justify-content-center"
                      style={{ marginTop: "-20px", width: "100%" }}
                    >
                      <label className="font-weight-boldest display-4 w-100">
                        SERTIFIKAT
                      </label>
                      <div className="w-100">Diberikan kepada</div>
                      <div className="my-2">
                        <span
                          className="mx-2 px-2 border-2 font-size-h6 px-10 w-100"
                          style={{ borderStyle: "dashed" }}
                        >
                          Nama Peserta
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
                        {certificate.theme}
                      </div>
                      <div className="mt-2 w-100">
                        <span className="w-100">
                          Program{" "}
                          <span className="font-size-h6 font-weight-bold w-100">
                            {certificate.data.list_certificate[0].academy.name}
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
                        <span
                          className="mx-2 px-2 border-2"
                          style={{ borderStyle: "dashed" }}
                        >
                          Jakarta, DD/MM/YYYY
                        </span>
                      </div>
                      <div
                        className={
                          jumlahTandaTangan < 3
                            ? " justify-content-center m-0 p-0 d-flex w-100"
                            : " justify-content-around  m-0 p-0 d-flex w-100"
                        }
                      >
                        {/* START MAP TTD */}
                        {[...Array(jumlahTandaTangan)].map((el, i) => {
                          return (
                            <div
                              key={i}
                              style={{
                                transform: `translateX(${tandaTanganSlider[i]}%)`,
                                // left: `${tandaTanganSlider[i]}px`,
                                width: "156px",
                                height: "150px",
                              }}
                              className="col-3 p-0"
                            >
                              <div className="col">
                                <div
                                  className="col border-2 align-items-center justify-content-center d-flex position-relative"
                                  style={{
                                    borderStyle: person[i].image
                                      ? ""
                                      : "dashed",
                                    height: "100px",
                                  }}
                                >
                                  {person[i].image ? (
                                    <Image
                                      src={person[i].image}
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
                                    borderStyle: person[i].name ? "" : "dashed",
                                  }}
                                  //   placeholder="Nama Lengkap"
                                >
                                  {person[i].name ? (
                                    <div
                                      dangerouslySetInnerHTML={{
                                        __html: person[i].name,
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
                                    borderStyle: person[i].jabatan
                                      ? ""
                                      : "dashed",
                                  }}
                                >
                                  {person[i].jabatan ? (
                                    <div
                                      dangerouslySetInnerHTML={{
                                        __html: person[i].jabatan,
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
                        checked={lembarValue === 1}
                        onClick={() => setLembarValue(1)}
                      />
                      <label className="form-check-label">1 Lembar</label>
                    </div>
                    <div className="col-6 form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="method"
                        value="2"
                        checked={lembarValue === 2}
                        onClick={() => setLembarValue(2)}
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
                        setJumlahTandaTangan(Number(e.target.value))
                      }
                      className="form-control"
                    >
                      <option selected value={1}>
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
                  {[...Array(jumlahTandaTangan)].map((el, i) => {
                    return (
                      <div key={i} className="d-flex justify-content-start">
                        <div className="col-12">
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
                                      toolbar: ["bold", "italic", "underline"],
                                    }}
                                    onReady={editor => {
                                      // You can store the "editor" and use when it is needed.
                                    }}
                                    data={person[i].name}
                                    onChange={(event, editor) => {
                                      const data = editor.getData();
                                      let newArr = [...person];
                                      newArr[i].name = data;
                                      setPerson(newArr);
                                    }}
                                    className="h-25"
                                  />
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
                                        onClick={() => {
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
                                        onClick={() => {
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
                                              "tandaTangan"
                                            )
                                          }
                                        />
                                        {simpleValidator.current.message(
                                          "tandaTangan",
                                          tandaTangan,
                                          "required",
                                          { className: "text-danger" }
                                        )}
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
                                  <div className="font-size-h5 mb-5">
                                    Jabatan Penanda Tangan
                                  </div>
                                  <CKEditor
                                    editor={ClassicEditor}
                                    // config={editorConfig}
                                    onReady={editor => {
                                      // You can store the "editor" and use when it is needed.
                                    }}
                                    data={person[i].jabatan}
                                    onChange={(event, editor) => {
                                      const data = editor.getData();
                                      let newArr = [...person];
                                      newArr[i].jabatan = data;
                                      setPerson(newArr);
                                    }}
                                    className="h-25"
                                  />
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
                                  jumlahTandaTangan == 1
                                    ? -156
                                    : jumlahTandaTangan == 2
                                    ? -106
                                    : jumlahTandaTangan == 3
                                    ? -22
                                    : -14
                                }
                                max={
                                  jumlahTandaTangan == 1
                                    ? 156
                                    : jumlahTandaTangan == 2
                                    ? 106
                                    : jumlahTandaTangan == 3
                                    ? 22
                                    : 14
                                }
                                className="form-control"
                                placeholder={tandaTanganSlider[i]}
                                value={tandaTanganSlider[i]}
                                onChange={e => {
                                  let newArr = [...tandaTanganSlider];
                                  newArr[i] = +e.target.value;
                                  setTandaTanganSlider(newArr);
                                }}
                              />

                              <input
                                type="range"
                                min={
                                  jumlahTandaTangan == 1
                                    ? -156
                                    : jumlahTandaTangan == 2
                                    ? -106
                                    : jumlahTandaTangan == 3
                                    ? -22
                                    : -14
                                }
                                max={
                                  jumlahTandaTangan == 1
                                    ? 156
                                    : jumlahTandaTangan == 2
                                    ? 106
                                    : jumlahTandaTangan == 3
                                    ? 22
                                    : 14
                                }
                                value={tandaTanganSlider[i]}
                                className="text-white form-range form-control mx-5"
                                style={{
                                  cursor: "pointer",
                                  width: "100%",
                                }}
                                onChange={e => {
                                  let newArr = [...tandaTanganSlider];
                                  newArr[i] = +e.target.value;
                                  setTandaTanganSlider(newArr);
                                }}
                              />
                            </div>
                          </div>
                        </div>

                        {/* {tandaTanganSlider} */}
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
                    // onChange={(e) => onChangeBackground(e)}
                    accept="image/*"
                    onBlur={() =>
                      simpleValidator.current.showMessageFor("background")
                    }
                    style={{ display: "none" }}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* END BODY */}
        </div>
        {/* START SECTION 2 */}
        {lembarValue == 2 ? (
          <div className="card card-custom card-stretch gutter-b">
            {/* START BODY */}
            <div className="card-body border-top">
              <div className="row p-0">
                {/* START COL */}
                <div className="border-primary border col-8 h-500px h-100">
                  <div className="p-0" ref={divReferenceSilabus}>
                    {backgroundLembar2 ? (
                      <Image
                        src={backgroundLembar2}
                        alt="fitur"
                        // height={495}
                        // width={700}
                        layout="fill"
                        objectFit="cover"
                      />
                    ) : (
                      ""
                    )}
                    <div
                      className="row align-items-center"
                      style={{ width: "100%" }}
                    >
                      <div
                        className="p-19 zindex-1 col-12"
                        style={{ height: "370px" }}
                      >
                        <div style={{ fontSize: "14px", fontWeight: "bold" }}>
                          Silabus yang di dapat
                        </div>
                        <div>
                          <ol className="col mt-4">
                            {silabusData.map((e, i) => {
                              return (
                                <li
                                  className="p-0"
                                  key={i}
                                  style={{
                                    fontSize:
                                      silabusData.length >= 15 ? "8px" : "12px",
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
                            jumlahTandaTanganSyllabus < 3
                              ? " justify-content-center m-0 p-0 d-flex w-100"
                              : " justify-content-around  m-0 p-0 d-flex w-100"
                          }
                        >
                          {/* START MAP TTD */}
                          {[...Array(jumlahTandaTanganSyllabus)].map(
                            (el, i) => {
                              return (
                                <div
                                  key={i}
                                  style={{
                                    transform: `translateX(${tandaTanganSyllabusSlider[i]}%)`,
                                    // left: `${tandaTanganSlider[i]}px`,
                                    width: "156px",
                                    height: "150px",
                                  }}
                                  className="col-3 p-0"
                                >
                                  <div className="col">
                                    <div
                                      className="col border-2 align-items-center justify-content-center d-flex position-relative"
                                      style={{
                                        borderStyle: personSyllabus[i].image
                                          ? ""
                                          : "dashed",
                                        height: "100px",
                                      }}
                                    >
                                      {personSyllabus[i].image ? (
                                        <Image
                                          src={personSyllabus[i].image}
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
                                        borderStyle: personSyllabus[i].name
                                          ? ""
                                          : "dashed",
                                      }}
                                      //   placeholder="Nama Lengkap"
                                    >
                                      {personSyllabus[i].name ? (
                                        <div
                                          dangerouslySetInnerHTML={{
                                            __html: personSyllabus[i].name,
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
                                        borderStyle: personSyllabus[i].jabatan
                                          ? ""
                                          : "dashed",
                                      }}
                                    >
                                      {personSyllabus[i].jabatan ? (
                                        <div
                                          dangerouslySetInnerHTML={{
                                            __html: personSyllabus[i].jabatan,
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
                          setJumlahTandaTanganSyllabus(Number(e.target.value))
                        }
                        className="form-control"
                      >
                        <option selected value={1}>
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
                    {[...Array(jumlahTandaTanganSyllabus)].map((el, i) => {
                      return (
                        <div key={i} className="d-flex justify-content-start">
                          <div className="col-12">
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
                                      data={personSyllabus[i].name}
                                      onChange={(event, editor) => {
                                        const data = editor.getData();
                                        let newArr = [...personSyllabus];
                                        newArr[i].name = data;
                                        setPersonSyllabus(newArr);
                                      }}
                                      className="h-25"
                                    />
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
                                          onClick={() => {
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
                                          name={`tandaTanganType${i}`}
                                          value="2"
                                          checked={tandaTanganType[i] == 2}
                                          onClick={() => {
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
                                                "tandaTangan"
                                              )
                                            }
                                          />
                                          {simpleValidator.current.message(
                                            "tandaTangan",
                                            tandaTangan,
                                            "required",
                                            { className: "text-danger" }
                                          )}
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
                                    <div className="font-size-h5 mb-5">
                                      Jabatan Penanda Tangan
                                    </div>
                                    <CKEditor
                                      editor={ClassicEditor}
                                      // config={editorConfig}
                                      onReady={editor => {
                                        // You can store the "editor" and use when it is needed.
                                      }}
                                      data={person[i].jabatan}
                                      onChange={(event, editor) => {
                                        const data = editor.getData();
                                        let newArr = [...personSyllabus];
                                        newArr[i].jabatan = data;
                                        setPersonSyllabus(newArr);
                                      }}
                                      className="h-25"
                                    />
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
                                    jumlahTandaTanganSyllabus == 1
                                      ? -156
                                      : jumlahTandaTanganSyllabus == 2
                                      ? -106
                                      : jumlahTandaTanganSyllabus == 3
                                      ? -22
                                      : -14
                                  }
                                  max={
                                    jumlahTandaTanganSyllabus == 1
                                      ? 156
                                      : jumlahTandaTanganSyllabus == 2
                                      ? 106
                                      : jumlahTandaTanganSyllabus == 3
                                      ? 22
                                      : 14
                                  }
                                  className="form-control"
                                  value={tandaTanganSyllabusSlider[i]}
                                  onChange={e => {
                                    let newArr = [...tandaTanganSyllabusSlider];
                                    newArr[i] = +e.target.value;
                                    setTandaTanganSyllabusSlider(newArr);
                                  }}
                                />

                                <input
                                  type="range"
                                  min={
                                    jumlahTandaTanganSyllabus == 1
                                      ? -156
                                      : jumlahTandaTanganSyllabus == 2
                                      ? -106
                                      : jumlahTandaTanganSyllabus == 3
                                      ? -22
                                      : -14
                                  }
                                  max={
                                    jumlahTandaTanganSyllabus == 1
                                      ? 156
                                      : jumlahTandaTanganSyllabus == 2
                                      ? 106
                                      : jumlahTandaTanganSyllabus == 3
                                      ? 22
                                      : 14
                                  }
                                  value={tandaTanganSyllabusSlider[i]}
                                  className="text-white form-range form-control mx-5"
                                  style={{
                                    cursor: "pointer",
                                    width: "100%",
                                  }}
                                  onChange={e => {
                                    let newArr = [...tandaTanganSyllabusSlider];
                                    newArr[i] = +e.target.value;
                                    setTandaTanganSyllabusSlider(newArr);
                                  }}
                                />
                              </div>
                            </div>
                          </div>

                          {/* {tandaTanganSlider} */}
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
                      onBlur={() =>
                        simpleValidator.current.showMessageFor("background")
                      }
                      style={{ display: "none" }}
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* END BODY */}
          </div>
        ) : (
          <div></div>
        )}

        {/* START MODAL TANDA TANGAN  1*/}

        {/* END MODAL TANDA TANGAN */}
      </div>
    </PageWrapper>
  );
}
