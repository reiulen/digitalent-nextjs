import React from "react";

import PageWrapper from "../../../wrapper/page.wrapper";
import CardTotal from "../../dashboard-kabadan/component/card-total.component";
import TotalPerAkademi from "../../dashboard-kabadan/component/total-perakademi.component";
import DashboardHeader from "./dashboard-header.component";

import { helperHandlePercentage } from "../../../../utils/middleware/helper";
import { useRouter } from "next/router";

const DashboardDetailTema = () => {
  const router = useRouter();
  const { akademi_id } = router.query;
  return (
    <PageWrapper>
      <section className="opening-hello">
        <DashboardHeader
          funcFilterYear={(value) => {
            console.log(value);
          }}
          path={akademi_id}
        />
      </section>
      <section className="total-pengguna mt-10">
        <h2 className="title-section-dashboard-mini">
          total peserta {akademi_id}
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
      <section className="total-per-akademi">
        <h2 className="title-section-dashboard-mini">
          total per akademi {akademi_id}
        </h2>
        <div className="row mt-5">
          {["big data", "robot", "data analyst"].map((row, i) => (
            <div className="col-md-4 mb-8" key={i}>
              <TotalPerAkademi
                group={row}
                link={`/pelatihan/dashboard/${akademi_id}/${row}`}
                pendaftar={123.456}
                peserta={67.989}
                lulus={123.456}
                sertifikasi={67.798}
              />
            </div>
          ))}
        </div>
      </section>
    </PageWrapper>
  );
};

export default DashboardDetailTema;
