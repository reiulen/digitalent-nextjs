import React, { useState } from "react";

import PageWrapper from "../../../wrapper/page.wrapper";
import CardTotal from "../../dashboard-kabadan/component/card-total.component";
import DashboardHeader from "./dashboard-header.component";
import PaginationDashboard from "../../dashboard-kabadan/component/pagination-dashbaord.component";

import { helperHandlePercentage } from "../../../../utils/middleware/helper";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import Cookies from "js-cookie";

import {
  getDetailTemaPendaftar,
  getDetailTemaPeserta,
} from "../../../../redux/actions/dashboard-kabadan/dashboard/digitalent.actions";

const DashboardDetailPelatihan = ({ token }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const token_permission = Cookies.get("token_permission");

  const { akademi_id, tema_id, id } = router.query;
  const {
    loading: loadingTemaPeserta,
    error: errorTemaPeserta,
    temaPeserta,
  } = useSelector((state) => state.detailTemaPeserta);
  const {
    loading: loadingTemaPendaftar,
    error: errorTemaPendaftar,
    temaPendaftar,
  } = useSelector((state) => state.detailTemaPendaftar);

  const [page, setPage] = useState(1);

  return (
    <PageWrapper>
      <section className="opening-hello">
        <DashboardHeader
          funcFilterYear={(value) => {
            dispatch(
              getDetailTemaPendaftar(token, token_permission, id, page, value)
            );
            dispatch(getDetailTemaPeserta(token, token_permission, id, value));
          }}
          path={tema_id}
        />
      </section>
      <section className="total-pengguna mt-10">
        <h2 className="title-section-dashboard-mini">
          total peserta {tema_id}
        </h2>
        <div className="row mt-5">
          <div className="col-md-12 col-sm-12 col-lg-6 mb-5">
            <CardTotal
              title={"Total Seluruh Pendaftar"}
              value={temaPeserta?.pendaftar?.total}
              statisticDay={temaPeserta?.pendaftar?.total_penambahan}
              dailyAdd={helperHandlePercentage(
                temaPeserta?.pendaftar?.total_penambahan,
                temaPeserta?.pendaftar?.total
              )}
            />
          </div>
          <div className="col-md-12 col-sm-12 col-lg-6 mb-5">
            <CardTotal
              title={"Total Seluruh Peserta"}
              value={temaPeserta?.peserta?.total}
              statisticDay={temaPeserta?.peserta?.total_penambahan}
              dailyAdd={helperHandlePercentage(
                temaPeserta?.peserta?.total_penambahan,
                temaPeserta?.peserta?.total
              )}
            />
          </div>
        </div>
      </section>
      <section className="total-per-akademi mt-8">
        <div className="card card-custom bg-white">
          <div className="card-body">
            <p className="text-dashboard-gray fz-16 fw-500">
              List Pelatihan {tema_id}
            </p>

            <div className="table-content table-responsive">
              <table className="table table-separate table-head-custom table-checkable">
                <thead className="w-100" style={{ background: "#F3F6F9" }}>
                  <tr>
                    <th className="text-center ">No</th>
                    <th>Nama Pelatihan</th>
                    <th>Pendaftar</th>
                    <th>Peserta</th>
                    <th>Lulus</th>
                    <th>Sertifikasi</th>
                  </tr>
                </thead>
                <tbody className="w-100">
                  {temaPendaftar?.list?.map((row, i) => (
                    <tr key={i}>
                      <td className="text-center">
                        {i + 1 * (page * 5) - (5 - 1)}
                      </td>
                      <td>{row.name}</td>
                      <td>{row.pendaftar}</td>
                      <td>{row.peserta}</td>
                      <td>{row.lulus}</td>
                      <td>{row.sertifikat}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {temaPendaftar?.total > 5 && (
              <PaginationDashboard
                total={temaPendaftar?.total}
                perPage={temaPendaftar?.perPage}
                title="Pelatihan Dibuka"
                activePage={page}
                funcPagination={(value) => {
                  setPage(value);
                  dispatch(
                    getDetailTemaPendaftar(token, token_permission, id, value)
                  );
                }}
              />
            )}
          </div>
        </div>
      </section>
    </PageWrapper>
  );
};

export default DashboardDetailPelatihan;
