import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import PageWrapper from "../../../wrapper/page.wrapper";
import Image from "next/image";

import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

// import {} from "../../../../redux/actions/partnership/mitra.actions";

const TambahMitra = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  
  useEffect(() => {
    
  }, []);


  return (
    <PageWrapper>

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
                      {/* <Image src={`/${logo}`} width={300} height={200} /> */}
                    </div>
                    <div class="custom-file">
                      <input
                        type="file"
                        name="logo"
                        class="custom-file-input"
                        id="inputGroupFile04"
                        // onChange={onChangeGambar}
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
                    // value={namaLembaga}
                    // onChange={(e) => setNamaLembaga(e.target.value)}
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
                    // value={email}
                    disabled
                    // onChange={(e) => setEmail(e.target.value)}
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
                    // value={website}
                    // onChange={(e) => setWebsite(e.target.value)}
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
                    // value={alamat}
                    // onChange={(e) => setAlamat(e.target.value)}
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
                    // onChange={(e) => setProvinsi(e.target.value)}
                    // onBlur={(e) => setProvinsi(e.target.value)}
                    className="form-control"
                  >
                    {/* {!allProvinsi ||
                    (allProvinsi && allProvinsi.length === 0) ? ( */}
                      <option value="">Data kosong</option>

                          <option>dd
                            {/* {row.name} */}
                          </option>
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
                    // onChange={(e) => setKotaKabupaten(e.target.value)}
                    // onBlur={(e) => setKotaKabupaten(e.target.value)}
                  >
                      <option value="">Data kosong</option>
                          <option>
                            {/* {row.name} */}sss
                          </option>
                        
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
                    // value={kodePos}
                    // onChange={(e) => setKodePos(e.target.value)}
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
                    // value={namaPic}
                    // onChange={(e) => setNamaPic(e.target.value)}
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
                    // value={noPic}
                    // onChange={(e) => setNoPic(e.target.value)}
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
                    // value={emailPic}
                    // onChange={(e) => setEmailPic(e.target.value)}
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
