import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import PageWrapper from "../../../wrapper/page.wrapper";
import CardDashboardSiteManagement from "../../../CardDashboardSiteManagement";

import { getSession } from "next-auth/client";

const DashboardUser = () => {

  return (
    <>
      <PageWrapper>
        <div className="row row-cols-auto row-cols-md-5 row-eq-height">
          <div className="col-6 col-md">
            <CardDashboardSiteManagement
              background="bg-primary"
              backgroundImage="/assets/icon/taieri-dark.svg"
              icon="/assets/icon/user-light.svg"
              color="text-white"
              title="Peserta"
              link="/site-management/user/user-dts"
            ></CardDashboardSiteManagement>
          </div>
          <div className="col-6 col-md">
            <CardDashboardSiteManagement
              background="bg-white"
              backgroundImage="/assets/icon/taieri-light.svg"
              icon="/assets/icon/user-star-grey.svg"
              color="text-muted"
              title="Administrator"
              link="/site-management/user/administrator"
            ></CardDashboardSiteManagement>
          </div>
          <div className="col-6 col-md">
            <CardDashboardSiteManagement
              background="bg-white"
              backgroundImage="/assets/icon/taieri-light.svg"
              icon="/assets/icon/user-plus-grey.svg"
              color="text-muted"
              title="Mitra"
              link="/site-management/user/mitra"
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

export default DashboardUser;
