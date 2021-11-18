import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import PageWrapper from "../../../../wrapper/page.wrapper";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import Select from "react-select";
import axios from "axios";
import IconClose from "../../../../assets/icon/Close";
import Image from "next/image";
import AlertBar from "../../components/BarAlert";

const Tambah = ({ token }) => {
  const router = useRouter();
  const { successInputProfile } = router.query;

  // diambil dari data user ketika pertama kali register (name)
  const [institution_name, setInstitution_name] = useState("");
  const [email, setEmail] = useState("");
  const [wesite, setWesite] = useState("");
  const [agency_logo, setAgency_logo] = useState("");
  const [imageview, setImageview] = useState("");
  const [address, setAddress] = useState("");
  const [indonesia_provinces_id, setIndonesia_provinces_id] = useState("");
  const [indonesia_cities_id, setIndonesia_cities_id] = useState("");
  const [postal_code, setPostal_code] = useState("");
  const [pic_name, setPic_name] = useState("");
  const [pic_contact_number, setPic_contact_number] = useState("");
  const [pic_email, setPic_email] = useState("");

  const [error, setError] = useState({
    institution_name: "",
    email: "",
    wesite: "",
    agency_logo: "",
    address: "",
    indonesia_provinces_id: "",
    indonesia_cities_id: "",
    postal_code: "",
    pic_name: "",
    pic_contact_number: "",
    pic_email: "",
  });

  const submit = (e) => {
    // e.preventDefault();
    if (institution_name === "") {
      setError({
        ...error,
        institution_name: "Harus isi nama lembaga",
      });
    } else if (wesite === "") {
      setError({ ...error, wesite: "Harus isi alamat website" });
    } else if (email === "") {
      setError({ ...error, email: "Harus isi email" });
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
      //
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
          formData.append("institution_name", institution_name);

          if (agency_logo !== "") {
            formData.append("agency_logo", agency_logo);
          }

          formData.append("website", wesite);
          formData.append("address", address);

          if (
            typeof indonesia_provinces_id === "object" &&
            typeof indonesia_cities_id === "object"
          ) {
            formData.append("indonesia_cities_id", indonesia_cities_id.id);
            formData.append(
              "indonesia_provinces_id",
              indonesia_provinces_id.id
            );
          } else {
            formData.append("indonesia_cities_id", indonesia_cities_id);
            formData.append("indonesia_provinces_id", indonesia_provinces_id);
          }

          formData.append("postal_code", postal_code);
          formData.append("pic_name", pic_name);
          formData.append("pic_contact_number", pic_contact_number);
          formData.append("pic_email", pic_email);

          try {
            let { data } = await axios.post(
              `${process.env.END_POINT_API_PARTNERSHIP_MITRA}api/profiles`,
              formData,
              {
                headers: {
                  authorization: `Bearer ${token}`,
                },
              }
            );
            if (router.query.isProfile) {
              router.push({
                pathname: "/partnership/user/kerjasama/submit-kerjasama",
                query: { isProfile: true },
              });
            } else {
              router.push({
                pathname: "/partnership/user/profile-lembaga",
                query: { successInputProfile: true },
              });
            }
          } catch (error) {
            Swal.fire("Gagal", `${error.response.data.message}`, "error");
          }
        }
      });
    }
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
          setNamePDF(selectedFile.name);
        };
      } else {
        Swal.fire(
          "Gagal",
          `gambar harus PNG atau JPG dan max size 2mb`,
          "error"
        );
      }
    } else {
      Swal.fire("Gagal", `upload gambar dulu`, "error");
    }
  };

  const onChangeProvinces = (e) => {
    setIndonesia_provinces_id(e.id);
  };

  // pertama kali load provinces set kesini
  const [allProvinces, setAllProvinces] = useState([]);

  // ketika load cities state ini save data
  const [citiesAll, setCitiesAll] = useState([]);
  useEffect(() => {
    async function getDataProvinces(token) {
      try {
        let { data } = await axios.get(
          `${process.env.END_POINT_API_PARTNERSHIP_MITRA}api/option/provinces`,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        let dataNewProvinces = data.data.map((items) => {
          return { ...items, label: items.name, value: items.id };
        });
        // dataNewProvinces.splice(0, 0, { label: "Pilih Provinsi", value: "" });
        setAllProvinces(dataNewProvinces);
      } catch (error) {
        return;
      }
    }

    async function getProfiles(token) {
      try {
        let { data } = await axios.get(
          `${process.env.END_POINT_API_PARTNERSHIP_MITRA}api/profiles`,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );

        if (data) {
          setImageview(data.data.agency_logo);
          setAddress(data.data.address === "-" ? "" : data.data.address);
          setPostal_code(
            data.data.postal_code === "-" ? "" : data.data.postal_code
          );
          setPic_name(data.data.pic_name === "-" ? "" : data.data.pic_name);
          setPic_contact_number(
            data.data.pic_contact_number === "-"
              ? ""
              : data.data.pic_contact_number
          );
          setPic_email(data.data.pic_email === "-" ? "" : data.data.pic_email);
          setWesite(data.data.website === null ? "" : data.data.website);
          setEmail(data.data.email === "-" ? "" : data.data.email);
          setInstitution_name(
            data.data.institution_name === "-" ? "" : data.data.institution_name
          );
          if (data.data.city.id !== "-" && data.data.province.id !== "-") {
            let citiesss = {
              ...data.data.city,
              label: data.data.city.name,
              value: data.data.city.id,
            };
            let provinciesss = {
              ...data.data.province,
              label: data.data.province.name,
              value: data.data.province.id,
            };
            setIndonesia_cities_id(citiesss);
            setIndonesia_provinces_id(provinciesss);
          }
        }
      } catch (error) {
        return;
      }
    }

    getDataProvinces(token);
    getProfiles(token);
  }, [token]);

  useEffect(() => {
    if (indonesia_provinces_id !== "") {
      async function fetchAPI() {
        try {
          let { data } = await axios.get(
            `${process.env.END_POINT_API_PARTNERSHIP_MITRA}api/option/cities/${indonesia_provinces_id}`
          );
          let dataNewCitites = data.data.map((items) => {
            return { ...items, label: items.name, value: items.id };
          });
          setCitiesAll(dataNewCitites);
        } catch (error) {
          return;
        }
      }
      fetchAPI();
    }
  }, [indonesia_provinces_id]);

  const onNewReset = () => {
    router.replace("/partnership/user/profile-lembaga", undefined, {
      shallow: true,
    });
  };

  return (
    <PageWrapper>
      {successInputProfile ? (
        <AlertBar
          text="Berhasil menyimpan data"
          className="alert-light-success"
          onClick={() => onNewReset()}
        />
      ) : (
        ""
      )}
      <div className="col-lg-12 col-xxl-12 order-1 order-xxl-2 px-0">

        <div className="card card-custom card-stretch gutter-b">
          <div className="card-header border-0 px-4">
            <h3 className="card-title text-dark fw-600 titles-1">
              Profile Lembaga
            </h3>
          </div>
          <div className="card-body pt-0 px-4 px-sm-6">
            <form>
              <div className="form-group mb-0 mb-sm-4">
                <label htmlFor="staticE mail" className="col-form-label">
                  Nama Lembaga
                </label>
                <input
                  disabled
                  type="text"
                  name="text_input"
                  className="form-control border-0"
                  value={institution_name}
                  style={{ backgroundColor: "transparent" }}
                />
                {error.institution_name ? (
                  <p className="error-text">{error.institution_name}</p>
                ) : (
                  ""
                )}
              </div>

              <div className="row">
                <div className="col-12 col-sm-6">
                  <div className="form-group mb-0 mb-sm-4">
                    <label htmlFor="staticEmail" className="col-form-label">
                      Website
                    </label>
                    <input
                      onFocus={() => setError({ ...error, wesite: "" })}
                      type="text"
                      name="text_input"
                      className="form-control"
                      placeholder="Masukkan Alamat Website"
                      onChange={(e) => setWesite(e.target.value)}
                      value={wesite && wesite}
                    />
                    {error.wesite ? (
                      <p className="error-text">{error.wesite}</p>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <div className="col-12 col-sm-6">
                  <div className="form-group mb-0 mb-sm-4">
                    <label htmlFor="staticEmail" className="col-form-label">
                      Email
                    </label>
                    <input
                      disabled
                      onFocus={() => setError({ ...error, email: "" })}
                      type="text"
                      name="text_input"
                      className="form-control border-0"
                      value={email}
                      style={{ backgroundColor: "transparent" }}
                    />
                    {error.email ? (
                      <p className="error-text">{error.email}</p>
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
                      src={
                        process.env.END_POINT_API_IMAGE_PARTNERSHIP + imageview
                      }
                      alt="Picture of the author"
                      layout="fill"
                      objectFit="fill"
                    />
                  </div>
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
                      {NamePDF ? NamePDF : "Cari Logo"}
                    </label>
                  </div>
                </div>
                {error.agency_logo ? (
                  <p className="error-text">{error.agency_logo}</p>
                ) : (
                  ""
                )}
              </div>
              {/* modal image show */}
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

              <div className="form-group mb-0 mb-sm-4">
                <label htmlFor="staticEmail" className="col-form-label">
                  Masukkan Alamat Lengkap
                </label>
                <input
                  onFocus={() => setError({ ...error, address: "" })}
                  type="text"
                  className="form-control"
                  placeholder="Masukkan Alamat"
                  onChange={(e) => setAddress(e.target.value)}
                  value={address && address}
                />
                {error.address ? (
                  <p className="error-text">{error.address}</p>
                ) : (
                  ""
                )}
              </div>

              <div className="row">
                <div className="col-12 col-sm-6">
                  <div className="form-group mb-0 mb-sm-4">
                    <label htmlFor="staticEmail" className="col-form-label">
                      Provinsi
                    </label>
                    <Select
                      onFocus={() =>
                        setError({ ...error, indonesia_provinces_id: "" })
                      }
                      className="basic-single"
                      classNamePrefix="select"
                      placeholder={`${
                        indonesia_provinces_id !== ""
                          ? indonesia_provinces_id.name
                          : "Pilih provinsi"
                      } `}
                      isDisabled={false}
                      isLoading={false}
                      isClearable={false}
                      isRtl={false}
                      isSearchable={true}
                      name="color"
                      onChange={(e) => onChangeProvinces(e)}
                      options={allProvinces}
                    />
                    {error.indonesia_provinces_id ? (
                      <p className="error-text">
                        {error.indonesia_provinces_id}
                      </p>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <div className="col-12 col-sm-6">
                  <div className="form-group mb-0 mb-sm-4">
                    <label htmlFor="staticEmail" className=" col-form-label">
                      Kota / Kabupaten
                    </label>
                    <Select
                      onFocus={() =>
                        setError({ ...error, indonesia_cities_id: "" })
                      }
                      className="basic-single"
                      classNamePrefix="select"
                      placeholder={`${
                        indonesia_cities_id !== ""
                          ? indonesia_cities_id.name
                          : "Pilih data Kab/Kota"
                      }`}
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
                </div>
              </div>

              <div className="form-group position-relative mb-0 mb-sm-4">
                <label htmlFor="staticEmail" className="col-form-label">
                  Kode Pos
                </label>

                <div className="position-relative">
                  <input
                    onFocus={() => setError({ ...error, postal_code: "" })}
                    type="number"
                    value={postal_code && postal_code}
                    className="form-control"
                    placeholder="Masukkan Kode Pos"
                    onChange={(e) => setPostal_code(e.target.value)}
                  />
                  <div className="box-hide-arrow"></div>
                </div>
                {error.postal_code ? (
                  <p className="error-text">{error.postal_code}</p>
                ) : (
                  ""
                )}
              </div>

              <div className="row">
                <div className="col-12 col-sm-6">
                  <div className="form-group mb-0 mb-sm-4">
                    <label htmlFor="staticEmail" className="col-form-label">
                      Nama Person In Charge (PIC)
                    </label>
                    <input
                      value={pic_name && pic_name}
                      onFocus={() => setError({ ...error, pic_name: "" })}
                      type="text"
                      className="form-control"
                      placeholder="Masukkan Nama"
                      onChange={(e) => setPic_name(e.target.value)}
                    />
                    {error.pic_name ? (
                      <p className="error-text">{error.pic_name}</p>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <div className="col-12 col-sm-6">
                  <div className="form-group mb-0 mb-sm-4">
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
                        placeholder="Masukkan NO. Kontak"
                        onChange={(e) => setPic_contact_number(e.target.value)}
                        value={pic_contact_number && pic_contact_number}
                      />
                      <div className="box-hide-arrow"></div>
                    </div>
                    {error.pic_contact_number ? (
                      <p className="error-text">{error.pic_contact_number}</p>
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
                  value={pic_email && pic_email}
                />
                {error.pic_email ? (
                  <p className="error-text">{error.pic_email}</p>
                ) : (
                  ""
                )}
              </div>

              <div className="form-group row">
                <div className="col-sm-12 d-flex justify-content-end">
                  <Link href="/partnership/user/kerjasama" passHref>
                    <a className="btn btn-sm btn-white btn-rounded-full text-blue-primary mr-5">
                      Kembali
                    </a>
                  </Link>

                  <button
                    type="button"
                    onClick={(e) => submit(e)}
                    className="btn btn-sm btn-rounded-full bg-blue-primary text-white "
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

export default Tambah;
