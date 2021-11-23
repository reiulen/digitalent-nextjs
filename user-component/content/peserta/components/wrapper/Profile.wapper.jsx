import React, { useState, useCallback, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import check from "../../../../../public/assets/media/logos/double.png";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import ReactCrop from "react-image-crop";
import { getDataPribadi } from "../../../../../redux/actions/pelatihan/function.actions";
import {
  Col,
  Card,
  Navbar,
  Nav,
  Container,
  Button,
  Row,
  Modal,
} from "react-bootstrap";
import style from "./style.module.css";
import axios from "axios";

const ProfileWrapper = ({
  propsEdit,
  propsViewProfile,
  funcViewEdit,
  funcViewProfile,
  token,
}) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { error: errorDataPribadi, dataPribadi } = useSelector(
    (state) => state.getDataPribadi
  );

  const [showUpdateGambar, setShowUpdateGambar] = useState(false);
  const [viewEdit, setViewEdit] = useState(propsEdit);
  const [viewProvile, setViewProfile] = useState(propsViewProfile);

  const generateImage = async (canvas, crop) => {
    if (!crop || !canvas) {
      return;
    }

    const base64Image = canvas.toDataURL("image/jpeg");

    const data = {
      foto: base64Image,
    };

    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    await axios
      .post(
        process.env.END_POINT_API_PELATIHAN + "api/v1/auth/update-foto",
        data,
        config
      )
      .then((res) => {
        setShowUpdateGambar(false);
        toast.success("Berhasil Update");
        dispatch(getDataPribadi(token));
      })
      .catch((err) => {
        console.log(err);
        toast.error("gagal");
      });

    // UNTUK DOWNLOAD GAMBAR
    // canvas.toBlob(
    //   (blob) => {
    //     const previewUrl = window.URL.createObjectURL(blob);

    //     const anchor = document.createElement("a");
    //     anchor.download = "cropPreview.png";
    //     anchor.href = URL.createObjectURL(blob);
    //     anchor.click();

    //     window.URL.revokeObjectURL(previewUrl);
    //   },
    //   "image/png",
    //   1
    // );
  };

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

  return (
    <>
      <Col md={12} className="mb-5">
        <Card>
          <Card.Body>
            <Row>
              <Col md={2} className="text-center d-flex justify-content-center">
                <figure
                  className="avatar item-rtl position-relative"
                  data-toggle="modal"
                  data-target="#exampleModalCenter"
                  style={{ width: "max-content" }}
                >
                  <img
                    alt=""
                    className={`${style.image_profile_wrapper} position-relative`}
                    src={`${
                      dataPribadi && dataPribadi.foto
                        ? dataPribadi.file_path + dataPribadi.foto
                        : "/assets/media/logos/default.png"
                    }`}
                    width={90}
                    height={90}
                    // objectFit="cover"
                  />
                  <div
                    className="position-absolute"
                    style={{ right: "10px" }}
                    onClick={() => setShowUpdateGambar(true)}
                  >
                    <label className={`circle-bottom ${style.btn_edit_triger}`}>
                      <i className="ri-pencil-fill text-white"></i>
                    </label>
                  </div>
                </figure>
              </Col>
              <Col md={8}>
                <div className="information">
                  <p className={`${style.name_profile_wrapper} my-0`}>
                    {dataPribadi ? dataPribadi.name || "-" : "-"}{" "}
                    {/* KEBUTUHAN SPRINT DEPAN */}
                    {
                      (dataPribadi?.handphone_verifikasi,
                      dataPribadi.email_verifikasi === true && (
                        <span>
                          <Button className={style.btnVerification}>
                            <div className="d-flex flex-row">
                              <div>
                                <Image src={check} alt="verification" />
                              </div>
                              <div>Terverifikasi</div>
                            </div>
                          </Button>
                        </span>
                      ))
                    }
                    {/* KEBUTUHAN SPRINT DEPAN */}
                  </p>

                  <p className={`${style.muted_profile_wrapper} my-0`}>
                    NIK : {dataPribadi ? dataPribadi.nik || "-" : "-"}
                  </p>
                  <p className={`${style.muted_profile_wrapper}`}>
                    Email : {dataPribadi ? dataPribadi.email || "-" : "-"}
                  </p>
                </div>
              </Col>
              <Col md={2}>
                <div className="button ml-auto">
                  {viewEdit !== true && (
                    <Button
                      className={`${style.button_profile_wrapper} rounded-xl btn-block`}
                      onClick={() => {
                        setViewEdit(!viewEdit);
                        funcViewEdit(!viewEdit);
                      }}
                    >
                      Ubah Data
                    </Button>
                  )}
                </div>
              </Col>
            </Row>
          </Card.Body>
          <Card.Footer className="bg-transparent border-0 px-2 pb-0 pt-2">
            <Navbar
              bg="transparent"
              variant="transparent"
              className={`pb-0 ${style.navbar_responsive}`}
            >
              <Container>
                <Nav className={`${style.navbar_profile_wrapper}`}>
                  <Nav.Link
                    className={`mr-9 ${
                      viewProvile === 1 && style.navbar_profile_active
                    }`}
                    onClick={() => {
                      funcViewProfile(1);
                      setViewProfile(1);
                    }}
                  >
                    Informasi Pribadi
                  </Nav.Link>
                  <Nav.Link
                    className={`mr-9 ${
                      viewProvile === 2 && style.navbar_profile_active
                    }`}
                    onClick={() => {
                      funcViewProfile(2);
                      setViewProfile(2);
                    }}
                  >
                    Alamat
                  </Nav.Link>
                  <Nav.Link
                    className={`mr-9 ${
                      viewProvile === 3 && style.navbar_profile_active
                    }`}
                    onClick={() => {
                      funcViewProfile(3);
                      setViewProfile(3);
                    }}
                  >
                    Pendidikan
                  </Nav.Link>
                  {/* <Nav.Link
                    className={`mr-9 ${
                      viewProvile === 4 && style.navbar_profile_active
                    }`}
                    onClick={() => {
                      funcViewProfile(4);
                      setViewProfile(4);
                    }}
                  >
                    Keterampilan
                  </Nav.Link> */}
                  <Nav.Link
                    className={`mr-9 ${
                      viewProvile === 5 && style.navbar_profile_active
                    }`}
                    onClick={() => {
                      funcViewProfile(5);
                      setViewProfile(5);
                    }}
                  >
                    Pekerjaan
                  </Nav.Link>
                </Nav>
              </Container>
            </Navbar>
          </Card.Footer>
        </Card>
      </Col>
      <Modal
        show={showUpdateGambar}
        onHide={() => setShowUpdateGambar(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title>Ganti Foto Profil</Modal.Title>
          <button
            type="button"
            className="close"
            onClick={() => setShowUpdateGambar(false)}
          >
            <i className="ri-close-fill" style={{ fontSize: "25px" }}></i>
          </button>
        </Modal.Header>
        <Modal.Body>
          <p>Foto</p>
          <div>
            {!completedCrop?.width || !completedCrop?.height ? (
              <Button
                className={`${style.button_profile_edit} rounded-xl `}
                onClick={() => {
                  document.getElementById("update-foto").click();
                }}
              >
                <i className="ri-upload-2-fill text-white"></i> Pilih Foto
              </Button>
            ) : (
              <Button
                className={`${style.button_profile_wrapper} rounded-xl `}
                onClick={() => {
                  document.getElementById("update-foto").click();
                }}
              >
                <i className="ri-pencil-fill text-primary"></i> Ubah Foto
              </Button>
            )}
            <input
              type="file"
              name="gambar"
              className="custom-file-input"
              id="update-foto"
              accept="image/*"
              style={{ display: "none" }}
              onChange={onSelectFile}
            />
          </div>

          <Row className="mt-5">
            <Col md={6}>
              <ReactCrop
                src={upImg}
                onImageLoaded={onLoad}
                crop={crop}
                onChange={(c) => setCrop(c)}
                onComplete={(c) => setCompletedCrop(c)}
              />
            </Col>
            <Col md={6}>
              {upImg && (
                <>
                  <p>Preview</p>
                  <canvas
                    ref={previewCanvasRef}
                    // Rounding is important so the canvas width and height matches/is a multiple for sharpness.
                    style={{
                      width: Math.round(completedCrop?.width ?? 0),
                      height: Math.round(completedCrop?.height ?? 0),
                      borderRadius: "50%",
                    }}
                  />
                </>
              )}
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => setShowUpdateGambar(false)}
            className={`${style.button_profile_batal} rounded-xl mr-3`}
          >
            Batal
          </Button>
          <Button
            disabled={!completedCrop?.width || !completedCrop?.height}
            onClick={() =>
              generateImage(previewCanvasRef.current, completedCrop)
            }
            className={`${style.button_profile_edit} rounded-xl`}
          >
            Simpan
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProfileWrapper;
