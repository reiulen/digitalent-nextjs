import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import PageWrapper from "../../../wrapper/page.wrapper";
import CardDashboardSiteManagement from "../../../CardDashboardSiteManagement";

import { getSession } from "next-auth/client";

const DashboardSiteManagement = () => {
  useEffect(() => {
    getSession().then((session) => {
      console.log(session.user.user);
    });
  }, []);
  return (
    <>
      <PageWrapper>
        <div className="container">
          <div className="row">
            <div className="card card-custom bg-success col-sm-4 mx-4">
              <div className="d-flex">
                <div className="icon mx-4">
                  <Image
                    src={"/assets/icon/sitemanagement/User.svg"}
                    width={32}
                    height={32}
                    alt="User Icon"
                  />
                </div>
                <div className="total-peserta text-white mx-4">
                  <h2>120.000</h2>
                </div>
                
                <div className="bg-user ml-auto">
                <Image
                    src={"/assets/icon/sitemanagement/background-user.svg"}
                    width={100}
                    height={108}
                    alt="User Icon"
                  />
                </div>
              </div>
              <p className="pb-4 text-white">Total Peserta DTS</p>
            </div>
          </div>
        </div>
      </PageWrapper>
    </>
  );
};

export default DashboardSiteManagement;
