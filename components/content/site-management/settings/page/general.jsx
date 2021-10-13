import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Pagination from "react-js-pagination";
import PageWrapper from "../../../../wrapper/page.wrapper";
import { useDispatch, useSelector } from "react-redux";
import LoadingTable from "../../../../LoadingTable";
import IconEye from "../../../../assets/icon/Eye";
import IconPencil from "../../../../assets/icon/Pencil";
import IconDelete from "../../../../assets/icon/Delete";
import IconAdd from "../../../../assets/icon/Add";
import IconSearch from "../../../../assets/icon/Search";
import Image from "next/image";
import Swal from "sweetalert2";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const GeneralPage = ({ token }) => {
  let dispatch = useDispatch();
  const router = useRouter();

  const [imageLogo, setImageLogo] = useState("");
  const [caption, setCaption] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [imageLogoApi, setImageLogoApi] = useState("");
  const [imageLogoApiOld, setImageLogoApiOld] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  console.log("imageLogoApi", imageLogoApi);

  const [color, setColor] = useState([
    {
      name: "Primary",
      color: "",
    },
    {
      name: "Secondary",
      color: "",
    },
    {
      name: "Extras",
      color: "",
    },
  ]);
  const changeColor = (e, i) => {
    let _temp = [...color];

    _temp.map((items, idx) => {
      if (idx === i) {
        _temp[i].color = e.target.value;
      }
    });

    setColor(_temp);
  };

  const [formSocialMedia, setFormSocialMedia] = useState([
    {
      image_logo: "",
      name: "",
      link_social_media: "",
    },
  ]);


  console.log("formSocialMedia",formSocialMedia)

  const [formExternalLink, setFormExternalLink] = useState([
    {
      nama: "",
      link: "",
    },
  ]);

  // const [error, setError] = useState({
  //   imageLogo: "",
  //   caption: "",
  //   description: "",
  // });

  const submit = (e) => {
    e.preventDefault();

    if (imageLogo === "") {
      Swal.fire("Gagal simpan", "Form image logo tidak boleh kosong", "error");
    } else if (caption === "") {
      Swal.fire("Gagal simpan", "Form caption tidak boleh kosong", "error");
    } else if (description === "") {
      Swal.fire("Gagal simpan", "Form caption tidak boleh kosong", "error");
    } else {
      Swal.fire({
        title: "Apakah anda yakin simpan ?",
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
          // let formData = new FormData();
          // formData.append("name", lembaga);
          // formData.append("email", email);
          // formData.append("password", password);
          // formData.append("password_confirmation", confirmPassword);

          // dispatch(mitraRegister(formData));

          const sendData = {
            alamat: address,
            external_link: formExternalLink,
            logo: {
              image_logo: imageLogo,
              caption: caption,
              description: description,
            },
            social_media: formSocialMedia,
            color: color,
          };

          try {
            let { data } = await axios.post(
              `${process.env.END_POINT_API_SITE_MANAGEMENT}api/setting/general/store`,
              sendData,
              {
                headers: {
                  authorization: `Bearer ${token}`,
                },
              }
            );

            console.log("data berhasil", data);

            Swal.fire("Berhasil", "Data berhasil disimpan", "succes");
          } catch (error) {
            console.log(error);
            Swal.fire(
              "Gagal simpan",
              `${error.response.data.message}`,
              "error"
            );
          }
        }
      });
    }
  };

  const addExternalLink = () => {
    let _temp = [...formExternalLink];
    _temp.push({ nama: "", link: "" });
    setFormExternalLink(_temp);
  };

  const removeExternalLink = (index) => {
    let _temp = [...formExternalLink];
    let data = _temp.filter((items, idx) => idx !== index);
    setFormExternalLink(data);
  };

  const handleChangeNameExternal = (e, index) => {
    let _temp = [...formExternalLink];
    _temp.map((items, idx) => {
      if (idx === index) {
        _temp[index].nama = e.target.value;
      }
    });
    setFormExternalLink(_temp);
  };
  const handleChangeLinkExternal = (e, index) => {
    let _temp = [...formExternalLink];
    _temp.map((items, idx) => {
      if (idx === index) {
        _temp[index].link = e.target.value;
      }
    });
    setFormExternalLink(_temp);
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

  // const [NamePDF, setNamePDF] = useState(null);
  // const fileType = ["image/png"];
  // const fileTypeJpeg = ["image/jpeg"];
  const fileMax = 2097152;
  const onChangeImage = (e) => {
    if (imageLogoApi) {
      setImageLogoApi("");
      let selectedFile = e.target.files[0];
      if (selectedFile) {
        if (selectedFile && selectedFile.size <= fileMax) {
          let reader = new FileReader();
          reader.readAsDataURL(selectedFile);
          reader.onloadend = (e) => {
            setImageLogo(e.target.result);
          };
        } else {
          notify("gambar harus PNG atau JPG dan max size 2mb");
        }
      } else {
        notify("upload gambar dulu");
      }
    } else {
      let selectedFile = e.target.files[0];
      if (selectedFile) {
        if (selectedFile && selectedFile.size <= fileMax) {
          let reader = new FileReader();
          reader.readAsDataURL(selectedFile);
          reader.onloadend = (e) => {
            setImageLogo(e.target.result);
          };
        } else {
          notify("gambar harus PNG atau JPG dan max size 2mb");
        }
      } else {
        notify("upload gambar dulu");
      }
    }
  };

  const removeImageLogo = () => {
    if (imageLogoApi) {
      setImageLogoApi("");
    } else {
      setImageLogo("");
      setImageLogoApi(imageLogoApiOld);
    }
  };

  const addSocialMedia = () => {
    let _temp = [...formSocialMedia];
    _temp.push({ image_logo: "", name: "", link_social_media: "" });
    setFormSocialMedia(_temp);
  };

  const removeSocialMedia = (index) => {
    let _temp = [...formSocialMedia];
    let data = _temp.filter((items, idx) => idx !== index);

    setFormSocialMedia(data);
  };

  const handleChangeNameSocial = (e, index) => {
    let _temp = [...formSocialMedia];
    _temp.map((items, idx) => {
      if (idx === index) {
        _temp[index].name = e.target.value;
      }
    });
    setFormSocialMedia(_temp);
  };
  const handleChangeLinkSocial = (e, index) => {
    let _temp = [...formSocialMedia];
    _temp.map((items, idx) => {
      if (idx === index) {
        _temp[index].link_social_media = e.target.value;
      }
    });
    setFormSocialMedia(_temp);
  };

  const [imageSocialTemp, setImageSocialTemp] = useState("");
  const handleChangeSocialMedia = (e, index) => {


    let selectedFile = e.target.files[0];

    let _temp = [...formSocialMedia];

    _temp.map((items, idx) => {
      if (idx === index) {
        if (selectedFile) {
          if (selectedFile && selectedFile.size <= fileMax) {
            let reader = new FileReader();
            reader.readAsDataURL(selectedFile);
            reader.onloadend = (e) => {
              setImageSocialTemp(e.target.result);
              _temp[index].image_logo = e.target.result;
              setFormSocialMedia(_temp);
            };
          } else {
            notify("gambar harus PNG atau JPG dan max size 2mb");
          }
        } else {
          notify("upload gambar dulu");
        }
      }
    });



  };

  const handleRemoveImageSocial = (index) => {
    let _temp = [...formSocialMedia];
    _temp.map((items, idx) => {
      if (idx === index) {
        _temp[index].image_logo = "";
      }
    });

    setFormSocialMedia(_temp);
  };

  useEffect(() => {
    async function getDataGeneral(token) {
      try {
        let { data } = await axios.get(
          `${process.env.END_POINT_API_SITE_MANAGEMENT}api/setting/general/get`,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("data geeneral", data);
        if (data) {
          setIsUpdate(true);
          setAddress(data.data.alamat);


          
          setFormSocialMedia(data.data.social_media);

          setFormExternalLink(data.data.external_link)
          setColor(data.data.color)
          setImageLogoApi(data.data.logo);
          setImageLogoApiOld(data.data.logo);
        }
      } catch (error) {
        console.log(
          "gagal mendapatkan data general",
          error.response.data.message
        );
      }
    }

    getDataGeneral(token);
  }, [token]);

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
      <div className="row">
        <div className="col-12 order-1">
          <div className="card card-custom card-stretch gutter-b">
            <div className="card-header border-0">
              <h3
                className="card-title font-weight-bolder text-dark border-bottom w-100 pb-5 mb-5 mt-5"
                style={{ fontSize: "24px" }}
              >
                General
              </h3>
            </div>
            <div className="card-body pt-0">
              <div>
                <form onSubmit={submit}>
                  <div className="row">
                    <div className="col-12 col-sm-3">
                      <div className="form-group">
                        <label className="mb-8" style={{ fontSize: "16px" }}>
                          Logo Digitalent Scholarship
                        </label>
                        <div>
                          <div className="image-input image-input-outline">
                            <div className="image-input-wrapper">
                              {imageLogoApi === ""
                                ? imageLogo && (
                                    <Image
                                      src={imageLogo}
                                      layout="fill"
                                      objectFit="fill"
                                      alt="imageLogo"
                                    />
                                  )
                                : imageLogoApi && (
                                    <Image
                                      src={`${process.env.END_POINT_API_IMAGE_SITE_MANAGEMENT}site-management/images/${imageLogoApi}`}
                                      layout="fill"
                                      objectFit="fill"
                                      alt="imageLogo"
                                    />
                                  )}
                            </div>

                            <label
                              className="btn btn-xs btn-icon btn-circle btn-white btn-hover-text-primary btn-shadow"
                              data-action="change"
                              data-toggle="tooltip"
                              title=""
                              data-original-title="Change avatar"
                            >
                              <i className="fa fa-pen icon-sm text-muted"></i>
                              <input
                                type="file"
                                name="profile_avatar"
                                accept=".png, .jpg, .jpeg .svg"
                                onChange={(e) => onChangeImage(e)}
                              />
                              <input
                                type="hidden"
                                name="profile_avatar_remove"
                              />
                            </label>

                            <span
                              className="btn btn-xs btn-icon btn-circle btn-white btn-hover-text-primary btn-shadow"
                              data-action="cancel"
                              data-toggle="tooltip"
                              title="Cancel avatar"
                            >
                              <i className="ki ki-bold-close icon-xs text-muted"></i>
                            </span>

                            <span
                              className="btn btn-xs btn-icon btn-circle btn-white btn-hover-text-primary btn-shadow"
                              data-action="remove"
                              data-toggle="tooltip"
                            >
                              <i
                                className="ki ki-bold-close icon-xs text-muted"
                                onClick={() => removeImageLogo()}
                              ></i>
                            </span>
                          </div>
                          <span className="form-text text-muted mt-6">
                            (Maksimal ukuran file 5 MB)
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-sm-9">
                      <div className="h-100 d-flex align-items-center">
                        <div className="form-group w-100">
                          <label>Caption :</label>
                          <input
                            onChange={(e) => setCaption(e.target.value)}
                            type="text"
                            className="form-control"
                            placeholder="Lalaracing@gmail.com"
                          />
                          {/* <span className="form-text text-muted">
                            Please enter your full name
                          </span> */}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Desciption:</label>
                    <input
                      onChange={(e) => setDescription(e.target.value)}
                      type="text"
                      className="form-control"
                      placeholder="Lalaracing@gmail.com"
                    />
                    <span className="form-text text-muted">
                      Please enter your full name
                    </span>
                  </div>

                  {/* start social media */}
                  <div className="mt-10">
                    <h4 className="fw-600 fz-20">Social Media</h4>
                    <label className="mb-8" style={{ fontSize: "16px" }}>
                      Logo Social Media
                    </label>
                    {formSocialMedia?.map((items, index) => {
                      return (
                        <div className="mt-6" key={index}>
                          <div className="form-group">
                            <div>
                              <div className="image-input image-input-outline">
                                <div className="image-input-wrapper">

                                  {isUpdate && (/\.(gif|jpe?g|tiff?|png|webp|bmp)$/i).test(items.image_logo)
                                    ? items.image_logo && (
                                        <Image
                                          src={`${process.env.END_POINT_API_IMAGE_SITE_MANAGEMENT}site-management/images/${items.image_logo}`}
                                          layout="fill"
                                          objectFit="fill"
                                          alt="imageLogo"
                                        />
                                      )
                                    : items.image_logo && (
                                        <Image
                                          src={items.image_logo}
                                          layout="fill"
                                          objectFit="fill"
                                          alt="imageLogo"
                                        />
                                      )}
                                </div>

                                <label
                                  className="btn btn-xs btn-icon btn-circle btn-white btn-hover-text-primary btn-shadow"
                                  data-action="change"
                                  data-toggle="tooltip"
                                  title=""
                                  data-original-title="Change avatar"
                                >
                                  <i className="fa fa-pen icon-sm text-muted"></i>
                                  <input
                                    type="file"
                                    name="profile_avatar"
                                    accept=".png, .jpg, .jpeg"
                                    onChange={(e) =>
                                      handleChangeSocialMedia(e, index)
                                    }
                                  />
                                  <input
                                    type="hidden"
                                    name="profile_avatar_remove"
                                  />
                                </label>

                                <span
                                  className="btn btn-xs btn-icon btn-circle btn-white btn-hover-text-primary btn-shadow"
                                  data-action="cancel"
                                  data-toggle="tooltip"
                                  title="Cancel avatar"
                                >
                                  <i className="ki ki-bold-close icon-xs text-muted"></i>
                                </span>

                                <span
                                  className="btn btn-xs btn-icon btn-circle btn-white btn-hover-text-primary btn-shadow"
                                  data-action="remove"
                                  data-toggle="tooltip"
                                  onClick={() => handleRemoveImageSocial(index)}
                                >
                                  <i className="ki ki-bold-close icon-xs text-muted"></i>
                                </span>
                              </div>
                              <span className="form-text text-muted mt-6">
                                (Maksimal ukuran file 5 MB)
                              </span>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-12 col-md-6">
                              <div className="form-group">
                                <label>Nama Social Media</label>
                                <input
                                  value={items.name}
                                  type="text"
                                  onChange={(e) =>
                                    handleChangeNameSocial(e, index)
                                  }
                                  className="form-control"
                                  placeholder="Lalaracing@gmail.com"
                                />
                                {/* <span className="form-text text-muted">
                                  Please enter your full name
                                </span> */}
                              </div>
                            </div>
                            <div className="col-12 col-md-6">
                              <div className="row">
                                <div className="col-12 col-md-9">
                                  <div className="form-group">
                                    <label htmlFor="exampleSelect1">
                                      Link Social Media
                                    </label>
                                    <input
                                      value={items.link_social_media}
                                      type="text"
                                      onChange={(e) =>
                                        handleChangeLinkSocial(e, index)
                                      }
                                      className="form-control"
                                      placeholder="Lalaracing@gmail.com"
                                    />
                                    {/* <span className="form-text text-muted">
                                      Please enter your full name
                                    </span> */}
                                  </div>
                                </div>

                                {index === 0 ? (
                                  ""
                                ) : (
                                  <div className="col-12 col-md-3">
                                    <div className="d-flex align-items-center h-100">
                                      <button
                                        type="button"
                                        onClick={() => removeSocialMedia(index)}
                                        className="btn mb-4"
                                        style={{ backgroundColor: "#EE2D41" }}
                                      >
                                        <svg
                                          className="position-relative"
                                          style={{ bottom: "2px" }}
                                          xmlns="http://www.w3.org/2000/svg"
                                          viewBox="0 0 24 24"
                                          width="24"
                                          height="24"
                                        >
                                          <path fill="none" d="M0 0h24v24H0z" />
                                          <path
                                            d="M17 6h5v2h-2v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8H2V6h5V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3zm1 2H6v12h12V8zm-9 3h2v6H9v-6zm4 0h2v6h-2v-6zM9 4v2h6V4H9z"
                                            fill="#ffffff"
                                          />
                                        </svg>
                                      </button>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    <div className="form-group row">
                      <div className="col-sm-12 d-flex justify-content-end">
                        <button
                          type="button"
                          className="btn btn-rounded-full bg-blue-secondary text-white"
                          onClick={() => addSocialMedia()}
                        >
                          <IconAdd className="mr-3" width="14" height="14" />
                          Tambah Social Media
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* end social media */}

                  {/* start External Links */}
                  <div className="mt-10">
                    <h4 className="fw-600 fz-20">External Links</h4>

                    {formExternalLink.map((items, index) => {
                      return (
                        <div key={index}>
                          <div className="row">
                            <div className="col-12 col-md-6">
                              <div className="form-group">
                                <label>Nama External Links</label>
                                <input
                                  onChange={(e) =>
                                    handleChangeNameExternal(e, index)
                                  }
                                  type="text"
                                  value={items.nama}
                                  className="form-control"
                                  placeholder="Lalaracing@gmail.com"
                                />
                                {/* <span className="form-text text-muted">
                                  Please enter your full name
                                </span> */}
                              </div>
                            </div>
                            <div className="col-12 col-md-6">
                              <div className="row">
                                <div className="col-12 col-md-9">
                                  <div className="form-group">
                                    <label htmlFor="exampleSelect1">
                                      Link External Links
                                    </label>
                                    <input
                                      onChange={(e) =>
                                        handleChangeLinkExternal(e, index)
                                      }
                                      type="text"
                                      value={items.link}
                                      className="form-control"
                                      placeholder="Lalaracing@gmail.com"
                                    />
                                    {/* <span className="form-text text-muted">
                                      Please enter your full name
                                    </span> */}
                                  </div>
                                </div>

                                {index === 0 ? (
                                  ""
                                ) : (
                                  <div className="col-12 col-md-3">
                                    <div className="d-flex align-items-center h-100">
                                      <button
                                        type="button"
                                        onClick={() =>
                                          removeExternalLink(index)
                                        }
                                        className="btn mb-4"
                                        style={{ backgroundColor: "#EE2D41" }}
                                      >
                                        <svg
                                          className="position-relative"
                                          style={{ bottom: "2px" }}
                                          xmlns="http://www.w3.org/2000/svg"
                                          viewBox="0 0 24 24"
                                          width="24"
                                          height="24"
                                        >
                                          <path fill="none" d="M0 0h24v24H0z" />
                                          <path
                                            d="M17 6h5v2h-2v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8H2V6h5V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3zm1 2H6v12h12V8zm-9 3h2v6H9v-6zm4 0h2v6h-2v-6zM9 4v2h6V4H9z"
                                            fill="#ffffff"
                                          />
                                        </svg>
                                      </button>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}

                    <div className="form-group row">
                      <div className="col-sm-12 d-flex justify-content-end">
                        <button
                          className="btn btn-rounded-full bg-blue-secondary text-white"
                          onClick={() => addExternalLink()}
                        >
                          <IconAdd className="mr-3" width="14" height="14" />
                          Tambah External Links
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* end External Links */}

                  {/* start Alamat */}
                  <div className="mt-10">
                    <h4 className="fw-600 fz-20">Alamat</h4>
                    <div className="form-group">
                      <label>Alamat Lengkap</label>
                      <textarea
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Kementrian Komunikasi dan Informatika RI JL. Medan Merdeka Barat No.9 Jakarta Pusat, 10110"
                        className="form-control"
                        name=""
                        id=""
                        cols="30"
                        rows="10"
                      ></textarea>
                      {/* <span className="form-text text-muted">
                        Please enter your full name
                      </span> */}
                    </div>
                  </div>
                  {/* end Alamat */}

                  {/* start Color Schemes */}
                  <div className="mt-10">
                    <h4 className="fw-600 fz-20">Color Schemes</h4>
                    {color.map((items, index) => {
                      return (
                        <div className="form-group" key={index}>
                          <label>{items.name}</label>
                          <div className="position-relative">
                            <input
                              value={items.color}
                              type="text"
                              className="form-control pl-16"
                              placeholder="Lalaracing@gmail.com"
                              onChange={(e) => changeColor(e, index)}
                            />
                            <div
                              className="left-center-absolute"
                              style={{
                                backgroundColor: items.color,
                                height: "20px",
                                width: "20px",
                                left: "1rem",
                              }}
                            ></div>
                          </div>
                          {/* <span className="form-text text-muted">
                            Please enter your full name
                          </span> */}
                        </div>
                      );
                    })}
                  </div>
                  {/* end Alamat */}

                  {/* start footer btn */}
                  <div className="form-group row mt-10">
                    <div className="col-sm-12 d-flex justify-content-end">
                      <button
                        type="submit"
                        className="btn btn-sm btn-rounded-full bg-blue-primary text-white"
                      >
                        Simpan
                      </button>
                    </div>
                  </div>
                  {/* end footer btn */}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default GeneralPage;
