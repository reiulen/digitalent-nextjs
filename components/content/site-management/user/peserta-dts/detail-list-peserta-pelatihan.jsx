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
import moment from "moment";
import { getEditTrainingStep1 } from "../../../../../redux/actions/pelatihan/training.actions";

const Tables = ({ token }) => {
  let dispatch = useDispatch();
  const router = useRouter();

  const onNewReset = () => {
    router.replace("/site-management/role", undefined, {
      shallow: true,
    });
  };

  const allListPelatihanByPeserta = useSelector(
    (state) => state.allListPelatihanByPeserta
  );

  const { data: getEditTraining } = useSelector(
    (state) => state.getEditTraining
  );

  const optionPelatihan = allListPelatihanByPeserta.data.data.map((item) => {
    return {
      value: item.id,
      label: item.name,
    };
  });

  const [pelatihan, setPelatihan] = useState(null);

  const handleChangePelatihan = (id) => {
    setPelatihan(id);
    dispatch(getEditTrainingStep1(id, token));
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
  const listLi = {};
  return (
    <PageWrapper>
      <div
        className="col-12 col-xl-12 order-1 p-0 m-0"
        style={{ marginLeft: "-10px" }}
      >
        <div className="card card-custom card-stretch gutter-b">
          <div className="card-header border-0 d-flex flex-column">
            <h3
              className="card-title font-weight-bolder text-dark mt-8"
              style={{ fontSize: "24px" }}
            >
              Pilih Pelatihan
            </h3>
            <div className="form-group">
              <label htmlFor="exampleSelect1">Pilih Pelatihan</label>
              <Select
                value={pelatihan}
                placeholder="Silahkan Pilih Pelatihan"
                options={optionPelatihan}
                onChange={(e) => handleChangePelatihan(e?.value)}
              />
            </div>
          </div>
        </div>

        {pelatihan !== null && (
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
                  Akademi
                </p>
                <p className="fz-16">{getEditTraining?.slug || "-"}</p>
                <div className="row">
                  <div className="col-12 col-sm-6">
                    <div>
                      <p className="mb-2" style={colorText}>
                        Status Pelatihan
                      </p>
                      <p className="fz-16 text-capitalize">
                        {getEditTraining?.status_pelatihan || "-"}
                      </p>
                      <p className="mb-2 mt-4" style={colorText}>
                        Penyelenggara
                      </p>
                      <p className="fz-16">
                        {getEditTraining?.penyelenggara || "-"}
                      </p>
                      <p className="mb-2 mt-4" style={colorText}>
                        Provinsi
                      </p>
                      <p className="fz-16">
                        {getEditTraining?.provinsi || "-"}
                      </p>
                      <p className="mb-2 mt-4" style={colorText}>
                        Tanggal Pelatihan
                      </p>
                      <p className="fz-16">
                        {moment(getEditTraining?.pelatihan_mulai).format(
                          "DD MMMM YYYY"
                        ) || "-"}
                      </p>
                    </div>
                  </div>
                  <div className="col-12 col-sm-6">
                    <div>
                      <p className="mb-2" style={colorText}>
                        Tema
                      </p>
                      <p className="fz-16">{getEditTraining?.tema || "-"}</p>
                      <p className="mb-2 mt-4" style={colorText}>
                        Pelatihan
                      </p>
                      <p className="fz-16">{getEditTraining?.name || "-"}</p>
                      <p className="mb-2 mt-4" style={colorText}>
                        Kota/Kabupaten
                      </p>
                      <p className="fz-16">
                        {getEditTraining?.kabupaten || "-"}
                      </p>
                      <p className="mb-2 mt-4" style={colorText}>
                        Berkas Hasil Upload
                      </p>
                      <p
                        className="fz-16 m-0 p-0"
                        style={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          maxWidth: "20rem",
                        }}
                      >
                        {getEditTraining?.silabus?.split("/")[2] || "-"}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-sm-12 d-flex justify-content-end">
                    <Link href="/site-management/user">
                      <a className="btn btn-sm btn-white btn-rounded-full text-blue-primary">
                        Kembali
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </PageWrapper>
  );
};

export default Tables;
