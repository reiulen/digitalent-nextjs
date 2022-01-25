import React from "react";

import Header from "../../dashboard-kabadan/component/header.component";
import PageWrapper from "../../../wrapper/page.wrapper";
import CardTotal from "../../dashboard-kabadan/component/card-total.component";
import TotalPerAkademi from "../../dashboard-kabadan/component/total-perakademi.component";
import DashboardHeader from "./dashboard-header.component";

import { helperHandlePercentage } from "../../../../utils/middleware/helper";

const DashboardPelatihan = () => {
  return (
    <PageWrapper>
      <section className="opening-hello">
        <DashboardHeader funcFilterYear={(value) => {}} />
        <Header
          name={"Kepala Badan Litbang SDM Kementerian Kominfo"}
          text={"Pelatihan Digital Talent Scholarship"}
          value={100}
          statisticDay={30}
          dailyAdd={helperHandlePercentage(9, 11)}
        />
      </section>

      <section className="total-pengguna mt-10">
        <h2 className="title-section-dashboard">total peserta</h2>
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
        <h2 className="title-section-dashboard">total per akademi</h2>
        <div className="row mt-5">
          {["vsga", "proa", "dla", "ls", "pb", "dgn"].map((row, i) => (
            <div className="col-md-4 mb-8" key={i}>
              <TotalPerAkademi
                group={"VSGA"}
                link={`/pelatihan/dashboard/${row}`}
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

export default DashboardPelatihan;
