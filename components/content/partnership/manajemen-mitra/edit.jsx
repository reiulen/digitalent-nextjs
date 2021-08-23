import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import PageWrapper from "../../../wrapper/page.wrapper";
import Image from "next/image";

import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import {
  updateMitra,
  clearErrors,
} from "../../../../redux/actions/partnership/mitra.actions";
import { getAllKota } from "../../../../redux/actions/utils/utils.actions";
import LoadingPage from "../../../LoadingPage";
import { NEW_MITRA_RESET } from "../../../../redux/types/partnership/mitra.type";

const TambahMitra = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const {
    loading: allLoadingDetailMitra,
    error: errorDetailMitra,
    detailMitraRes,
  } = useSelector((state) => state.detailMitra);
  const {
    loading: allLoadingProvinsi,
    error: errorProvinsi,
    allProvinsi,
  } = useSelector((state) => state.allProvinsi);

  const {
    loading: allLoadingKota,
    error: errorKota,
    allKota: allKotaRes,
  } = useSelector((state) => state.allKota);

  const [logo, setLogo] = useState(detailMitraRes.agency_logo);
  const [namaLembaga, setNamaLembaga] = useState(
    detailMitraRes.institution_name
  );
  const [email, setEmail] = useState(detailMitraRes.email);
  const [website, setWebsite] = useState(detailMitraRes.website);
  const [alamat, setAlamat] = useState(detailMitraRes.alamat);
  const [provinsi, setProvinsi] = useState(33);
  // const [provinsi, setProvinsi] = useState(
  //   detailMitraRes.indonesia_provinces_id
  // );
  const [kotaKabupaten, setKotaKabupaten] = useState(3317);
  // const [kotaKabupaten, setKotaKabupaten] = useState(
  //   detailMitraRes.indonesia_cities_id
  // );
  const [kodePos, setKodePos] = useState(detailMitraRes.postal_code);
  const [namaPic, setNamaPic] = useState(detailMitraRes.pic_name);
  const [noPic, setNoPic] = useState(detailMitraRes.pic_contact_number);
  const [emailPic, setEmailPic] = useState(detailMitraRes.pic_email);

  const { error, isUpdated, success } = useSelector(
    (state) => state.updateMitra
  );

  // start convert to base64
  const onChangeGambar = (e) => {
    if (e.target.name === "logo") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setLogo(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  // end convert to base64

  useEffect(() => {
    if (provinsi) {
      dispatch(getAllKota(provinsi));
    }

    if (success) {
      router.push({
        pathname: `/partnership/manajemen-mitra`,
        query: { success: true },
      });
    }
  }, [dispatch, error, success, isUpdated, provinsi]);

  const onSubmit = (e) => {
    e.preventDefault();

    if (isUpdated) {
      dispatch({
        // type: NEW_ARTIKEL_RESET
        type: UPDATE_MITRA_RESET,
      });
    }

    if (error) {
      dispatch(clearErrors());
    }

    if (success) {
      dispatch({
        type: NEW_MITRA_RESET,
      });
    }
    const data = {
      agency_logo: logo,
      website: website,
      address: alamat,
      indonesia_provinces_id: provinsi,
      indonesia_cities_id: kotaKabupaten,
      postal_code: kodePos,
      pic_name: namaPic,
      institution_name: namaLembaga,
      pic_contact_number: noPic,
      pic_email: emailPic,
      // email: email,
    };
    // const data = {
    //   agency_logo: "logo.jpg",
    //   website: "dq@gmail.com",
    //   address: "jalan mayang sari",
    //   indonesia_provinces_id: "33",
    //   indonesia_cities_id: "3317",
    //   postal_code: "54321",
    //   pic_name: "bpk mayang",
    //   institution_name: "dq",
    //   pic_contact_number: "085328219033",
    //   pic_email: "vickyfitrio@gmail.com",
    //   // email: email,
    // };

    console.log(data, detailMitraRes.id);
    dispatch(updateMitra(detailMitraRes.id, data));
  };

  const onNewReset = () => {
    dispatch({
      // type: NEW_ARTIKEL_RESET
      type: UPDATE_TANDA_TANGAN_RESET,
    });
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

      <div className="col-lg-12 col-xxl-12 order-1 order-xxl-2 px-0">
        {/* {loading ? <LoadingPage loading={loading} /> : ""} */}
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
                <div className="col-sm-3">
                  <div class="input-group">
                    <div>
                      <Image src={`/${logo}`} width={300} height={200} />
                    </div>
                    <div class="custom-file">
                      <input
                        type="file"
                        name="logo"
                        class="custom-file-input"
                        id="inputGroupFile04"
                        onChange={onChangeGambar}
                      />
                      <label class="custom-file-label" for="inputGroupFile04">
                        Cari Dokumen
                      </label>
                    </div>
                  </div>
                </div>
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
                    type="text"
                    className="form-control"
                    placeholder="Masukkan Nama Lembaga"
                    value={namaLembaga}
                    onChange={(e) => setNamaLembaga(e.target.value)}
                  />
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
                    type="text"
                    className="form-control"
                    placeholder="Masukkan Email"
                    value={email}
                    disabled
                    onChange={(e) => setEmail(e.target.value)}
                  />
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
                    type="text"
                    className="form-control"
                    placeholder="Masukkan Website"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                  />
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
                    type="text"
                    className="form-control"
                    placeholder="Masukkan Alamat"
                    value={alamat}
                    onChange={(e) => setAlamat(e.target.value)}
                  />
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
                    onChange={(e) => setProvinsi(e.target.value)}
                    onBlur={(e) => setProvinsi(e.target.value)}
                    className="form-control"
                  >
                    {!allProvinsi ||
                    (allProvinsi && allProvinsi.length === 0) ? (
                      <option value="">Data kosong</option>
                    ) : (
                      allProvinsi &&
                      allProvinsi.map((row) => {
                        return (
                          <option key={row.id} value={row.id}>
                            {row.name}
                          </option>
                        );
                      })
                    )}
                  </select>
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
                    className="form-control"
                    onChange={(e) => setKotaKabupaten(e.target.value)}
                    onBlur={(e) => setKotaKabupaten(e.target.value)}
                  >
                    {!allKotaRes || (allKotaRes && allKotaRes.length === 0) ? (
                      <option value="">Data kosong</option>
                    ) : (
                      allKotaRes &&
                      allKotaRes.map((row) => {
                        return (
                          <option key={row.id} value={row.id}>
                            {row.name}
                          </option>
                        );
                      })
                    )}
                  </select>
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
                    type="text"
                    className="form-control"
                    placeholder="Masukkan Kode Pos"
                    value={kodePos}
                    onChange={(e) => setKodePos(e.target.value)}
                  />
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
                    type="text"
                    className="form-control"
                    placeholder="Masukkan Nama"
                    value={namaPic}
                    onChange={(e) => setNamaPic(e.target.value)}
                  />
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
                    type="text"
                    className="form-control"
                    placeholder="Masukkan NO. Kontak"
                    value={noPic}
                    onChange={(e) => setNoPic(e.target.value)}
                  />
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
                    type="text"
                    className="form-control"
                    placeholder="Masukkan Email"
                    value={emailPic}
                    onChange={(e) => setEmailPic(e.target.value)}
                  />
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

export default TambahMitra;
