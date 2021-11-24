import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import PageWrapper from "../../../../wrapper/page.wrapper";
import IconAdd from "../../../../assets/icon/Add";
import Image from "next/image";
import Swal from "sweetalert2";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SimpleReactValidator from "simple-react-validator";

import styles from "../../../../../styles/previewGaleri.module.css";
import styles2 from "../../../../../styles/sitemanagement/userMitra.module.css";
import { set } from "lodash";

const GeneralPage = ({ token }) => {
  const router = useRouter();

  const [imageLogo, setImageLogo] = useState("");
  const [imageLogo2, setImageLogo2] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [imageLogoApi, setImageLogoApi] = useState("");
  const [imageLogoApi2, setImageLogoApi2] = useState("");
  const [imageLogoApiOld, setImageLogoApiOld] = useState("");
  const [imageLogoApiOld2, setImageLogoApiOld2] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);

  const simpleValidator = useRef(new SimpleReactValidator({ locale: "id" }));
  const [, forceUpdate] = useState();

  const [colorPrimary, setColorPrimary] = useState(null)
  const [colorSecondary, setColorSecondary] = useState(null)
  const [colorExtras, setColorExtras] = useState(null)

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
  const [formExternalLink, setFormExternalLink] = useState([
    {
      name: "",
      link: "",
    },
  ]);

  const submit = (e) => {
    e.preventDefault();
    if (simpleValidator.current.allValid()) {

      if (description === "") {
        Swal.fire("Oops !", "Form description tidak boleh kosong", "error");
      } else {
        Swal.fire({
          title: "Apakah anda yakin simpan ?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          cancelButtonText: "Batal",
          confirmButtonText: "Ya !",
          dismissOnDestroy: false,
        }).then(async (result) => {
          if (result.value) {
            const sendData = {
              logo: {
                header_logo: !imageLogo ? imageLogoApi : imageLogo,
                footer_logo: !imageLogo2 ? imageLogoApi2 : imageLogo2,
              },
              logo_description: description,
              social_media: formSocialMedia,
              external_link: formExternalLink,
              alamat: address,
              color: [
                {
                  name: "Primary",
                  color: colorPrimary,
                },
                {
                  name: "Secondary",
                  color: colorSecondary,
                },
                {
                  name: "Extras",
                  color: colorExtras,
                },
              ],
            };

            try {
              const { data } = await axios.post(
                `${process.env.END_POINT_API_SITE_MANAGEMENT}api/setting/general/store`,
                sendData,
                {
                  headers: {
                    authorization: `Bearer ${token}`,
                  },
                }
              );
              Swal.fire("Berhasil", "Berhasil simpan data", "success");
              window.location.reload()
            } catch (error) {
              Swal.fire(
                "Oops !",
                `${error.response.data.message}`,
                "error"
              );
            }
          }
        });
      }
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

  const addExternalLink = () => {
    let _temp = [...formExternalLink];

    if (_temp.length > 20) {
      Swal.fire(
        "Oops !",
        `Data external link tidak boleh lebih dari 20`,
        "error"
      );
    } else {
      _temp.push({ name: "", link: "" });
      setFormExternalLink(_temp);
    }
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
        _temp[index].name = e.target.value;
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

  const fileMax2 = 5000000;
  const onChangeImage = (e) => {
    if (imageLogoApi) {
      setImageLogoApi("");
      let selectedFile = e.target.files[0];
      if (selectedFile) {
        if (selectedFile && selectedFile.size <= fileMax2) {
          let reader = new FileReader();
          reader.readAsDataURL(selectedFile);
          reader.onloadend = (e) => {
            setImageLogo(e.target.result);
          };
        } else {
          Swal.fire("Oops !", "Gambar harus PNG atau JPG dan max size 5MB", "error");
        }
      } else {
        Swal.fire("Oops !", "Upload Gambar Dulu", "error");
      }
    } else {
      let selectedFile = e.target.files[0];
      if (selectedFile) {
        if (selectedFile && selectedFile.size <= fileMax2) {
          let reader = new FileReader();
          reader.readAsDataURL(selectedFile);
          reader.onloadend = (e) => {
            setImageLogo(e.target.result);
          };
        } else {
          Swal.fire("Oops !", "Gambar harus PNG atau JPG dan max size 5MB", "error");
        }
      } else {
        Swal.fire("Oops !", "Upload Gambar Dulu", "error");
      }
    }
  };
  const onChangeImage2 = (e) => {
    if (imageLogoApi2) {
      setImageLogoApi2("");
      let selectedFile = e.target.files[0];
      if (selectedFile) {
        if (selectedFile && selectedFile.size <= fileMax2) {
          let reader = new FileReader();
          reader.readAsDataURL(selectedFile);
          reader.onloadend = (e) => {
            setImageLogo2(e.target.result);
          };
        } else {
          Swal.fire("Oops !", "Gambar harus PNG atau JPG dan max size 5MB", "error");
        }
      } else {
        Swal.fire("Oops !", "Upload Gambar Dulu", "error");
      }
    } else {
      let selectedFile = e.target.files[0];
      if (selectedFile) {
        if (selectedFile && selectedFile.size <= fileMax2) {
          let reader = new FileReader();
          reader.readAsDataURL(selectedFile);
          reader.onloadend = (e) => {
            setImageLogo2(e.target.result);
          };
        } else {
          Swal.fire("Oops !", "Gambar harus PNG atau JPG dan max size 5MB", "error");
        }
      } else {
        Swal.fire("Oops !", "Upload Gambar Dulu", "error");
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
  const removeImageLogo2 = () => {
    if (imageLogoApi2) {
      setImageLogoApi2("");
    } else {
      setImageLogo2("");
      setImageLogoApi2(imageLogoApiOld2);
    }
  };

  const addSocialMedia = () => {
    let _temp = [...formSocialMedia];

    if (_temp.length > 5) {
      Swal.fire(
        "Oops !",
        `Data social media tidak boleh lebih dari 6`,
        "error"
      );
    } else {
      _temp.push({ image_logo: "", name: "", link_social_media: "" });
      setFormSocialMedia(_temp);
    }
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
          if (selectedFile && selectedFile.size <= fileMax2) {
            let reader = new FileReader();
            reader.readAsDataURL(selectedFile);
            reader.onloadend = (e) => {
              setImageSocialTemp(e.target.result);
              _temp[index].image_logo = e.target.result;
              setFormSocialMedia(_temp);
            };
          } else {
            Swal.fire("Oops !", "Gambar harus PNG atau JPG dan max size 5MB", "error");
          }
        } else {
          Swal.fire("Oops !", "Upload Gambar Dulu", "error");
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


        if (data) {
          setIsUpdate(true);
          setAddress(data.data.alamat);
          setColor(data.data.color);
          setFormExternalLink(data.data.external_link);
          setImageLogoApi(data.data.header_logo);
          setImageLogoApi2(data.data.footer_logo);
          setDescription(data.data.logo_description);
          setFormSocialMedia(data.data.social_media);
          setColorPrimary(data.data.color[0].color)
          setColorSecondary(data.data.color[1].color)
          setColorExtras(data.data.color[2].color)
        }
      } catch (error) {
        Swal.fire("Oops !", `${error.response.data.message}`, "error");
      }
    }
    getDataGeneral(token);
  }, [token]);


  return (
    <PageWrapper>
      <div className="row">
        <div className="col-12 order-1">
          <div className="card card-custom card-stretch gutter-b">
            <div className="card-header row border-0">
              <h3 className={`${styles.headTitle} col-12 col-sm-8 col-md-8 col-lg-8 col-xl-9`}>
                General
              </h3>
            </div>
            <div className="card-body">
              <div>
                <form>
                  <div className="d-flex flex-wrap">
                    <div className="form-group">
                      <label className="mb-8" style={{ fontSize: "16px" }}>
                        Logo Header
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
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              width="12"
                              height="12"
                            >
                              <path fill="none" d="M0 0h24v24H0z" />
                              <path
                                d="M12.9 6.858l4.242 4.243L7.242 21H3v-4.243l9.9-9.9zm1.414-1.414l2.121-2.122a1 1 0 0 1 1.414 0l2.829 2.829a1 1 0 0 1 0 1.414l-2.122 2.121-4.242-4.242z"
                                fill="rgba(108,108,108,1)"
                              />
                            </svg>
                            <input
                              type="file"
                              name="profile_avatar"
                              accept=".png, .jpg, .jpeg .svg"
                              onChange={(e) => onChangeImage(e)}
                              onBlur={() =>
                                simpleValidator.current.showMessageFor("logoHeader")
                              }
                            />

                            <input type="hidden" name="profile_avatar_remove" />
                          </label>

                          <span
                            className="btn btn-xs btn-icon btn-circle btn-white btn-hover-text-primary btn-shadow"
                            data-action="cancel"
                            data-toggle="tooltip"
                            title="Cancel avatar"
                          >
                            <i className="ki ki-bold-close icon-xs text-muted"></i>
                          </span>

                        </div>
                        <span className="form-text text-muted mt-6">
                          (Maksimal ukuran file 5 MB)
                        </span>

                        {simpleValidator.current.message(
                          "logoHeader",
                          imageLogoApi,
                          "required",
                          { className: "text-danger" }
                        )}
                      </div>
                    </div>

                    <div className="form-group ml-0 ml-sm-24">
                      <label className="mb-8" style={{ fontSize: "16px" }}>
                        Logo Footer
                      </label>
                      <div>
                        <div className="image-input image-input-outline">
                          <div className="image-input-wrapper">
                            {imageLogoApi2 === ""
                              ? imageLogo2 && (
                                <Image
                                  src={imageLogo2}
                                  layout="fill"
                                  objectFit="fill"
                                  alt="imageLogo"
                                />
                              )
                              : imageLogoApi2 && (
                                <Image
                                  src={`${process.env.END_POINT_API_IMAGE_SITE_MANAGEMENT}site-management/images/${imageLogoApi2}`}
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
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              width="12"
                              height="12"
                            >
                              <path fill="none" d="M0 0h24v24H0z" />
                              <path
                                d="M12.9 6.858l4.242 4.243L7.242 21H3v-4.243l9.9-9.9zm1.414-1.414l2.121-2.122a1 1 0 0 1 1.414 0l2.829 2.829a1 1 0 0 1 0 1.414l-2.122 2.121-4.242-4.242z"
                                fill="rgba(108,108,108,1)"
                              />
                            </svg>

                            <input
                              type="file"
                              name="profile_avatar"
                              accept=".png, .jpg, .jpeg .svg"
                              onChange={(e) => onChangeImage2(e)}
                              onBlur={() =>
                                simpleValidator.current.showMessageFor("logoFooter")
                              }
                            />
                            <input type="hidden" name="profile_avatar_remove" />
                          </label>

                          <span
                            className="btn btn-xs btn-icon btn-circle btn-white btn-hover-text-primary btn-shadow"
                            data-action="cancel"
                            data-toggle="tooltip"
                            title="Cancel avatar"
                          >
                            <i className="ki ki-bold-close icon-xs text-muted"></i>
                          </span>
                        </div>
                        <span className="form-text text-muted mt-6">
                          (Maksimal ukuran file 5 MB)
                        </span>

                        {simpleValidator.current.message(
                          "logoFooter",
                          imageLogoApi2,
                          "required",
                          { className: "text-danger" }
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Description:</label>
                    <input
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      type="text"
                      className="form-control"
                      placeholder="Digital talent Scholarship"
                      onBlur={() =>
                        simpleValidator.current.showMessageFor("description")
                      }
                    />

                    {simpleValidator.current.message(
                      "description",
                      description,
                      "required",
                      { className: "text-danger" }
                    )}
                  </div>

                  {/* start social media */}
                  <div className="mt-10">
                    <h4 className="fw-600 fz-20">Social Media</h4>
                    <label className="mb-6 mt-4" style={{ fontSize: "16px" }}>
                      Logo Social Media
                    </label>
                    {formSocialMedia?.map((items, index) => {
                      return (
                        <div className="mt-6" key={index}>
                          <div className="form-group">
                            <div>
                              <div className="image-input image-input-outline">
                                <div className="image-input-wrapper">
                                  {isUpdate &&
                                    /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i.test(
                                      items.image_logo
                                    )
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
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    width="12"
                                    height="12"
                                  >
                                    <path fill="none" d="M0 0h24v24H0z" />
                                    <path
                                      d="M12.9 6.858l4.242 4.243L7.242 21H3v-4.243l9.9-9.9zm1.414-1.414l2.121-2.122a1 1 0 0 1 1.414 0l2.829 2.829a1 1 0 0 1 0 1.414l-2.122 2.121-4.242-4.242z"
                                      fill="rgba(108,108,108,1)"
                                    />
                                  </svg>

                                  <input
                                    type="file"
                                    name="profile_avatar"
                                    accept=".png, .jpg, .jpeg"
                                    onChange={(e) =>
                                      handleChangeSocialMedia(e, index)
                                    }
                                    onBlur={() =>
                                      simpleValidator.current.showMessageFor("logoSocialMedia")
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
                              </div>
                              <span className="form-text text-muted mt-6">
                                (Maksimal ukuran file 5 MB)
                              </span>

                              {simpleValidator.current.message(
                                "logoSocialMedia",
                                items.image_logo,
                                "required",
                                { className: "text-danger" }
                              )}
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-12 col-md-5 col-xl-5">
                              <div className="form-group">
                                <label>Nama Social Media</label>
                                <input
                                  value={items.name}
                                  type="text"
                                  onChange={(e) =>
                                    handleChangeNameSocial(e, index)
                                  }
                                  className="form-control"
                                  placeholder="Masukkan Nama"
                                  onBlur={() =>
                                    simpleValidator.current.showMessageFor("namaSocialMedia")
                                  }
                                />

                                {simpleValidator.current.message(
                                  "namaSocialMedia",
                                  items.name,
                                  "required",
                                  { className: "text-danger" }
                                )}
                              </div>
                            </div>
                            <div className="col-12 col-md-6 col-xl-6">
                              <div className="row">
                                <div className="col-12 col-md-11">
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
                                      className="form-control pr-10"
                                      placeholder="Masukkan Link"
                                      onBlur={() =>
                                        simpleValidator.current.showMessageFor("link")
                                      }
                                    />

                                    {simpleValidator.current.message(
                                      "link",
                                      items.link_social_media,
                                      "required|url",
                                      { className: "text-danger" }
                                    )}
                                  </div>
                                </div>

                                {index === 0 ? (
                                  ""
                                ) : (
                                  <div className="col-12 col-md-1 col-xl-1">
                                    <div className="d-flex align-items-center h-100 justify-content-end ml-14 mb-8">
                                      <button
                                        type="button"
                                        onClick={() => removeSocialMedia(index)}
                                        className="btn"
                                        style={{ backgroundColor: "#EE2D41" }}
                                      >
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          viewBox="0 0 24 24"
                                          width="16"
                                          height="16"
                                        >
                                          <path fill="none" d="M0 0h24v24H0z" />
                                          <path
                                            d="M17 4h5v2h-2v15a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6H2V4h5V2h10v2zM9 9v8h2V9H9zm4 0v8h2V9h-2z"
                                            fill="rgba(255,255,255,1)"
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
                    <div className="form-group row mt-2">
                      <div className="col-sm-12 d-flex justify-content-end">
                        <button
                          type="button"
                          className={`${styles2.btnTambahContent} col-sm-12 col-md-4 col-lg-4 col-xl-3 btn btn-rounded-full bg-blue-secondary text-white d-block`}
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
                        <div className="mt-8" key={index}>
                          <div className="row">
                            <div className="col-12 col-md-5 col-xl-5">
                              <div className="form-group">
                                <label>Nama External Links</label>
                                <input
                                  onChange={(e) =>
                                    handleChangeNameExternal(e, index)
                                  }
                                  type="text"
                                  value={items.name}
                                  className="form-control"
                                  placeholder="Masukkan Nama"
                                  onBlur={() =>
                                    simpleValidator.current.showMessageFor("namaExternalLinks")
                                  }
                                />

                                {simpleValidator.current.message(
                                  "namaExternalLinks",
                                  items.name,
                                  "required",
                                  { className: "text-danger" }
                                )}
                              </div>
                            </div>
                            <div className="col-12 col-md-6 col-xl-6">
                              <div className="row">
                                <div className="col-12 col-md-11">
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
                                      className="form-control pr-10"
                                      placeholder="Masukkan Link"
                                      onBlur={() =>
                                        simpleValidator.current.showMessageFor("linkExternalLinks")
                                      }
                                    />

                                    {simpleValidator.current.message(
                                      "linkExternalLinks",
                                      items.link,
                                      "required|url",
                                      { className: "text-danger" }
                                    )}
                                  </div>
                                </div>

                                {index === 0 ? (
                                  ""
                                ) : (
                                  <div className="col-12 col-md-1 col-xl-1">
                                    <div className="d-flex align-items-center h-100 justify-content-end ml-14 mb-10">
                                      <button
                                        type="button"
                                        onClick={() =>
                                          removeExternalLink(index)
                                        }
                                        className="btn"
                                        style={{ backgroundColor: "#EE2D41" }}
                                      >
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          viewBox="0 0 24 24"
                                          width="16"
                                          height="16"
                                        >
                                          <path fill="none" d="M0 0h24v24H0z" />
                                          <path
                                            d="M17 4h5v2h-2v15a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6H2V4h5V2h10v2zM9 9v8h2V9H9zm4 0v8h2V9h-2z"
                                            fill="rgba(255,255,255,1)"
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
                          className={`${styles2.btnTambahContent} col-sm-12 col-md-4 col-lg-4 col-xl-3 btn btn-rounded-full bg-blue-secondary text-white d-block`}
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
                    <div className="form-group mt-6">
                      <label>Alamat Lengkap</label>
                      <textarea
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Masukkan alamat lengkap"
                        className="form-control"
                        name=""
                        id=""
                        cols="30"
                        rows="10"
                        onBlur={() =>
                          simpleValidator.current.showMessageFor("alamat")
                        }
                      ></textarea>

                      {simpleValidator.current.message(
                        "alamat",
                        address,
                        "required",
                        { className: "text-danger" }
                      )}
                    </div>
                  </div>
                  {/* end Alamat */}

                  {/* start Color Schemes */}
                  <div className="mt-10">
                    <h4 className="fw-600 fz-20">Color Schemes</h4>
                    <div>
                      <label className="mt-4">Primary</label>
                      <div className="mb-10">
                        <select
                          name=""
                          id=""
                          className={`${styles.selectKategori} form-control dropdownArt`}
                          onChange={(e) => setColorPrimary(e.target.value)}
                          value={colorPrimary}
                        >
                          <option value="1">primary</option>
                          <option value="2">secondary</option>
                          <option value="3">extras</option>
                        </select>
                      </div>

                      <label className="mt-4">Secondary</label>
                      <div className="mb-10">
                        <select
                          name=""
                          id=""
                          className={`${styles.selectKategori} form-control dropdownArt`}
                          onChange={(e) => setColorSecondary(e.target.value)}
                          value={colorSecondary}
                        >
                          <option value="1">primary</option>
                          <option value="2">secondary</option>
                          <option value="3">extras</option>
                        </select>
                      </div>

                      <label className="mt-4">Extras</label>
                      <div className="mb-10">
                        <select
                          name=""
                          id=""
                          className={`${styles.selectKategori} form-control dropdownArt`}
                          onChange={(e) => setColorExtras(e.target.value)}
                          value={colorExtras}
                        >
                          <option value="1">primary</option>
                          <option value="2">secondary</option>
                          <option value="3">extras</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  {/* end Alamat */}

                  {/* start footer btn */}
                  <div className="form-group row mt-10">
                    <div className="col-sm-12 d-flex justify-content-end">
                      <button
                        type="button"
                        className={`${styles2.btnTambahContent} btn btn-sm btn-rounded-full bg-blue-primary text-white`}
                        onClick={(e) => submit(e)}
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
