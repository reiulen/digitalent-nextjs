import React, { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import PageWrapper from "../../../wrapper/page.wrapper";
import { useRouter } from "next/router";
import axios from "axios";
import Swal from "sweetalert2";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";
import IconClose from "../../../assets/icon/Close";
import Image from "next/image";
import ReactCrop from "react-image-crop";
import { Modal } from "react-bootstrap";
import Cookies from "js-cookie";

const TambahMitra = ({ token }) => {
  const router = useRouter();
  const defaultImage = "/assets/media/default.jpg";

  const [institution_name, setInstitution_name] = useState("");
  const [email, setEmail] = useState("");
  const [agency_logo, setAgency_logo] = useState("");
  const [wesite, setWesite] = useState("");
  const [imageview, setImageview] = useState("");
  const [address, setAddress] = useState("");
  const [indonesia_provinces_id, setIndonesia_provinces_id] = useState("");
  const [indonesia_cities_id, setIndonesia_cities_id] = useState("");
  const [postal_code, setPostal_code] = useState("");
  const [pic_name, setPic_name] = useState("");
  const [pic_contact_number, setPic_contact_number] = useState("");
  const [pic_email, setPic_email] = useState("");
  const [allProvinces, setAllProvinces] = useState([]);
  const [citiesAll, setCitiesAll] = useState([]);

  const [error, setError] = useState({
    institution_name: "",
    email: "",
    agency_logo: "",
    wesite: "",
    address: "",
    indonesia_provinces_id: "",
    indonesia_cities_id: "",
    postal_code: "",
    pic_name: "",
    pic_contact_number: "",
    pic_email: "",
  });

  const submit = (e) => {
    e.preventDefault();
    if (institution_name === "") {
      setError({ ...error, institution_name: "Harus isi nama lembaga" });
    } else if (wesite === "") {
      setError({ ...error, wesite: "Harus isi alamat website" });
    } else if (email === "") {
      setError({ ...error, email: "Harus isi email" });
    } else if (agency_logo === "") {
      setError({
        ...error,
        agency_logo: "Harus isi gambar logo dengan format png/jpg",
      });
    } else if (address === "") {
      setError({ ...error, address: "Harus isi alamat" });
    } else if (indonesia_provinces_id === "") {
      setError({
        ...error,
        indonesia_provinces_id: "Harus isi pilih provinsi",
      });
    } else if (indonesia_cities_id === "") {
      setError({ ...error, indonesia_cities_id: "Harus isi pilih kota/kab" });
    } else if (
      postal_code === "" ||
      postal_code.length < 5 ||
      postal_code.length > 5
    ) {
      setError({
        ...error,
        postal_code: "Harus isi kode pos minimal dan maksimal 5 karakter",
      });
    } else if (pic_name === "") {
      setError({ ...error, pic_name: "Harus isi nama PIC" });
    } else if (pic_contact_number === "" || pic_contact_number.length < 9) {
      setError({
        ...error,
        pic_contact_number: "Harus isi No. Kontak PIC dan minimal 9 karakter",
      });
    } else if (pic_email === "") {
      setError({ ...error, pic_email: "Harus isi Email PIC" });
    } else {
      Swal.fire({
        title: "Apakah anda yakin ingin simpan ?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "Batal",
        confirmButtonText: "Ya !",
        // dismissOnDestroy: false,
      }).then(async (result) => {
        if (result.value) {
          let formData = new FormData();
          formData.append("institution_name", institution_name);
          formData.append("email", email);
          formData.append("agency_logo", agency_logo);
          formData.append("website", wesite);
          formData.append("address", address);
          formData.append("indonesia_provinces_id", indonesia_provinces_id);
          formData.append("indonesia_cities_id", indonesia_cities_id);
          formData.append("postal_code", postal_code);
          formData.append("pic_name", pic_name);
          formData.append("pic_contact_number", pic_contact_number);
          formData.append("pic_email", pic_email);

          try {
            let { data } = await axios.post(
              `${process.env.END_POINT_API_PARTNERSHIP}api/partners/create`,
              formData,
              {
                headers: {
                  authorization: `Bearer ${token}`,
                  Permission: Cookies.get("token_permission"),
                },
              }
            );
            router.push({
              pathname: "/partnership/mitra",
              query: { success: true },
            });
          } catch (error) {
            Swal.fire("Gagal", `${error.response.data.message}`, "error");
          }
        }
      });
    }
  };

  // Image Cropping
  const [showEditImage, setShowEditImage] = useState(false);
  const [upImg, setUpImg] = useState();
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const [crop, setCrop] = useState({ unit: "%", width: 30, aspect: 9 / 9 });
  const [completedCrop, setCompletedCrop] = useState(null);

  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => setUpImg(reader.result));
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onLoad = useCallback((img) => {
    imgRef.current = img;
  }, []);

  useEffect(() => {
    if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
      return;
    }

    const image = imgRef.current;
    const canvas = previewCanvasRef.current;
    const crop = completedCrop;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext("2d");
    const pixelRatio = window.devicePixelRatio;

    canvas.width = crop.width * pixelRatio * scaleX;
    canvas.height = crop.height * pixelRatio * scaleY;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width * scaleX,
      crop.height * scaleY
    );
  }, [completedCrop]);

  const onHandleHideModal = () => {
    setShowEditImage(false);
    setUpImg(null);
  };

  const onSubmitEditImage = () => {
    setShowEditImage(false);
    setUpImg(null);
    setAgency_logo(previewCanvasRef.current.toDataURL("image/png"));
  };

  const onChangeProvinces = (e) => {
    setIndonesia_provinces_id(e.id);
  };

  useEffect(() => {
    getDataProvinces(token);
  }, [token]);

  async function getDataProvinces(token) {
    try {
      let { data } = await axios.get(
        `${process.env.END_POINT_API_PARTNERSHIP}api/option/provinces`,
        {
          headers: {
            authorization: `Bearer ${token}`,
            Permission: Cookies.get("token_permission"),
          },
        }
      );
      let dataNewProvinces = data?.data?.map((items) => {
        return { ...items, label: items?.name, value: items?.id };
      });
      // dataNewProvinces.splice(0, 0, { label: "Pilih Provinsi", value: "" });
      setAllProvinces(dataNewProvinces);
    } catch (error) {
      Swal.fire("Gagal", `${error?.response?.data?.message}`, "error");
    }
  }

  useEffect(() => {
    // get data cities
    if (indonesia_provinces_id !== "") {
      fetchAPI();
    }
  }, [indonesia_provinces_id, token]);

  async function fetchAPI() {
    try {
      let { data } = await axios.get(
        `${process.env.END_POINT_API_PARTNERSHIP}api/option/cities/${indonesia_provinces_id}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
            Permission: Cookies.get("token_permission"),
          },
        }
      );
      let dataNewCitites = data?.data?.map((items) => {
        return { ...items, label: items.name, value: items.id };
      });
      // dataNewCitites.splice(0, 0, { label: "Pilih Kab/Kota", value: "" });
      setCitiesAll(dataNewCitites);
    } catch (error) {
      Swal.fire("Gagal", `${error?.response?.data?.message}`, "error");
    }
  }

  return (
    <PageWrapper>
      <div className="col-lg-12 col-xxl-12 order-1 order-xxl-2 px-0">
        <div className="card card-custom card-stretch gutter-b">
          <div className="card-header border-0">
            <h3 className="card-title font-weight-bolder text-dark titles-1">
              Tambah Mitra
            </h3>
          </div>
          <div className="card-body pt-0">
            <form onSubmit={submit}>
              <div className="form-group">
                <label htmlFor="staticEmail" className="col-form-label">
                  Nama Lembaga
                </label>
                <input
                  onFocus={() => setError({ ...error, institution_name: "" })}
                  type="text"
                  className="form-control"
                  placeholder="Masukkan Nama Lembaga"
                  onChange={(e) => setInstitution_name(e.target.value)}
                />
                {error?.institution_name ? (
                  <p className="error-text">{error?.institution_name}</p>
                ) : (
                  ""
                )}
              </div>

              <div className="row">
                <div className="col-12 col-xl-6">
                  <div className="form-group">
                    <label htmlFor="staticEmail" className="col-form-label">
                      Website
                    </label>
                    <input
                      onFocus={() => setError({ ...error, wesite: "" })}
                      type="text"
                      className="form-control"
                      placeholder="Masukkan Website"
                      onChange={(e) => setWesite(e.target.value)}
                    />
                    {error?.wesite ? (
                      <p className="error-text">{error?.wesite}</p>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <div className="col-12 col-xl-6">
                  <div className="form-group">
                    <label htmlFor="staticEmail" className="col-form-label">
                      Email
                    </label>
                    <input
                      onFocus={() => setError({ ...error, email: "" })}
                      type="email"
                      className="form-control"
                      placeholder="Masukkan Email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    {error?.email ? (
                      <p className="error-text">{error?.email}</p>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>

              <div className="form-group mb-0 mb-sm-4">
                <label htmlFor="staticEmail" className="col-form-label">
                  Gambar Logo
                </label>

                {!agency_logo ? (
                  <>
                    <div className="ml-4 row">
                      <figure
                        className="avatar item-rtl position-relative"
                        data-toggle="modal"
                        data-target="#exampleModalCenter"
                      >
                        <Image
                          src={
                            imageview
                              ? process.env.END_POINT_API_IMAGE_PARTNERSHIP +
                                imageview
                              : defaultImage
                          }
                          alt="image"
                          width={160}
                          height={160}
                          objectFit="fill"
                          className={imageview ? "rounded-circle" : ""}
                        />
                      </figure>

                      <div className="position-relative">
                        <label
                          className="circle-top"
                          onClick={() => setShowEditImage(true)}
                        >
                          <i className="ri-add-line text-dark"></i>
                        </label>
                      </div>
                    </div>
                    <small className="text-muted">
                      Format Image (.png/.jpg), Rekomendasi 1024x1024
                    </small>
                  </>
                ) : (
                  <div className="ml-4 row">
                    <figure
                      className="avatar item-rtl position-relative shadow-sm rounded-circle"
                      data-toggle="modal"
                      data-target="#exampleModalCenter"
                    >
                      <Image
                        src={agency_logo}
                        alt="image"
                        width={160}
                        height={160}
                        objectFit="fill"
                        className="rounded-circle"
                      />
                    </figure>
                    <div className="position-relative">
                      <label
                        className="circle-top"
                        onClick={() => setShowEditImage(true)}
                      >
                        <i className="ri-add-line text-dark"></i>
                      </label>
                    </div>
                  </div>
                )}

                {!agency_logo ? (
                  <p className="error-text">{error?.agency_logo}</p>
                ) : (
                  ""
                )}

                {agency_logo && imageview ? (
                  <button
                    className="btn btn-primary btn-sm my-3 mr-3"
                    type="button"
                    onClick={() => setAgency_logo("")}
                  >
                    Batal ubah
                  </button>
                ) : (
                  ""
                )}
              </div>

              <div
                className="modal fade"
                id="exampleModalCenter"
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
                      <h5 className="modal-title" id="exampleModalLongTitle">
                        Logo Gambar
                      </h5>
                      <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <IconClose />
                      </button>
                    </div>

                    <div
                      className="modal-body text-left p-0"
                      style={{ height: "400px" }}
                    >
                      {!agency_logo ? (
                        <Image
                          src={
                            process.env.END_POINT_API_IMAGE_PARTNERSHIP +
                            imageview
                          }
                          alt="Picture of the author"
                          layout="fill"
                          objectFit="fill"
                        />
                      ) : (
                        <Image
                          src={agency_logo}
                          alt="Picture of the author"
                          layout="fill"
                          objectFit="fill"
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="staticEmail" className="col-form-label">
                  Alamat Lengkap
                </label>
                <input
                  onFocus={() => setError({ ...error, address: "" })}
                  type="text"
                  className="form-control"
                  placeholder="Masukkan Alamat"
                  onChange={(e) => setAddress(e.target.value)}
                />
                {error?.address ? (
                  <p className="error-text">{error?.address}</p>
                ) : (
                  ""
                )}
              </div>

              <div className="row">
                <div className="col-12 col-xl-6">
                  <div className="form-group">
                    <label htmlFor="staticEmail" className="col-form-label">
                      Provinsi
                    </label>
                    <Select
                      onFocus={() =>
                        setError({ ...error, indonesia_provinces_id: "" })
                      }
                      className="basic-single"
                      classNamePrefix="select"
                      placeholder="Pilih provinsi"
                      // defaultValue={allProvinces[0]}
                      isDisabled={false}
                      isLoading={false}
                      isClearable={false}
                      isRtl={false}
                      isSearchable={true}
                      name="color"
                      onChange={(e) => onChangeProvinces(e)}
                      options={allProvinces}
                    />
                    {error?.indonesia_provinces_id ? (
                      <p className="error-text">
                        {error?.indonesia_provinces_id}
                      </p>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <div className="col-12 col-xl-6">
                  {/* ========================================= cities */}
                  <div
                    className={
                      indonesia_provinces_id
                        ? "form-group"
                        : "form-group cursor-not-allowed"
                    }
                  >
                    <label htmlFor="staticEmail" className=" col-form-label">
                      Kota / Kabupaten
                    </label>
                    <Select
                      onFocus={() =>
                        setError({ ...error, indonesia_cities_id: "" })
                      }
                      className="basic-single cursor-not-allowed"
                      classNamePrefix="select"
                      placeholder="Pilih data Kab/Kota"
                      // defaultValue={citiesAll[0]}
                      isDisabled={indonesia_provinces_id ? false : true}
                      isLoading={false}
                      isClearable={false}
                      isRtl={false}
                      isSearchable={true}
                      name="color"
                      onChange={(e) => setIndonesia_cities_id(e.id)}
                      options={citiesAll}
                    />
                    {error?.indonesia_cities_id ? (
                      <p className="error-text">{error?.indonesia_cities_id}</p>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="staticEmail" className="col-form-label">
                  Kode Pos
                </label>
                <div className="position-relative">
                  <input
                    onFocus={() => setError({ ...error, postal_code: "" })}
                    type="number"
                    className="form-control"
                    placeholder="Masukkan Kode Pos"
                    onChange={(e) => setPostal_code(e.target.value)}
                  />
                  <div className="box-hide-arrow"></div>
                </div>

                {error?.postal_code ? (
                  <p className="error-text">{error?.postal_code}</p>
                ) : (
                  ""
                )}
              </div>

              <div className="row">
                <div className="col-12 col-xl-6">
                  <div className="form-group">
                    <label htmlFor="staticEmail" className="col-form-label">
                      Nama Person In Charge (PIC)
                    </label>
                    <div className="position-relative">
                      <input
                        onFocus={() => setError({ ...error, pic_name: "" })}
                        type="text"
                        className="form-control"
                        placeholder="Masukkan Nama"
                        onChange={(e) => setPic_name(e.target.value)}
                      />
                      {error?.pic_name ? (
                        <p className="error-text">{error?.pic_name}</p>
                      ) : (
                        ""
                      )}
                      <div className="box-hide-arrow"></div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-xl-6">
                  <div className="form-group">
                    <label htmlFor="staticEmail" className="col-form-label">
                      Nomor Handphone Person In Charge (PIC)
                    </label>
                    <div className="position-relative">
                      <input
                        onFocus={() =>
                          setError({ ...error, pic_contact_number: "" })
                        }
                        maxLength="13"
                        minLength="9"
                        type="number"
                        className="form-control"
                        placeholder="Masukkan No. Kontak"
                        onChange={(e) => setPic_contact_number(e.target.value)}
                      />
                      <div className="box-hide-arrow"></div>
                    </div>
                    {error?.pic_contact_number ? (
                      <p className="error-text">{error?.pic_contact_number}</p>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="staticEmail" className="col-form-label">
                  E-mail Person In Charge (PIC)
                </label>
                <input
                  onFocus={() => setError({ ...error, pic_email: "" })}
                  type="email"
                  className="form-control"
                  placeholder="Masukkan Email"
                  onChange={(e) => setPic_email(e.target.value)}
                />
                {error.pic_email ? (
                  <p className="error-text">{error.pic_email}</p>
                ) : (
                  ""
                )}
              </div>

              <div className="form-group">
                <div className="d-flex justify-content-end flex-column flex-md-row">
                  <Link href="/partnership/mitra">
                    <a className="btn btn-sm btn-white btn-rounded-full text-blue-primary mr-5 d-flex justify-content-center">
                      Kembali
                    </a>
                  </Link>
                  <button
                    type="submit"
                    className="btn btn-sm btn-rounded-full bg-blue-primary text-white d-flex justify-content-center"
                  >
                    Simpan
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Modal Edit Image  */}
      <Modal show={showEditImage} onHide={() => onHandleHideModal()}>
        <Modal.Header>
          <Modal.Title>Ganti Logo Lembaga</Modal.Title>

          <button
            type="button"
            className="close"
            onClick={() => onHandleHideModal()}
          >
            <i className="ri-close-fill" style={{ fontSize: "25px" }}></i>
          </button>
        </Modal.Header>

        <Modal.Body>
          <div>Logo Lembaga</div>

          <div className="my-5">
            <button
              className="btn btn-rounded-full btn-sm bg-blue-primary text-white d-flex justify-content-center"
              onClick={() => {
                document.getElementById("edit-image").click();
              }}
            >
              <i className="ri-upload-2-fill text-white"></i> Pilih Logo Lembaga
            </button>

            <input
              type="file"
              name="gambar"
              className="custom-file-input"
              id="edit-image"
              accept="image/*"
              style={{ display: "none" }}
              onChange={onSelectFile}
            />

            <div className="row mt-5">
              <div className="col-12 col-md-6">
                <ReactCrop
                  src={upImg}
                  onImageLoaded={onLoad}
                  crop={crop}
                  onChange={(c) => setCrop(c)}
                  onComplete={(c) => setCompletedCrop(c)}
                />
              </div>

              <div className="col-12 col-md-6">
                {upImg ? (
                  <div>
                    <div>Pratinjau</div>
                    <canvas
                      ref={previewCanvasRef}
                      style={{
                        width: Math.round(completedCrop?.width ?? 0),
                        height: Math.round(completedCrop?.height ?? 0),
                        borderRadius: "50%",
                      }}
                    />
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <div className="row">
            <div className="d-flex justify-content-between align-items-center">
              <button
                className="btn btn-sm btn-white btn-rounded-full text-blue-primary mr-5 d-flex justify-content-center"
                onClick={() => onHandleHideModal()}
              >
                Batal
              </button>
              <button
                className="btn btn-sm btn-rounded-full bg-blue-primary text-white d-flex justify-content-center"
                onClick={() => onSubmitEditImage()}
              >
                Simpan
              </button>
            </div>
          </div>
        </Modal.Footer>
      </Modal>
      {/* End of Modal Edit Image */}
    </PageWrapper>
  );
};

export default TambahMitra;
