import React from "react";

import PageWrapper from "../../../wrapper/page.wrapper";
import CardTotal from "../../dashboard-kabadan/component/card-total.component";
import DashboardHeader from "./dashboard-header.component";
import PaginationDashboard from "../../dashboard-kabadan/component/pagination-dashbaord.component";

import { helperHandlePercentage } from "../../../../utils/middleware/helper";
import { useRouter } from "next/router";

const DashboardDetailPelatihan = () => {
  const router = useRouter();
  const { akademi_id, tema_id } = router.query;
  return (
    <PageWrapper>
      <section className="opening-hello">
        <DashboardHeader
          funcFilterYear={(value) => {
            console.log(value);
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
              value={100}
              statisticDay={10}
              dailyAdd={helperHandlePercentage(10, 20)}
            />
          </div>
          <div className="col-md-12 col-sm-12 col-lg-6 mb-5">
            <CardTotal
              title={"Total Seluruh Peserta"}
              value={100}
              statisticDay={10}
              dailyAdd={helperHandlePercentage(10, 20)}
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
                    <th>Pelatihan</th>
                    <th>Peserta</th>
                    <th>Lulus</th>
                    <th>Sertifikasi</th>
                  </tr>
                </thead>
                <tbody className="w-100">
                  {[1, 2, 3, 4, 5].map((row, i) => (
                    <tr>
                      <td className="text-center">{i + 1}</td>
                      <td>Junior Graphi</td>
                      <td>200</td>
                      <td>120</td>
                      <td>120</td>
                      <td>120</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <PaginationDashboard
              total={10}
              perPage={5}
              title="Pelatihan Dibuka"
              activePage={1}
              funcPagination={(value) => {
                console.log(value);
              }}
            />
          </div>
        </div>
      </section>
    </PageWrapper>
  );
};

export default DashboardDetailPelatihan;
