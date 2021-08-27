import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import SignaturePad from "react-signature-pad-wrapper";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";

import Swal from "sweetalert2";
import SimpleReactValidator from "simple-react-validator";

import {
  updateTandaTangan,
  clearErrors,
} from "../../../../redux/actions/partnership/tandaTangan.actions";
import { UPDATE_TANDA_TANGAN_RESET } from "../../../../redux/types/partnership/tandaTangan.type";
import PageWrapper from "../../../wrapper/page.wrapper";
import LoadingPage from "../../../LoadingPage";

const EditTandaTangan = () => {
  const signCanvas = useRef({});
  const dispatch = useDispatch();

  const clear = () => {
    signCanvas.current.clear();
    setSignature("");
  };

  const editorRef = useRef();
  const router = useRouter();

  // const SwitchButton = dynamic(importSwitch, {
  //   ssr: false,
  // });
  const simpleValidator = useRef(new SimpleReactValidator({ locale: "id" }));

  const { detailTandaTangan } = useSelector((state) => state.detailTandaTangan);
  const { error, isUpdated, success } = useSelector(
    (state) => state.updateTandaTangan
  );

  useEffect(() => {
    // setEditorLoaded(true);
    if (isUpdated) {
      router.push({
        pathname: `/partnership/tanda-tangan`,
        query: { success: true },
      });
    }
  }, [dispatch,router, error, isUpdated, simpleValidator]);

  // const storageAPI = process.env.END_POINT_API_IMAGE_PARTNERSHIP;

  const [name, setName] = useState(detailTandaTangan.name);
  const [position, setPosition] = useState(detailTandaTangan.position);
  const [imageSignature, setImageSignature] = useState(
    detailTandaTangan.signature_image
  );
  const [signature, setSignature] = useState("");

  const dataTandaTangan = () => {
    const data = signCanvas.current.toDataURL();
    if (!signature) {
      Swal.fire({
        icon: "success",
        title: "Tanda Tangan Berhasil di Buat",
        // text: "Berhasil",
      });
      setSignature(data);
    }
    if (signature) {
      Swal.fire({
        icon: "error",
        title: "Tanda Tangan Sudah dibuat",
        // text: "Berhasil",
      });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (simpleValidator.current.allValid()) {
      if (error) {
        dispatch(clearErrors());
      }
      if (isUpdated) {
        dispatch({
          type: UPDATE_TANDA_TANGAN_RESET,
        });
      }

      if (error) {
        dispatch(clearErrors());
      }

      const data = {
        name: name,
        position,
        signature_image: signature,
      };
      dispatch(updateTandaTangan(detailTandaTangan.id, data));
    }
  };

  const onNewReset = () => {
    dispatch({
      // type: NEW_ARTIKEL_RESET
      type: UPDATE_TANDA_TANGAN_RESET,
    });
  };

  const imgSignature = process.env.END_POINT_API_IMAGE_PARTNERSHIP;
  const myLoader = ({ src }) => {
    return `${imgSignature}/partnership/images/signatures/${imageSignature}`;
  };

  return (
    <PageWrapper>
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
      {success ? (
        <div
          className="alert alert-custom alert-light-success fade show mb-5"
          role="alert"
        >
          <div className="alert-icon">
            <i className="flaticon2-checkmark"></i>
          </div>
          <div className="alert-text">{success}</div>
          <div className="alert-close">
            <button
              type="button"
              className="close"
              data-dismiss="alert"
              aria-label="Close"
              onClick={onNewReset}
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

      <div className="col-lg-12 col-xxl-12 order-1 order-xxl-2 px-0">
        {/* {loading ? <LoadingPage loading={loading} /> : ""} */}
        <div className="card card-custom card-stretch gutter-b">
          <div className="card-header border-0">
            <h3 className="card-title font-weight-bolder text-dark">
              Edit Tanda Tangan Digital
            </h3>
          </div>
          <div className="card-body">
            <form>
              <div className="form-group row">
                <label
                  htmlFor="staticEmail"
                  className="col-sm-2 col-form-label"
                >
                  Nama
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Masukkan Nama"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onBlur={() =>
                      simpleValidator.current.showMessageFor("name")
                    }
                  />
                  {simpleValidator.current.message(
                    "name",
                    name,
                    "required|max:50",
                    {
                      className: "text-danger",
                    }
                  )}
                </div>
              </div>
              <div className="form-group row">
                <label
                  htmlFor="staticEmail"
                  className="col-sm-2 col-form-label"
                >
                  Jabatan
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Masukkan Jabatan"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                    onBlur={() =>
                      simpleValidator.current.showMessageFor("position")
                    }
                  />
                  {simpleValidator.current.message(
                    "position",
                    position,
                    "required|max:50",
                    {
                      className: "text-danger",
                    }
                  )}
                </div>
              </div>
              <div className="form-group row">
                <label
                  htmlFor="staticEmail"
                  className="col-sm-2 col-form-label"
                >
                  Buat Tanda Tangan
                  <div>
                    <Image
                      loader={myLoader}
                      src={`${imgSignature}/partnership/images/signatures/${imageSignature}`}
                      width={500}
                      height={500}
                      alt="imageSignature"
                    />
                    {/* <Image
                      src={
                        process.env.END_POINT_API_IMAGE_PARTNERSHIP +
                        "partnership/images/signatures/" +
                        detailTandaTangan.signature_image
                      }
                      width={300}
                      height={200} */}
                    {/* /> */}
                  </div>
                </label>
                <div className="col-sm-10">
                  <div
                    style={{
                      background: "#FFFFFF",
                      boxShadow: "inset 10px 10px 40px rgba(0, 0, 0, 0.08)",
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
                      // onBlur={() =>
                      //   simpleValidator.current.showMessageFor("tandaTangan")
                      // }
                    />
                    {/* {simpleValidator.current.message(
                      "tandaTangan",
                      tandaTangan,
                      "required",
                      { className: "text-danger" }
                    )} */}
                  </div>
                  <div className="col-sm-10 mt-5">
                    {/* <Link href="/publikasi/artikel"> */}
                    <a
                      className="btn btn-outline-primary mr-2 btn-sm"
                      style={{
                        backgroundColor: "#C9F7F5",
                        color: "#1BC5BD",
                      }}
                      onClick={() => dataTandaTangan()}
                    >
                      Buat Tanda Tangan Baru
                    </a>
                    {/* </Link> */}
                    <button
                      type="button"
                      onClick={clear}
                      className="btn btn-sm"
                      style={{
                        backgroundColor: "#EDEF80",
                        color: "#B0B328",
                      }}
                    >
                      Buat Ulang Tanda Tangan
                    </button>
                  </div>
                </div>
              </div>

              {/* masih rancu di pakai atau tidaknya */}

              {/* <div className="form-group row">
                <label
                  htmlFor="staticEmail"
                  className="col-sm-2 col-form-label"
                >
                  Status
                </label>
                <div className="col-sm-1">
                  <SwitchButton
                    checked={false}
                    onlabel=" "
                    onstyle="primary"
                    offlabel=" "
                    offstyle="danger"
                    size="sm"
                      onChange={(checked) => onSetPublish(checked)}
                      onChange={(checked) => onSetPublish(checked)}
                  />
                </div>
              </div> */}
              {/* <div className="form-group row">
                <label
                  htmlFor="staticEmail"
                  className="col-sm-2 col-form-label"
                >
                  Publish ?
                </label>
                <div className="col-sm-1">
                  <SwitchButton
                    checked={publish}
                    onlabel=" "
                    onstyle="primary"
                    offlabel=" "
                    offstyle="danger"
                    size="sm"
                    width={30}
                    onChange={(checked) => onSetPublish(checked)}
                    // onClick={(checked) => onSetPublish(checked)}
                    // onChange={(checked) => setPublish(checked)}
                  />
                </div>
              </div> */}
              <div className="form-group row">
                <div className="row align-items-right mt-5 ml-auto">
                  <div className="col-sm mr-4">
                    <Link href="/partnership/tanda-tangan">
                      <a className="btn btn-outline-primary btn-sm mr-3">
                        Kembali
                      </a>
                    </Link>
                    {/* <Link href="/partnership/tanda-tangan"> */}
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={(e) => onSubmit(e)}
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

export default EditTandaTangan;
