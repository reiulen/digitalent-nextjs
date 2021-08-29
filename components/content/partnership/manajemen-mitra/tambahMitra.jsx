import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import PageWrapper from "../../../wrapper/page.wrapper";

import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";
import { getProvinces } from "../../../../redux/actions/partnership/mitra.actions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import {
//   newMitra,
//   clearErrors,
// } from "../../../../redux/actions/partnership/mitra.actions";

// import { getAllKota } from "../../../../redux/actions/utils/utils.actions";

// import LoadingPage from "../../../LoadingPage";

// import { NEW_MITRA_RESET } from "../../../../redux/types/partnership/mitra.type";

const TambahMitra = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const allMitra = useSelector((state) => state.allMitra);
  console.log("allMitra", allMitra);
  const [institution_name, setInstitution_name] = useState("");
  const [email, setEmail] = useState("");
  const [agency_logo, setAgency_logo] = useState("");
  console.log("agency_logo",agency_logo)
  const [wesite, setWesite] = useState("");
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
    if (agency_logo === "") {
      setError({
        ...error,
        agency_logo: "Harus isi gambar logo dengan format png",
      });
      notify("Harus isi gambar logo dengan format png");
    } else if (institution_name === "") {
      setError({ ...error, institution_name: "Harus isi nama lembaga" });
      notify("Harus isi nama lembaga");
    } else if (email === "") {
      setError({ ...error, email: "Harus isi email" });
      notify("Harus isi email");
    } else if (wesite === "") {
      setError({ ...error, wesite: "Harus isi nama website" });
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
              `${process.env.END_POINT_API_PARTNERSHIP}/api/partners/create`,
              formData
            );
            router.push({
              pathname: "/partnership/manajemen-mitra",
              query: { success: true },
            });
          } catch (error) {
            console.log(error.response.data.message);
            notify(error.response.data.message);
          }
        }
      });
    }
  };

  const notify = (value) =>
    toast.info(`🦄 ${value}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const getDataProvinces = async () => {
    try {
      let { data } = await axios.get(
        `${process.env.END_POINT_API_PARTNERSHIP}/api/option/provinces`
      );
      setAllProvinces(data.data);
      console.log("respon data provinsi", data);
    } catch (error) {
      console.log("gagal get province", error);
    }
  };

  const onChangeProvinces = (e) => {
    setIndonesia_provinces_id(e.target.value);
  };

  const [NamePDF, setNamePDF] = useState(null);
  const fileType = ["image/png"];
  const fileTypeJpeg = ["image/jpeg"];
  const fileMax = 2097152;
  const onChangeImage = (e) => {
    let selectedFile = e.target.files[0];
    console.log("selectedFile",selectedFile)
    
    if (selectedFile) {
      if (
        selectedFile &&
        fileTypeJpeg.includes(selectedFile.type) || fileType.includes(selectedFile.type) &&
        selectedFile.size <= fileMax
      ) {
        let reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = (e) => {
          setAgency_logo(e.target.result);
          setShowImage(true)
          setNamePDF(selectedFile.name)
          // setPdfFileError("");
          // setNamePDF(selectedFile.name);
          // alert(e.target.result)
        };
      } else {
        notify("gambar harus PNG atau JPG dan max size 2mb");
      }
    } else {
      notify("upload gambar dulu");
    }

    // console.log(e.target.file)
    // let files = e.target.files
    // console.log("files",files)
    // let reader = new FileReader();
    //     reader.readAsDataURL(files[0]);
    //     reader.onload = (e) => {
    //         console.log("e.target.result",e.target.result)
    //     }
  };


  const [showImage, setShowImage] = useState(false)
  const hideImage = () =>{
      setShowImage(showImage?false:true)
  }

  useEffect(() => {
    getDataProvinces();
  }, []);

  useEffect(() => {
    console.log("indonesia_provinces_id", indonesia_provinces_id);
    // get data cities
    if (indonesia_provinces_id === "") {
      console.log("kosong");
    } else {
      async function fetchAPI() {
        try {
          let { data } = await axios.get(
            `${process.env.END_POINT_API_PARTNERSHIP}/api/option/cities/${indonesia_provinces_id}`
          );
          console.log("respon data cities", data);
          setCitiesAll(data.data);
        } catch (error) {
          console.log("gagal get cities", error);
        }
      }

      fetchAPI();
    }
  }, [indonesia_provinces_id]);

  return (
    <PageWrapper>
      <div className="col-lg-12 col-xxl-12 order-1 order-xxl-2 px-0">
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
        {/* {loading ? <LoadingPage loading={loading} /> : ""} */}
        <div className="card card-custom card-stretch gutter-b">
          <div className="card-header border-0">
            <h3 className="card-title font-weight-bolder text-dark">
              Tambah Mitra
            </h3>
          </div>
          <div className="card-body">
            <form onSubmit={submit}>
              <div className="form-group row">
                <label
                  htmlFor="staticEmail"
                  className="col-sm-2 col-form-label"
                >
                  Gambar Logo
                </label>
                <div className="col-sm-10">
                  <div className="input-group">
                    <div className="custom-file">
                      <input
                        onFocus={() => setError({ ...error, agency_logo: "" })}
                        onChange={(e) => onChangeImage(e)}
                        type="file"
                        name="logo"
                        className="custom-file-input cursor-pointer"
                        id="inputGroupFile04"
                        // onChange={onChangeGambar}
                        accept="image/png,image/jpg"
                      />

                      <label
                        className="custom-file-label"
                        htmlFor="inputGroupFile04"
                      >
                        {NamePDF ? NamePDF : "Cari Dokumen" }
                      </label>
                    </div>
                  </div>
                  {NamePDF?<button className="btn btn-primary btn-sm my-3" type="button" onClick={()=>hideImage()}>{showImage?"Tutup":"Buka"}</button>:""}
                  {/* <button></button> */}
                </div>
                {showImage ? 
                <div
                  className={`${
                    agency_logo ? "pdf-container w-100 border my-3" : "d-none"
                  }`}
                >
                  <iframe
                    src={agency_logo}
                    frameBorder="0"
                    scrolling="auto"
                    height={agency_logo ? "500px" : ""}
                    width="100%"
                  ></iframe>
                </div>
                :""}
                {error.agency_logo ? (
                  <p className="error-text">{error.agency_logo}</p>
                ) : (
                  ""
                )}
              </div>

              <div className="form-group row">
                <label
                  htmlFor="staticEmail"
                  className="col-sm-2 col-form-label"
                >
                  Nama Lembaga
                </label>
                <div className="col-sm-10">
                  <input
                    onFocus={() => setError({ ...error, institution_name: "" })}
                    type="text"
                    className="form-control"
                    placeholder="Masukkan Nama Lembaga"
                    onChange={(e) => setInstitution_name(e.target.value)}
                  />
                  {error.institution_name ? (
                    <p className="error-text">{error.institution_name}</p>
                  ) : (
                    ""
                  )}
                </div>
              </div>

              <div className="form-group row">
                <label
                  htmlFor="staticEmail"
                  className="col-sm-2 col-form-label"
                >
                  Email
                </label>
                <div className="col-sm-10">
                  <input
                    onFocus={() => setError({ ...error, email: "" })}
                    type="email"
                    className="form-control"
                    placeholder="Masukkan Email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {error.email ? (
                    <p className="error-text">{error.email}</p>
                  ) : (
                    ""
                  )}
                </div>
              </div>

              <div className="form-group row">
                <label
                  htmlFor="staticEmail"
                  className="col-sm-2 col-form-label"
                >
                  Website
                </label>
                <div className="col-sm-10">
                  <input
                    onFocus={() => setError({ ...error, wesite: "" })}
                    type="text"
                    className="form-control"
                    placeholder="Masukkan Website"
                    onChange={(e) => setWesite(e.target.value)}
                  />
                  {error.wesite ? (
                    <p className="error-text">{error.wesite}</p>
                  ) : (
                    ""
                  )}
                </div>
              </div>

              <div className="form-group row">
                <label
                  htmlFor="staticEmail"
                  className="col-sm-2 col-form-label"
                >
                  Alamat
                </label>
                <div className="col-sm-10">
                  <input
                    onFocus={() => setError({ ...error, address: "" })}
                    type="text"
                    className="form-control"
                    placeholder="Masukkan Alamat"
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  {error.address ? (
                    <p className="error-text">{error.address}</p>
                  ) : (
                    ""
                  )}
                </div>
              </div>

              <div className="form-group row">
                <label
                  htmlFor="staticEmail"
                  className="col-sm-2 col-form-label"
                >
                  Provinsi
                </label>
                <div className="col-10">
                  <select
                    onFocus={() =>
                      setError({ ...error, indonesia_provinces_id: "" })
                    }
                    onChange={(e) => onChangeProvinces(e)}
                    className="form-control"
                  >
                    <option value="">Pilih data provinsi</option>
                    {allProvinces.length === 0 ? (
                      <option>Pilih data provinsi</option>
                    ) : (
                      allProvinces.map((item, i) => {
                        return (
                          <option key={i} value={item.id}>
                            {item.name}
                          </option>
                        );
                      })
                    )}
                  </select>
                  {error.indonesia_provinces_id ? (
                    <p className="error-text">{error.indonesia_provinces_id}</p>
                  ) : (
                    ""
                  )}
                </div>
              </div>

              <div className="form-group row">
                <label
                  htmlFor="staticEmail"
                  className="col-sm-2 col-form-label"
                >
                  Kota / Kabupaten
                </label>
                <div className="col-sm-10">
                  <select
                    onFocus={() =>
                      setError({ ...error, indonesia_cities_id: "" })
                    }
                    className="form-control"
                    onChange={(e) => setIndonesia_cities_id(e.target.value)}
                  >
                    <option value="">Pilih data Kab/Kota</option>
                    {citiesAll.length === 0
                      ? ""
                      : citiesAll.map((item, i) => {
                          return (
                            <option key={i} value={item.id}>
                              {item.name}
                            </option>
                          );
                        })}
                  </select>
                  {error.indonesia_cities_id ? (
                    <p className="error-text">{error.indonesia_cities_id}</p>
                  ) : (
                    ""
                  )}
                </div>
              </div>

              <div className="form-group row">
                <label
                  htmlFor="staticEmail"
                  className="col-sm-2 col-form-label"
                >
                  Kode Pos
                </label>
                <div className="col-sm-10">
                  <input
                    onFocus={() => setError({ ...error, postal_code: "" })}
                    type="number"
                    className="form-control"
                    placeholder="Masukkan Kode Pos"
                    onChange={(e) => setPostal_code(e.target.value)}
                  />
                  {error.postal_code ? (
                    <p className="error-text">{error.postal_code}</p>
                  ) : (
                    ""
                  )}
                </div>
              </div>

              <div className="form-group row">
                <label
                  htmlFor="staticEmail"
                  className="col-sm-2 col-form-label"
                >
                  Nama PIC
                </label>
                <div className="col-sm-10">
                  <input
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

              <div className="form-group row">
                <label
                  htmlFor="staticEmail"
                  className="col-sm-2 col-form-label"
                >
                  No. Kontak PIC
                </label>
                <div className="col-sm-10">
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
                  />
                  {error.pic_contact_number ? (
                    <p className="error-text">{error.pic_contact_number}</p>
                  ) : (
                    ""
                  )}
                </div>
              </div>

              <div className="form-group row">
                <label
                  htmlFor="staticEmail"
                  className="col-sm-2 col-form-label"
                >
                  Email PIC
                </label>
                <div className="col-sm-10">
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
              </div>

              <div className="form-group row">
                <div className="row align-items-right mt-5 ml-auto">
                  <div className="col-sm mr-4">
                    <Link href="/partnership/manajemen-mitra">
                      <a className="btn btn-outline-primary btn-sm mr-3">
                        Kembali
                      </a>
                    </Link>
                    {/* <Link href="/partnership/manajemen-mitra"> */}
                    <button
                      type="submit"
                      className="btn btn-primary btn-sm"
                      // onClick={(e) => onSubmit(e)}
                    >
                      Simpan
                    </button>
                    {/* </Link> */}
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default TambahMitra;
