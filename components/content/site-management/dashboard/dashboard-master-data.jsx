import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import PageWrapper from "../../../wrapper/page.wrapper";
import CardDashboardSiteManagement from "../../../CardDashboardSiteManagement";

import { getSession } from "next-auth/client";

const DashboardMasterData = ({ session }) => {
  return (
    <>
      <PageWrapper>
        <div className="row row-cols-auto row-cols-md-5 row-eq-height">
          <div className="col-6 col-md">
            <CardDashboardSiteManagement
              background="bg-primary"
              backgroundImage="/assets/icon/taieri-dark.svg"
              icon="/assets/icon/pin-light.svg"
              color="text-white"
              title="Master Zonasi"
              link="/site-management/master-data/master-zonasi"
            ></CardDashboardSiteManagement>
          </div>
          <div className="col-6 col-md">
            <CardDashboardSiteManagement
              background="bg-white"
              backgroundImage="/assets/icon/taieri-light.svg"
              icon="/assets/icon/clock-grey.svg"
              color="text-muted"
              title="Master Satuan Kerja"
              link="/site-management/master-data/master-satuan-kerja-penyelenggara"
            ></CardDashboardSiteManagement>
          </div>
          <div className="col-6 col-md"></div>
          <div className="col-6 col-md"></div>
          <div className="col-6 col-md"></div>
        </div>
      </PageWrapper>
    </>
  );
};

export default DashboardMasterData;
