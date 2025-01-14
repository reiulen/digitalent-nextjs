import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import PageWrapper from "../../../wrapper/page.wrapper";
import CardDashboardSiteManagement from "../../../CardDashboardSiteManagement";

import { getSession } from "next-auth/client";

const DashboardSetting = () => {
  return (
    <>
      <PageWrapper>
        <div className="row row-cols-auto row-cols-md-5 row-eq-height">
          <div className="col-6 col-md">
            <CardDashboardSiteManagement
              background="bg-primary"
              backgroundImage="/assets/icon/taieri-dark.svg"
              icon="/assets/icon/setting-light.svg"
              color="text-white"
              title="General"
              link="/site-management/setting/general"
            ></CardDashboardSiteManagement>
          </div>
          <div className="col-6 col-md">
            <CardDashboardSiteManagement
              background="bg-white"
              backgroundImage="/assets/icon/taieri-light.svg"
              icon="/assets/icon/notif-grey.svg"
              color="text-muted"
              title="Promp Update Notification"
              link="/site-management/setting/pelatihan?sidebar=Prompt"
            ></CardDashboardSiteManagement>
          </div>
          <div className="col-6 col-md">
            <CardDashboardSiteManagement
              background="bg-white"
              backgroundImage="/assets/icon/taieri-light.svg"
              icon="/assets/icon/page-grey.svg"
              color="text-muted"
              title="Page"
              link="/site-management/setting/page"
            ></CardDashboardSiteManagement>
          </div>
          <div className="col-6 col-md">
            <CardDashboardSiteManagement
              background="bg-white"
              backgroundImage="/assets/icon/taieri-light.svg"
              icon="/assets/icon/menu-grey.svg"
              color="text-muted"
              title="Menu"
              link="/site-management/setting/menu"
            ></CardDashboardSiteManagement>
          </div>
          <div className="col-6 col-md">
            <CardDashboardSiteManagement
              background="bg-white"
              backgroundImage="/assets/icon/taieri-light.svg"
              icon="/assets/icon/link-grey.svg"
              color="text-muted"
              title="API"
              link="/site-management/setting/api"
            ></CardDashboardSiteManagement>
          </div>
          <div className="col-6 col-md"></div>
          <div className="col-6 col-md"></div>
          <div className="col-6 col-md"></div>
          <div className="col-6 col-md"></div>
        </div>
      </PageWrapper>
    </>
  );
};

export default DashboardSetting;
