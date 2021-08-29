import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import PageWrapper from "../../../wrapper/page.wrapper";
import Image from "next/image";

import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { getProvinces,cancelChangeProvinces } from "../../../../redux/actions/partnership/mitra.actions";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditMitra = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const allMitra = useSelector((state) => state.allMitra);
  console.log("allMitra",allMitra.provinces.length)

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
  const [defaultValueProvinceID, setDefaultValueProvinceID] = useState("")
  const [defaultValueCitieID, setDefaultValueCitieID] = useState("")

  const [imageview, setImageview] = useState("")

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

  const setDataSingle = async (id) => {
    try {
      let { data } = await axios.get(
        `${process.env.END_POINT_API_PARTNERSHIP}/api/partners/${id}`
      );
      console.log(data);
      setInstitution_name(data.data.institution_name);
      
      setEmail(data.data.email);
      // tambah url logo
      setImageview(data.data.agency_logo);
      setWesite(data.data.website);
      setAddress(data.data.alamat);


      setIndonesia_provinces_id(data.data.province.id);
      setDefaultValueProvince(data.data.province.name)
      setDefaultValueProvinceID(data.data.province.id)

      setIndonesia_cities_id(data.data.city.id);
      setDefaultValueCitie(data.data.city.name)
      setDefaultValueCitieID(data.data.city.id)



      setPostal_code(data.data.postal_code);
      setPic_name(data.data.pic_name);
      setPic_contact_number(data.data.pic_contact_number);
      setPic_email(data.data.pic_email);
    } catch (error) {
      console.log("action getSIngle gagal", error);
    }
  };

  const [defaultValueProvince, setDefaultValueProvince] = useState("")
  const [defaultValueCitie, setDefaultValueCitie] = useState("")
  const changeProvinces = (value) =>{
    setIndonesia_provinces_id(value)
    setStatuLoadCities(statuLoadCities?false:true)
  }

  const cancelProvincesChange = () =>{
    setCitiesAll([]);
    dispatch(cancelChangeProvinces())
    setIndonesia_cities_id(defaultValueCitieID)
    setIndonesia_provinces_id(defaultValueProvinceID)
  }
  const [statuLoadCities, setStatuLoadCities] = useState(false)
  const changeValueProvinces = () =>{
    setIndonesia_cities_id("")
    setIndonesia_provinces_id("")
    setStatuLoadCities(true)
    dispatch(getProvinces())
  }

  const [showImage, setShowImage] = useState(false)

  const hideImage = () =>{
      setShowImage(showImage?false:true)
  }


  const [NamePDF, setNamePDF] = useState(null);
  const fileType = ["image/png"];
  const fileTypeJpeg = ["image/jpeg"];
  const fileMax = 2097152;
  const onChangeImage = (e) => {
    let selectedFile = e.target.files[0];
      
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
  }

   const handleSubmit = async() => {
    // e.preventDefault();
    // if (agency_logo === "") {
    //   setError({ ...error, agency_logo: "Harus isi gambar logo dengan format png" });
    //   notify("Harus isi gambar logo dengan format png");
    // } else
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
    } else if (postal_code === "" || postal_code.length < 5 || postal_code.length > 5) {
      setError({ ...error, postal_code: "Harus isi kode pos minimal dan maksimal 5 karakter" });
      notify("Harus isi kode pos minimal dan maksimal 5 karakter");
    } else if (pic_name === "") {
      setError({ ...error, pic_name: "Harus isi nama PIC" });
      notify("Harus isi nama PIC");
    } else if (pic_contact_number === "" || pic_contact_number.length < 9) {
      setError({ ...error, pic_contact_number: "Harus isi No. Kontak PIC dan minimal 9 karakter" });
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
      }).then(async(result) => {
        if (result.value) {
          let formData = new FormData();
          // formData.append("email", email);
          if(agency_logo===""){
            console.log("tidak update gambar")
          }else{
            formData.append("agency_logo", agency_logo);
          }
          formData.append("_method", "PUT");
          formData.append("institution_name", institution_name);
          formData.append("website", website);
          formData.append("address", address);

          if(allMitra.provinces.length === 0){
            
            formData.append("indonesia_provinces_id", defaultValueProvinceID);
            formData.append("indonesia_cities_id", defaultValueCitieID);
          }else{
            formData.append("indonesia_provinces_id", indonesia_provinces_id);
            formData.append("indonesia_cities_id", indonesia_cities_id);
            

          }



          formData.append("postal_code", postal_code);
          formData.append("pic_name", pic_name);
          formData.append("pic_contact_number", pic_contact_number);
          formData.append("pic_email", pic_email);

          try {
            let { data } = await axios.post(
              `${process.env.END_POINT_API_PARTNERSHIP}/api/partners/${router.query.id}`,
              formData
            );
          //   router.push({
          //   pathname: '/partnership/manajemen-mitra',
          //   query: { success:true  },
          // })
//           Swal.fire(
//   'Berhasil update data!',
//   'success'
// )
router.push({
              pathname: "/partnership/manajemen-mitra",
              query: { update: true },
            },undefined, { shallow: true });

          } catch (error) {
            console.log(error.response.data.message)
            notify(error.response.data.message)
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

    const cancelChangeImage = () =>{
      setAgency_logo("")
      setNamePDF(null)
    }

  useEffect(() => {
    setDataSingle(router.query.id);
  }, [router.query.id]);

  useEffect( () => {
    if(indonesia_provinces_id === ""){
      return;
    }else{
      async function fetchAPI(){
        try {
          let { data } = await axios.get(
            `${process.env.END_POINT_API_PARTNERSHIP}/api/option/cities/${indonesia_provinces_id}`
          );
          setCitiesAll(data.data);
        } catch (error) {
          console.log("gagal get cities", error);
        }
      }
      fetchAPI()
    }
      
  }, [statuLoadCities,indonesia_provinces_id]);

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
            <h3 className="card-title font-weight-bolder text-dark">
              Edit Mitra
            </h3>
          </div>
          <div className="card-body">
            <form>
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
                        accept="image/png,image/jpg"
                        // onChange={onChangeGambar}
                      />
                      <label className="custom-file-label" htmlFor="inputGroupFile04">
                        {NamePDF ? NamePDF : "Unggah gambar baru" }
                      </label>
                    </div>
                  </div>
                  {!NamePDF ?
                  <div className="border my-3">
                <Image
                                      unoptimized={
                                        process.env.ENVIRONMENT !== "PRODUCTION"
                                      }
                                      src={
                                        process.env
                                          .END_POINT_API_IMAGE_PARTNERSHIP +
                                        "partnership/images/profile-images/" +
                                        imageview
                                      }
                                      width={500} 
                                      height={500}
                                      alt="logo"
                                    />
                                    </div>
                                    :""}
                  <div className="flex items-center">

                  {NamePDF?<button className="btn btn-primary btn-sm my-3 mr-3" type="button" onClick={()=>hideImage()}>{showImage?"Tutup":"Buka"}</button>:""}

                  {agency_logo
                  
                  ?

                  <button className="btn btn-primary btn-sm my-3" type="button" onClick={()=>cancelChangeImage()}>
                    {/* {showImage?"Tutup":"Buka"} */}
                    Batal ubah gambar menjadi default
                  </button>
                  
                  :""}

                  </div>
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
                    value={institution_name}
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
                  Email (read only)
                </label>
                <div className="col-sm-10">
                  <input
                    onFocus={() => setError({ ...error, email: "" })}
                    type="email"
                    readOnly
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

              <div className="form-group row">
                <label
                  htmlFor="staticEmail"
                  className="col-sm-2 col-form-label"
                >
                  Website
                </label>
                <div className="col-sm-10">
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
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
              </div>

              {allMitra.provinces.length === 0 ? (
                <div className="form-group row">
                  <label
                    htmlFor="staticEmail"
                    className="col-sm-2 col-form-label"
                  >
                    Provinsi
                  </label>
                  <div className="col-7">
                    <select onFocus={() => setError({ ...error, indonesia_provinces_id: "" })} className="form-control" disabled>
                      <option value={indonesia_provinces_id}>{defaultValueProvince}</option>
                    </select>
                  </div>
                  <button
                    type="button"
                    className="col-sm-3 btn btn-primary btn-sm"
                    onClick={() => changeValueProvinces() }
                  >
                    Ubah Provinsi
                  </button>
                  {error.indonesia_provinces_id ? (
                    <p className="error-text">{error.indonesia_provinces_id}</p>
                  ) : (
                    ""
                  )}
                </div>
              ) : (
                <div className="form-group row">
                  <label
                    htmlFor="staticEmail"
                    className="col-sm-2 col-form-label"
                  >
                    Provinsi
                  </label>
                  <div className="col-7">
                    <select onFocus={() => setError({ ...error, indonesia_provinces_id: "" })} className="form-control" onChange={(e)=>changeProvinces(e.target.value)}>
                      <option value={defaultValueProvinceID}>Pilih data provinsi</option>
                      {allMitra.provinces.length === 0 ?"": allMitra.provinces.data.map((itemss,index)=>{
                        return(
                          <option key={index} value={itemss.id}>{itemss.name}</option>
                        )
                      })}
                    </select>
                  </div>
                  <button
                    type="button"
                    className="col-sm-3 btn btn-primary btn-sm"
                    onClick={() => cancelProvincesChange()}
                  >
                    Batal Ubah Provinsi
                  </button>
                  {error.indonesia_provinces_id ? (
                    <p className="error-text">{error.indonesia_provinces_id}</p>
                  ) : (
                    ""
                  )}
                </div>
              )}
{allMitra.provinces.length === 0 ? <div className="form-group row">
                <label
                  htmlFor="staticEmail"
                  className="col-sm-2 col-form-label"
                >
                  Kota / Kabupaten
                </label>
                <div className="col-sm-10">
                  <select
                  onFocus={() => setError({ ...error, indonesia_cities_id: "" })}
                  disabled
                    className="form-control"
                  >
                    <option value={indonesia_cities_id}>{defaultValueCitie}</option>
                  </select>
                </div>
                {error.indonesia_cities_id ? (
                    <p className="error-text">{error.indonesia_cities_id}</p>
                  ) : (
                    ""
                  )}
              </div> : 
              <div className="form-group row">
                <label
                  htmlFor="staticEmail"
                  className="col-sm-2 col-form-label"
                >
                  Kota / Kabupaten
                </label>
                <div className="col-sm-10">
                  <select
                  onFocus={() => setError({ ...error, indonesia_cities_id: "" })}
                    className="form-control"
                    onChange={(e) => setIndonesia_cities_id(e.target.value)}
                    // onBlur={(e) => setKotaKabupaten(e.target.value)}
                  >
                    <option value={defaultValueCitieID}>Pilih data Kab/Kota</option>

                    {citiesAll.map((itemsss,index)=>{
                      return(
                        <option key={index} value={itemsss.id}>{itemsss.name}</option>
                      )
                    })}
                  </select>
                </div>
                {error.indonesia_cities_id ? (
                    <p className="error-text">{error.indonesia_cities_id}</p>
                  ) : (
                    ""
                  )}
              </div>
              }

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
                    onChange={(e)=>setPic_name(e.target.value)}
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
                    value={pic_email}
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
                    type="button"
                      className="btn btn-primary btn-sm"
                      onClick={(e) => handleSubmit(e)}
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

export default EditMitra;
