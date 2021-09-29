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

const GeneralPage = ({ token }) => {
  let dispatch = useDispatch();
  const router = useRouter();

  const [color, setColor] = useState("#ffffff");
  const changeColor = (e) => {
    setColor(e.target.value);
  };

  const onNewReset = () => {
    router.replace("/site-management/api", undefined, {
      shallow: true,
    });
  };
  return (
    <PageWrapper>
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
                <form>
                  <div className="form-group">
                    <label className="mb-8" style={{ fontSize: "16px" }}>
                      Logo Digitalent Scholarship
                    </label>
                    <div>
                      <div class="image-input image-input-outline">
                        <div class="image-input-wrapper"></div>

                        <label
                          class="btn btn-xs btn-icon btn-circle btn-white btn-hover-text-primary btn-shadow"
                          data-action="change"
                          data-toggle="tooltip"
                          title=""
                          data-original-title="Change avatar"
                        >
                          <i class="fa fa-pen icon-sm text-muted"></i>
                          <input
                            type="file"
                            name="profile_avatar"
                            accept=".png, .jpg, .jpeg"
                          />
                          <input type="hidden" name="profile_avatar_remove" />
                        </label>

                        <span
                          class="btn btn-xs btn-icon btn-circle btn-white btn-hover-text-primary btn-shadow"
                          data-action="cancel"
                          data-toggle="tooltip"
                          title="Cancel avatar"
                        >
                          <i class="ki ki-bold-close icon-xs text-muted"></i>
                        </span>

                        <span
                          class="btn btn-xs btn-icon btn-circle btn-white btn-hover-text-primary btn-shadow"
                          data-action="remove"
                          data-toggle="tooltip"
                        >
                          <i class="ki ki-bold-close icon-xs text-muted"></i>
                        </span>
                      </div>
                      <span className="form-text text-muted">
                        Please enter your full name
                      </span>
                    </div>
                  </div>

                  {/* start social media */}
                  <div className="mt-10">
                    <h4 className="fw-600 fz-20">Social Media</h4>
                    <div className="row mt-6">
                      <div className="col-12 col-sm-3">
                        <div className="form-group">
                          <label className="mb-8" style={{ fontSize: "16px" }}>
                            Logo Social Media
                          </label>
                          <div>
                            <div class="image-input image-input-outline">
                              <div class="image-input-wrapper"></div>

                              <label
                                class="btn btn-xs btn-icon btn-circle btn-white btn-hover-text-primary btn-shadow"
                                data-action="change"
                                data-toggle="tooltip"
                                title=""
                                data-original-title="Change avatar"
                              >
                                <i class="fa fa-pen icon-sm text-muted"></i>
                                <input
                                  type="file"
                                  name="profile_avatar"
                                  accept=".png, .jpg, .jpeg"
                                />
                                <input
                                  type="hidden"
                                  name="profile_avatar_remove"
                                />
                              </label>

                              <span
                                class="btn btn-xs btn-icon btn-circle btn-white btn-hover-text-primary btn-shadow"
                                data-action="cancel"
                                data-toggle="tooltip"
                                title="Cancel avatar"
                              >
                                <i class="ki ki-bold-close icon-xs text-muted"></i>
                              </span>

                              <span
                                class="btn btn-xs btn-icon btn-circle btn-white btn-hover-text-primary btn-shadow"
                                data-action="remove"
                                data-toggle="tooltip"
                              >
                                <i class="ki ki-bold-close icon-xs text-muted"></i>
                              </span>
                            </div>
                            <span className="form-text text-muted">
                              Please enter your full name
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-sm-9">
                        <div className="form-group">
                          <label>Nama Social Media</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Lalaracing@gmail.com"
                          />
                          <span className="form-text text-muted">
                            Please enter your full name
                          </span>
                        </div>
                        <div className="form-group">
                          <label htmlFor="exampleSelect1">
                            Link Social Media
                          </label>
                          <select className="form-control" id="exampleSelect1">
                            <option>Perempuan</option>
                          </select>
                          <span className="form-text text-muted">
                            Please enter your full name
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="form-group row">
                      <div className="col-sm-12 d-flex justify-content-end">
                        <Link href="/site-management/setting/api/tambah-api">
                          <a className="btn btn-rounded-full bg-blue-secondary text-white">
                            <IconAdd className="mr-3" width="14" height="14" />
                            Tambah Social Media
                          </a>
                        </Link>
                      </div>
                    </div>
                  </div>
                  {/* end social media */}

                  {/* start External Links */}
                  <div className="mt-10">
                    <h4 className="fw-600 fz-20">External Links</h4>

                    <div className="form-group">
                      <label>Nama External Links</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Lalaracing@gmail.com"
                      />
                      <span className="form-text text-muted">
                        Please enter your full name
                      </span>
                    </div>

                    <div className="form-group">
                      <label htmlFor="exampleSelect1">
                        Link External Links
                      </label>
                      <select className="form-control" id="exampleSelect1">
                        <option>Perempuan</option>
                      </select>
                      <span className="form-text text-muted">
                        Please enter your full name
                      </span>
                    </div>

                    <div className="form-group row">
                      <div className="col-sm-12 d-flex justify-content-end">
                        <Link href="/site-management/setting/api/tambah-api">
                          <a className="btn btn-rounded-full bg-blue-secondary text-white">
                            <IconAdd className="mr-3" width="14" height="14" />
                            Tambah External Links
                          </a>
                        </Link>
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
                        placeholder="Kementrian Komunikasi dan Informatika RI JL. Medan Merdeka Barat No.9 Jakarta Pusat, 10110"
                        className="form-control"
                        name=""
                        id=""
                        cols="30"
                        rows="10"
                      ></textarea>
                      <span className="form-text text-muted">
                        Please enter your full name
                      </span>
                    </div>
                  </div>
                  {/* end Alamat */}

                  {/* start Color Schemes */}
                  <div className="mt-10">
                    <h4 className="fw-600 fz-20">Color Schemes</h4>
                    <div className="form-group">
                      <label>Primary</label>
                      <div className="position-relative">
                        <input
                          type="text"
                          className="form-control pl-16"
                          placeholder="Lalaracing@gmail.com"
                          onChange={(e) => changeColor(e)}
                          value={color}
                        />
                        <div
                          className="left-center-absolute"
                          style={{
                            backgroundColor: color,
                            height: "20px",
                            width: "20px",
                            left: "1rem",
                          }}
                        ></div>
                      </div>
                      <span className="form-text text-muted">
                        Please enter your full name
                      </span>
                    </div>
                    <div className="form-group">
                      <label>Primary</label>
                      <div className="position-relative">
                        <input
                          type="text"
                          className="form-control pl-16"
                          placeholder="Lalaracing@gmail.com"
                          onChange={(e) => changeColor(e)}
                          value={color}
                        />
                        <div
                          className="left-center-absolute"
                          style={{
                            backgroundColor: color,
                            height: "20px",
                            width: "20px",
                            left: "1rem",
                          }}
                        ></div>
                      </div>
                      <span className="form-text text-muted">
                        Please enter your full name
                      </span>
                    </div>
                    <div className="form-group">
                      <label>Primary</label>
                      <div className="position-relative">
                        <input
                          type="text"
                          className="form-control pl-16"
                          placeholder="Lalaracing@gmail.com"
                          onChange={(e) => changeColor(e)}
                          value={color}
                        />
                        <div
                          className="left-center-absolute"
                          style={{
                            backgroundColor: color,
                            height: "20px",
                            width: "20px",
                            left: "1rem",
                          }}
                        ></div>
                      </div>
                      <span className="form-text text-muted">
                        Please enter your full name
                      </span>
                    </div>
                  </div>
                  {/* end Alamat */}

                  {/* start footer btn */}
                  <div className="form-group row mt-10">
                    <div className="col-sm-12 d-flex justify-content-end">
                      <Link href="/partnership/master-kategori-kerjasama">
                        <a className="btn btn-sm btn-white btn-rounded-full text-blue-primary mr-5">
                          Hapus
                        </a>
                      </Link>
                      <button
                        type="button"
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
