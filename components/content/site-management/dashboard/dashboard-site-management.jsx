import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getSession } from "next-auth/client";
import axios from 'axios'

import IconUser from "../../../assets/icon/User";
import IconDoc from "../../../assets/icon/Doc";
import ImageHero from "../../../../public/assets/media/logos/hero1.png";
import ImagePlants from "../../../../public//assets/media/logos/Plants1.png";
import CardPage from "../../../CardPage";
import PageWrapper from "../../../wrapper/page.wrapper";
import CardDashboardSiteManagement from "../../../CardDashboardSiteManagement";


const DashboardSiteManagement = ({token}) => {

      const [participant, setParticipant] = useState("0");
      const [administrator, setAdministrator] = useState("0");
      const [mitra, setMitra] = useState(0);

  useEffect(() => {
      axios.get(
        `${process.env.END_POINT_API_SITE_MANAGEMENT}/api/dashboard/card`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      ).then(items => {
        setParticipant(items.data.data.participant)
        setAdministrator(items.data.data.administrator)
        setMitra(items.data.data.mitra)
      })
   
  }, [token]);
  return (
    <>
      <PageWrapper>
        <div className="container">
          <div className="col-lg-12 col-md-12">
            <div className="row">
              {/* card 1 */}
              <CardPage
                background="bg-light-success "
                icon="User.svg"
                color="#ffffff"
                titleValue={participant}
                title="Total Peserta DTS"
                publishedVal="1"
              />

              {/* card 2 */}
              <CardPage
                background="bg-light-warning"
                icon="Address-card.svg"
                color="#ffffff"
                titleValue={administrator}
                title="Total Administrator"
                publishedVal="1"
              />
              <CardPage
                background="bg-light-info"
                icon="Book-open.svg"
                color="#ffffff"
                titleValue={mitra}
                title="Total Mitra"
                publishedVal="1"
              />
              {/* card 3 */}
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row mx-0">
            <div className="col-lg-6">
              <div
                className="position-relative br-12 bg-white py-10 px-6 overflow-hidden"
                style={{ height: "197px", maxHeight: "197px" }}
              >
                <div className="right-center-absolute">
                  <Image src={ImageHero} alt="imagehero" />
                </div>

                <div className="left-bottom-absolute">
                  <Image src={ImagePlants} alt="imagehero" />
                </div>

                <h5 className="text-blue-secondary fw-600 fz-24">
                  Hallo {"Admin"} !
                </h5>
                <p className="text-gray-primary fw-600 fz-16">
                  Selamat Datang di Dashboard Partnership, <br /> yuk cek
                  pengajuan kerjasama mitra hari ini.
                </p>
              </div>
            </div>
            <div className="col-lg-3">
              <CardDashboardSiteManagement
                background="bg-white"
                icon="/assets/icon/Account.svg"
                color="text-Black"
                title="SUBM"
                link="/site-management/dashboard"
              ></CardDashboardSiteManagement>
            </div>
            <div className="col-lg-3">
              <CardDashboardSiteManagement
                background="bg-white"
                icon="/assets/icon/Map.svg"
                color="text-Black"
                title="Zonasi"
                link="/site-management/dashboard"
              ></CardDashboardSiteManagement>
            </div>
          </div>
        </div>
        <div className="container mt-8">
          <div className="row mx-0">
            <div className="col-lg-6 mt-2">
              <div className="content-data bg-white">
                <table className="table table-borderless rounded mx-4">
                  <thead className="px-4">
                    <tr className="">
                      <th> </th>
                      <th>
                        <div className="data-peserta">Data Peserta</div>
                        <div className="berdasarkan">Berdasarkan Daerah</div>
                      </th>
                      <th>
                        <div className="kota pb-3">Kota / Kabupaten</div>
                      </th>
                      <th>
                        <div className="btn btn-primary text-white">
                          Provinsi
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="mb-8">
                      <td className="nomor text-center">1</td>
                      <td className="data-daerah">DKI Jakarta</td>
                      <td className="total-peserta">12.000 Peserta</td>
                    </tr>
                    <tr className="">
                      <td className="nomor text-center">1</td>
                      <td className="data-daerah">DKI Jakarta</td>
                      <td className="total-peserta">12.000 Peserta</td>
                    </tr>
                  </tbody>
                </table>
                <div className="d-flex mx-6">
                  <p className="pt-6">Total: 120.000 Peserta</p>
                  <div className="ml-auto mx-10 my-4">
                    <button className="btn btn-primary mx-4">
                      &lt;
                    </button>
                    <button className="btn btn-primary">&gt;</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 mt-2">
              <div className="content-data bg-white">
                <table className="table table-borderless rounded mx-4">
                  <thead className="px-4">
                    <tr className="">
                      <th> </th>
                      <th>
                        <div className="data-peserta">Data Zonasi</div>
                        <div className="berdasarkan">Berdasarkan Daerah</div>
                      </th>
                      <th>
                        <div className="kota pb-3">Kota / Kabupaten</div>
                      </th>
                      <th>
                        <div className="btn btn-primary text-white">
                          Provinsi
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="mb-8">
                      <td className="nomor text-center">1</td>
                      <td className="data-daerah">DKI Jakarta</td>
                      <td className="total-peserta">12.000 Peserta</td>
                    </tr>
                    <tr className="">
                      <td className="nomor text-center">1</td>
                      <td className="data-daerah">DKI Jakarta</td>
                      <td className="total-peserta">12.000 Peserta</td>
                    </tr>
                  </tbody>
                </table>
                <div className="d-flex mx-6">
                  <p className="pt-6">Total: 120.000 Zonasi</p>
                  <div className="ml-auto mx-10 my-4">
                    <button className="btn btn-primary mx-4">
                      &lt;
                    </button>
                    <button className="btn btn-primary">&gt;</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageWrapper>
    </>
  );
};

export default DashboardSiteManagement;
