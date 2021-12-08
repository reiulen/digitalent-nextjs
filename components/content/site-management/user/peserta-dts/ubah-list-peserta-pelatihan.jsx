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
import AlertBar from "../../../partnership/components/BarAlert";
import Image from "next/image";
import IconArrow from "../../../../assets/icon/Arrow";
import Select from "react-select";
import { getEditTrainingStep1 } from "../../../../../redux/actions/pelatihan/training.actions";
import { getAllListPelatihan } from "../../../../../redux/actions/site-management/user/admin-site.action";
import { pindahPelatihan } from "../../../../../redux/actions/site-management/user/peserta-dts";

const Table = ({ token }) => {
  let dispatch = useDispatch();
  const router = useRouter();

  const onNewReset = () => {
    router.replace("/site-management/role", undefined, {
      shallow: true,
    });
  };

  // style color
  const colorText = {
    color: "#6C6C6C",
  };
  const listUl = {
    listStyle: "none",
    padding: "0",
    margin: "0",
    marginTop: "1rem",
  };

  const { data: getEditTraining } = useSelector(
    (state) => state.getEditTraining
  );

  const allListPelatihan = useSelector((state) => state.allListPelatihan);
  const [idPelatihan, setIdPelatihan] = useState(router.query.ubah_pelatihan_id);
  const [idPendaftaran, setIdPendaftaran] = useState(
    router.query.id_pendaftaran
  );
  const [ubahData, setUbahData] = useState(0);

  const handleSubmit = () => {
    const data = {
      "id" : parseInt(idPendaftaran),
      "pelatihan_id" : parseInt(idPelatihan),
      "ubah_data" : ubahData === true || ubahData === 1 ? 1 : 0,
      "id_peserta": router.query.id
    }
    dispatch(pindahPelatihan(token, data))
  }

  useEffect(() => {
    dispatch(getEditTrainingStep1(router.query.ubah_pelatihan_id, token));
    dispatch(getAllListPelatihan(token));
  }, [dispatch, token]);

  return (
    <PageWrapper>
      <div className="row">
        {" "}
        <div className="col-12 order-1 px-0">
          <div
            className="card card-custom card-stretch gutter-b"
            style={{ height: "max-content" }}
          >
            <div className="card-header border-0 d-flex flex-column">
              <h3
                className="card-title font-weight-bolder text-dark mt-8"
                style={{ fontSize: "24px" }}
              >
                Data Pelatihan
              </h3>
            </div>
            <div className="card-body pt-0">
              <div>
                <p className="mb-2" style={colorText}>
                  Nama Pelatihan
                </p>
                <p className="fz-16">{getEditTraining.name}</p>
                <div>
                  <p className="mb-2" style={colorText}>
                    ID Pelatihan
                  </p>
                  <p className="fz-16">{getEditTraining.id}</p>
                  <p className="mb-2 mt-4" style={colorText}>
                    Status Pelatihan
                  </p>
                  <p className="fz-16 text-capitalize">
                    {getEditTraining.status_pelatihan}
                  </p>
                  <div className="d-flex align-items-center">
                    <input
                      type="checkbox"
                      className="mr-4"
                      onChange={(e) => {
                        setUbahData(e.target.checked);
                      }}
                    />
                    <p className="mb-0">Ubah data</p>
                  </div>
                  <div className="form-group mt-4">
                    <label htmlFor="exampleSelect1">ID Pelatihan</label>
                    <Select
                      options={allListPelatihan.data}
                      placeholder="Pilih pelatihan yang ingin di pindahkan..."
                      onChange={(e) => {
                        setIdPelatihan(e?.value);
                      }}
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <div className="col-sm-12 d-flex justify-content-end">
                    <a
                      className="btn btn-sm btn-white btn-rounded-full text-blue-primary mr-5"
                      onClick={(e) => {
                        e.preventDefault();
                        router.back();
                      }}
                    >
                      Kembali
                    </a>
                    <button
                      type="button"
                      onClick={handleSubmit}
                      className="btn btn-sm btn-rounded-full bg-blue-primary text-white"
                    >
                      Simpan
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Table;
