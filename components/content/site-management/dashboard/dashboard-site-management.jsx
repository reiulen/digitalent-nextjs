import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import PageWrapper from "../../../wrapper/page.wrapper";
import CardDashboardSiteManagement from "../../../CardDashboardSiteManagement";

import { getSession } from "next-auth/client";

const DashboardSiteManagement = () => {
  useEffect(() => {
    // getSession().then((session) => {
    //   console.log(session.user.user);
    // });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getSession]);
  return (
    <>
      <PageWrapper>
        <div className="row">
          <div className="col-12 col-md-lg-12 col-xxl-12 order-1 order-xxl-2 pb-0">
            <div className="card card-custom bg-light-primary gutter-b mt-5">
              <div
                className="card-body pt-2"
                style={{
                  backgroundPosition: "left bottom",
                  backgroundImage: "url('/assets/media/jukut.svg')",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <div className="d-flex align-items-center mb-10">
                  <div className="d-flex flex-column flex-grow-1 font-weight-bold">
                    <div className="row">
                      <div className="col-12 col-md-6">
                        <div className="col-12 col-md-12 mt-5">
                          <h4 className="font-weight-bolder text-primary">
                            Halo Admin A
                          </h4>
                        </div>
                        <div className="col-12 col-md-12">
                          <p className="font-weight-bold text-muted">
                            Sudah Makan Hari ini? <br /> Kalau sudah yuk dicheck
                            verifikasi Test untuk hari ini :)
                          </p>
                        </div>
                      </div>

                      <div className="col-12 col-md-6">
                        <div
                          className="ml-auto float-right ilustrator-dashboard"
                          style={{
                            position: "absolute",
                            right: "10px",
                            top: "-50px",
                          }}
                        >
                          <Image
                            src="/assets/media/ilustrator-1.svg"
                            width={300}
                            height={200}
                            alt="ilustrator-1"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row row-cols-auto row-cols-md-5 row-eq-height">
          <div className="col-6 col-md">
            <CardDashboardSiteManagement
              background="bg-primary"
              backgroundImage="/assets/icon/taieri-dark.svg"
              icon="/assets/icon/user-light.svg"
              color="text-white"
              title="User"
              link="/site-management"
            ></CardDashboardSiteManagement>
          </div>
          <div className="col-6 col-md">
            <CardDashboardSiteManagement
              background="bg-white"
              backgroundImage="/assets/icon/taieri-light.svg"
              icon="/assets/icon/role-grey.svg"
              color="text-muted"
              title="Role"
              link="/site-management"
            ></CardDashboardSiteManagement>
          </div>
          <div className="col-6 col-md">
            <CardDashboardSiteManagement
              background="bg-white"
              backgroundImage="/assets/icon/taieri-light.svg"
              icon="/assets/icon/mail-grey.svg"
              color="text-muted"
              title="SUBM"
              link="/site-management"
            ></CardDashboardSiteManagement>
          </div>
          <div className="col-6 col-md">
            <CardDashboardSiteManagement
              background="bg-white"
              backgroundImage="/assets/icon/taieri-light.svg"
              icon="/assets/icon/star-grey.svg"
              color="text-muted"
              title="Data Reference"
              link="/site-management"
            ></CardDashboardSiteManagement>
          </div>
          <div className="col-6 col-md">
            <CardDashboardSiteManagement
              background="bg-white"
              backgroundImage="/assets/icon/taieri-light.svg"
              icon="/assets/icon/pin-grey.svg"
              color="text-muted"
              title="Master Data"
              link="/site-management"
            ></CardDashboardSiteManagement>
          </div>
          <div className="col-6 col-md">
            <CardDashboardSiteManagement
              background="bg-white"
              backgroundImage="/assets/icon/taieri-light.svg"
              icon="/assets/icon/file-setting-grey.svg"
              color="text-muted"
              title="Ketentuan Pelatihan"
              link="/site-management"
            ></CardDashboardSiteManagement>
          </div>
          <div className="col-6 col-md">
            <CardDashboardSiteManagement
              background="bg-white"
              backgroundImage="/assets/icon/taieri-light.svg"
              icon="/assets/icon/file-grey.svg"
              color="text-muted"
              title="Export Data"
              link="/site-management"
            ></CardDashboardSiteManagement>
          </div>
          <div className="col-6 col-md">
            <CardDashboardSiteManagement
              background="bg-white"
              backgroundImage="/assets/icon/taieri-light.svg"
              icon="/assets/icon/setting-grey.svg"
              color="text-muted"
              title="Setting"
              link="/site-management"
            ></CardDashboardSiteManagement>
          </div>
          <div className="col-6 col-md"></div>
          <div className="col-6 col-md"></div>
        </div>
      </PageWrapper>
    </>
  );
};

export default DashboardSiteManagement;
