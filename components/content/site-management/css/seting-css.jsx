import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Pagination from "react-js-pagination";
import PageWrapper from "../../../wrapper/page.wrapper";
import { useDispatch, useSelector } from "react-redux";
import LoadingTable from "../../../LoadingTable";
import IconEye from "../../../assets/icon/Eye";
import IconPencil from "../../../assets/icon/Pencil";
import IconDelete from "../../../assets/icon/Delete";
import IconAdd from "../../../assets/icon/Add";
import IconSearch from "../../../assets/icon/Search";

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
                className="card-title font-weight-bolder text-dark w-100  mt-5"
                style={{ fontSize: "24px" }}
              >
                CSS Editor
              </h3>
            </div>
            <div className="card-body pt-0">
              <form>

                  {/* start Alamat */}
                  <div className="mt-4">
                    <div className="form-group">
                      <textarea
                        placeholder="Placeholder"
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
                  {/* start footer btn */}
                  <div className="form-group row mt-10">
                    <div className="col-sm-12 d-flex justify-content-end">
                      <Link href="/site-management/setting">
                        <a className="btn btn-sm btn-white btn-rounded-full text-blue-primary mr-5">
                          Kembali
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
    </PageWrapper>
  );
};

export default GeneralPage;
