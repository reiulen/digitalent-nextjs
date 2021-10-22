import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import PageWrapper from "../../../wrapper/page.wrapper";
import Image from "next/image";

import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import IconClose from "../../../assets/icon/Close";

import {
  getProvinces,
  cancelChangeProvinces,
} from "../../../../redux/actions/partnership/mitra.actions";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";

const EditMitra = ({ token }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const allMitra = useSelector((state) => state.allMitra);

  const [institution_name, setInstitution_name] = useState("");
  const [email, setEmail] = useState("");
  // tambah url logo
  const [agency_logo, setAgency_logo] = useState("");
  const [website, setWesite] = useState("");
  const [address, setAddress] = useState("");
  const [indonesia_provinces_id, setIndonesia_provinces_id] = useState("");
  const [indonesia_cities_id, setIndonesia_cities_id] = useState("");
  const [postal_code, setPostal_code] = useState("");
  const [pic_name, setPic_name] = useState("");
  const [pic_contact_number, setPic_contact_number] = useState("");
  const [pic_email, setPic_email] = useState("");

  // pertama kali load provinces set kesini
  const [allProvinces, setAllProvinces] = useState([]);
  // ketika load cities state ini save data
  const [citiesAll, setCitiesAll] = useState([]);
  // default send
  const [defaultValueProvinceID, setDefaultValueProvinceID] = useState("");
  const [defaultValueCitieID, setDefaultValueCitieID] = useState("");

  const [imageview, setImageview] = useState("");

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


  const [defaultValueProvince, setDefaultValueProvince] = useState("");
  const [defaultValueCitie, setDefaultValueCitie] = useState("");
  const changeProvinces = (e) => {
    setIndonesia_provinces_id(e.id);
    setStatuLoadCities(statuLoadCities ? false : true);
  };

  const cancelProvincesChange = () => {
    setCitiesAll([]);
    dispatch(cancelChangeProvinces());
    setIndonesia_cities_id(defaultValueCitieID);
    setIndonesia_provinces_id(defaultValueProvinceID);
  };
  const [statuLoadCities, setStatuLoadCities] = useState(false);
  const changeValueProvinces = async () => {
    setIndonesia_cities_id("");
    setIndonesia_provinces_id("");
    setStatuLoadCities(true);

    dispatch(getProvinces(token));
  };

  const [showImage, setShowImage] = useState(false);

  const hideImage = () => {
    setShowImage(showImage ? false : true);
  };

  const [NamePDF, setNamePDF] = useState(null);
  const fileType = ["image/png"];
  const fileTypeJpeg = ["image/jpeg"];
  const fileMax = 2097152;
  const onChangeImage = (e) => {
    let selectedFile = e.target.files[0];

    if (selectedFile) {
      if (
        (selectedFile && fileTypeJpeg.includes(selectedFile.type)) ||
        (fileType.includes(selectedFile.type) && selectedFile.size <= fileMax)
      ) {
        let reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = (e) => {
          setAgency_logo(e.target.result);
          setShowImage(true);
          setNamePDF(selectedFile.name);
        };
      } else {
        notify("gambar harus PNG atau JPG dan max size 2mb");
      }
    } else {
      notify("upload gambar dulu");
    }
  };

  const handleSubmit = async () => {
    // e.preventDefault();
    if (institution_name === "") {
      setError({ ...error, institution_name: "Harus isi nama lembaga" });
      notify("Harus isi nama lembaga");
    } else if (email === "") {
      setError({ ...error, email: "Harus isi email" });
      notify("Harus isi email");
    } else if (website === "") {
      setError({ ...error, website: "Harus isi nama website" });
      notify("Harus isi nama website");
    } else if (address === "") {
      setError({ ...error, address: "Harus isi alamat" });
      notify("Harus isi alamat");
    } else if (indonesia_provinces_id === "") {
      setError({
        ...error,
        indonesia_provinces_id: "Harus isi pilih provinsi",
      });
      notify("Harus isi pilih provinsi");
    } else if (indonesia_cities_id === "") {
      setError({ ...error, indonesia_cities_id: "Harus isi pilih kota/kab" });
      notify("Harus isi pilih kota/kab");
    } else if (
      postal_code === "" ||
      postal_code.length < 5 ||
      postal_code.length > 5
    ) {
      setError({
        ...error,
        postal_code: "Harus isi kode pos minimal dan maksimal 5 karakter",
      });
      notify("Harus isi kode pos minimal dan maksimal 5 karakter");
    } else if (pic_name === "") {
      setError({ ...error, pic_name: "Harus isi nama PIC" });
      notify("Harus isi nama PIC");
    } else if (pic_contact_number === "" || pic_contact_number.length < 9) {
      setError({
        ...error,
        pic_contact_number: "Harus isi No. Kontak PIC dan minimal 9 karakter",
      });
      notify("Harus isi No. Kontak PIC");
    } else if (pic_email === "") {
      setError({ ...error, pic_email: "Harus isi Email PIC" });
      notify("Harus isi Email PIC");
    } else {
      Swal.fire({
        title: "Apakah anda yakin ingin simpan ?",
        // text: "Data ini tidak bisa dikembalikan !",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "Batal",
        confirmButtonText: "Ya !",
        dismissOnDestroy: false,
      }).then(async (result) => {
        if (result.value) {
          let formData = new FormData();
          
          if (agency_logo !== "") {
            formData.append("agency_logo", agency_logo);
          }
          formData.append("_method", "PUT");
          formData.append("institution_name", institution_name);
          formData.append("website", website);
          formData.append("address", address);

          if (allMitra.provinces.length === 0) {
            formData.append("indonesia_provinces_id", defaultValueProvinceID);
            formData.append("indonesia_cities_id", defaultValueCitieID);
          } else {
            formData.append("indonesia_provinces_id", indonesia_provinces_id);
            formData.append("indonesia_cities_id", indonesia_cities_id);
          }

          formData.append("postal_code", postal_code);
          formData.append("pic_name", pic_name);
          formData.append("pic_contact_number", pic_contact_number);
          formData.append("pic_email", pic_email);

          try {
            let { data } = await axios.post(
              `${process.env.END_POINT_API_PARTNERSHIP}api/partners/${router.query.id}`,
              formData,
              {
                headers: {
                  authorization: `Bearer ${token}`,
                },
              }
            );
            router.push(
              {
                pathname: "/partnership/mitra",
                query: { update: true },
              },
              undefined,
              { shallow: true }
            );
          } catch (error) {
            notify(error.response.data.message);
          }
        }
      });
    }
  };

  const notify = (value) =>
    toast.info(`${value}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const cancelChangeImage = () => {
    setAgency_logo("");
    setNamePDF(null);
  };

  useEffect(() => {
    async function setDataSingle (id,token){
      try {
      let { data } = await axios.get(
        `${process.env.END_POINT_API_PARTNERSHIP}api/partners/${id}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      setInstitution_name(data.data.institution_name);

      setEmail(data.data.email);
      // tambah url logo
      setImageview(data.data.agency_logo);
      setWesite(data.data.website);
      setAddress(data.data.alamat);

      setIndonesia_provinces_id(data.data.province.id);
      setDefaultValueProvince(data.data.province.name);
      setDefaultValueProvinceID(data.data.province.id);

      setIndonesia_cities_id(data.data.city.id);
      setDefaultValueCitie(data.data.city.name);
      setDefaultValueCitieID(data.data.city.id);

      setPostal_code(data.data.postal_code);
      setPic_name(data.data.pic_name);
      setPic_contact_number(data.data.pic_contact_number);
      setPic_email(data.data.pic_email);
    } catch (error) {
      notify(error.response.data.message);
    }

    } 
    setDataSingle(router.query.id,token);
  }, [router.query.id,token]);

  useEffect(() => {
    if (indonesia_provinces_id === "") {
      return;
    } else {
      async function fetchAPI() {
        try {
          let { data } = await axios.get(
            `${process.env.END_POINT_API_PARTNERSHIP}api/option/cities/${indonesia_provinces_id}`
          );
          let dataNewCitites = data.data.map((items) => {
            return { ...items, label: items.name, value: items.id };
          });
          dataNewCitites.splice(0, 0, { label: "Pilih Kab/Kota", value: "" });
          setCitiesAll(dataNewCitites);
        } catch (error) {
          notify(error.response.data.message);
        }
      }
      fetchAPI();
    }
  }, [statuLoadCities, indonesia_provinces_id]);

  return (
    <PageWrapper>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="col-lg-12 col-xxl-12 order-1 order-xxl-2 px-0">
        {/* {loading ? <LoadingPage loading={loading} /> : ""fq} */}

        <div className="card card-custom card-stretch gutter-b">
          <div className="card-header border-0">
            <h3
              className="card-title font-weight-bolder text-dark"
              style={{ fontSize: "24px" }}
            >
              Ubah Mitra
            </h3>
          </div>
          <div className="card-body pt-0">
            <form>
              <div className="form-group">
                <label htmlFor="staticEmail" className="col-form-label">
                  Nama Lembaga
                </label>
                <input
                readOnly
                  onFocus={() => setError({ ...error, institution_name: "" })}
                  type="text"
                  className="form-control"
                  placeholder="Masukkan Nama Lembaga"
                  value={institution_name}
                  onChange={(e) => setInstitution_name(e.target.value)}
                />
                {error.institution_name ? (
                  <p className="error-text">{error.institution_name}</p>
                ) : (
                  ""
                )}
              </div>

              <div className="row">
                <div className="col-12 col-sm-6">
                  <div className="form-group">
                    <label htmlFor="staticEmail" className="col-form-label">
                      Website
                    </label>
                    <input
                      onFocus={() => setError({ ...error, website: "" })}
                      type="text"
                      className="form-control"
                      placeholder="Masukkan Website"
                      value={website}
                      onChange={(e) => setWesite(e.target.value)}
                    />
                    {error.website ? (
                      <p className="error-text">{error.website}</p>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <div className="col-12 col-sm-6">
                  <div className="form-group">
                    <label htmlFor="staticEmail" className="col-form-label">
                      Email
                    </label>
                    <input
                    readOnly
                      onFocus={() => setError({ ...error, email: "" })}
                      type="email"
                      className="form-control"
                      placeholder="Masukkan Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    {error.email ? (
                      <p className="error-text">{error.email}</p>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="staticEmail" className="col-form-label">
                  Gambar Logo
                </label>
                {/* ketika ada upload gambar baru */}
                {!agency_logo ? (
                  ""
                ) : (
                  <div
                    data-toggle="modal"
                    data-target="#exampleModalCenter"
                    className="shadow-image-form cursor-pointer position-relative"
                    style={{
                      maxWidth: "168px",
                      maxHeight: "168px",
                      width: "168px",
                      height: "168px",
                    }}
                  >
                    <Image
                      src={agency_logo}
                      alt="Picture of the author"
                      layout="fill"
                      objectFit="fill"
                    />
                  </div>
                )}
                {/* read gambar yg ada from api */}
                {agency_logo ? (
                  ""
                ) : !imageview ? (
                  ""
                ) : (
                  <div
                    data-toggle="modal"
                    data-target="#exampleModalCenter"
                    className="shadow-image-form cursor-pointer"
                    style={{
                      maxWidth: "168px",
                      maxHeight: "168px",
                      width: "168px",
                      height: "168px",
                    }}
                  >
                    <div
                      className="w-100 h-100 position-relative"
                      style={{ padding: "6px" }}
                    >
                      <Image
                        src={
                          process.env.END_POINT_API_IMAGE_PARTNERSHIP +
                          "partnership/images/profile-images/" +
                          imageview
                        }
                        alt="images"
                        layout="fill"
                        objectFit="fill"
                      />
                    </div>
                  </div>
                )}

                {agency_logo ? (
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

                {/* modal view image */}
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
                          Gambar Logo
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
                        {agency_logo ? (
                          <div
                            className="w-100 h-100 position-relative"
                            style={{ padding: "6px" }}
                          >
                            <Image
                              src={agency_logo}
                              alt="images"
                              layout="fill"
                              objectFit="fill"
                            />
                          </div>
                        ) : (
                          <div
                            className="w-100 h-100 position-relative"
                            style={{ padding: "6px" }}
                          >
                            <Image
                              src={
                                process.env.END_POINT_API_IMAGE_PARTNERSHIP +
                                "partnership/images/profile-images/" +
                                imageview
                              }
                              alt="images"
                              layout="fill"
                              objectFit="fill"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="input-group">
                  <div className="custom-file">
                    <input
                      onFocus={() => setError({ ...error, agency_logo: "" })}
                      onChange={(e) => onChangeImage(e)}
                      type="file"
                      name="logo"
                      className="custom-file-input cursor-pointer"
                      id="inputGroupFile04"
                      accept="image/png,image/jpg"
                    />
                    <label
                      className="custom-file-label"
                      htmlFor="inputGroupFile04"
                    >
                      {NamePDF ? NamePDF : "Unggah gambar baru"}
                    </label>
                  </div>
                </div>

                {error.agency_logo ? (
                  <p className="error-text">{error.agency_logo}</p>
                ) : (
                  ""
                )}
              </div>

              <div className="form-group">
                <label htmlFor="staticEmail" className="col-form-label">
                  Masukan Alamat Lengkap
                </label>
                <input
                  onFocus={() => setError({ ...error, address: "" })}
                  type="text"
                  className="form-control"
                  placeholder="Masukkan Alamat"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>

              {allMitra.provinces.length === 0 ? (
                <div className="form-group">
                  <label htmlFor="staticEmail" className="col-form-label">
                    Provinsi
                  </label>
                  <div className="row">
                    <div className="col-12 col-sm-9">
                      <select
                        onFocus={() =>
                          setError({ ...error, indonesia_provinces_id: "" })
                        }
                        className="form-control mt-2"
                        disabled
                      >
                        <option value={indonesia_provinces_id}>
                          {defaultValueProvince}
                        </option>
                      </select>
                    </div>
                    <div className="col-12 col-sm-3">
                      <button
                        type="button"
                        className="btn btn-sm btn-rounded-full bg-blue-primary text-white w-100 d-flex justify-content-center mt-2"
                        onClick={() => changeValueProvinces()}
                      >
                        Ubah Provinsi
                      </button>
                    </div>
                  </div>
                  {error.indonesia_provinces_id ? (
                    <p className="error-text">{error.indonesia_provinces_id}</p>
                  ) : (
                    ""
                  )}
                </div>
              ) : (
                <div className="form-group">
                  <label htmlFor="staticEmail" className="col-form-label">
                    Provinsi
                  </label>

                  <div className="row">
                    <div className="col-12 col-sm-9">
                      <Select
                        onFocus={() =>
                          setError({ ...error, indonesia_provinces_id: "" })
                        }
                        className="basic-single w-100"
                        classNamePrefix="select"
                        placeholder="Pilih data Kab/Kota"
                        defaultValue={allMitra?.provinces[0]}
                        isDisabled={false}
                        isLoading={false}
                        isClearable={false}
                        isRtl={false}
                        isSearchable={true}
                        name="color"
                        onChange={(e) => changeProvinces(e)}
                        options={allMitra?.provinces}
                      />
                    </div>
                    <div className="col-12 col-sm-3">
                      <button
                        type="button"
                        className="btn btn-sm btn-rounded-full bg-blue-primary text-white w-100 d-flex justify-content-center"
                        onClick={() => cancelProvincesChange()}
                      >
                        Batal Ubah Provinsi
                      </button>
                    </div>
                  </div>

                  {error.indonesia_provinces_id ? (
                    <p className="error-text">{error.indonesia_provinces_id}</p>
                  ) : (
                    ""
                  )}
                </div>
              )}
              {allMitra.provinces.length === 0 ? (
                <div className="form-group">
                  <label htmlFor="staticEmail" className="col-form-label">
                    Kota / Kabupaten
                  </label>
                  <select
                    onFocus={() =>
                      setError({ ...error, indonesia_cities_id: "" })
                    }
                    disabled
                    className="form-control"
                  >
                    <option value={indonesia_cities_id}>
                      {defaultValueCitie}
                    </option>
                  </select>
                  {error.indonesia_cities_id ? (
                    <p className="error-text">{error.indonesia_cities_id}</p>
                  ) : (
                    ""
                  )}
                </div>
              ) : (
                <div className="form-group">
                  <label htmlFor="staticEmail" className="col-form-label">
                    Kota / Kabupaten
                  </label>

                  <Select
                    onFocus={() =>
                      setError({ ...error, indonesia_cities_id: "" })
                    }
                    className="basic-single w-full"
                    classNamePrefix="select"
                    placeholder="Pilih data Kab/Kota"
                    defaultValue={citiesAll[0]}
                    isDisabled={false}
                    isLoading={false}
                    isClearable={false}
                    isRtl={false}
                    isSearchable={true}
                    name="color"
                    onChange={(e) => setIndonesia_cities_id(e.id)}
                    options={citiesAll}
                  />

                  {error.indonesia_cities_id ? (
                    <p className="error-text">{error.indonesia_cities_id}</p>
                  ) : (
                    ""
                  )}
                </div>
              )}

              <div className="form-group">
                <label htmlFor="staticEmail" className="col-form-label">
                  Kode Pos
                </label>
                <input
                  onFocus={() => setError({ ...error, postal_code: "" })}
                  type="text"
                  className="form-control"
                  placeholder="Masukkan Kode Pos"
                  value={postal_code}
                  onChange={(e) => setPostal_code(e.target.value)}
                />
                {error.postal_code ? (
                  <p className="error-text">{error.postal_code}</p>
                ) : (
                  ""
                )}
              </div>

              <div className="row">
                <div className="col-12 col-sm-6">
                  <div className="form-group">
                <label htmlFor="staticEmail" className="col-form-label">
                  Nama Person In Charge (PIC)
                </label>
                <input
                  onFocus={() => setError({ ...error, pic_name: "" })}
                  type="text"
                  onChange={(e) => setPic_name(e.target.value)}
                  className="form-control"
                  placeholder="Masukkan Nama"
                  value={pic_name}
                />
                {error.pic_name ? (
                  <p className="error-text">{error.pic_name}</p>
                ) : (
                  ""
                )}
              </div>
                </div>
                <div className="col-12 col-sm-6"><div className="form-group">
                <label htmlFor="staticEmail" className="col-form-label">
                  Nomor Handphone Person In Charge (PIC)
                </label>
                <input
                  onFocus={() => setError({ ...error, pic_contact_number: "" })}
                  type="text"
                  className="form-control"
                  placeholder="Masukkan NO. Kontak"
                  value={pic_contact_number}
                  onChange={(e) => setPic_contact_number(e.target.value)}
                />
                {error.pic_contact_number ? (
                  <p className="error-text">{error.pic_contact_number}</p>
                ) : (
                  ""
                )}
              </div></div>
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
                  value={pic_email}
                  onChange={(e) => setPic_email(e.target.value)}
                />
                {error.pic_email ? (
                  <p className="error-text">{error.pic_email}</p>
                ) : (
                  ""
                )}
              </div>

              <div className="form-group row">
                <div className="col-sm-12 d-flex justify-content-end">
                  <Link href="/partnership/mitra">
                    <a className="btn btn-sm btn-white btn-rounded-full text-blue-primary mr-5">
                      Kembali
                    </a>
                  </Link>
                  <button
                    type="button"
                    className="btn btn-sm btn-rounded-full bg-blue-primary text-white"
                    onClick={(e) => handleSubmit(e)}
                  >
                    Simpan
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default EditMitra;
