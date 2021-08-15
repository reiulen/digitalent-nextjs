import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import PageWrapper from "../../../wrapper/page.wrapper";
import dynamic from "next/dynamic";
import SignaturePad from "react-signature-pad-wrapper";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import Swal from "sweetalert2";
import SimpleReactValidator from "simple-react-validator";

import LoadingPage from "../../../LoadingPage";

import {
  updateTandaTangan,
  clearErrors,
} from "../../../../redux/actions/partnership/tandaTangan.actions";
import { NEW_TANDA_TANGAN_RESET } from "../../../../redux/types/partnership/tandaTangan.type";

const EditTandaTangan = () => {
  const signCanvas = useRef({});
  const dispatch = useDispatch();

  const clear = () => {
    signCanvas.current.clear();
  };

  const editorRef = useRef();
  const router = useRouter();

  const importSwitch = () => import("bootstrap-switch-button-react");
  const [editorLoaded, setEditorLoaded] = useState(false);
  // const { CKEditor, ClassicEditor, Base64UploadAdapter } =
  //   editorRef.current || {};
  // const SwitchButton = dynamic(importSwitch, {
  //   ssr: false,
  // });

  const { tandaTangan } = useSelector((state) => state.allTandaTangan);
  const { error, success, loading } = useSelector(
    (state) => state.updateTandaTangan
  );

  const [nama, setNama] = useState(tandaTangan);
  // const [jabatan, setJabatan] = useState(tandaTangan.position);
  // const [signature, setSignature] = useState(tandaTangan.signature_image);

  useEffect(() => {
    // editorRef.current = {
    //   CKEditor: require("@ckeditor/ckeditor5-react").CKEditor, //Added .CKEditor
    //   ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
    //   // Base64UploadAdapter: require('@ckeditor/ckeditor5-upload/src/adapters/base64uploadadapter')
    // };

    // setEditorLoaded(true);
    if (success) {
      // setJudulArtikel('')
      // setIsiArtikel('')
      // setGambar('')
      // setGambarPreview('/assets/media/default.jpg')
      // setKategoriId('')
      // setTag('')

      router.push({
        pathname: `/partnership/tanda-tangan`,
        query: { success: true },
      });
    }
  }, [dispatch, error, success]);

  // const [id, setId] = useState(artikel.id);
  // const [judul_artikel, setJudulArtikel] = useState(artikel.judul_artikel);
  // const [isi_artikel, setIsiArtikel] = useState(artikel.isi_artikel);
  // const [gambar, setGambar] = useState(artikel.gambar);
  // const [gambarPreview, setGambarPreview] = useState(
  //   "/assets/media/default.jpg"
  // ); //belum
  // const [kategori_id, setKategoriId] = useState(1); //belum
  // const [users_id, setUserId] = useState(artikel.users_id);
  // const [tag, setTag] = useState(artikel.tag);
  // const [publish, setPublish] = useState(artikel.publish === 1 ? true : false);
  // const [_method, setMethod] = useState("put");

  // const onChangeGambar = (e) => {
  //   if (e.target.name === "gambar") {
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       if (reader.readyState === 2) {
  //         setGambar(reader.result);
  //         setGambarPreview(reader.result);
  //       }
  //     };
  //     reader.readAsDataURL(e.target.files[0]);
  //   }
  // };

  const onSubmit = (e) => {
    e.preventDefault();
    if (error) {
      dispatch(clearErrors());
    }

    if (success) {
      dispatch({
        // type: NEW_ARTIKEL_RESET
        type: UPDATE_TANDA_TANGAN_RESET,
      });
    }

    const data = {
      name: nama,
      position: jabatan,
      signature_image: signature,
    };

    dispatch(updateTandaTangan(data));
    // console.log(data)
  };

  const onNewReset = () => {
    dispatch({
      // type: NEW_ARTIKEL_RESET
      type: UPDATE_TANDA_TANGAN_RESET,
    });
  };

  // const onSetPublish = (e) => {
  //   Swal.fire({
  //     title: "Ubah status publikasi?",
  //     text: "Status publikasi akan berubah",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Ya !",
  //     cancelButtonText: "Batal",
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       Swal.fire("Berhasil", "Status publikasi telah diubah", "success");

  //       console.log(e);
  //       setPublish(e);
  //     } else {
  //       Swal.fire("Batal", "Status publikasi telah batal diubah", "info");

  //       console.log(!e);
  //       setPublish(!e);
  //     }
  //   });

  // Swal.fire (
  //     'Berhasil',
  //     'Status publikasi telah diubah',
  //     'success'
  // )

  // setPublish(e)
  // };
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
              value={nama}
              onChange={setNama}
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

      <div className="col-lg-12 col-xxl-12 order-1 order-xxl-2 px-0">
        {loading ? <LoadingPage loading={loading} /> : ""}
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
                  {console.log(nama)}
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Masukkan Nama"
                    // value={nama}
                    onChange={(e) => setNama(e.target.value)}
                    // onBlur={() =>
                    //   simpleValidator.current.showMessageFor("nama")
                    // }
                  />
                  {/* {simpleValidator.current.message("nama", nama, "required", {
                    className: "text-danger",
                  })} */}
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
                    onChange={(e) => setJabatan(e.target.value)}
                    // onBlur={() =>
                    //   simpleValidator.current.showMessageFor("jabatan")
                    // }
                  />
                  {/* {simpleValidator.current.message(
                    "jabatan",
                    jabatan,
                    "required",
                    {
                      className: "text-danger",
                    }
                  )} */}
                </div>
              </div>
              <div className="form-group row">
                <label
                  htmlFor="staticEmail"
                  className="col-sm-2 col-form-label"
                >
                  Buat Tanda Tangan
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
                      // onClick={() => dataTandaTangan()}
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
